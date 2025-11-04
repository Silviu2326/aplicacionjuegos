const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const NOTION_TOKEN = 'ntn_P1870053076eY2ek28YAEAW0RKQJsmIschJrVUvTn7m7Xi';
const PAGE_ID = '2a006f76-bed4-81fb-a477-d0e6df561703';
const OUTPUT_DIR = './notion-pages';

// Inicializar cliente de Notion
const notion = new Client({ auth: NOTION_TOKEN });

// Función para convertir ID de Notion (sin guiones) a formato UUID
function formatNotionId(id) {
  if (id.includes('-')) {
    return id;
  }
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
}

// Función para convertir bloques de Notion a markdown
async function blocksToMarkdown(blocks, indent = 0) {
  let markdown = '';
  
  for (const block of blocks) {
    const indentStr = '  '.repeat(indent);
    
    switch (block.type) {
      case 'paragraph':
        if (block.paragraph.rich_text.length > 0) {
          markdown += indentStr + richTextToMarkdown(block.paragraph.rich_text) + '\n\n';
        } else {
          markdown += '\n';
        }
        break;
        
      case 'heading_1':
        markdown += indentStr + '# ' + richTextToMarkdown(block.heading_1.rich_text) + '\n\n';
        break;
        
      case 'heading_2':
        markdown += indentStr + '## ' + richTextToMarkdown(block.heading_2.rich_text) + '\n\n';
        break;
        
      case 'heading_3':
        markdown += indentStr + '### ' + richTextToMarkdown(block.heading_3.rich_text) + '\n\n';
        break;
        
      case 'bulleted_list_item':
        markdown += indentStr + '- ' + richTextToMarkdown(block.bulleted_list_item.rich_text) + '\n';
        break;
        
      case 'numbered_list_item':
        markdown += indentStr + '1. ' + richTextToMarkdown(block.numbered_list_item.rich_text) + '\n';
        break;
        
      case 'to_do':
        const checked = block.to_do.checked ? 'x' : ' ';
        markdown += indentStr + `- [${checked}] ` + richTextToMarkdown(block.to_do.rich_text) + '\n';
        break;
        
      case 'toggle':
        markdown += indentStr + '<details>\n';
        markdown += indentStr + '<summary>' + richTextToMarkdown(block.toggle.rich_text) + '</summary>\n\n';
        if (block.has_children) {
          const children = await getBlockChildren(block.id);
          markdown += await blocksToMarkdown(children, indent + 1);
        }
        markdown += indentStr + '</details>\n\n';
        break;
        
      case 'code':
        const language = block.code.language || '';
        markdown += indentStr + '```' + language + '\n';
        markdown += indentStr + richTextToMarkdown(block.code.rich_text) + '\n';
        markdown += indentStr + '```\n\n';
        break;
        
      case 'quote':
        markdown += indentStr + '> ' + richTextToMarkdown(block.quote.rich_text) + '\n\n';
        break;
        
      case 'callout':
        markdown += indentStr + '> **' + richTextToMarkdown(block.callout.rich_text) + '**\n\n';
        break;
        
      case 'divider':
        markdown += indentStr + '---\n\n';
        break;
        
      case 'table':
        // Tablas son complejas, las manejamos de forma simplificada
        if (block.has_children) {
          const tableRows = await getBlockChildren(block.id);
          for (const row of tableRows) {
            if (row.type === 'table_row') {
              const cells = row.table_row.cells.map(cell => richTextToMarkdown(cell));
              markdown += indentStr + '| ' + cells.join(' | ') + ' |\n';
            }
          }
          markdown += '\n';
        }
        break;
        
      case 'child_page':
        // Esta es una subpágina, la procesaremos por separado
        markdown += indentStr + `[${block.child_page.title || 'Subpágina'}](${block.id})\n\n`;
        break;
    }
    
    // Si el bloque tiene hijos, obtenerlos recursivamente
    if (block.has_children && block.type !== 'toggle' && block.type !== 'table') {
      const children = await getBlockChildren(block.id);
      markdown += await blocksToMarkdown(children, indent + 1);
    }
  }
  
  return markdown;
}

