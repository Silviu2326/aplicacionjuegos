// Generador de acrónimos aleatorios para el juego Maestro del Acrónimo

const ACRONYMS = [
  'A.M.P.',
  'R.S.V.P.',
  'T.Q.M.',
  'F.O.M.O.',
  'S.O.L.',
  'C.A.S.A.',
  'L.P.D.C.',
  'M.N.T.R.',
  'Q.U.E.S.O.',
  'V.R.D.D.',
  'P.A.T.O.',
  'C.P.V.',
  'D.E.L.',
  'E.S.T.A.',
  'F.U.E.',
  'G.A.T.O.',
  'H.O.L.A.',
  'I.G.L.U.',
  'J.O.Y.A.',
  'K.I.O.S.',
  'L.A.M.A.',
  'M.A.R.E.',
  'N.A.V.E.',
  'O.S.O.S.',
  'P.A.N.A.',
  'Q.U.E.N.',
  'R.A.T.A.',
  'S.A.L.A.',
  'T.A.Z.A.',
  'U.N.O.S.',
  'V.A.L.E.',
  'W.A.V.E.',
  'X.E.N.O.',
  'Y.A.C.A.',
  'Z.A.P.A.',
  'A.B.C.',
  'D.E.F.',
  'G.H.I.',
  'J.K.L.',
  'M.N.O.',
  'P.Q.R.',
  'S.T.U.',
  'V.W.X.',
  'Y.Z.A.',
];

/**
 * Genera un acrónimo aleatorio de 3 a 5 letras
 * @param {Array} usedAcronyms - Array de acrónimos ya usados en la partida
 * @returns {string} Acrónimo aleatorio en formato 'L.E.T.R.A.S.'
 */
export const generateRandomAcronym = (usedAcronyms = []) => {
  const available = ACRONYMS.filter(acronym => !usedAcronyms.includes(acronym));
  
  if (available.length === 0) {
    // Si ya se usaron todos, reiniciar la lista
    const randomIndex = Math.floor(Math.random() * ACRONYMS.length);
    return ACRONYMS[randomIndex];
  }
  
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
};

/**
 * Valida que una frase coincida con las letras del acrónimo
 * @param {string} phrase - La frase a validar
 * @param {string} acronym - El acrónimo en formato 'L.E.T.R.A.S.'
 * @returns {boolean} true si la frase es válida
 */
export const validatePhrase = (phrase, acronym) => {
  if (!phrase || !acronym) return false;
  
  // Extraer letras del acrónimo (sin puntos)
  const letters = acronym.split('.').filter(char => char.length > 0).map(char => char.toUpperCase());
  
  // Extraer palabras de la frase
  const words = phrase.trim().split(/\s+/).filter(word => word.length > 0);
  
  // Verificar que haya el mismo número de palabras que letras
  if (words.length !== letters.length) {
    return false;
  }
  
  // Verificar que cada palabra empiece con la letra correspondiente
  for (let i = 0; i < words.length; i++) {
    const firstLetter = words[i].charAt(0).toUpperCase();
    if (firstLetter !== letters[i]) {
      return false;
    }
  }
  
  return true;
};

/**
 * Extrae solo las letras del acrónimo (sin puntos)
 * @param {string} acronym - Acrónimo en formato 'L.E.T.R.A.S.'
 * @returns {string} Letras sin puntos: 'LETRAS'
 */
export const getAcronymLetters = (acronym) => {
  if (!acronym) return '';
  return acronym.split('.').filter(char => char.length > 0).join('').toUpperCase();
};

