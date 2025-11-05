// Datos de configuración del juego Feed the Kraken

export const ROLE_INFO = {
  sailor: {
    name: 'Marinero Leal',
    description: 'Eres un marinero leal a la Corona. Tu objetivo es ayudar a que el barco llegue a Bluewater Bay navegando hacia el norte (cartas azules). Debes observar cuidadosamente las decisiones de los oficiales y sospechar de cualquier acción sospechosa.',
    color: '#4a90e2',
    icon: '⚓',
    strategy: 'Observa las decisiones de navegación. Si el barco se mueve hacia el sur, sospecha del Capitán, Teniente o Navegante. Puedes iniciar un motín si sospechas que el Capitán es traidor.',
    objectives: [
      'Llegar a Bluewater Bay (posición +5)',
      'Detectar y eliminar a los Piratas',
      'Evitar que el Culto invoque al Kraken',
      'Votar sabiamente en motines y acusaciones',
    ],
    abilities: [
      'Puedes iniciar motines contra el Capitán',
      'Puedes votar en acusaciones',
      'Puedes ser seleccionado como oficial',
    ],
    winCondition: 'El barco llega a Bluewater Bay (posición +5)',
    playerCount: {
      '5-6': '3-4 marineros',
      '7-8': '4-5 marineros',
      '9-10': '5-6 marineros',
      '11': '6 marineros',
    },
  },
  pirate: {
    name: 'Pirata Infiltrado',
    description: 'Eres un pirata infiltrado en la tripulación. Tu objetivo es hacer que el barco navegue hacia la Ensenada de los Corsarios (cartas amarillas) sin ser descubierto. Debes actuar como un marinero leal mientras trabajas en secreto hacia tu objetivo.',
    color: '#f5a623',
    icon: '🏴‍☠️',
    strategy: 'Si eres elegido como oficial, intenta pasar cartas amarillas. Si no eres oficial, intenta iniciar motines contra Capitanes que sospechas que son marineros. Mantén un perfil bajo y no te expongas demasiado.',
    objectives: [
      'Llegar a la Ensenada de los Corsarios (posición -5)',
      'Evitar ser descubierto y acusado',
      'Trabajar en secreto con otros piratas si los hay',
      'Influir en las decisiones de navegación',
    ],
    abilities: [
      'Puedes iniciar motines estratégicos',
      'Puedes votar en acusaciones',
      'Puedes ser seleccionado como oficial',
      'Conoces la identidad de otros piratas (si hay más de uno)',
    ],
    winCondition: 'El barco llega a la Ensenada de los Corsarios (posición -5)',
    playerCount: {
      '5-6': '1 pirata',
      '7-8': '2 piratas',
      '9-10': '3 piratas',
      '11': '3 piratas',
    },
  },
  cult_leader: {
    name: 'Líder de Secta',
    description: 'Eres el Líder de Secta adorador del Kraken, una entidad antigua que habita en las profundidades. Tu objetivo es invocar al Kraken convirtiendo a otros jugadores a tu causa y lanzando a un tripulante por la borda. Trabajas completamente solo y debes ser extremadamente cuidadoso.',
    color: '#d32f2f',
    icon: '🐙',
    strategy: 'Debes convertir jugadores a tu causa en secreto. Las cartas rojas (Kraken) son importantes para ti. Intenta estar presente cuando se juegue una carta roja. Mantén un perfil muy bajo y nunca te expongas.',
    objectives: [
      'Convertir a la mitad de los jugadores vivos a tu causa',
      'Invocar al Kraken jugando cartas rojas estratégicamente',
      'Evitar ser descubierto a toda costa',
      'Manipular votaciones a tu favor',
    ],
    abilities: [
      'Puedes convertir jugadores a tu causa (acción secreta)',
      'Las cartas rojas tienen efectos especiales para ti',
      'Puedes iniciar motines si es estratégico',
      'Trabajas completamente solo',
    ],
    winCondition: 'Convertir a la mitad de los jugadores vivos a tu causa y tener suficientes cartas rojas jugadas',
    playerCount: {
      '5-11': 'Siempre 1 líder de secta',
    },
  },
};

