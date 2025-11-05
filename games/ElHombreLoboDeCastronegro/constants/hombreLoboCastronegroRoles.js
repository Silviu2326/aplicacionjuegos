// Definiciones de roles para El Hombre Lobo de Castronegro

export const ROLES = {
  ALDEANO: {
    id: 'aldeano',
    name: 'Aldeano',
    alignment: 'good',
    description: 'Eres un simple aldeano de Castronegro. Tu objetivo es descubrir y eliminar a todos los Hombres Lobo antes de que consuman la aldea.',
    ability: 'No tienes habilidades especiales. Tu única arma es tu lógica, tu capacidad de persuasión y tu intuición para detectar a los lobos entre vosotros.',
    nightAction: false,
    icon: '👨‍🌾',
    winCondition: 'Eliminar a todos los Hombres Lobo.',
  },
  HOMBRE_LOBO: {
    id: 'hombre_lobo',
    name: 'Hombre Lobo',
    alignment: 'evil',
    description: 'Eres un Hombre Lobo de Castronegro. Te has convertido bajo la luna llena y ahora amenazas a la aldea. Conoces a los otros Hombres Lobo y trabajáis juntos.',
    ability: 'Cada noche, junto con los otros lobos, elegís en silencio a una víctima para eliminar. Debéis llegar a un consenso o el más votado será vuestra presa.',
    nightAction: true,
    nightActionType: 'kill',
    icon: '🐺',
    winCondition: 'Eliminar a suficientes aldeanos para igualar o superar su número.',
  },
  VIDENTE: {
    id: 'vidente',
    name: 'Vidente',
    alignment: 'good',
    description: 'Eres la Vidente de Castronegro. Tienes el poder de ver a través de las mentiras y descubrir la verdadera identidad de los jugadores.',
    ability: 'Cada noche, puedes elegir a un jugador y descubrir su verdadera identidad. La Vidente es el arma más poderosa de los aldeanos.',
    nightAction: true,
    nightActionType: 'investigate',
    icon: '🔮',
    winCondition: 'Ayudar a los aldeanos a descubrir y eliminar a todos los Hombres Lobo.',
  },
  BRUJA: {
    id: 'bruja',
    name: 'Bruja',
    alignment: 'good',
    description: 'Eres la Bruja de Castronegro. Posees dos pociones poderosas que pueden cambiar el destino de la aldea.',
    ability: 'Tienes una poción de vida (para salvar a quien los lobos ataquen) y una poción de muerte (para matar a un jugador). Cada una solo se puede usar una vez en toda la partida.',
    nightAction: true,
    nightActionType: 'witch',
    hasLifePotion: true,
    hasDeathPotion: true,
    icon: '🧪',
    winCondition: 'Usar tus pociones sabiamente para proteger a los aldeanos y eliminar a los lobos.',
  },
  CAZADOR: {
    id: 'cazador',
    name: 'Cazador',
    alignment: 'good',
    description: 'Eres el Cazador de Castronegro. Tu venganza es letal y tu escopeta nunca falla.',
    ability: 'Cuando mueres (por cualquier motivo: ataque de lobos o linchamiento), puedes disparar y eliminar inmediatamente a otro jugador como último acto de venganza.',
    nightAction: false,
    icon: '🔫',
    winCondition: 'Eliminar a todos los Hombres Lobo, incluso desde la muerte.',
  },
  CUPIDO: {
    id: 'cupido',
    name: 'Cupido',
    alignment: 'neutral',
    description: 'Eres Cupido, el dios del amor. Puedes crear vínculos de amor eterno que trascienden la vida y la muerte.',
    ability: 'La primera noche, eliges a dos jugadores que se convierten en amantes. Si uno muere (por cualquier motivo), el otro muere de amor al instante. Si ambos amantes sobreviven hasta el final, ganan juntos.',
    nightAction: true,
    nightActionType: 'cupid',
    firstNightOnly: true,
    icon: '💘',
    winCondition: 'Tus amantes deben sobrevivir hasta el final para que todos ganéis.',
  },
  LADRON: {
    id: 'ladron',
    name: 'Ladrón',
    alignment: 'neutral',
    description: 'Eres el Ladrón de Castronegro. Maestro del engaño y la sustitución, puedes cambiar tu destino al inicio del juego.',
    ability: 'La primera noche, puedes intercambiar tu rol con otro jugador. Si eliges un aldeano, te conviertes en aldeano. Si eliges un lobo, te conviertes en lobo y conoces a los otros lobos.',
    nightAction: true,
    nightActionType: 'thief',
    firstNightOnly: true,
    icon: '🎭',
    winCondition: 'Ganar con el bando que finalmente elijas mediante el intercambio.',
  },
  TONTO_DEL_PUEBLO: {
    id: 'tonto_del_pueblo',
    name: 'Tonto del Pueblo',
    alignment: 'good',
    description: 'Eres el Tonto del Pueblo de Castronegro. Si eres linchado por error, los aldeanos se dan cuenta de su error.',
    ability: 'Si eres linchado por votación, revelas tu rol y el linchamiento se cancela. No puedes ganar con los aldeanos, pero puedes seguir jugando y ayudando.',
    nightAction: false,
    icon: '🤡',
    winCondition: 'Sobrevivir hasta el final aunque no puedas ganar oficialmente.',
  },
  PROTECTOR: {
    id: 'protector',
    name: 'Protector',
    alignment: 'good',
    description: 'Eres el Protector de Castronegro. Tu deber es proteger a los inocentes durante la noche.',
    ability: 'Cada noche, puedes elegir a un jugador para proteger. Si los lobos atacan a ese jugador, sobrevive gracias a tu protección. No puedes protegerte a ti mismo ni proteger dos noches seguidas al mismo jugador.',
    nightAction: true,
    nightActionType: 'protect',
    icon: '🛡️',
    winCondition: 'Eliminar a todos los Hombres Lobo protegiendo a los aldeanos clave.',
  },
  ANCIANO: {
    id: 'anciano',
    name: 'Anciano',
    alignment: 'good',
    description: 'Eres el Anciano de Castronegro. Tu sabiduría es valiosa, pero tu vida es frágil.',
    ability: 'Si eres atacado por los lobos, sobrevives al primer ataque. Sin embargo, si eres atacado una segunda vez o linchado, mueres. Los lobos pueden necesitar dos ataques para eliminarte.',
    nightAction: false,
    icon: '👴',
    winCondition: 'Ayudar a los aldeanos a descubrir y eliminar a todos los Hombres Lobo.',
  },
  NIÑO_SALVAJE: {
    id: 'nino_salvaje',
    name: 'Niño Salvaje',
    alignment: 'neutral',
    description: 'Eres el Niño Salvaje de Castronegro. Eliges a un modelo a seguir al inicio del juego.',
    ability: 'La primera noche, eliges a un jugador como tu modelo. Si ese jugador muere, te conviertes en Hombre Lobo y te unes a los lobos. Si tu modelo sobrevive, ganas con los aldeanos.',
    nightAction: true,
    nightActionType: 'wild_child',
    firstNightOnly: true,
    icon: '🧒',
    winCondition: 'Ganar con el bando de tu modelo (o con los lobos si tu modelo muere).',
  },
  LOBO_ALFA: {
    id: 'lobo_alfa',
    name: 'Lobo Alfa',
    alignment: 'evil',
    description: 'Eres el Lobo Alfa, el líder de la manada. Tu transformación es más poderosa.',
    ability: 'Eres un Hombre Lobo con una habilidad adicional: si eres linchado en la primera votación, sobrevives y revelas tu rol. Los aldeanos se sorprenden pero no puedes usar esta habilidad más veces.',
    nightAction: true,
    nightActionType: 'kill',
    icon: '👹',
    winCondition: 'Eliminar a suficientes aldeanos para igualar o superar su número.',
  },
  LOBO_GRIS: {
    id: 'lobo_gris',
    name: 'Lobo Gris',
    alignment: 'evil',
    description: 'Eres el Lobo Gris, un lobo solitario que puede actuar independientemente.',
    ability: 'Puedes elegir a una víctima diferente a la del resto de la manada una vez por partida. Si lo haces, atacas a tu propia víctima en lugar de la elegida por el grupo.',
    nightAction: true,
    nightActionType: 'kill',
    icon: '🐾',
    winCondition: 'Eliminar a suficientes aldeanos para igualar o superar su número.',
  },
};