// Función para convertir rich text a markdown
function richTextToMarkdown(richTextArray) {
  return richTextArray.map(text => {
    let content = text.plain_text;
    
    if (text.annotations) {
      if (text.annotations.bold) content = `**${content}**`;
      if (text.annotations.italic) content = `*${content}*`;
      if (text.annotations.strikethrough) content = `~~${content}~~`;
      if (text.annotations.underline) content = `<u>${content}</u>`;
      if (text.annotations.code) content = `\`${content}\``;
      
      if (text.href) {
        content = `[${content}](${text.href})`;
      }
    }
    
    return content;
  }).join('');
}

// Función para obtener hijos de un bloque
async function getBlockChildren(blockId) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  return response.results;
}

// Función para extraer IDs de páginas de los enlaces en el contenido
function extractPageIdsFromContent(content) {
  const pageIds = [];
  const processedIds = new Set();
  
  // Buscar enlaces en formato markdown [texto](id)
  const linkRegex = /\[([^\]]+)\]\(([a-f0-9-]{36})\)/g;
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const pageId = match[2];
    const title = match[1];
    
    // Verificar que el ID tiene el formato correcto de Notion (36 caracteres con guiones)
    if (pageId.length === 36 && pageId.includes('-') && !processedIds.has(pageId)) {
      processedIds.add(pageId);
      pageIds.push({
        id: pageId,
        title: title || 'Sin título',
      });
    }
  }
  
  return pageIds;
}

// Función para extraer IDs de páginas de bloques de Notion
function extractPageIdsFromBlocks(blocks) {
  const pageIds = [];
  
  for (const block of blocks) {
    // Buscar en todos los rich_text de cualquier tipo de bloque
    const extractRichText = (richTextArray) => {
      for (const text of richTextArray) {
        if (text.href && text.href.includes('notion.so/')) {
          // Extraer ID del enlace de Notion
          const urlMatch = text.href.match(/([a-f0-9]{32})/);
          if (urlMatch) {
            const rawId = urlMatch[1];
            const formattedId = formatNotionId(rawId);
            pageIds.push({
              id: formattedId,
              title: text.plain_text || 'Sin título',
            });
          }
        }
      }
    };
    
    // Buscar en diferentes tipos de bloques
    if (block.type === 'paragraph' && block.paragraph?.rich_text) {
      extractRichText(block.paragraph.rich_text);
    }
    if (block.type === 'heading_1' && block.heading_1?.rich_text) {
      extractRichText(block.heading_1.rich_text);
    }
    if (block.type === 'heading_2' && block.heading_2?.rich_text) {
      extractRichText(block.heading_2.rich_text);
    }
    if (block.type === 'heading_3' && block.heading_3?.rich_text) {
      extractRichText(block.heading_3.rich_text);
    }
    if (block.type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text) {
      extractRichText(block.bulleted_list_item.rich_text);
    }
    if (block.type === 'numbered_list_item' && block.numbered_list_item?.rich_text) {
      extractRichText(block.numbered_list_item.rich_text);
    }
    
    // Buscar bloques child_page
    if (block.type === 'child_page') {
      pageIds.push({
        id: block.id,
        title: block.child_page.title || 'Sin título',
      });
    }
  }
  
  return pageIds;
}

