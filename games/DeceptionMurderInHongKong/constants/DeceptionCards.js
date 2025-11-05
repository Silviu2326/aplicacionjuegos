// Armas disponibles en el juego
export const WEAPONS = [
  { id: 'poison', name: 'Veneno', image: null, description: 'Un veneno letal de acción lenta' },
  { id: 'gun', name: 'Pistola', image: null, description: 'Arma de fuego de calibre 9mm' },
  { id: 'rope', name: 'Cuerda', image: null, description: 'Cuerda de nylon resistente' },
  { id: 'candlestick', name: 'Candelabro', image: null, description: 'Pesado candelabro de plata' },
  { id: 'axe', name: 'Hacha', image: null, description: 'Hacha de leñador afilada' },
  { id: 'scissors', name: 'Tijeras', image: null, description: 'Tijeras de cocina grandes' },
  { id: 'knife', name: 'Cuchillo', image: null, description: 'Cuchillo de cocina afilado' },
  { id: 'pipe', name: 'Tubo', image: null, description: 'Tubo de plomo pesado' },
  { id: 'bat', name: 'Bate', image: null, description: 'Bate de béisbol de madera' },
  { id: 'umbrella', name: 'Paraguas', image: null, description: 'Paraguas con punta metálica' },
  { id: 'poison_dart', name: 'Dardo envenenado', image: null, description: 'Dardo pequeño con veneno' },
  { id: 'sword', name: 'Espada', image: null, description: 'Espada ceremonial antigua' },
  { id: 'bow', name: 'Arco', image: null, description: 'Arco y flechas de caza' },
  { id: 'hammer', name: 'Martillo', image: null, description: 'Martillo de carpintero' },
  { id: 'wire', name: 'Cable', image: null, description: 'Cable eléctrico grueso' },
  { id: 'ice_pick', name: 'Picahielo', image: null, description: 'Picahielo de acero' },
  { id: 'syringe', name: 'Jeringa', image: null, description: 'Jeringa médica grande' },
  { id: 'chainsaw', name: 'Motosierra', image: null, description: 'Motosierra eléctrica' },
  { id: 'poison_ivy', name: 'Hiedra venenosa', image: null, description: 'Planta venenosa procesada' },
  { id: 'garrote', name: 'Garrota', image: null, description: 'Garrota de metal' },
  { id: 'acid', name: 'Ácido', image: null, description: 'Ácido corrosivo concentrado' },
  { id: 'explosive', name: 'Explosivo', image: null, description: 'Explosivo plástico' },
  { id: 'pills', name: 'Píldoras', image: null, description: 'Píldoras tóxicas' },
  { id: 'glass', name: 'Vidrio', image: null, description: 'Fragmento de vidrio afilado' },
];

// Pistas Clave disponibles en el juego
export const CLUES = [
  { id: 'mask', name: 'Máscara', image: null, description: 'Máscara de teatro' },
  { id: 'key', name: 'Llave', image: null, description: 'Llave antigua' },
  { id: 'ticket', name: 'Ticket', image: null, description: 'Ticket de avión' },
  { id: 'love_letter', name: 'Carta de amor', image: null, description: 'Carta romántica' },
  { id: 'fingerprints', name: 'Huellas dactilares', image: null, description: 'Huellas en el objeto' },
  { id: 'hair', name: 'Pelo', image: null, description: 'Cabello en la escena' },
  { id: 'cocktail', name: 'Cóctel', image: null, description: 'Cóctel envenenado' },
  { id: 'glove', name: 'Guante', image: null, description: 'Guante de cuero' },
  { id: 'debt', name: 'Deudas', image: null, description: 'Documentos de deuda' },
  { id: 'photo', name: 'Fotografía', image: null, description: 'Fotografía comprometedora' },
  { id: 'ring', name: 'Anillo', image: null, description: 'Anillo de compromiso' },
  { id: 'diary', name: 'Diario', image: null, description: 'Diario personal' },
  { id: 'watch', name: 'Reloj', image: null, description: 'Reloj de pulsera' },
  { id: 'phone', name: 'Teléfono', image: null, description: 'Teléfono móvil' },
  { id: 'money', name: 'Dinero', image: null, description: 'Fajo de billetes' },
  { id: 'contract', name: 'Contrato', image: null, description: 'Contrato firmado' },
  { id: 'medicine', name: 'Medicina', image: null, description: 'Botella de medicina' },
  { id: 'jewelry', name: 'Joyas', image: null, description: 'Joyería valiosa' },
  { id: 'letter', name: 'Carta', image: null, description: 'Carta amenazante' },
  { id: 'blood', name: 'Sangre', image: null, description: 'Manchas de sangre' },
  { id: 'footprints', name: 'Huellas', image: null, description: 'Huellas de zapatos' },
  { id: 'cigarette', name: 'Cigarrillo', image: null, description: 'Colilla de cigarrillo' },
  { id: 'lipstick', name: 'Labial', image: null, description: 'Labial usado' },
  { id: 'perfume', name: 'Perfume', image: null, description: 'Frasco de perfume' },
  { id: 'tissue', name: 'Pañuelo', image: null, description: 'Pañuelo con iniciales' },
  { id: 'button', name: 'Botón', image: null, description: 'Botón de camisa' },
  { id: 'thread', name: 'Hilo', image: null, description: 'Hilo de ropa' },
  { id: 'receipt', name: 'Recibo', image: null, description: 'Recibo de compra' },
];

