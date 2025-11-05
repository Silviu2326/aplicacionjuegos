import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const TheResistanceAvalonInstrucciones = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 ¿Qué es The Resistance: Avalon?</Text>
        <Text style={styles.text}>
          The Resistance: Avalon es un intenso juego de roles ocultos y deducción social para 5 a 10 jugadores, 
          ambientado en el legendario mundo del Rey Arturo y los Caballeros de la Mesa Redonda. Los jugadores 
          se dividen secretamente en dos equipos: los leales Caballeros de la Mesa Redonda, que luchan por 
          el bien, y los malvados Esbirros de Mordred, que buscan sembrar el caos y sabotear las misiones.
        </Text>
        <Text style={styles.text}>
          El juego combina deducción, engaño estratégico, análisis de patrones de votación y trabajo en equipo. 
          Cada decisión puede cambiar el destino del reino, y la confianza es un recurso valioso y escaso.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objetivos del Juego</Text>
        <View style={styles.objectiveContainer}>
          <View style={styles.objectiveCard}>
            <Text style={styles.objectiveIcon}>🛡️</Text>
            <Text style={styles.objectiveTitle}>Equipo Leal</Text>
            <Text style={styles.objectiveText}>
              Los Leales ganan si completan con éxito 3 de las 5 misiones propuestas. Si ganan, 
              deben sobrevivir al intento de asesinato del Asesino.
            </Text>
          </View>
          <View style={styles.objectiveCard}>
            <Text style={styles.objectiveIcon}>⚔️</Text>
            <Text style={styles.objectiveTitle}>Equipo Esbirro</Text>
            <Text style={styles.objectiveText}>
              Los Esbirros ganan si sabotean 3 misiones. Alternativamente, pueden ganar si los Leales 
              completan 3 misiones pero el Asesino identifica correctamente a Merlín.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Configuración del Juego</Text>
        
        <View style={styles.configContainer}>
          <Text style={styles.configTitle}>Distribución de Roles por Número de Jugadores:</Text>
          
          <View style={styles.configTable}>
            <View style={styles.configRow}>
              <Text style={styles.configCellHeader}>Jugadores</Text>
              <Text style={styles.configCellHeader}>Leales</Text>
              <Text style={styles.configCellHeader}>Esbirros</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>5</Text>
              <Text style={styles.configCell}>3</Text>
              <Text style={styles.configCell}>2</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>6</Text>
              <Text style={styles.configCell}>4</Text>
              <Text style={styles.configCell}>2</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>7</Text>
              <Text style={styles.configCell}>4</Text>
              <Text style={styles.configCell}>3</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>8</Text>
              <Text style={styles.configCell}>5</Text>
              <Text style={styles.configCell}>3</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>9</Text>
              <Text style={styles.configCell}>6</Text>
              <Text style={styles.configCell}>3</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>10</Text>
              <Text style={styles.configCell}>6</Text>
              <Text style={styles.configCell}>4</Text>
            </View>
          </View>
        </View>

        <View style={styles.configContainer}>
          <Text style={styles.configTitle}>Tamaño de Equipos por Misión:</Text>
          <View style={styles.missionTable}>
            <View style={styles.missionRow}>
              <Text style={styles.missionCellHeader}>Misión</Text>
              <Text style={styles.missionCellHeader}>5 jugadores</Text>
              <Text style={styles.missionCellHeader}>6 jugadores</Text>
              <Text style={styles.missionCellHeader}>7 jugadores</Text>
              <Text style={styles.missionCellHeader}>8-10 jugadores</Text>
            </View>
            <View style={styles.missionRow}>
              <Text style={styles.missionCell}>1</Text>
              <Text style={styles.missionCell}>2</Text>
              <Text style={styles.missionCell}>2</Text>
              <Text style={styles.missionCell}>2</Text>
              <Text style={styles.missionCell}>3</Text>
            </View>
            <View style={styles.missionRow}>
              <Text style={styles.missionCell}>2</Text>
              <Text style={styles.missionCell}>3</Text>
              <Text style={styles.missionCell}>3</Text>
              <Text style={styles.missionCell}>3</Text>
              <Text style={styles.missionCell}>4</Text>
            </View>
            <View style={styles.missionRow}>
              <Text style={styles.missionCell}>3</Text>
              <Text style={styles.missionCell}>2</Text>
              <Text style={styles.missionCell}>4</Text>
              <Text style={styles.missionCell}>3</Text>
              <Text style={styles.missionCell}>4</Text>
            </View>
            <View style={styles.missionRow}>
              <Text style={styles.missionCell}>4</Text>
              <Text style={styles.missionCell}>3</Text>
              <Text style={styles.missionCell}>3</Text>
              <Text style={styles.missionCell}>4</Text>
              <Text style={styles.missionCell}>5</Text>
            </View>
            <View style={styles.missionRow}>
              <Text style={styles.missionCell}>5</Text>
              <Text style={styles.missionCell}>3</Text>
              <Text style={styles.missionCell}>4</Text>
              <Text style={styles.missionCell}>4</Text>
              <Text style={styles.missionCell}>5</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>⚠️ Regla Especial: Misión 4</Text>
          <Text style={styles.infoBoxText}>
            En partidas de 7 o más jugadores, la Misión 4 requiere 2 votos de Fracaso para ser saboteada 
            (en lugar de solo 1). Esto equilibra el juego para partidas grandes.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👑 Roles Especiales</Text>
        
        <View style={styles.roleContainer}>
          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>🧙</Text>
            <Text style={styles.roleTitle}>Merlín (Leal)</Text>
            <Text style={styles.roleText}>
              Conoce la identidad de todos los Esbirros (excepto Mordred). Debe ayudar a los Leales 
              sin revelarse, ya que si el Asesino lo identifica al final, los Esbirros ganan.
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>👁️</Text>
            <Text style={styles.roleTitle}>Perceval (Leal)</Text>
            <Text style={styles.roleText}>
              Ve a Merlín y Morgana como figuras de poder, pero no sabe cuál es cuál. Debe usar 
              esta información para ayudar a los Leales e identificar al verdadero Merlín.
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>🛡️</Text>
            <Text style={styles.roleTitle}>Servidor Leal (Leal)</Text>
            <Text style={styles.roleText}>
              Caballeros leales sin información especial. Su objetivo es completar las misiones 
              y deducir quiénes son los Esbirros.
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>🗡️</Text>
            <Text style={styles.roleTitle}>Asesino (Esbirro)</Text>
            <Text style={styles.roleText}>
              Conoce a todos los Esbirros. Su objetivo es sabotear las misiones y, si los Leales 
              ganan, debe identificar y asesinar a Merlín para arrebatar la victoria.
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>🔮</Text>
            <Text style={styles.roleTitle}>Morgana (Esbirro)</Text>
            <Text style={styles.roleText}>
              Aparece como Merlín ante Perceval, confundiéndolo. Conoce a todos los Esbirros. 
              Debe usar esta ventaja para engañar a los Leales.
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>👹</Text>
            <Text style={styles.roleTitle}>Mordred (Esbirro)</Text>
            <Text style={styles.roleText}>
              Esbirro invisible ante Merlín. Conoce a todos los Esbirros excepto que Merlín no 
              lo puede identificar. Un rol muy poderoso para los Esbirros.
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>⚔️</Text>
            <Text style={styles.roleTitle}>Esbirro (Esbirro)</Text>
            <Text style={styles.roleText}>
              Esbirros básicos sin habilidades especiales. Conocen a todos los demás Esbirros 
              y trabajan juntos para sabotear las misiones.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔄 Flujo de una Ronda</Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Revelación de Roles</Text>
              <Text style={styles.stepText}>
                Al inicio del juego, cada jugador ve su rol secreto. Dependiendo del rol, algunos 
                recibirán información adicional (Merlín ve a los Esbirros, los Esbirros se reconocen 
                entre sí, Perceval ve a Merlín y Morgana, etc.).
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Propuesta de Equipo</Text>
              <Text style={styles.stepText}>
                El Líder actual (determinado por turno) debe seleccionar exactamente el número de 
                jugadores requerido para la misión actual. El Líder puede incluirse a sí mismo 
                en el equipo.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Votación del Equipo</Text>
              <Text style={styles.stepText}>
                Todos los jugadores (incluido el Líder) votan simultáneamente y en secreto para 
                "Aprobar" o "Rechazar" el equipo propuesto. Los votos se revelan a todos. Si más 
                de la mitad vota "Aprobar", el equipo es aceptado y se procede a la Misión. Si no, 
                el Líder pasa al siguiente jugador y el contador de votos rechazados aumenta.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Votación de Misión</Text>
              <Text style={styles.stepText}>
                Si el equipo es aprobado, solo los miembros del equipo votan en secreto "Éxito" 
                o "Fracaso". Los Leales solo pueden votar "Éxito". Los Esbirros pueden elegir 
                votar "Éxito" (para pasar desapercibidos) o "Fracaso" (para sabotear). Los votos 
                se barajan y se revelan anónimamente.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>5</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Resultado de la Misión</Text>
              <Text style={styles.stepText}>
                Si hay al menos un voto de "Fracaso" (o dos en la Misión 4 con 7+ jugadores), 
                la misión es saboteada y los Esbirros ganan un punto. Si todos los votos son 
                "Éxito", los Leales ganan un punto. Se actualiza el marcador y se pasa a la 
                siguiente misión.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>6</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Nuevo Líder</Text>
              <Text style={styles.stepText}>
                El marcador de Líder pasa al siguiente jugador en el sentido de las agujas del reloj, 
                el contador de votos rechazados se reinicia, y comienza una nueva ronda desde el paso 2.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🗡️ Fase de Asesinato</Text>
        
        <View style={styles.assassinationContainer}>
          <Text style={styles.assassinationTitle}>Condición:</Text>
          <Text style={styles.assassinationText}>
            Si los Leales completan 3 misiones exitosas, el juego no termina inmediatamente. 
            En su lugar, entra en la Fase de Asesinato.
          </Text>

          <Text style={styles.assassinationTitle}>Proceso:</Text>
          <Text style={styles.assassinationText}>
            El jugador con el rol de Asesino debe identificar públicamente a quién cree que es Merlín. 
            Si el Asesino acierta, los Esbirros arrebatan la victoria. Si se equivoca, los Leales 
            ganan definitivamente.
          </Text>

          <Text style={styles.assassinationTitle}>Estrategia:</Text>
          <Text style={styles.assassinationText}>
            Esta fase añade una capa de tensión extra. Merlín debe haber ayudado lo suficiente como 
            para que los Leales ganen, pero no tanto como para ser descubierto. Los Esbirros deben 
            haber observado cuidadosamente los patrones de votación y propuestas de equipo para 
            identificar a Merlín.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Reglas Especiales</Text>
        
        <View style={styles.rulesContainer}>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Votos Rechazados</Text>
            <Text style={styles.ruleText}>
              Si 5 propuestas de equipo son rechazadas consecutivamente en la misma misión, los 
              Esbirros ganan automáticamente. Esto previene que los Leales bloqueen indefinidamente 
              a los Esbirros.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Misión 4 Especial</Text>
            <Text style={styles.ruleText}>
              En partidas de 7 o más jugadores, la Misión 4 requiere 2 votos de Fracaso para ser 
              saboteada (en lugar de 1). Esto equilibra el juego ya que los Esbirros tienen más 
              números en partidas grandes.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Votos de Misión</Text>
            <Text style={styles.ruleText}>
              Los Leales solo pueden votar "Éxito" en las misiones. Intentar votar "Fracaso" 
              como Leal no está permitido. Los Esbirros pueden elegir votar "Éxito" o "Fracaso" 
              estratégicamente.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Rotación de Líder</Text>
            <Text style={styles.ruleText}>
              El Líder rota en el sentido de las agujas del reloj después de cada propuesta de 
              equipo (ya sea aprobada o rechazada). Esto asegura que todos los jugadores tengan 
              la oportunidad de liderar.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Condiciones de Victoria</Text>
        
        <View style={styles.victoryContainer}>
          <View style={styles.victoryCard}>
            <Text style={styles.victoryTitle}>🛡️ Victoria Leal</Text>
            <Text style={styles.victoryText}>
              • Los Leales completan 3 misiones exitosas (automática)
            </Text>
            <Text style={styles.victoryText}>
              • Y el Asesino falla al identificar a Merlín en la Fase de Asesinato
            </Text>
          </View>

          <View style={styles.victoryCard}>
            <Text style={styles.victoryTitle}>⚔️ Victoria Esbirro</Text>
            <Text style={styles.victoryText}>
              • Los Esbirros sabotean 3 misiones (automática)
            </Text>
            <Text style={styles.victoryText}>
              • O los Leales completan 3 misiones pero el Asesino identifica correctamente a Merlín
            </Text>
            <Text style={styles.victoryText}>
              • O 5 propuestas de equipo son rechazadas consecutivamente en una misma misión
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Estrategias y Consejos</Text>
        
        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>🛡️ Para los Leales:</Text>
          <Text style={styles.tipText}>• Observa los patrones de votación. Los Esbirros pueden votar en bloque para aprobar equipos con esbirros.</Text>
          <Text style={styles.tipText}>• Analiza quién propone a quién. Los Esbirros pueden intentar incluirse entre sí.</Text>
          <Text style={styles.tipText}>• Si una misión falla, analiza quién estaba en el equipo. Al menos uno es esbirro.</Text>
          <Text style={styles.tipText}>• Merlín debe ayudar discretamente. No ser demasiado útil o demasiado pasivo.</Text>
          <Text style={styles.tipText}>• Perceval debe usar su visión para identificar al verdadero Merlín y protegerlo.</Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>⚔️ Para los Esbirros:</Text>
          <Text style={styles.tipText}>• Trabaja en equipo. Coordina con otros esbirros mediante votaciones y propuestas.</Text>
          <Text style={styles.tipText}>• No siempre sabotees. A veces es mejor votar éxito para pasar desapercibido.</Text>
          <Text style={styles.tipText}>• Observa quién lidera y propone equipos exitosos. Podría ser Merlín.</Text>
          <Text style={styles.tipText}>• Morgana puede usar su ventaja de aparecer como Merlín para confundir a Perceval.</Text>
          <Text style={styles.tipText}>• Mordred puede ser más agresivo ya que Merlín no lo conoce.</Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>🧙 Para Merlín:</Text>
          <Text style={styles.tipText}>• Ayuda a los Leales sin ser obvio. No propongas siempre equipos perfectos.</Text>
          <Text style={styles.tipText}>• Vota rechazar equipos con muchos esbirros, pero no todos los equipos.</Text>
          <Text style={styles.tipText}>• Observa cómo votan los otros. Los esbirros pueden votar de forma coordinada.</Text>
          <Text style={styles.tipText}>• Si sospechan de ti, intenta parecer más inocente. No te defiendas demasiado.</Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>🗡️ Para el Asesino:</Text>
          <Text style={styles.tipText}>• Observa cuidadosamente quién lidera y propone equipos exitosos.</Text>
          <Text style={styles.tipText}>• Analiza los patrones de votación. Merlín puede votar rechazar equipos sospechosos.</Text>
          <Text style={styles.tipText}>• Consulta con tus compañeros esbirros antes de decidir.</Text>
          <Text style={styles.tipText}>• A veces Merlín se esconde entre los jugadores más pasivos.</Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>👁️ Para Perceval:</Text>
          <Text style={styles.tipText}>• Usa tu visión para identificar al verdadero Merlín entre las dos figuras de poder.</Text>
          <Text style={styles.tipText}>• Observa cómo actúan ambos. Merlín suele ayudar más discretamente.</Text>
          <Text style={styles.tipText}>• Protege al verdadero Merlín votando aprobar sus equipos.</Text>
          <Text style={styles.tipText}>• No reveles tu visión demasiado pronto.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Análisis y Deducción</Text>
        <Text style={styles.text}>
          The Resistance: Avalon es un juego de deducción social profundo. Cada acción revela información:
        </Text>
        <View style={styles.analysisList}>
          <Text style={styles.analysisItem}>• <Text style={styles.analysisBold}>Propuestas de Equipo:</Text> ¿Quién incluye a quién? Los esbirros pueden incluirse entre sí.</Text>
          <Text style={styles.analysisItem}>• <Text style={styles.analysisBold}>Votaciones de Equipo:</Text> ¿Quién vota aprobar o rechazar? Los esbirros pueden votar en bloque.</Text>
          <Text style={styles.analysisItem}>• <Text style={styles.analysisBold}>Resultados de Misiones:</Text> Si falla una misión, al menos un miembro del equipo es esbirro.</Text>
          <Text style={styles.analysisItem}>• <Text style={styles.analysisBold}>Patrones de Comportamiento:</Text> ¿Quién es demasiado útil? ¿Quién es demasiado pasivo?</Text>
          <Text style={styles.analysisItem}>• <Text style={styles.analysisBold}>Comunicación:</Text> Las discusiones pueden revelar información, pero también pueden ser engañosas.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎉 ¡Disfruta del Juego!</Text>
        <Text style={styles.text}>
          The Resistance: Avalon es un juego de deducción, engaño y estrategia. Cada partida es única 
          y requiere análisis cuidadoso, observación de patrones, comunicación efectiva y, a veces, 
          un poco de suerte. La tensión aumenta con cada misión, y la Fase de Asesinato añade un 
          giro emocionante al final.
        </Text>
        <Text style={styles.text}>
          ¡Diviértete descubriendo a los Esbirros o intentando sabotear las misiones como uno de ellos!
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Desarrollado para entretener y desafiar tus habilidades de deducción, engaño y comunicación social.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
    color: '#ccc',
    lineHeight: 24,
    marginBottom: 10,
  },
  objectiveContainer: {
    marginTop: 12,
  },
  objectiveCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  objectiveIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  objectiveText: {
    fontSize: 13,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 18,
  },
  configContainer: {
    marginTop: 12,
  },
  configTitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 12,
    fontWeight: '600',
  },
  configTable: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  configRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  configCellHeader: {
    flex: 1,
    padding: 10,
    backgroundColor: '#333',
    color: '#ffd700',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
  },
  configCell: {
    flex: 1,
    padding: 10,
    color: '#ccc',
    textAlign: 'center',
    fontSize: 13,
  },
  missionTable: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    overflow: 'hidden',
  },
  missionRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  missionCellHeader: {
    flex: 1,
    padding: 8,
    backgroundColor: '#333',
    color: '#ffd700',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 11,
  },
  missionCell: {
    flex: 1,
    padding: 8,
    color: '#ccc',
    textAlign: 'center',
    fontSize: 11,
  },
  infoBox: {
    backgroundColor: '#1e3a5f',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  infoBoxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  infoBoxText: {
    fontSize: 12,
    color: '#ccc',
    lineHeight: 18,
  },
  roleContainer: {
    marginTop: 12,
  },
  roleCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8B4513',
  },
  roleIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  roleText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  stepContainer: {
    marginTop: 12,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  stepText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  assassinationContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  assassinationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 8,
  },
  assassinationText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 10,
  },
  rulesContainer: {
    marginTop: 10,
  },
  ruleItem: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#8B4513',
  },
  ruleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  ruleText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  victoryContainer: {
    marginTop: 12,
  },
  victoryCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  victoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  victoryText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 4,
  },
  tipsContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 4,
  },
  analysisList: {
    marginTop: 10,
    paddingLeft: 10,
  },
  analysisItem: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 22,
    marginBottom: 8,
  },
  analysisBold: {
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#7f7f7f',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