export const NAVIGATION_CARD_INFO = {
  blue: {
    name: 'Carta Azul - Vientos del Norte',
    description: 'Navega una posición hacia Bluewater Bay. Esta carta beneficia a los Marineros Leales.',
    color: '#4a90e2',
    icon: '🔵',
    effect: 'move_north',
    lore: 'Los vientos favorables soplan desde el norte, guiando el barco hacia aguas seguras y el puerto de Bluewater Bay.',
    strategicValue: 'Alta para Marineros, Baja para Piratas',
    frequency: '40% del mazo',
  },
  yellow: {
    name: 'Carta Amarilla - Corrientes del Sur',
    description: 'Navega una posición hacia la Ensenada de los Corsarios. Esta carta beneficia a los Piratas.',
    color: '#f5a623',
    icon: '🟡',
    effect: 'move_south',
    lore: 'Las corrientes traicioneras arrastran el barco hacia el sur, hacia las aguas peligrosas de los Corsarios.',
    strategicValue: 'Alta para Piratas, Baja para Marineros',
    frequency: '40% del mazo',
  },
  red: {
    name: 'Carta Kraken - Presagio Oscuro',
    description: 'No mueve el barco, pero despierta el poder del Kraken. Crucial para el Líder de Secta.',
    color: '#d32f2f',
    icon: '🐙',
    effect: 'kraken',
    lore: 'Las aguas se agitan y se oscurecen. Algo primordial se mueve en las profundidades. El Culto del Kraken se fortalece.',
    strategicValue: 'Crítica para el Líder de Secta, Neutral para otros',
    frequency: '20% del mazo',
    specialEffects: [
      'Fortalece al Culto del Kraken',
      'Puede desbloquear conversiones especiales',
      'Cuenta hacia la invocación del Kraken',
    ],
  },
};

export const MAP_CONFIG = {
  startPosition: 0,
  maxPosition: 5, // Bluewater Bay
  minPosition: -5, // Ensenada de los Corsarios
  positions: [
    { 
      id: -5, 
      name: 'Ensenada de los Corsarios', 
      type: 'pirate_victory',
      description: 'Un refugio de piratas y bandidos. Los Corsarios aguardan aquí para saquear el barco.',
      lore: 'Las aguas embravecidas y las rocas traicioneras esconden el tesoro de los piratas más temidos del Caribe.',
      dangerLevel: 'Extremo',
      victoryCondition: 'Victoria de los Piratas',
    },
    { 
      id: -4, 
      name: 'Aguas Peligrosas del Sur', 
      type: 'danger',
      description: 'Las corrientes son traicioneras y las tormentas son frecuentes. Navegar aquí es arriesgado.',
      lore: 'Los vientos silban entre las velas y las olas golpean con furia el casco del barco.',
      dangerLevel: 'Alto',
    },
    { 
      id: -3, 
      name: 'Mar Abierto del Sur', 
      type: 'normal',
      description: 'Aguas desconocidas. La tripulación está alerta ante cualquier señal de peligro.',
      lore: 'El horizonte se extiende infinito. Solo el sonido de las olas rompe el silencio.',
      dangerLevel: 'Moderado',
    },
    { 
      id: -2, 
      name: 'Mar Abierto del Sur', 
      type: 'normal',
      description: 'Aguas desconocidas. La tripulación está alerta ante cualquier señal de peligro.',
      lore: 'El horizonte se extiende infinito. Solo el sonido de las olas rompe el silencio.',
      dangerLevel: 'Moderado',
    },
    { 
      id: -1, 
      name: 'Mar Abierto del Sur', 
      type: 'normal',
      description: 'Aguas desconocidas. La tripulación está alerta ante cualquier señal de peligro.',
      lore: 'El horizonte se extiende infinito. Solo el sonido de las olas rompe el silencio.',
      dangerLevel: 'Moderado',
    },
    { 
      id: 0, 
      name: 'Puerto de Partida', 
      type: 'start',
      description: 'El punto de inicio del viaje. Todos los destinos están aún por delante.',
      lore: 'El puerto bulle de actividad. Los marineros se preparan para el viaje que cambiará sus vidas.',
      dangerLevel: 'Ninguno',
    },
    { 
      id: 1, 
      name: 'Mar Abierto del Norte', 
      type: 'normal',
      description: 'Aguas tranquilas. El barco navega hacia aguas más seguras.',
      lore: 'El viento sopla favorablemente y las velas se hinchan con esperanza.',
      dangerLevel: 'Bajo',
    },
    { 
      id: 2, 
      name: 'Mar Abierto del Norte', 
      type: 'normal',
      description: 'Aguas tranquilas. El barco navega hacia aguas más seguras.',
      lore: 'El viento sopla favorablemente y las velas se hinchan con esperanza.',
      dangerLevel: 'Bajo',
    },
    { 
      id: 3, 
      name: 'Mar Abierto del Norte', 
      type: 'normal',
      description: 'Aguas tranquilas. El barco navega hacia aguas más seguras.',
      lore: 'El viento sopla favorablemente y las velas se hinchan con esperanza.',
      dangerLevel: 'Bajo',
    },
    { 
      id: 4, 
      name: 'Aguas Seguras', 
      type: 'safe',
      description: 'Las aguas son conocidas y seguras. Bluewater Bay está cerca.',
      lore: 'Los faros de la costa se divisan en la distancia. El hogar espera.',
      dangerLevel: 'Muy Bajo',
    },
    { 
      id: 5, 
      name: 'Bluewater Bay', 
      type: 'sailor_victory',
      description: 'El puerto seguro de Bluewater Bay. La Corona aguarda aquí con recompensas.',
      lore: 'La ciudad bulle de vida. Los marineros leales reciben honores y el botín se divide entre los fieles.',
      dangerLevel: 'Ninguno',
      victoryCondition: 'Victoria de los Marineros',
    },
  ],
};

