export const WORD_PACKS = {
  animales: {
    name: 'Animales',
    words: ['Pingüino', 'Jirafa', 'Gato', 'Araña', 'Elefante', 'Canguro', 'León', 'Delfín', 'Águila', 'Oso', 'Tigre', 'Conejo'],
  },
  comida: {
    name: 'Comida',
    words: ['Pizza', 'Hamburguesa', 'Sushi', 'Plátano', 'Paella', 'Tarta', 'Taco', 'Helado', 'Sandwich', 'Pasta', 'Ensalada', 'Croissant'],
  },
  deportes: {
    name: 'Deportes',
    words: ['Fútbol', 'Baloncesto', 'Tenis', 'Natación', 'Ajedrez', 'Surf', 'Ciclismo', 'Atletismo', 'Boxeo', 'Voleibol', 'Golf', 'Esquí'],
  },
  objetos_casa: {
    name: 'Objetos de la Casa',
    words: ['Sofá', 'Televisión', 'Lámpara', 'Tenedor', 'Cama', 'Mesa', 'Silla', 'Ventana', 'Espejo', 'Reloj', 'Cocina', 'Puerta'],
  },
  profesiones: {
    name: 'Profesiones',
    words: ['Médico', 'Bombero', 'Astronauta', 'Chef', 'Músico', 'Policía', 'Profesor', 'Piloto', 'Arquitecto', 'Periodista', 'Veterinario', 'Actor'],
  },
  lugares_famosos: {
    name: 'Lugares Famosos',
    words: ['Torre Eiffel', 'Estatua de la Libertad', 'Coliseo Romano', 'La Gran Muralla China', 'Big Ben', 'Machu Picchu', 'Cristo Redentor', 'Taj Mahal', 'Pirámides de Egipto', 'Torre de Pisa', 'Sagrada Familia', 'Opera de Sídney'],
  },
};

export const getRandomWordFromCategory = (category) => {
  const pack = WORD_PACKS[category];
  if (!pack || !pack.words.length) return null;
  const randomIndex = Math.floor(Math.random() * pack.words.length);
  return pack.words[randomIndex];
};

