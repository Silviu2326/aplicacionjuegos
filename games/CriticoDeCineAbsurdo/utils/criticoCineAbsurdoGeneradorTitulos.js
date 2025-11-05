import { FRAGMENTOS_TITULOS, TITULOS_PREDEFINIDOS } from '../constants/CriticoCineAbsurdoFragmentos';
import { generarMetadatosPelicula } from './criticoCineAbsurdoGeneradorMetadatos';

/**
 * Genera un título de película absurdo combinando fragmentos aleatorios
 * o seleccionando uno de los títulos predefinidos
 */
export const generarTituloAbsurdo = () => {
  let titulo;
  
  // 30% de probabilidad de usar un título predefinido
  if (Math.random() < 0.3 && TITULOS_PREDEFINIDOS.length > 0) {
    const randomIndex = Math.floor(Math.random() * TITULOS_PREDEFINIDOS.length);
    titulo = TITULOS_PREDEFINIDOS[randomIndex];
  } else {
    // Generar título combinando fragmentos
    const { sustantivos, adjetivos, verbos, lugares, objetos, conectores } = FRAGMENTOS_TITULOS;
    
    // Patrones de generación
    const patrones = [
      // Patrón 1: "El [Sustantivo] [Adjetivo]"
      () => `El ${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)}`,
      
      // Patrón 2: "La [Rebelión/Ataque/etc] de [Sustantivo] [Adjetivo]"
      () => `La ${getRandomElement(verbos)} de ${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)}`,
      
      // Patrón 3: "[Sustantivo] y [Sustantivo] [Adjetivo]"
      () => `${getRandomElement(sustantivos)} y ${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)}`,
      
      // Patrón 4: "Mi [Sustantivo] es [Adjetivo]"
      () => `Mi ${getRandomElement(sustantivos)} es ${getRandomElement(adjetivos)}`,
      
      // Patrón 5: "[Sustantivo] [Adjetivo] en [Lugar]"
      () => `${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)} en ${getRandomElement(lugares)}`,
      
      // Patrón 6: "El [Misterio/Crónicas/etc] del [Sustantivo] [Adjetivo]"
      () => `El ${getRandomElement(verbos)} del ${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)}`,
      
      // Patrón 7: "[Sustantivo] [Conector] [Sustantivo] [Adjetivo]"
      () => `${getRandomElement(sustantivos)} ${getRandomElement(conectores)} ${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)}`,
      
      // Patrón 8: "La [Aventura/Crónicas/etc] del [Sustantivo] [Adjetivo]"
      () => `La ${getRandomElement(verbos)} del ${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)}`,
      
      // Patrón 9: "[Sustantivo] [Adjetivo] con [Objeto]"
      () => `${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)} con ${getRandomElement(objetos)}`,
      
      // Patrón 10: "[Sustantivo] que [Verbo] con [Sustantivo]"
      () => `El ${getRandomElement(sustantivos)} que ${getRandomElement(verbos)} con ${getRandomElement(sustantivos)}`,
      
      // Patrones adicionales para más variedad
      () => `${getRandomElement(sustantivos)}: ${getRandomElement(verbos)} ${getRandomElement(adjetivos)}`,
      () => `Las ${getRandomElement(verbos)} de ${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)}`,
      () => `Un ${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)} en ${getRandomElement(lugares)}`,
      () => `${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)} vs ${getRandomElement(sustantivos)} ${getRandomElement(adjetivos)}`,
      () => `El día que ${getRandomElement(sustantivos)} ${getRandomElement(verbos)}`,
    ];
    
    // Seleccionar un patrón aleatorio
    const patronAleatorio = patrones[Math.floor(Math.random() * patrones.length)];
    titulo = patronAleatorio();
  }
  
  // Generar metadatos completos para la película
  return generarMetadatosPelicula(titulo);
};

/**
 * Obtiene un elemento aleatorio de un array
 */
const getRandomElement = (array) => {
  if (!array || array.length === 0) return '';
  return array[Math.floor(Math.random() * array.length)];
};