export const GAME_MESSAGES = {
  captainSelectLieutenant: 'Como Capitán, debes elegir a tu Teniente con sabiduría. Este oficial será crucial para la navegación.',
  lieutenantSelected: (captainName, lieutenantName) => 
    `${captainName} te ha nominado como Teniente. La tripulación observa tu decisión con atención. Elige sabiamente.`,
  lieutenantSelectNavigator: 'Como Teniente, debes elegir al Navegante que determinará el rumbo del barco. Esta es una decisión crucial.',
  navigatorSelected: (lieutenantName, navigatorName) => 
    `${lieutenantName} te ha nominado como Navegante. Todo el barco depende de tu elección. Elige la carta que jugarás.`,
  mutinyInitiated: (instigatorName, captainName) => 
    `¡MOTÍN! ${instigatorName} ha iniciado un motín contra el Capitán ${captainName}. La tripulación debe decidir: ¿Apoyas el motín o permaneces leal al Capitán?`,
  mutinySuccess: (instigatorName) => 
    `¡El motín fue exitoso! ${instigatorName} es el nuevo Capitán. El anterior Capitán ha sido encarcelado.`,
  mutinyFailed: 'El motín no tuvo suficiente apoyo. El Capitán mantiene su posición y la tripulación se calma.',
  accusationMade: (captainName, accusedName) => 
    `El Capitán ${captainName} acusa formalmente a ${accusedName} de traición. La tripulación debe votar: ¿Es ${accusedName} culpable de traición?`,
  accusationGuilty: (accusedName) => 
    `${accusedName} ha sido declarado culpable y encarcelado. La tripulación ahora está más cerca de la verdad.`,
  accusationInnocent: (accusedName) => 
    `${accusedName} ha sido declarado inocente. El Capitán debe reconsiderar sus sospechas.`,
  cardPlayed: (cardType, navigatorName) => {
    const cardInfo = NAVIGATION_CARD_INFO[cardType];
    if (cardType === 'blue') {
      return `El Navegante ${navigatorName} ha jugado una carta AZUL. Los vientos del norte soplan favorablemente. El barco avanza hacia Bluewater Bay.`;
    } else if (cardType === 'yellow') {
      return `El Navegante ${navigatorName} ha jugado una carta AMARILLA. Las corrientes del sur arrastran el barco hacia aguas peligrosas.`;
    } else {
      return `El Navegante ${navigatorName} ha jugado una carta KRAKEN. Las aguas se oscurecen y algo primordial se mueve en las profundidades...`;
    }
  },
  selectCardToPass: 'Has recibido estas dos cartas de navegación. Elige una para pasarla en secreto al siguiente oficial. Tu elección puede ser crucial.',
  selectCardToPlay: 'Como Navegante, debes elegir una carta para jugar. Esta decisión determinará el rumbo del barco y el destino de todos.',
  captainAccusePrompt: '¿A quién de la tripulación deseas acusar de traición? Elige cuidadosamente, ya que una acusación falsa puede minar tu autoridad.',
  cultLeaderAction: 'Las estrellas se alinean y las sombras se alargan. Elige a un tripulante para intentar convertirlo a la causa del Kraken en secreto.',
  conversionSuccess: (playerName) => 
    `${playerName} ha sido convertido a la causa del Kraken. El poder del Culto crece...`,
  conversionFailed: 'La conversión falló. El tripulante resistió tu influencia.',
  victorySailors: '¡VICTORIA DE LOS MARINEROS! El barco llegó a salvo a Bluewater Bay. La Corona recompensará a los leales.',
  victoryPirates: '¡VICTORIA DE LOS PIRATAS! El barco fue llevado a la Ensenada de los Corsarios. Los piratas han triunfado.',
  victoryCult: '¡EL KRAKEN HA SIDO INVO CADO! El Líder de Secta y sus seguidores han ganado. Las profundidades reclaman su tributo.',
  turnStart: (turnNumber) => `Iniciando Turno ${turnNumber}. El barco se encuentra en posición ${turnNumber === 1 ? '0' : 'X'}.`,
  phaseChange: (phaseName) => `La fase cambia a: ${phaseName}`,
  playerEliminated: (playerName) => `${playerName} ha sido eliminado del juego.`,
  playerJailed: (playerName) => `${playerName} ha sido enviado al calabozo.`,
  playerReleased: (playerName) => `${playerName} ha sido liberado del calabozo.`,
};

