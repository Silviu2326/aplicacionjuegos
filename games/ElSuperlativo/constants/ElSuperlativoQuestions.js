// Preguntas del juego El Superlativo
export const QUESTIONS = [
  '¿Quién es más probable que se ría en un momento serio?',
  '¿Quién es más probable que se gaste todo el sueldo en la primera semana?',
  '¿Quién es más probable que sobreviva a un apocalipsis zombie gracias a su ingenio?',
  '¿Quién es más probable que llore con un anuncio de televisión?',
  '¿Quién es más probable que intente hacerse amigo de un fantasma en una casa encantada?',
  '¿Quién es más probable que se una a una secta por error?',
  '¿Quién es más probable que se olvide de su propio cumpleaños?',
  '¿Quién es más probable que pida la comida más rara del menú solo por probarla?',
  '¿Quién es más probable que tenga una conversación entera con un contestador automático?',
  '¿Quién es más probable que se pierda usando Google Maps?',
  '¿Quién es más probable que se declare a alguien por mensaje de texto?',
  '¿Quién es más probable que se duerma en una discoteca?',
  '¿Quién es más probable que se quede en pijama todo el día?',
  '¿Quién es más probable que grite durante una película de terror?',
  '¿Quién es más probable que se coma la comida del plato de otra persona?',
  '¿Quién es más probable que se olvide de apagar las luces al salir?',
  '¿Quién es más probable que cante en el baño?',
  '¿Quién es más probable que se tropiece con sus propios pies?',
  '¿Quién es más probable que se quede dormido en el transporte público?',
  '¿Quién es más probable que ordene la misma comida siempre?',
  '¿Quién es más probable que se pierda en un centro comercial?',
  '¿Quién es más probable que se quede sin batería en el peor momento?',
  '¿Quién es más probable que se olvide de cerrar la puerta al salir?',
  '¿Quién es más probable que se quede mirando su teléfono sin hacer nada?',
  '¿Quién es más probable que se coma las sobras de todos?',
  '¿Quién es más probable que se quede en la cama hasta mediodía?',
  '¿Quién es más probable que se equivoque de autobús?',
  '¿Quién es más probable que se olvide del nombre de alguien que acaba de conocer?',
  '¿Quién es más probable que se ría de sus propios chistes?',
  '¿Quién es más probable que se quede sin dinero a mitad de mes?',
];

export const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
  return QUESTIONS[randomIndex];
};

export const getUniqueQuestion = (previousQuestions = []) => {
  const availableQuestions = QUESTIONS.filter(q => !previousQuestions.includes(q));
  
  if (availableQuestions.length === 0) {
    // Si ya se usaron todas las preguntas, reiniciar
    return QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
};

