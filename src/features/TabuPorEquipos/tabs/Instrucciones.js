import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const TabuPorEquiposInstrucciones = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.title}>📖 Cómo Jugar Tabú por Equipos</Text>
        <Text style={styles.description}>
          Tabú por Equipos es un emocionante juego de palabras diseñado para grupos, ideal para fiestas y reuniones sociales.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objetivo del Juego</Text>
        <Text style={styles.sectionText}>
          El objetivo principal es que tu equipo acumule la mayor cantidad de puntos adivinando palabras clave. 
          En cada turno, un jugador de un equipo debe describir una palabra a sus compañeros sin usar las palabras prohibidas.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Número de Jugadores</Text>
        <Text style={styles.sectionText}>
          Se requiere un mínimo de 4 jugadores divididos en dos equipos. Cada equipo debe tener al menos 2 jugadores.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Configuración Inicial</Text>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepText}>
            Divide a los jugadores en dos equipos
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepText}>
            Introduce los nombres de cada equipo
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepText}>
            Establece las reglas: número de rondas y duración del tiempo por ronda (60, 90 o 120 segundos)
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>4</Text>
          <Text style={styles.stepText}>
            Presiona "Iniciar Juego" para comenzar
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎮 Durante el Juego</Text>
        
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>📱 La Tarjeta de Juego</Text>
          <Text style={styles.cardText}>
            En la pantalla aparecerá una tarjeta con:
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>• La palabra a adivinar en la parte superior</Text>
            <Text style={styles.listItem}>• Una lista de 5 palabras 'tabú' debajo</Text>
            <Text style={styles.listItem}>• El cronómetro comenzará la cuenta atrás</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>💬 Dar Pistas</Text>
          <Text style={styles.cardText}>
            El jugador debe describir la palabra principal a sus compañeros de equipo de forma creativa y rápida, 
            evitando a toda costa usar las palabras tabú. 
            <Text style={styles.highlight}> Tampoco puedes usar formas derivadas de las palabras tabú</Text> 
            (por ejemplo, si 'coche' es tabú, no se puede decir 'conducir').
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>🎯 Botones de Acción</Text>
          
          <View style={styles.buttonExample}>
            <View style={[styles.buttonIcon, { backgroundColor: '#27AE60' }]}>
              <Text style={styles.buttonIconText}>✅</Text>
            </View>
            <View style={styles.buttonInfo}>
              <Text style={styles.buttonTitle}>Acierto (Verde)</Text>
              <Text style={styles.buttonDescription}>
                Si el equipo adivina la palabra, pulsa este botón. Se suma un punto al marcador del equipo 
                y aparece una nueva tarjeta instantáneamente.
              </Text>
            </View>
          </View>

          <View style={styles.buttonExample}>
            <View style={[styles.buttonIcon, { backgroundColor: '#E74C3C' }]}>
              <Text style={styles.buttonIconText}>🚫</Text>
            </View>
            <View style={styles.buttonInfo}>
              <Text style={styles.buttonTitle}>Tabú (Rojo)</Text>
              <Text style={styles.buttonDescription}>
                Si el jugador dice accidentalmente una palabra prohibida, debe pulsar este botón. 
                Se resta un punto y se pasa a la siguiente tarjeta. El equipo contrario debe estar atento para señalar los errores.
              </Text>
            </View>
          </View>

          <View style={styles.buttonExample}>
            <View style={[styles.buttonIcon, { backgroundColor: '#F39C12' }]}>
              <Text style={styles.buttonIconText}>⏭️</Text>
            </View>
            <View style={styles.buttonInfo}>
              <Text style={styles.buttonTitle}>Pasar (Amarillo)</Text>
              <Text style={styles.buttonDescription}>
                Si el jugador se queda atascado, puede pulsar este botón para saltar la tarjeta actual 
                y recibir una nueva. Esto no resta puntos.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>⏰ Control del Tiempo</Text>
          <Text style={styles.cardText}>
            Puedes pausar el cronómetro en cualquier momento si necesitas hacer una pausa. 
            Cuando el tiempo se agote, la ronda terminará automáticamente.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔄 Cambio de Turno</Text>
        <Text style={styles.sectionText}>
          Cuando el cronómetro llega a cero, la ronda termina y se muestra un resumen de los puntos obtenidos. 
          El dispositivo móvil se pasa al equipo contrario, que comenzará su propia ronda. 
          El juego continúa alternando entre equipos hasta que se haya completado el número de rondas definido.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Fin del Juego</Text>
        <Text style={styles.sectionText}>
          Una vez finalizada la última ronda, la aplicación muestra una pantalla final de resultados, 
          declarando al equipo con la puntuación más alta como el ganador.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Consejos para Jugar Mejor</Text>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipItem}>✨ Sé creativo con tus descripciones</Text>
          <Text style={styles.tipItem}>🎯 Mantén un ritmo constante</Text>
          <Text style={styles.tipItem}>👂 Escucha atentamente las pistas de tu equipo</Text>
          <Text style={styles.tipItem}>⏱️ Gestiona bien el tiempo</Text>
          <Text style={styles.tipItem}>🚫 El equipo contrario debe vigilar que no se usen palabras tabú</Text>
          <Text style={styles.tipItem}>🎉 ¡Disfruta y diviértete!</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Reglas Importantes</Text>
        <View style={styles.rulesContainer}>
          <Text style={styles.ruleItem}>
            🚫 No puedes usar ninguna de las palabras tabú ni sus derivados
          </Text>
          <Text style={styles.ruleItem}>
            ⏸️ El cronómetro se puede pausar en cualquier momento
          </Text>
          <Text style={styles.ruleItem}>
            ✅ Cada acierto suma 1 punto
          </Text>
          <Text style={styles.ruleItem}>
            🚫 Cada palabra tabú resta 1 punto
          </Text>
          <Text style={styles.ruleItem}>
            ⏭️ Pasar una palabra no suma ni resta puntos
          </Text>
          <Text style={styles.ruleItem}>
            🏆 Gana el equipo con más puntos al final de todas las rondas
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ¡Que disfrutes jugando Tabú por Equipos! 🎉
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C0392B',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 24,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E74C3C',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#34495e',
    lineHeight: 24,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#FFEBEE',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C0392B',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 5,
  },
  buttonExample: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  buttonIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  buttonIconText: {
    fontSize: 24,
  },
  buttonInfo: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#FFC107',
  },
  tipItem: {
    fontSize: 15,
    color: '#856404',
    lineHeight: 28,
    marginBottom: 8,
  },
  rulesContainer: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#E74C3C',
  },
  ruleItem: {
    fontSize: 15,
    color: '#C0392B',
    lineHeight: 28,
    marginBottom: 8,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