export const PLAYER_STATUS = {
  CAPTAIN: 'captain',
  LIEUTENANT: 'lieutenant',
  NAVIGATOR: 'navigator',
  CREW: 'crew',
  IN_JAIL: 'in_jail',
  ELIMINATED: 'eliminated',
};

// Estadísticas falsas para mostrar en la pantalla de índice
export const FAKE_STATISTICS = {
  totalGames: 1247,
  totalPlayers: 8943,
  averageGameDuration: '23 minutos',
  mostCommonWinner: 'Marineros (45%)',
  longestGame: '47 minutos',
  shortestGame: '8 minutos',
  favoriteRole: 'Pirata (38% de preferencia)',
  recentGames: [
    { id: 1, winner: 'Marineros', duration: '19 min', players: 7, date: 'Hace 2 horas' },
    { id: 2, winner: 'Piratas', duration: '31 min', players: 9, date: 'Hace 5 horas' },
    { id: 3, winner: 'Culto', duration: '27 min', players: 8, date: 'Hace 1 día' },
    { id: 4, winner: 'Marineros', duration: '22 min', players: 6, date: 'Hace 1 día' },
    { id: 5, winner: 'Piratas', duration: '35 min', players: 11, date: 'Hace 2 días' },
  ],
  playerStats: {
    totalWinsAsSailor: 342,
    totalWinsAsPirate: 198,
    totalWinsAsCultLeader: 87,
    averagePosition: 0.2,
  },
};

// Consejos y estrategias para mostrar en diferentes momentos
export const STRATEGY_TIPS = {
  sailor: [
    'Observa cuidadosamente las decisiones de navegación. Si el barco se mueve hacia el sur repetidamente, sospecha.',
    'Los motines pueden ser útiles para eliminar a un Capitán sospechoso.',
    'Confía en tus compañeros marineros, pero verifica sus acciones.',
    'No te apresures a acusar. Reúne información primero.',
  ],
  pirate: [
    'Mantén un perfil bajo. Actúa como un marinero leal en público.',
    'Si eres elegido como oficial, pasa cartas amarillas estratégicamente.',
    'Si no eres oficial, intenta iniciar motines contra Capitanes que sabes que son marineros.',
    'Coordina con otros piratas si los hay, pero hazlo discretamente.',
  ],
  cultLeader: [
    'Tu objetivo es convertir jugadores, no necesariamente navegar en una dirección.',
    'Las cartas rojas son cruciales para ti. Asegúrate de estar presente cuando se jueguen.',
    'Mantén un perfil extremadamente bajo. Nunca te expongas.',
    'Convierte a jugadores que parecen confiables y no sospechosos.',
  ],
  general: [
    'La comunicación es clave, pero cuidado con lo que revelas.',
    'Observa los patrones de votación. Pueden revelar alianzas.',
    'Un motín exitoso puede cambiar completamente el curso del juego.',
    'Las acusaciones falsas pueden minar la confianza en el Capitán.',
    'El orden de las cartas que pasas puede revelar información importante.',
  ],
};

// Eventos especiales del juego
export const SPECIAL_EVENTS = [
  {
    id: 'storm',
    name: 'Tormenta',
    description: 'Una tormenta azota el barco. Todos los oficiales pierden una acción.',
    effect: 'Todos los oficiales pierden un turno de acción',
    frequency: 'Raro',
  },
  {
    id: 'treasure',
    name: 'Tesoro Encontrado',
    description: 'Se encuentra un cofre en el mar. El Capitán decide qué hacer con él.',
    effect: 'El Capitán puede ganar una carta adicional o un poder especial',
    frequency: 'Muy Raro',
  },
  {
    id: 'mutiny_opportunity',
    name: 'Oportunidad de Motín',
    description: 'La tripulación está inquieta. Cualquier jugador puede iniciar un motín sin costo.',
    effect: 'Se puede iniciar un motín sin restricciones normales',
    frequency: 'Ocasional',
  },
  {
    id: 'kraken_awakening',
    name: 'Despertar del Kraken',
    description: 'Las aguas se agitan. El poder del Culto se fortalece.',
    effect: 'El Líder de Secta puede convertir a un jugador adicional',
    frequency: 'Raro (solo con cartas rojas)',
  },
];

