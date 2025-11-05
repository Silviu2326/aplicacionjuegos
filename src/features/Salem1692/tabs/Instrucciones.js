import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const Salem1692Instrucciones = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 ¿Qué es Salem 1692?</Text>
        <Text style={styles.text}>
          Salem 1692 es un juego de deducción social ambientado en el famoso juicio de las brujas de Salem. 
          Los jugadores asumen roles secretos de Bruja o Aldeano. Los Aldeanos deben descubrir y eliminar 
          a las Brujas antes de que estas los eliminen a ellos o los conviertan en brujas mediante la carta 
          de Conspiración.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objetivo del Juego</Text>
        <View style={styles.objectiveContainer}>
          <View style={styles.objectiveCard}>
            <Text style={styles.objectiveIcon}>👤</Text>
            <Text style={styles.objectiveTitle}>Aldeanos</Text>
            <Text style={styles.objectiveText}>
              Descubrir y eliminar a todas las Brujas antes de ser eliminados o convertidos.
            </Text>
          </View>
          <View style={styles.objectiveCard}>
            <Text style={styles.objectiveIcon}>🧙</Text>
            <Text style={styles.objectiveTitle}>Brujas</Text>
            <Text style={styles.objectiveText}>
              Eliminar a todos los Aldeanos o convertirlos en brujas mediante la Conspiración.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Configuración del Juego</Text>
        
        <View style={styles.configContainer}>
          <Text style={styles.configTitle}>Número de Jugadores y Brujas:</Text>
          <View style={styles.configItem}>
            <Text style={styles.configLabel}>4-5 jugadores:</Text>
            <Text style={styles.configText}>1 Bruja</Text>
          </View>
          <View style={styles.configItem}>
            <Text style={styles.configLabel}>6-7 jugadores:</Text>
            <Text style={styles.configText}>2 Brujas</Text>
          </View>
          <View style={styles.configItem}>
            <Text style={styles.configLabel}>8-9 jugadores:</Text>
            <Text style={styles.configText}>3 Brujas</Text>
          </View>
          <View style={styles.configItem}>
            <Text style={styles.configLabel}>10-12 jugadores:</Text>
            <Text style={styles.configText}>4 Brujas</Text>
          </View>
        </View>

        <View style={styles.configContainer}>
          <Text style={styles.configTitle}>Cartas Iniciales:</Text>
          <Text style={styles.configText}>• Cada jugador recibe 3 cartas de acción</Text>
          <Text style={styles.configText}>• Cada jugador recibe 3 cartas de juicio (1 puede ser Bruja, 2 No Bruja)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌙 Fase de Noche</Text>
        
        <View style={styles.phaseContainer}>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Revelación de Roles</Text>
              <Text style={styles.stepText}>
                Las Brujas se reconocen entre sí. Los Aldeanos no conocen sus roles.
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Conspiración</Text>
              <Text style={styles.stepText}>
                Las Brujas eligen en secreto un objetivo al que darán la carta de Conspiración. 
                Si ese jugador muere, se convierte en Bruja.
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Fin de Noche</Text>
              <Text style={styles.stepText}>
                La fase de noche termina y comienza el día.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>☀️ Fase de Día</Text>
        
        <View style={styles.phaseContainer}>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Robar Cartas</Text>
              <Text style={styles.stepText}>
                Cada jugador roba 2 cartas del mazo de acción al inicio de su turno.
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Jugar Cartas</Text>
              <Text style={styles.stepText}>
                Los jugadores pueden jugar cartas de su mano durante su turno. Las cartas más comunes son:
              </Text>
              <View style={styles.cardsList}>
                <Text style={styles.cardItem}>• <Text style={styles.cardBold}>Acusación:</Text> Coloca una acusación sobre otro jugador</Text>
                <Text style={styles.cardItem}>• <Text style={styles.cardBold}>Coartada:</Text> Elimina una acusación propia</Text>
                <Text style={styles.cardItem}>• <Text style={styles.cardBold}>Pistola:</Text> Obliga a otro jugador a descartar una carta</Text>
                <Text style={styles.cardItem}>• <Text style={styles.cardBold}>Investigar:</Text> Mira la mano de otro jugador</Text>
                <Text style={styles.cardItem}>• <Text style={styles.cardBold}>Robar Carta:</Text> Roba una carta adicional</Text>
              </View>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Acusaciones</Text>
              <Text style={styles.stepText}>
                Cuando un jugador tiene 7 acusaciones frente a él, se activa automáticamente un Juicio.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚖️ Juicios</Text>
        
        <View style={styles.trialContainer}>
          <Text style={styles.trialStepTitle}>1. Revelación de Cartas de Juicio</Text>
          <Text style={styles.trialStepText}>
            El acusado revela sus 3 cartas de juicio. Si todas son "No es Bruja", es probablemente inocente. 
            Si hay una carta de "Bruja", es sospechoso, pero aún debe votarse.
          </Text>

          <Text style={styles.trialStepTitle}>2. Votación</Text>
          <Text style={styles.trialStepText}>
            Todos los jugadores vivos votan si salvar o condenar al acusado. La mayoría decide.
          </Text>

          <Text style={styles.trialStepTitle}>3. Resolución</Text>
          <Text style={styles.trialStepText}>
            Si es condenado, el jugador es eliminado. Si tenía la carta de Conspiración, se convierte en Bruja 
            antes de morir. Si es absuelto, todas sus acusaciones se eliminan.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎴 Tipos de Cartas</Text>
        
        <View style={styles.cardTypeContainer}>
          <View style={styles.cardTypeCard}>
            <Text style={styles.cardTypeTitle}>Cartas de Acción</Text>
            <Text style={styles.cardTypeText}>
              Estas cartas se juegan durante el turno del jugador y tienen diversos efectos. 
              Incluyen Acusación, Coartada, Pistola, Investigar y Robar Carta.
            </Text>
          </View>

          <View style={styles.cardTypeCard}>
            <Text style={styles.cardTypeTitle}>Cartas de Juicio</Text>
            <Text style={styles.cardTypeText}>
              Cada jugador tiene 3 cartas de juicio. Durante un juicio, estas se revelan para 
              proporcionar pistas sobre el rol del acusado. Una puede ser "Bruja", las otras son "No es Bruja".
            </Text>
          </View>

          <View style={styles.cardTypeCard}>
            <Text style={styles.cardTypeTitle}>Carta de Conspiración</Text>
            <Text style={styles.cardTypeText}>
              Esta carta especial se otorga durante la fase de noche. Si el portador muere, se convierte 
              en Bruja antes de ser eliminado.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Condiciones de Victoria</Text>
        
        <View style={styles.victoryContainer}>
          <View style={styles.victoryCard}>
            <Text style={styles.victoryTitle}>👤 Aldeanos Ganan Si:</Text>
            <Text style={styles.victoryText}>Todas las Brujas han sido eliminadas</Text>
          </View>

          <View style={styles.victoryCard}>
            <Text style={styles.victoryTitle}>🧙 Brujas Ganan Si:</Text>
            <Text style={styles.victoryText}>Todos los Aldeanos han sido eliminados o convertidos en brujas</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Estrategias y Consejos</Text>
        
        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>🔍</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Para Aldeanos:</Text> Observa patrones de acusaciones. 
            Las brujas suelen acusar más agresivamente o trabajar juntas sutilmente.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>🎭</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Para Brujas:</Text> Actúa como aldeano. Acusa a otros 
            para distraer la atención y no te delates demasiado pronto.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>⚖️</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Durante Juicios:</Text> Analiza las cartas reveladas 
            cuidadosamente. Una carta de Bruja no significa automáticamente que sea bruja, pero es muy sospechoso.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>🤝</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Comunicación:</Text> Discute las acusaciones y juicios. 
            La información compartida es crucial para los aldeanos, pero también puede ser peligrosa.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>🎯</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Gestiona Cartas:</Text> No gastes todas tus cartas de 
            defensa (Coartada) demasiado pronto. Guárdalas para momentos críticos.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Reglas Especiales</Text>
        
        <View style={styles.rulesContainer}>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Conspiración</Text>
            <Text style={styles.ruleText}>
              Si un jugador muere mientras tiene la carta de Conspiración, inmediatamente antes 
              de ser eliminado se convierte en Bruja. Esto puede cambiar el resultado del juego.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Coartada</Text>
            <Text style={styles.ruleText}>
              La carta de Coartada puede jugarse fuera del turno del jugador, inmediatamente 
              después de recibir una acusación.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Juicios</Text>
            <Text style={styles.ruleText}>
              Los juicios solo pueden iniciarse cuando un jugador acumula exactamente 7 acusaciones. 
              No se pueden acumular más de 7 acusaciones sobre un jugador.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Mazo Vacío</Text>
            <Text style={styles.ruleText}>
              Si el mazo de acción se agota, se barajan los descartes para formar un nuevo mazo.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Estadísticas y Historial</Text>
        <Text style={styles.text}>
          El juego registra todas tus partidas, incluyendo ganadores, duración, eventos importantes 
          y composición de jugadores. Puedes filtrar y revisar tu historial para analizar tus estrategias 
          y mejorar tu juego.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎉 ¡Disfruta del Juego!</Text>
        <Text style={styles.text}>
          Salem 1692 es un juego de deducción, engaño y estrategia. Cada partida es única y requiere 
          análisis cuidadoso, comunicación efectiva y, a veces, un poco de suerte. ¡Diviértete 
          descubriendo a las brujas o intentando sobrevivir como una!
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Desarrollado para entretener y desafiar tus habilidades de deducción y comunicación social.
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
    color: '#fff',
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
    color: '#ccc',
    lineHeight: 24,
    marginBottom: 10,
  },
  objectiveContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  objectiveCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
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
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  configTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  configItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingLeft: 10,
  },
  configLabel: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '600',
  },
  configText: {
    fontSize: 14,
    color: '#fff',
  },
  phaseContainer: {
    marginTop: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6a1b9a',
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
  cardsList: {
    marginTop: 10,
    paddingLeft: 10,
  },
  cardItem: {
    fontSize: 13,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 5,
  },
  cardBold: {
    fontWeight: 'bold',
    color: '#fff',
  },
  trialContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  trialStepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 8,
  },
  trialStepText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 10,
  },
  cardTypeContainer: {
    marginTop: 10,
  },
  cardTypeCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardTypeText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  victoryContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  victoryCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
  },
  victoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  victoryText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: 'bold',
    color: '#fff',
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
    borderLeftColor: '#6a1b9a',
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