// Fichas de Escena que usa el Científico Forense
export const SCENE_TILES = [
  {
    id: 'cause_of_death',
    category: 'Causa de la Muerte',
    options: [
      'Envenenamiento',
      'Ahorcamiento',
      'Apuñalamiento',
      'Herida de bala',
      'Golpe contundente',
      'Ahogamiento',
      'Enfermedad',
      'Quemaduras',
    ],
  },
  {
    id: 'crime_location',
    category: 'Localización del Crimen',
    options: [
      'Estudio',
      'Cocina',
      'Dormitorio',
      'Sala de estar',
      'Baño',
      'Jardín',
      'Garaje',
      'Desván',
    ],
  },
  {
    id: 'motive',
    category: 'Motivo del Crimen',
    options: [
      'Riqueza',
      'Venganza',
      'Pasión',
      'Celos',
      'Protección',
      'Honor',
      'Accidente',
      'Poder',
    ],
  },
  {
    id: 'evidence_left',
    category: 'Pista dejada en la escena',
    options: [
      'Ropa',
      'Sangre',
      'Documentos',
      'Huellas',
      'Objetos personales',
      'Alimentos',
      'Electrónica',
      'Joyas',
    ],
  },
  {
    id: 'victim_impression',
    category: 'Impresión general de la víctima',
    options: [
      'Relajado',
      'Sorprendido',
      'Asustado',
      'Desprevenido',
      'Resistente',
      'Inconsciente',
      'Tranquilo',
      'Nervioso',
    ],
  },
  {
    id: 'crime_duration',
    category: 'Duración del crimen',
    options: [
      'Instantáneo',
      'Rápido',
      'Varios minutos',
      'Prolongado',
      'Múltiples fases',
    ],
  },
  {
    id: 'wound',
    category: 'Herida',
    options: [
      'Corte/Apuñalamiento',
      'Golpe',
      'Quemadura',
      'Estrangulamiento',
      'Disparo',
      'Intoxicación',
    ],
  },
  {
    id: 'victim_trace',
    category: 'Rastro de la víctima',
    options: [
      'Relajado',
      'Ansioso',
      'Ebrio',
      'Medicado',
      'Consciente',
      'Inconsciente',
    ],
  },
  {
    id: 'time_of_death',
    category: 'Hora del crimen',
    options: [
      'Medianoche',
      'Madrugada',
      'Amanecer',
      'Mañana',
      'Mediodía',
      'Tarde',
      'Atardecer',
      'Noche',
    ],
  },
  {
    id: 'weather',
    category: 'Condiciones climáticas',
    options: [
      'Lluvia',
      'Niebla',
      'Viento fuerte',
      'Calor extremo',
      'Frío intenso',
      'Tormenta',
      'Claro',
      'Nublado',
    ],
  },
  {
    id: 'victim_activity',
    category: 'Actividad de la víctima',
    options: [
      'Durmiendo',
      'Comiendo',
      'Leyendo',
      'Trabajando',
      'Ejercitándose',
      'Relajándose',
      'Conversando',
      'Escribiendo',
    ],
  },
  {
    id: 'weapon_location',
    category: 'Ubicación del arma',
    options: [
      'En la escena',
      'Escondida',
      'Descartada',
      'Llevada por el asesino',
      'Destruida',
      'En el cuerpo',
      'Limpieza inminente',
      'Evidencia secundaria',
    ],
  },
  {
    id: 'suspect_behavior',
    category: 'Comportamiento del sospechoso',
    options: [
      'Nervioso',
      'Calmado',
      'Agresivo',
      'Defensivo',
      'Evasivo',
      'Cooperativo',
      'Hostil',
      'Indiferente',
    ],
  },
  {
    id: 'entry_method',
    category: 'Método de entrada',
    options: [
      'Puerta principal',
      'Ventana',
      'Puerta trasera',
      'Forzado',
      'Clave',
      'Invitado',
      'Balcón',
      'Techo',
    ],
  },
  {
    id: 'struggle_evidence',
    category: 'Evidencia de lucha',
    options: [
      'Lucha intensa',
      'Resistencia leve',
      'Sin resistencia',
      'Sorpresa total',
      'Lucha prolongada',
      'Escape fallido',
      'Defensa activa',
      'Sumisión',
    ],
  },
];

// Función para obtener un arma por ID
export const getWeaponById = (id) => {
  return WEAPONS.find(weapon => weapon.id === id);
};

// Función para obtener una pista por ID
export const getClueById = (id) => {
  return CLUES.find(clue => clue.id === id);
};

// Función para obtener una ficha de escena por ID
export const getSceneTileById = (id) => {
  return SCENE_TILES.find(tile => tile.id === id);
};

// Función para mezclar y repartir armas/pistas a los jugadores
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
