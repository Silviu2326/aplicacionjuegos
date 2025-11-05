// Roles disponibles en el juego Deception: Murder in Hong Kong
export const DECEPTION_ROLES = {
  MURDERER: 'murderer',
  FORENSIC_SCIENTIST: 'forensic_scientist',
  INVESTIGATOR: 'investigator',
  ACCOMPLICE: 'accomplice',
  WITNESS: 'witness',
};

export const ROLE_DESCRIPTIONS = {
  [DECEPTION_ROLES.MURDERER]: {
    name: 'Asesino',
    description: 'Eres el culpable. Selecciona un Arma y una Pista Clave en secreto. Tu objetivo es evitar que los investigadores descubran la solución correcta.',
    winCondition: 'Los investigadores no logran adivinar la solución correcta o se acaba el tiempo.',
  },
  [DECEPTION_ROLES.FORENSIC_SCIENTIST]: {
    name: 'Científico Forense',
    description: 'Conoces la solución (el Arma y la Pista Clave seleccionados por el Asesino), pero no puedes hablar. Debes usar fichas de Escena para guiar a los investigadores.',
    winCondition: 'Los investigadores adivinan correctamente la solución.',
  },
  [DECEPTION_ROLES.INVESTIGATOR]: {
    name: 'Investigador',
    description: 'Debes interpretar las pistas del Científico Forense para deducir la combinación correcta de Arma y Pista Clave, y así desenmascarar al Asesino.',
    winCondition: 'Adivinar correctamente la combinación de Arma y Pista Clave antes de que se acabe el tiempo.',
  },
  [DECEPTION_ROLES.ACCOMPLICE]: {
    name: 'Cómplice',
    description: 'Conoces la identidad del Asesino y su solución. Debes ayudarle a sembrar confusión y desviar las sospechas.',
    winCondition: 'Los investigadores no logran adivinar la solución correcta o se acaba el tiempo.',
  },
  [DECEPTION_ROLES.WITNESS]: {
    name: 'Testigo',
    description: 'Sabes quiénes son el Asesino y el Cómplice, pero debes evitar ser descubierto. Si los investigadores ganan, el Asesino y el Cómplice tienen una última oportunidad para identificarte.',
    winCondition: 'Los investigadores ganan y el Asesino no te identifica, O los investigadores pierden.',
  },
};

export const getRoleData = (roleKey) => {
  return ROLE_DESCRIPTIONS[roleKey] || ROLE_DESCRIPTIONS[DECEPTION_ROLES.INVESTIGATOR];
};
