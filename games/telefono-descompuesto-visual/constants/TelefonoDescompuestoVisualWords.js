export const WORDS = [
  'Un gato DJ en una discoteca',
  'La Torre Eiffel derritiéndose como un helado',
  'Un robot jardinero podando un bonsái',
  'Albert Einstein surfeando una ola gigante',
  'Un pingüino con un jetpack',
  'La Mona Lisa haciéndose un selfie',
  'Guerra de almohadas entre caballeros medievales',
  'Un pulpo intentando tocar una guitarra',
  'Desayuno en la luna',
  'El monstruo del Lago Ness jugando al waterpolo',
  'Un caracol con un motor de cohete',
  'Un T-Rex intentando usar un smartphone',
  'Un perro en un monopatín',
  'Un monstruo peludo comiendo una rueda',
  'Un elefante tocando el piano',
  'Una ballena volando sobre las nubes',
  'Un astronauta cocinando en la cocina',
  'Un dragón jugando videojuegos',
  'Un unicornio haciendo ejercicio',
  'Un león usando gafas de sol',
];

export const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};

export const getRandomWords = (count) => {
  const shuffled = [...WORDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