export const GAME_CONFIG = {
  MIN_PLAYERS: 8,
  MAX_PLAYERS: 24,
  DEBATE_TIME: 180, // 3 minutos en segundos
  VOTING_TIME: 60, // 1 minuto en segundos
  NIGHT_TIME: 120, // 2 minutos en segundos
};

export const ROLE_DISTRIBUTION = {
  8: { aldeanos: 4, hombres_lobo: 2, especiales: 2 },
  9: { aldeanos: 5, hombres_lobo: 2, especiales: 2 },
  10: { aldeanos: 5, hombres_lobo: 2, especiales: 3 },
  11: { aldeanos: 6, hombres_lobo: 3, especiales: 2 },
  12: { aldeanos: 6, hombres_lobo: 3, especiales: 3 },
  13: { aldeanos: 7, hombres_lobo: 3, especiales: 3 },
  14: { aldeanos: 7, hombres_lobo: 3, especiales: 4 },
  15: { aldeanos: 8, hombres_lobo: 3, especiales: 4 },
  16: { aldeanos: 9, hombres_lobo: 3, especiales: 4 },
  17: { aldeanos: 9, hombres_lobo: 4, especiales: 4 },
  18: { aldeanos: 10, hombres_lobo: 4, especiales: 4 },
  19: { aldeanos: 11, hombres_lobo: 4, especiales: 4 },
  20: { aldeanos: 12, hombres_lobo: 4, especiales: 4 },
  21: { aldeanos: 12, hombres_lobo: 5, especiales: 4 },
  22: { aldeanos: 13, hombres_lobo: 5, especiales: 4 },
  23: { aldeanos: 14, hombres_lobo: 5, especiales: 4 },
  24: { aldeanos: 15, hombres_lobo: 5, especiales: 4 },
};

// Distribución inteligente de roles especiales según número de jugadores
export const SPECIAL_ROLES_PRIORITY = [
  'vidente',      // Siempre presente si hay especiales
  'bruja',        // Muy importante
  'protector',     // Útil para proteger
  'cazador',      // Útil para venganza
  'cupido',       // Neutral interesante
  'ladron',       // Neutral interesante
  'anciano',      // Útil para confusión
  'nino_salvaje', // Neutral interesante
];

