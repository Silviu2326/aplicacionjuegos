export const DICCIONARIO_DIABOLICO_PALABRAS = [
  { palabra: "Abuhado", definicion: "Hinchado o abotagado, especialmente el rostro." },
  { palabra: "Glabela", definicion: "Parte del cráneo, lisa y sin pelo, situada entre los arcos superciliares." },
  { palabra: "Petricor", definicion: "Nombre que recibe el olor que se produce al caer la lluvia en los suelos secos." },
  { palabra: "Jitanjáfora", definicion: "Texto carente de sentido cuyo valor estético se basa en la sonoridad y en el poder evocador de las palabras, reales o inventadas." },
  { palabra: "Uebos", definicion: "Del latín 'opus est', significa 'necesidad' o 'cosa necesaria'. (Ej: 'Uebos me es hacer esto')." },
  { palabra: "Serendipia", definicion: "Hallazgo valioso e inesperado que se produce de manera accidental o casual." },
  { palabra: "Abulia", definicion: "Falta de voluntad o de energía para moverse o tomar decisiones." },
  { palabra: "Almibarado", definicion: "Excesivamente dulce, suave o delicado en el trato o en el habla." },
  { palabra: "Limerencia", definicion: "Estado mental involuntario, propio de la atracción romántica, que se caracteriza por pensamientos y fantasías obsesivas." },
  { palabra: "Zaranjajo", definicion: "Persona despreciable, irresoluta y de poco valor." },
];

// Función para obtener una palabra aleatoria
export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * DICCIONARIO_DIABOLICO_PALABRAS.length);
  return DICCIONARIO_DIABOLICO_PALABRAS[randomIndex];
};
