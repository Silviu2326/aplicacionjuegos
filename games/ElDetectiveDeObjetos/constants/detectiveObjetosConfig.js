export const DETECTIVE_OBJETOS_CONFIG = {
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 10,
  DEFAULT_MAX_ROUNDS: 5,
  MIN_ROUNDS: 1,
  MAX_ROUNDS: 20,
  
  // Niveles de zoom (valores de escala, donde 1.0 es la imagen completa)
  // Mayor valor = más zoom (más cerca)
  ZOOM_LEVELS: [5.0, 4.0, 3.0, 2.5, 2.0, 1.5, 1.0],
  
  // Puntos
  POINTS_FOR_CORRECT_GUESS: 1,
  POINTS_FOR_PHOTOGRAPHER_WIN: 1,
  
  // Duración de animaciones (ms)
  ZOOM_TRANSITION_DURATION: 500,
};

// Ejemplos de objetos para sugerencias al fotógrafo
export const OBJECT_EXAMPLES = [
  { category: 'Electrónicos', examples: ['Control remoto', 'Auriculares', 'Cargador USB', 'Mouse de computadora', 'Teclado', 'Pantalla de reloj', 'Cámara', 'Teléfono móvil'] },
  { category: 'Hogar', examples: ['Cepillo de dientes', 'Interruptor de luz', 'Llave', 'Candado', 'Cuchara', 'Tenedor', 'Tapón de botella', 'Perilla de puerta'] },
  { category: 'Textiles', examples: ['Botón', 'Cremallera', 'Hebilla de cinturón', 'Ojal de zapato', 'Etiqueta de ropa', 'Hilo', 'Aguja', 'Velcro'] },
  { category: 'Alimentación', examples: ['Grano de café', 'Semilla', 'Cáscara de nuez', 'Cáscara de huevo', 'Hoja de lechuga', 'Gota de agua', 'Cristal de azúcar', 'Grano de arroz'] },
  { category: 'Naturaleza', examples: ['Hoja', 'Pétalo de flor', 'Arena', 'Piedra', 'Corteza de árbol', 'Musgo', 'Pluma', 'Ala de insecto'] },
  { category: 'Escritura', examples: ['Lápiz', 'Bolígrafo', 'Goma de borrar', 'Clips', 'Grapa', 'Cinta adhesiva', 'Sello de correos', 'Etiqueta'] },
  { category: 'Joyería', examples: ['Anillo', 'Collar', 'Broche', 'Pulsera', 'Reloj', 'Aretes', 'Gema', 'Cristal'] },
  { category: 'Deportes', examples: ['Pelota de tenis', 'Balón de fútbol', 'Raqueta', 'Casco', 'Guante', 'Zapatilla deportiva', 'Cuerda de saltar', 'Pesa'] },
];

// Consejos para el fotógrafo
export const PHOTOGRAPHER_TIPS = [
  'Toma la foto muy de cerca, casi tocando el objeto',
  'Enfócate en texturas y detalles que hagan difícil identificar el objeto',
  'Evita tomar fotos que muestren el objeto completo',
  'La mejor foto es la que parece completamente abstracta',
  'Usa buena iluminación para resaltar detalles',
  'Intenta capturar solo una parte del objeto',
  'Piensa en ángulos inusuales o poco comunes',
];

// Consejos para los detectives
export const DETECTIVE_TIPS = [
  'Observa cuidadosamente los detalles de la imagen',
  'Piensa en texturas y materiales que puedas reconocer',
  'Considera objetos comunes que usas todos los días',
  'No te apresures, analiza cada elemento de la foto',
  'Piensa en el contexto de dónde estás jugando',
  'Compara con objetos que hayas visto antes',
];

