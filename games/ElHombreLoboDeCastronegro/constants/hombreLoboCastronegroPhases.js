// Definiciones de fases del juego para El Hombre Lobo de Castronegro

export const GAME_PHASES = {
  LOBBY: 'lobby',
  SETUP: 'setup',
  FIRST_NIGHT: 'first_night',
  NIGHT: 'night',
  DAY: 'day',
  DEBATE: 'debate',
  VOTING: 'voting',
  REVELATION: 'revelation',
  FINISHED: 'finished',
};

export const NIGHT_SEQUENCE = [
  // Primera noche (orden especial)
  { 
    phase: 'first_night', 
    roles: ['cupido', 'ladron', 'nino_salvaje', 'protector', 'vidente', 'hombre_lobo', 'bruja'] 
  },
  // Noches siguientes
  { 
    phase: 'night', 
    roles: ['protector', 'vidente', 'bruja', 'hombre_lobo'] 
  },
];

export const NARRATOR_MESSAGES = {
  NIGHT_START: '🌙 La luna llena se alza sobre Castronegro. La oscuridad envuelve la aldea y todos cierran los ojos. La noche ha comenzado...',
  DAY_START: '☀️ El sol se alza sobre Castronegro. Un nuevo día amanece, pero el miedo y la sospecha se ciernen sobre la aldea.',
  DEBATE_START: '💬 El tiempo de debate ha comenzado. Tenéis {time} minutos para discutir, acusar y defenderos. ¿Quién es el culpable? ¡Argumentad vuestras sospechas con cuidado!',
  VOTING_START: '⚖️ El tiempo de debate ha terminado. Es hora de tomar una decisión crucial. Seleccionad al jugador que creéis que debe ser linchado.',
  VICTIM_REVEALED: '💀 Anoche, los lobos atacaron en la oscuridad. Al amanecer, {victim} ha sido encontrado muerto en las afueras de la aldea.',
  LYNCH_REVEAL: '⚔️ {player} ha sido linchado por votación popular. La multitud se arrepiente demasiado tarde...',
  NO_VICTIM: '✨ Milagrosamente, nadie fue atacado esta noche. Los aldeanos se sienten aliviados pero la amenaza sigue presente.',
  FIRST_NIGHT: '🌑 Esta es la primera noche en Castronegro. Algunos roles especiales se activarán ahora...',
  PROTECTION_SUCCESS: '🛡️ {player} fue protegido esta noche y sobrevivió al ataque de los lobos.',
  WITCH_SAVED: '🧪 La Bruja ha usado su poción de vida. {victim} ha sido salvado milagrosamente.',
  HUNTER_SHOT: '🔫 El Cazador ha disparado su última bala. {target} ha sido eliminado.',
  LOVERS_DEATH: '💔 El amor verdadero trasciende la muerte. {lover1} y {lover2} han muerto juntos.',
};

export const ROLE_ACTION_MESSAGES = {
  VIDENTE: '🔮 Vidente, despierta. Abre los ojos y mira más allá de las apariencias. Elige a un jugador para descubrir su verdadera identidad.',
  HOMBRE_LOBO: '🐺 Hombres Lobo, abrís los ojos en la oscuridad. Reconoceos entre vosotros y elegid en silencio a vuestra próxima víctima. La manada debe decidir.',
  BRUJA_SAVE: '🧪 Bruja, es tu turno. Anoche los lobos atacaron a {victim}. ¿Quieres usar tu poción de vida para salvarle?',
  BRUJA_KILL: '🧪 Bruja, ¿quieres usar tu poción de muerte en algún jugador? Elige sabiamente, solo tienes una oportunidad.',
  CUPIDO: '💘 Cupido, despierta. El poder del amor está en tus manos. Elige a dos jugadores que se convertirán en amantes eternos.',
  LADRON: '🎭 Ladrón, despierta. Tu oportunidad de cambiar tu destino ha llegado. Puedes intercambiar tu rol con otro jugador.',
  PROTECTOR: '🛡️ Protector, despierta. Tu deber es proteger a los inocentes. Elige a un jugador para proteger esta noche.',
  NIÑO_SALVAJE: '🧒 Niño Salvaje, despierta. Es hora de elegir a tu modelo a seguir. Su destino será tu destino.',
  CAZADOR: '🔫 Cazador, has muerto. Tu última oportunidad es disparar. ¿A quién eliminarás en tu último acto?',
};

