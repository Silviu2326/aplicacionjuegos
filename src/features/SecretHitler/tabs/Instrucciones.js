import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const SecretHitlerInstrucciones = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 ¿Qué es Secret Hitler?</Text>
        <Text style={styles.text}>
          Secret Hitler es un intenso juego de deducción social y engaño para 5 a 10 jugadores, 
          ambientado en la Alemania de los años 30. Los jugadores se dividen secretamente en dos 
          equipos: los Liberales, que forman la mayoría, y los Fascistas, que son una minoría oculta. 
          Un jugador fascista también es designado como el Hitler Secreto.
        </Text>
        <Text style={styles.text}>
          El juego combina deducción, negociación política, mentiras estratégicas y trabajo en equipo. 
          Cada decisión puede cambiar el destino del juego, y la confianza es un recurso valioso y escaso.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objetivos del Juego</Text>
        <View style={styles.objectiveContainer}>
          <View style={styles.objectiveCard}>
            <Text style={styles.objectiveIcon}>🛡️</Text>
            <Text style={styles.objectiveTitle}>Equipo Liberal</Text>
            <Text style={styles.objectiveText}>
              Los Liberales ganan si se promulgan 5 políticas liberales o si Hitler es ejecutado.
            </Text>
          </View>
          <View style={styles.objectiveCard}>
            <Text style={styles.objectiveIcon}>⚔️</Text>
            <Text style={styles.objectiveTitle}>Equipo Fascista</Text>
            <Text style={styles.objectiveText}>
              Los Fascistas ganan si se promulgan 6 políticas fascistas o si Hitler es elegido 
              Canciller después de que se hayan promulgado 3 políticas fascistas.
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
              <Text style={styles.configCellHeader}>Liberales</Text>
              <Text style={styles.configCellHeader}>Fascistas</Text>
              <Text style={styles.configCellHeader}>Hitler</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>5</Text>
              <Text style={styles.configCell}>3</Text>
              <Text style={styles.configCell}>1</Text>
              <Text style={styles.configCell}>1</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>6</Text>
              <Text style={styles.configCell}>4</Text>
              <Text style={styles.configCell}>1</Text>
              <Text style={styles.configCell}>1</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>7</Text>
              <Text style={styles.configCell}>4</Text>
              <Text style={styles.configCell}>2</Text>
              <Text style={styles.configCell}>1</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>8</Text>
              <Text style={styles.configCell}>5</Text>
              <Text style={styles.configCell}>2</Text>
              <Text style={styles.configCell}>1</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>9</Text>
              <Text style={styles.configCell}>5</Text>
              <Text style={styles.configCell}>3</Text>
              <Text style={styles.configCell}>1</Text>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configCell}>10</Text>
              <Text style={styles.configCell}>6</Text>
              <Text style={styles.configCell}>3</Text>
              <Text style={styles.configCell}>1</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>⚠️ Información Importante sobre Roles</Text>
          <Text style={styles.infoBoxText}>
            • Los Fascistas (incluido Hitler) se conocen entre sí al inicio del juego.
          </Text>
          <Text style={styles.infoBoxText}>
            • Los Liberales no conocen los roles de nadie.
          </Text>
          <Text style={styles.infoBoxText}>
            • Hitler no conoce quiénes son los otros Fascistas (excepto en partidas de 5-6 jugadores).
          </Text>
          <Text style={styles.infoBoxText}>
            • Hitler debe ocultar su identidad y ser elegido Canciller para que ganen los Fascistas.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔄 Flujo de una Ronda</Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Elección de Gobierno</Text>
              <Text style={styles.stepText}>
                El Presidente actual propone a otro jugador para que sea Canciller. El Canciller 
                no puede ser el mismo que en la ronda anterior.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Votación</Text>
              <Text style={styles.stepText}>
                Todos los jugadores votan simultáneamente y en secreto "Ja!" (Sí) o "Nein!" (No). 
                Si más del 50% vota "Ja!", el gobierno es elegido.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Sesión Legislativa</Text>
              <Text style={styles.stepText}>
                Si el gobierno es elegido: El Presidente recibe 3 cartas de política (secretas), 
                descarta 1 y pasa 2 al Canciller. El Canciller descarta 1 y promulga la restante.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <Text style={styles.stepNumber}>4</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Elecciones Fallidas</Text>
              <Text style={styles.stepText}>
                Si el gobierno es rechazado, se pasa el turno al siguiente Presidente. Si 3 elecciones 
                fallan consecutivamente, la carta superior del mazo se promulga automáticamente.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <Text style={styles.stepNumber}>5</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Poderes Ejecutivos</Text>
              <Text style={styles.stepText}>
                Cuando se promulgan ciertas políticas fascistas, el Presidente obtiene poderes especiales 
                como investigar, ejecutar, o ver las próximas políticas.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Poderes Ejecutivos</Text>
        
        <View style={styles.powerContainer}>
          <View style={styles.powerCard}>
            <Text style={styles.powerIcon}>🔍</Text>
            <Text style={styles.powerTitle}>Investigación (1ª Política Fascista)</Text>
            <Text style={styles.powerText}>
              El Presidente puede ver la lealtad de un jugador (Liberal o Fascista, pero no si es Hitler).
            </Text>
          </View>

          <View style={styles.powerCard}>
            <Text style={styles.powerIcon}>📋</Text>
            <Text style={styles.powerTitle}>Elección Especial (2ª Política Fascista)</Text>
            <Text style={styles.powerText}>
              El Presidente puede elegir al siguiente Presidente, rompiendo el orden normal de turnos.
            </Text>
          </View>

          <View style={styles.powerCard}>
            <Text style={styles.powerIcon}>👁️</Text>
            <Text style={styles.powerTitle}>Vista Previa (3ª Política Fascista)</Text>
            <Text style={styles.powerText}>
              El Presidente puede ver las 3 cartas superiores del mazo de políticas.
            </Text>
          </View>

          <View style={styles.powerCard}>
            <Text style={styles.powerIcon}>💀</Text>
            <Text style={styles.powerTitle}>Ejecución (4ª y 5ª Política Fascista)</Text>
            <Text style={styles.powerText}>
              El Presidente puede ejecutar a un jugador. Si ese jugador es Hitler, los Liberales ganan.
            </Text>
          </View>

          <View style={styles.powerCard}>
            <Text style={styles.powerIcon}>🛑</Text>
            <Text style={styles.powerTitle}>Veto (Después de 5 Políticas Fascistas)</Text>
            <Text style={styles.powerText}>
              Si el Presidente y Canciller están de acuerdo, pueden rechazar ambas cartas políticas. 
              Sin embargo, esto también cuenta como una elección fallida.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Estrategias y Consejos</Text>
        
        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>Para los Liberales:</Text>
          <Text style={styles.tipText}>• Observa los patrones de votación y quién propone a quién.</Text>
          <Text style={styles.tipText}>• Comparte información honestamente cuando investigues jugadores.</Text>
          <Text style={styles.tipText}>• Si ves políticas fascistas promulgadas, el Canciller o Presidente podría ser fascista.</Text>
          <Text style={styles.tipText}>• Usa las ejecuciones estratégicamente para eliminar a Hitler.</Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>Para los Fascistas:</Text>
          <Text style={styles.tipText}>• Colabora con otros fascistas de forma sutil mediante votaciones.</Text>
          <Text style={styles.tipText}>• Intenta parecer liberal votando "Nein!" a gobiernos sospechosos.</Text>
          <Text style={styles.tipText}>• Protege a Hitler para que pueda ser elegido Canciller.</Text>
          <Text style={styles.tipText}>• Usa las investigaciones para sembrar desconfianza entre liberales.</Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>Para Hitler:</Text>
          <Text style={styles.tipText}>• Actúa como si fueras liberal, especialmente al inicio.</Text>
          <Text style={styles.tipText}>• No votes siempre "Ja!" a gobiernos fascistas, sé impredecible.</Text>
          <Text style={styles.tipText}>• Evita ser demasiado vocal o destacarte mucho.</Text>
          <Text style={styles.tipText}>• Asegúrate de que otros te confíen para ser elegido Canciller.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎲 El Mazo de Políticas</Text>
        <Text style={styles.text}>
          El mazo contiene 6 cartas liberales y 11 cartas fascistas. Si se agota el mazo, 
          se barajan las cartas descartadas para formar un nuevo mazo.
        </Text>
        <Text style={styles.text}>
          Las probabilidades están ligeramente a favor de los fascistas, pero los poderes 
          ejecutivos y la capacidad de deducción de los liberales equilibran el juego.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏁 Condiciones de Victoria</Text>
        
        <View style={styles.victoryContainer}>
          <View style={styles.victoryCard}>
            <Text style={styles.victoryTitle}>🛡️ Victoria Liberal</Text>
            <Text style={styles.victoryText}>
              • Se promulgan 5 políticas liberales (automática)
            </Text>
            <Text style={styles.victoryText}>
              • Hitler es ejecutado (automática)
            </Text>
          </View>

          <View style={styles.victoryCard}>
            <Text style={styles.victoryTitle}>⚔️ Victoria Fascista</Text>
            <Text style={styles.victoryText}>
              • Se promulgan 6 políticas fascistas (automática)
            </Text>
            <Text style={styles.victoryText}>
              • Hitler es elegido Canciller después de 3 políticas fascistas (automática)
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Preguntas Frecuentes</Text>
        
        <View style={styles.faqContainer}>
          <Text style={styles.faqQuestion}>¿Puedo revelar mi rol?</Text>
          <Text style={styles.faqAnswer}>
            Técnicamente sí, pero no es recomendable. Los fascistas pueden mentir sobre sus roles, 
            y revelar información puede ayudar al equipo contrario.
          </Text>

          <Text style={styles.faqQuestion}>¿Qué pasa si el mazo se agota?</Text>
          <Text style={styles.faqAnswer}>
            Las cartas descartadas se barajan y forman un nuevo mazo. El juego continúa.
          </Text>

          <Text style={styles.faqQuestion}>¿Puedo ejecutar al Canciller actual?</Text>
          <Text style={styles.faqAnswer}>
            Sí, puedes ejecutar a cualquier jugador que no sea el Presidente actual, incluyendo 
            al Canciller de la ronda anterior.
          </Text>

          <Text style={styles.faqQuestion}>¿Qué pasa si todos los jugadores son eliminados excepto uno?</Text>
          <Text style={styles.faqAnswer}>
            El juego termina. Si queda un liberal, ganan los liberales. Si queda un fascista, ganan los fascistas.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ¡Disfruta del juego y recuerda: en Secret Hitler, la confianza es poder, pero la desconfianza es sabiduría! 🎭
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
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 22,
    marginBottom: 12,
  },
  objectiveContainer: {
    marginTop: 12,
  },
  objectiveCard: {
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  objectiveIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  objectiveText: {
    fontSize: 13,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 20,
  },
  configContainer: {
    marginTop: 12,
  },
  configTitle: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 12,
    fontWeight: '600',
  },
  configTable: {
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 8,
    overflow: 'hidden',
  },
  configRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
  },
  configCellHeader: {
    flex: 1,
    padding: 10,
    backgroundColor: '#333333',
    color: '#ffd700',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
  },
  configCell: {
    flex: 1,
    padding: 10,
    color: '#cccccc',
    textAlign: 'center',
    fontSize: 13,
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
    color: '#ffffff',
    marginBottom: 8,
  },
  infoBoxText: {
    fontSize: 12,
    color: '#cccccc',
    lineHeight: 18,
    marginBottom: 4,
  },
  stepContainer: {
    marginTop: 12,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d32f2f',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  stepText: {
    fontSize: 13,
    color: '#cccccc',
    lineHeight: 20,
  },
  powerContainer: {
    marginTop: 12,
  },
  powerCard: {
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  powerIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  powerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  powerText: {
    fontSize: 13,
    color: '#cccccc',
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: '#333333',
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
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 4,
  },
  victoryContainer: {
    marginTop: 12,
  },
  victoryCard: {
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  victoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  victoryText: {
    fontSize: 13,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 4,
  },
  faqContainer: {
    marginTop: 12,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 6,
    marginTop: 8,
  },
  faqAnswer: {
    fontSize: 13,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#444444',
  },
  footerText: {
    fontSize: 13,
    color: '#cccccc',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