// Función para buscar todas las páginas hijas recursivamente
async function getAllChildPagesRecursive(pageId, processedIds = new Set(), depth = 0) {
  const childPages = [];
  
  if (depth > 10) return childPages; // Límite de profundidad para evitar loops infinitos
  
  try {
    // Obtener bloques hijos de la página
    let hasMore = true;
    let startCursor = undefined;
    
    while (hasMore) {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: startCursor,
        page_size: 100,
      });
      
      const blocks = response.results;
      
      for (const block of blocks) {
        // Buscar bloques child_page
        if (block.type === 'child_page') {
          const childPageId = block.id;
          if (!processedIds.has(childPageId)) {
            processedIds.add(childPageId);
            const title = block.child_page?.title || 'Sin título';
            childPages.push({
              id: childPageId,
              title: title,
            });
            
            // Buscar recursivamente subpáginas dentro de esta subpágina
            const nestedPages = await getAllChildPagesRecursive(childPageId, processedIds, depth + 1);
            childPages.push(...nestedPages);
          }
        }
        
        // Buscar enlaces en rich_text
        const extractLinksFromBlock = (richText) => {
          if (!richText) return;
          for (const text of richText) {
            if (text.href && text.href.includes('notion.so/')) {
              const urlMatch = text.href.match(/([a-f0-9]{32})/);
              if (urlMatch) {
                const rawId = urlMatch[1];
                const formattedId = formatNotionId(rawId);
                if (!processedIds.has(formattedId)) {
                  processedIds.add(formattedId);
                  childPages.push({
                    id: formattedId,
                    title: text.plain_text || 'Sin título',
                  });
                }
              }
            }
          }
        };
        
        if (block.type === 'paragraph' && block.paragraph?.rich_text) {
          extractLinksFromBlock(block.paragraph.rich_text);
        }
        if (block.type === 'heading_1' && block.heading_1?.rich_text) {
          extractLinksFromBlock(block.heading_1.rich_text);
        }
        if (block.type === 'heading_2' && block.heading_2?.rich_text) {
          extractLinksFromBlock(block.heading_2.rich_text);
        }
        if (block.type === 'heading_3' && block.heading_3?.rich_text) {
          extractLinksFromBlock(block.heading_3.rich_text);
        }
        if (block.type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text) {
          extractLinksFromBlock(block.bulleted_list_item.rich_text);
        }
        if (block.type === 'numbered_list_item' && block.numbered_list_item?.rich_text) {
          extractLinksFromBlock(block.numbered_list_item.rich_text);
        }
        
        // Si el bloque tiene hijos, buscar recursivamente
        if (block.has_children && block.type !== 'toggle' && block.type !== 'table') {
          const nestedBlocksPages = await getAllChildPagesRecursive(block.id, processedIds, depth + 1);
          childPages.push(...nestedBlocksPages);
        }
      }
      
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }
  } catch (error) {
    console.error(`Error al obtener subpáginas de ${pageId}:`, error.message);
  }
  
  return childPages;
}

// Función para obtener todas las subpáginas
async function getAllChildPages(pageId) {
  const processedIds = new Set();
  return await getAllChildPagesRecursive(pageId, processedIds);
}

// Función para obtener el contenido de una página
async function getPageContent(pageId) {
  try {
    // Obtener la página
    const page = await notion.pages.retrieve({ page_id: pageId });
    
    // Obtener el título
    let title = 'Sin título';
    if (page.properties && page.properties.title) {
      if (page.properties.title.title) {
        title = page.properties.title.title.map(t => t.plain_text).join('');
      }
    }
    
    // Obtener bloques de contenido
    const blocks = await getBlockChildren(pageId);
    const content = await blocksToMarkdown(blocks);
    
    return {
      title,
      content,
      pageId,
    };
  } catch (error) {
    console.error(`Error al obtener contenido de página ${pageId}:`, error.message);
    return null;
  }
}

// Función para sanitizar nombres de archivo
function sanitizeFileName(name) {
  return name
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 100);
}

