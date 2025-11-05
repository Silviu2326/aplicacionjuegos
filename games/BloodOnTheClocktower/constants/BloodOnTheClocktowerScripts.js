// Guiones (Scripts) para Blood on the Clocktower

import { SCRIPT_TROUBLE_BREWING } from './BloodOnTheClocktowerRoles';

export const SCRIPTS = {
  'trouble-brewing': SCRIPT_TROUBLE_BREWING,
};

export const DEFAULT_SCRIPT = 'trouble-brewing';

// Función para obtener un guión por ID
export const getScriptById = (scriptId) => {
  return SCRIPTS[scriptId] || SCRIPTS[DEFAULT_SCRIPT];
};

// Función para obtener todos los guiones disponibles
export const getAllScripts = () => {
  return Object.values(SCRIPTS);
};

