import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const TwoRoomsAndABoomInstrucciones = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 ¿Qué es Two Rooms and a Boom?</Text>
        <Text style={styles.text}>
          Two Rooms and a Boom es un emocionante juego de deducción social para 6 a 30 jugadores. 
          Los participantes se dividen en dos equipos principales: el Equipo Rojo y el Equipo Azul. 
          En secreto, a un jugador del Equipo Azul se le asigna el rol de Presidente, y a un jugador 
          del Equipo Rojo se le asigna el de la Bomba.
        </Text>
        <Text style={styles.text}>
          El objetivo del Equipo Azul es proteger al Presidente, asegurándose de que al final del juego 
          esté en una habitación diferente a la de la Bomba. Por el contrario, el objetivo del Equipo 
          Rojo es que la Bomba y el Presidente terminen en la misma habitación.
        </Text>
        <Text style={styles.text}>
          El juego se desarrolla a lo largo de varias rondas (generalmente tres). En cada ronda, los 
          jugadores, divididos en dos habitaciones físicas, discuten y negocian para elegir un líder. 
          Este líder seleccionará un número determinado de jugadores (rehenes) para ser intercambiados 
          con la otra habitación.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objetivos del Juego</Text>
        <View style={styles.objectiveContainer}>
          <View style={styles.objectiveCard}>
            <Text style={styles.objectiveIcon}>🔵</Text>
            <Text style={styles.objectiveTitle}>Equipo Azul</Text>
            <Text style={styles.objectiveText}>
              El Equipo Azul gana si el Presidente y la Bomba terminan en habitaciones DIFERENTES 
              al final de la última ronda. Su misión es proteger al Presidente y mantenerlo alejado de la Bomba.
            </Text>
          </View>
          <View style={styles.objectiveCard}>
            <Text style={styles.objectiveIcon}>🔴</Text>
            <Text style={styles.objectiveTitle}>Equipo Rojo</Text>
            <Text style={styles.objectiveText}>
              El Equipo Rojo gana si el Presidente y la Bomba terminan en la MISMA habitación al final 
              de la última ronda. Su misión es acercar la Bomba al Presidente usando negociación y engaño.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Configuración del Juego</Text>
        
        <View style={styles.configContainer}>
          <Text style={styles.configTitle}>Distribución de Equipos:</Text>
          <Text style={styles.text}>
            • En partidas de 6-10 jugadores: Equipos aproximadamente iguales (Rojo y Azul)
          </Text>
          <Text style={styles.text}>
            • En partidas de 11+ jugadores: Pueden incluirse roles especiales del Equipo Gris
          </Text>
          <Text style={styles.text}>
            • Un jugador del Equipo Azul es el Presidente (secreto)
          </Text>
          <Text style={styles.text}>
            • Un jugador del Equipo Rojo es la Bomba (secreto)
          </Text>
        </View>

        <View style={styles.configContainer}>
          <Text style={styles.configTitle}>Número de Rehenes por Ronda:</Text>
          <Text style={styles.text}>
            • Ronda 1: 1 rehén por habitación
          </Text>
          <Text style={styles.text}>
            • Ronda 2: 2 rehenes por habitación
          </Text>
          <Text style={styles.text}>
            • Ronda 3: 3 rehenes por habitación
          </Text>
          <Text style={styles.text}>
            • (Puede variar según configuración)
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>⚠️ División Inicial</Text>
          <Text style={styles.infoBoxText}>
            Al inicio del juego, los jugadores se dividen físicamente en dos habitaciones separadas. 
            La aplicación mostrará a cada jugador en qué habitación está y le permitirá ver a los demás 
            jugadores en su habitación.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👑 Roles Básicos</Text>
        
        <View style={styles.roleContainer}>
          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>👔</Text>
            <Text style={styles.roleTitle}>Presidente (Equipo Azul)</Text>
            <Text style={styles.roleText}>
              Eres el objetivo principal del Equipo Rojo. Tu misión es sobrevivir. Al final de la última 
              ronda, debes estar en una habitación DIFERENTE a la de la Bomba. ¡Confía en tu equipo 
              para protegerte!
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>💣</Text>
            <Text style={styles.roleTitle}>Bomba (Equipo Rojo)</Text>
            <Text style={styles.roleText}>
              Eres el arma secreta del Equipo Rojo. Tu objetivo es simple y destructivo: al final de 
              la última ronda, debes estar en la MISMA habitación que el Presidente. ¡Usa el engaño 
              para acercarte a tu objetivo!
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>👤</Text>
            <Text style={styles.roleTitle}>Jugador (Equipo Azul/Rojo)</Text>
            <Text style={styles.roleText}>
              Eres la columna vertebral de tu equipo. Trabaja con tus compañeros para identificar los 
              roles clave. Protege a tu líder (si eres Azul) o ayuda a tu arma (si eres Rojo).
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎭 Roles Especiales</Text>
        
        <View style={styles.roleContainer}>
          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>😰</Text>
            <Text style={styles.roleTitle}>Tímido (Equipo Gris)</Text>
            <Text style={styles.roleText}>
              Eres un personaje neutral. No puedes revelar tu carta a nadie. Ganas si el equipo con 
              el que estabas en la habitación inicial (Ronda 1) gana el juego.
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>🔧</Text>
            <Text style={styles.roleTitle}>Ingeniero (Equipo Azul)</Text>
            <Text style={styles.roleText}>
              Durante la fase de revelación de líderes de cada ronda, el líder de tu habitación puede 
              mostrarte la carta de un jugador de tu elección. Usa esta información para guiar a tu equipo.
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>🕵️</Text>
            <Text style={styles.roleTitle}>Espía (Equipo Gris)</Text>
            <Text style={styles.roleText}>
              Eres un agente del caos. Ganas si el Equipo Rojo y el Equipo Azul no ganan (es decir, 
              si otro rol con condición de victoria alternativa, como el Jugador, gana).
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>⚕️</Text>
            <Text style={styles.roleTitle}>Médico (Equipo Azul)</Text>
            <Text style={styles.roleText}>
              Compartes una condición de victoria con el Presidente. Debes terminar en la misma habitación 
              que él para que el Equipo Azul pueda ganar. Eres su guardaespaldas secreto.
            </Text>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>💥</Text>
            <Text style={styles.roleTitle}>Kamikaze (Equipo Rojo)</Text>
            <Text style={styles.roleText}>
              Eres un miembro del Equipo Rojo con un objetivo personal. Ayuda a tu equipo, pero si el 
              Equipo Rojo pierde, TÚ ganas en solitario si logras terminar en una habitación donde no 
              estén ni el Presidente ni la Bomba.
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
                Al inicio del juego, cada jugador ve su rol secreto en su dispositivo. Solo tú conoces 
                tu rol y equipo. El Presidente sabe que es el Presidente, la Bomba sabe que es la Bomba, 
                y los demás jugadores conocen su equipo (Rojo o Azul).
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>División en Habitaciones</Text>
              <Text style={styles.stepText}>
                Los jugadores se dividen físicamente en dos grupos iguales (o lo más iguales posible), 
                que se dirigen a dos habitaciones separadas. La aplicación muestra a cada jugador en qué 
                habitación está y quiénes están en su misma habitación.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Fase de Negociación</Text>
              <Text style={styles.stepText}>
                Comienza la fase de negociación con un temporizador. En cada habitación, los jugadores 
                discuten para elegir a un Líder. Esta elección puede ser por aclamación popular o votación 
                verbal. El Líder debe identificarse en la aplicación.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Selección de Rehenes</Text>
              <Text style={styles.stepText}>
                El Líder de cada habitación debe seleccionar un número de jugadores de su propia habitación 
                para enviar a la otra. El número de rehenes a intercambiar depende de la ronda (ej: 1 
                rehén en la ronda 1, 2 en la ronda 2, etc.). El Líder realiza la selección en la interfaz 
                de la aplicación.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>5</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Intercambio de Jugadores</Text>
              <Text style={styles.stepText}>
                Una vez que ambos líderes confirman su selección, la aplicación anuncia quiénes son los rehenes. 
                Estos jugadores deben moverse físicamente a la otra habitación. La aplicación actualiza la 
                lista de jugadores de cada habitación para todos los participantes.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>6</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Siguiente Ronda</Text>
              <Text style={styles.stepText}>
                Se repiten los pasos 3 a 5 para el número de rondas configurado (generalmente 3). El tiempo 
                de negociación puede disminuir en las rondas finales para aumentar la presión.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💣 Revelación Final</Text>
        
        <View style={styles.revelationContainer}>
          <Text style={styles.revelationTitle}>Proceso:</Text>
          <Text style={styles.revelationText}>
            Al finalizar la última ronda y el último intercambio de rehenes, el juego termina. La aplicación 
            instruye a todos a permanecer en sus habitaciones.
          </Text>
          
          <Text style={styles.revelationTitle}>Paso 1: Revelación de la Bomba</Text>
          <Text style={styles.revelationText}>
            Primero, pide al jugador con el rol de 'Bomba' que revele su identidad en la aplicación. 
            Todos verán que este jugador es la Bomba.
          </Text>

          <Text style={styles.revelationTitle}>Paso 2: Revelación del Presidente</Text>
          <Text style={styles.revelationText}>
            Luego, pide al 'Presidente' que haga lo mismo. Todos verán que este jugador es el Presidente.
          </Text>

          <Text style={styles.revelationTitle}>Paso 3: Anuncio del Ganador</Text>
          <Text style={styles.revelationText}>
            La aplicación comprueba si el Presidente y la Bomba están en la misma habitación. Si es así, 
            anuncia la victoria del Equipo Rojo. Si están en habitaciones separadas, anuncia la victoria 
            del Equipo Azul.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Condiciones de Victoria</Text>
        
        <View style={styles.victoryContainer}>
          <View style={styles.victoryCard}>
            <Text style={styles.victoryTitle}>🔵 Victoria del Equipo Azul</Text>
            <Text style={styles.victoryText}>
              El Presidente y la Bomba están en habitaciones DIFERENTES al final de la última ronda.
            </Text>
          </View>

          <View style={styles.victoryCard}>
            <Text style={styles.victoryTitle}>🔴 Victoria del Equipo Rojo</Text>
            <Text style={styles.victoryText}>
              El Presidente y la Bomba están en la MISMA habitación al final de la última ronda.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Estrategias y Consejos</Text>
        
        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>🔵 Para el Equipo Azul:</Text>
          <Text style={styles.tipText}>• Identifica a tu Presidente discretamente y protégelo.</Text>
          <Text style={styles.tipText}>• Intenta mantener al Presidente y a la Bomba en habitaciones diferentes.</Text>
          <Text style={styles.tipText}>• Si eres el Presidente, intenta pasar desapercibido.</Text>
          <Text style={styles.tipText}>• Observa quién propone intercambios sospechosos.</Text>
          <Text style={styles.tipText}>• Trabaja en equipo para identificar a la Bomba.</Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>🔴 Para el Equipo Rojo:</Text>
          <Text style={styles.tipText}>• Identifica al Presidente y acércate a él discretamente.</Text>
          <Text style={styles.tipText}>• Si eres la Bomba, intenta pasar desapercibida.</Text>
          <Text style={styles.tipText}>• Trabaja en equipo para identificar al Presidente.</Text>
          <Text style={styles.tipText}>• Propón intercambios estratégicos que acerquen a la Bomba al Presidente.</Text>
          <Text style={styles.tipText}>• Usa el engaño y la negociación para confundir al Equipo Azul.</Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>👑 Para los Líderes:</Text>
          <Text style={styles.tipText}>• Considera cuidadosamente quién seleccionar como rehén.</Text>
          <Text style={styles.tipText}>• Escucha las sugerencias de tu habitación, pero toma la decisión final.</Text>
          <Text style={styles.tipText}>• Balancea la necesidad de proteger/atacar con la necesidad de mantener secretos.</Text>
          <Text style={styles.tipText}>• No reveles demasiada información sobre tu estrategia.</Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipTitle}>🎭 Para Roles Especiales:</Text>
          <Text style={styles.tipText}>• El Tímido debe mantener su secreto hasta el final.</Text>
          <Text style={styles.tipText}>• El Ingeniero puede ayudar a identificar roles clave.</Text>
          <Text style={styles.tipText}>• El Espía puede causar caos y confusión.</Text>
          <Text style={styles.tipText}>• El Médico debe proteger al Presidente.</Text>
          <Text style={styles.tipText}>• El Kamikaze tiene un objetivo personal único.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Reglas Especiales</Text>
        
        <View style={styles.rulesContainer}>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Tiempo de Negociación</Text>
            <Text style={styles.ruleText}>
              Cada ronda tiene un tiempo límite para la negociación. El tiempo puede disminuir en rondas 
              posteriores para aumentar la presión. Si se agota el tiempo, los líderes deben tomar decisiones rápidas.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Número de Rehenes</Text>
            <Text style={styles.ruleText}>
              El número de rehenes a intercambiar aumenta con cada ronda. Esto significa que más jugadores 
              se mueven entre habitaciones, aumentando la complejidad y las posibilidades de acercar o separar 
              al Presidente y la Bomba.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Comunicación</Text>
            <Text style={styles.ruleText}>
              Los jugadores pueden hablar libremente dentro de su habitación durante la fase de negociación. 
              Sin embargo, deben tener cuidado de no revelar demasiado información sobre sus roles o estrategias.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleTitle}>📌 Revelación de Roles</Text>
            <Text style={styles.ruleText}>
              Durante el juego, los jugadores NO deben revelar sus roles. Solo al final, en la fase de 
              revelación, se revelan el Presidente y la Bomba. Otros roles especiales pueden tener reglas 
              específicas sobre revelación.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎉 ¡Disfruta del Juego!</Text>
        <Text style={styles.text}>
          Two Rooms and a Boom es un juego de deducción, engaño y negociación. Cada partida es única 
          y requiere análisis cuidadoso, observación de patrones, comunicación efectiva y, a veces, 
          un poco de suerte. La tensión aumenta con cada ronda, y la fase de revelación añade un giro 
          emocionante al final.
        </Text>
        <Text style={styles.text}>
          ¡Diviértete protegiendo al Presidente o intentando acercar la Bomba a su objetivo!
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
    backgroundColor: '#0a0a0a',
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    backgroundColor: '#1a1a2e',
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
    color: '#e94560',
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
    backgroundColor: '#0a0a0a',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
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
    backgroundColor: '#0a0a0a',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e94560',
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
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    padding: 12,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e94560',
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
  revelationContainer: {
    backgroundColor: '#0a0a0a',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  revelationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 8,
  },
  revelationText: {
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
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e94560',
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
    backgroundColor: '#0a0a0a',
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
  },
  tipsContainer: {
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 4,
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