// Función principal
async function main() {
  console.log('🚀 Iniciando extracción de páginas de Notion...\n');
  
  // Crear directorio de salida si no existe
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const formattedPageId = formatNotionId(PAGE_ID);
  console.log(`📄 Página principal: ${formattedPageId}`);
  
  // Obtener la página principal
  console.log('📥 Obteniendo página principal...');
  const mainPage = await getPageContent(formattedPageId);
  
  const allPages = new Map();
  const processedIds = new Set();
  
  if (mainPage) {
    const fileName = sanitizeFileName(mainPage.title || 'pagina-principal');
    const filePath = path.join(OUTPUT_DIR, `${fileName}.md`);
    const fullContent = `# ${mainPage.title}\n\n${mainPage.content}`;
    
    fs.writeFileSync(filePath, fullContent, 'utf-8');
    console.log(`✅ Guardado: ${filePath}`);
    allPages.set(formattedPageId, { title: mainPage.title, content: fullContent });
    processedIds.add(formattedPageId);
    
    // Extraer IDs de páginas del contenido markdown
    const linkedPages = extractPageIdsFromContent(mainPage.content);
    console.log(`🔗 Encontrados ${linkedPages.length} enlaces a páginas en el contenido\n`);
    
    // Agregar páginas enlazadas a la lista
    for (const linkedPage of linkedPages) {
      if (!processedIds.has(linkedPage.id)) {
        allPages.set(linkedPage.id, { title: linkedPage.title, content: null });
      }
    }
  }
  
  // Obtener todas las subpáginas
  console.log('🔍 Buscando subpáginas...');
  const childPages = await getAllChildPages(formattedPageId);
  
  // Agregar subpáginas encontradas
  for (const childPage of childPages) {
    if (!processedIds.has(childPage.id)) {
      allPages.set(childPage.id, { title: childPage.title, content: null });
    }
  }
  
  console.log(`📚 Total de páginas encontradas: ${allPages.size}\n`);
  
  // Procesar todas las páginas (excepto la principal que ya está guardada)
  let processedCount = 1; // Ya procesamos la principal
  const pagesToProcess = Array.from(allPages.entries()).filter(([id]) => !processedIds.has(id));
  
  for (let i = 0; i < pagesToProcess.length; i++) {
    const [pageId, pageData] = pagesToProcess[i];
    
    console.log(`📥 [${processedCount + 1}/${allPages.size}] Procesando: ${pageData.title}`);
    
    try {
      const pageContent = await getPageContent(pageId);
      
      if (pageContent) {
        const fileName = sanitizeFileName(pageContent.title || `pagina-${processedCount}`);
        const filePath = path.join(OUTPUT_DIR, `${fileName}.md`);
        const fullContent = `# ${pageContent.title}\n\n${pageContent.content}`;
        
        fs.writeFileSync(filePath, fullContent, 'utf-8');
        console.log(`✅ Guardado: ${filePath}`);
        processedIds.add(pageId);
        processedCount++;
        
        // Buscar más páginas enlazadas en este contenido
        const newLinkedPages = extractPageIdsFromContent(pageContent.content);
        for (const newPage of newLinkedPages) {
          if (!allPages.has(newPage.id) && !processedIds.has(newPage.id)) {
            allPages.set(newPage.id, { title: newPage.title, content: null });
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error al procesar ${pageData.title}:`, error.message);
    }
    
    // Pequeña pausa para no sobrecargar la API
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  // Si encontramos nuevas páginas en el proceso, procesarlas también
  let newPagesFound = true;
  while (newPagesFound) {
    newPagesFound = false;
    const remainingPages = Array.from(allPages.entries()).filter(([id]) => !processedIds.has(id));
    
    if (remainingPages.length > 0) {
      console.log(`\n🔍 Procesando ${remainingPages.length} páginas adicionales encontradas...\n`);
      
      for (const [pageId, pageData] of remainingPages) {
        console.log(`📥 Procesando: ${pageData.title}`);
        
        try {
          const pageContent = await getPageContent(pageId);
          
          if (pageContent) {
            const fileName = sanitizeFileName(pageContent.title || `pagina-${processedCount}`);
            const filePath = path.join(OUTPUT_DIR, `${fileName}.md`);
            const fullContent = `# ${pageContent.title}\n\n${pageContent.content}`;
            
            fs.writeFileSync(filePath, fullContent, 'utf-8');
            console.log(`✅ Guardado: ${filePath}`);
            processedIds.add(pageId);
            processedCount++;
            newPagesFound = true;
            
            // Buscar más páginas enlazadas
            const newLinkedPages = extractPageIdsFromContent(pageContent.content);
            for (const newPage of newLinkedPages) {
              if (!allPages.has(newPage.id) && !processedIds.has(newPage.id)) {
                allPages.set(newPage.id, { title: newPage.title, content: null });
                newPagesFound = true;
              }
            }
          }
        } catch (error) {
          console.error(`❌ Error al procesar ${pageData.title}:`, error.message);
        }
        
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  }
  
  console.log(`\n🎉 ¡Extracción completada! ${processedCount} páginas guardadas en ${OUTPUT_DIR}`);
}

// Ejecutar
main().catch(console.error);

