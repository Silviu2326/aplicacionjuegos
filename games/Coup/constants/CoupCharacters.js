export const COUP_CHARACTERS = {
  DUKE: 'duke',
  ASSASSIN: 'assassin',
  CAPTAIN: 'captain',
  AMBASSADOR: 'ambassador',
  CONTESSA: 'contessa',
};

export const CHARACTER_INFO = {
  [COUP_CHARACTERS.DUKE]: {
    name: 'Duque',
    action: 'Impuesto',
    description: 'Toma 3 monedas del Tesoro',
    blockAction: 'Ayuda Exterior',
    blockDescription: 'Bloquea la acción Ayuda Exterior',
  },
  [COUP_CHARACTERS.ASSASSIN]: {
    name: 'Asesino',
    action: 'Asesinar',
    description: 'Paga 3 monedas y elige a un jugador para que pierda una influencia',
    blockAction: null,
    blockDescription: null,
  },
  [COUP_CHARACTERS.CAPTAIN]: {
    name: 'Capitán',
    action: 'Extorsionar',
    description: 'Roba 2 monedas de otro jugador',
    blockAction: 'Extorsionar',
    blockDescription: 'Bloquea un intento de Extorsión contra ti',
  },
  [COUP_CHARACTERS.AMBASSADOR]: {
    name: 'Embajador',
    action: 'Intercambio',
    description: 'Roba 2 cartas del mazo, míralas junto con tus cartas actuales y devuelve 2 cartas al mazo',
    blockAction: 'Extorsionar',
    blockDescription: 'Bloquea un intento de Extorsión contra ti',
  },
  [COUP_CHARACTERS.CONTESSA]: {
    name: 'Condesa',
    action: null,
    description: null,
    blockAction: 'Asesinar',
    blockDescription: 'Bloquea un intento de Asesinato contra ti',
  },
};

export const CHARACTER_DECK = [
  COUP_CHARACTERS.DUKE,
  COUP_CHARACTERS.DUKE,
  COUP_CHARACTERS.DUKE,
  COUP_CHARACTERS.ASSASSIN,
  COUP_CHARACTERS.ASSASSIN,
  COUP_CHARACTERS.ASSASSIN,
  COUP_CHARACTERS.CAPTAIN,
  COUP_CHARACTERS.CAPTAIN,
  COUP_CHARACTERS.CAPTAIN,
  COUP_CHARACTERS.AMBASSADOR,
  COUP_CHARACTERS.AMBASSADOR,
  COUP_CHARACTERS.AMBASSADOR,
  COUP_CHARACTERS.CONTESSA,
  COUP_CHARACTERS.CONTESSA,
  COUP_CHARACTERS.CONTESSA,
];
