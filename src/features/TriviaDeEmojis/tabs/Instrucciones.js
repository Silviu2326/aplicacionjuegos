import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const TriviaDeEmojisInstrucciones = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.title}>📖 Cómo Jugar Trivia de Emojis</Text>
        <Text style={styles.description}>
          Trivia de Emojis es un dinámico y entretenido juego social diseñado para fiestas, reuniones familiares o para pasar un buen rato con amigos. 
          El objetivo principal es descifrar una combinación de emojis que representa el título de una película, una canción, un personaje, un lugar o un refrán popular.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objetivo del Juego</Text>
        <Text style={styles.sectionText}>
          El objetivo es que tu equipo acumule la mayor cantidad de puntos adivinando correctamente qué representa cada secuencia de emojis. 
          Se puede jugar de forma individual o dividiendo a los participantes en equipos para fomentar la colaboración y la competencia amistosa.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Número de Jugadores</Text>
        <Text style={styles.sectionText}>
          Se requiere un mínimo de 2 jugadores divididos en dos equipos. Cada equipo debe tener al menos 1 jugador, 
          pero es más divertido con 2 o más jugadores por equipo.
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
            Introduce los nombres de cada equipo en la pantalla de configuración
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepText}>
            Selecciona el modo de victoria: por rondas o por puntos objetivo
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>4</Text>
          <Text style={styles.stepText}>
            Elige las categorías que deseas incluir en la partida (Películas, Canciones, Refranes, Personajes, etc.)
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>5</Text>
          <Text style={styles.stepText}>
            Opcionalmente, selecciona un nivel de dificultad (Fácil, Medio, Difícil)
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>6</Text>
          <Text style={styles.stepText}>
            Presiona "Iniciar Juego" para comenzar
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎮 Durante el Juego</Text>
        
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>📱 La Pantalla de Juego</Text>
          <Text style={styles.cardText}>
            En la pantalla aparecerá:
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>• Una secuencia de emojis en el centro de la pantalla</Text>
            <Text style={styles.listItem}>• La categoría a la que pertenece la pregunta (Películas, Canciones, etc.)</Text>
            <Text style={styles.listItem}>• El marcador de ambos equipos en la parte superior</Text>
            <Text style={styles.listItem}>• La ronda actual que se está jugando</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>💭 Adivinar la Respuesta</Text>
          <Text style={styles.cardText}>
            Los jugadores o equipos debaten y piensan en la posible respuesta. 
            El primer jugador o equipo que crea tener la respuesta correcta la dice en voz alta.
            {'\n\n'}
            <Text style={styles.highlight}>Consejo:</Text> Los emojis pueden representar palabras, sonidos, conceptos o ideas. 
            Sé creativo al interpretarlos.
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>🔍 Revelar la Respuesta</Text>
          <Text style={styles.cardText}>
            Cuando un equipo cree tener la respuesta correcta, un jugador designado como juez (o cualquier jugador) 
            pulsa el botón "Revelar Respuesta". Se mostrará la respuesta correcta en pantalla.
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>✅ Otorgar Puntos</Text>
          <Text style={styles.cardText}>
            Después de revelar la respuesta, aparecerán tres opciones:
          </Text>
          
          <View style={styles.buttonExample}>
            <View style={[styles.buttonIcon, { backgroundColor: '#4ECDC4' }]}>
              <Text style={styles.buttonIconText}>✅</Text>
            </View>
            <View style={styles.buttonInfo}>
              <Text style={styles.buttonTitle}>Equipo 1 +1</Text>
              <Text style={styles.buttonDescription}>
                Si el Equipo 1 adivinó correctamente, pulsa este botón para otorgarle un punto.
              </Text>
            </View>
          </View>

          <View style={styles.buttonExample}>
            <View style={[styles.buttonIcon, { backgroundColor: '#FFE66D' }]}>
              <Text style={styles.buttonIconText}>✅</Text>
            </View>
            <View style={styles.buttonInfo}>
              <Text style={styles.buttonTitle}>Equipo 2 +1</Text>
              <Text style={styles.buttonDescription}>
                Si el Equipo 2 adivinó correctamente, pulsa este botón para otorgarle un punto.
              </Text>
            </View>
          </View>

          <View style={styles.buttonExample}>
            <View style={[styles.buttonIcon, { backgroundColor: '#95A5A6' }]}>
              <Text style={styles.buttonIconText}>⏭️</Text>
            </View>
            <View style={styles.buttonInfo}>
              <Text style={styles.buttonTitle}>Nadie</Text>
              <Text style={styles.buttonDescription}>
                Si nadie adivinó correctamente, pulsa este botón para pasar a la siguiente pregunta sin otorgar puntos.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>➡️ Siguiente Pregunta</Text>
          <Text style={styles.cardText}>
            Después de otorgar (o no otorgar) el punto, pulsa el botón "Siguiente Pregunta" para avanzar. 
            El juego alterna automáticamente entre equipos, indicando cuál es el turno actual.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔄 Modos de Victoria</Text>
        
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>📊 Modo por Rondas</Text>
          <Text style={styles.cardText}>
            El juego termina cuando se han completado todas las rondas preestablecidas. 
            El equipo con más puntos al final de todas las rondas es el ganador.
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>🎯 Modo por Puntos</Text>
          <Text style={styles.cardText}>
            El juego termina cuando un equipo alcanza la puntuación objetivo preestablecida. 
            El primer equipo en llegar a esa puntuación es el ganador.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Fin del Juego</Text>
        <Text style={styles.sectionText}>
          Una vez que se cumpla la condición de victoria (rondas completadas o puntuación alcanzada), 
          la aplicación mostrará una pantalla final con el marcador completo y declarará al equipo ganador.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Categorías Disponibles</Text>
        <View style={styles.categoriesList}>
          <Text style={styles.categoryItem}>🎬 Películas: Títulos de películas famosas</Text>
          <Text style={styles.categoryItem}>🎵 Canciones: Títulos de canciones populares</Text>
          <Text style={styles.categoryItem}>💬 Refranes: Dichos y proverbios tradicionales</Text>
          <Text style={styles.categoryItem}>👤 Personajes: Personajes famosos de cine, TV o literatura</Text>
          <Text style={styles.categoryItem}>🌍 Lugares: Ciudades, monumentos, lugares famosos</Text>
          <Text style={styles.categoryItem}>📺 Series: Títulos de series de televisión</Text>
          <Text style={styles.categoryItem}>🏢 Marcas: Marcas comerciales reconocidas</Text>
          <Text style={styles.categoryItem}>🍕 Alimentos: Platos, comidas y bebidas</Text>
          <Text style={styles.categoryItem}>👋 Gestos: Acciones y gestos comunes</Text>
          <Text style={styles.categoryItem}>📦 Objetos: Objetos cotidianos y reconocibles</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Consejos para Jugar Mejor</Text>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipItem}>✨ Piensa fuera de lo común: los emojis pueden representar sonidos, palabras o conceptos abstractos</Text>
          <Text style={styles.tipItem}>🎯 Trabaja en equipo: discute las posibles respuestas con tus compañeros</Text>
          <Text style={styles.tipItem}>👂 Escucha todas las sugerencias antes de responder</Text>
          <Text style={styles.tipItem}>⚡ Sé rápido pero preciso: el primer equipo en responder correctamente gana el punto</Text>
          <Text style={styles.tipItem}>🎨 Usa la categoría como pista: te ayuda a enfocar tu respuesta</Text>
          <Text style={styles.tipItem}>🔄 Alterna entre equipos: cada equipo tiene su turno para responder</Text>
          <Text style={styles.tipItem}>🎉 ¡Disfruta y diviértete! El objetivo es pasar un buen rato</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Reglas Importantes</Text>
        <View style={styles.rulesContainer}>
          <Text style={styles.ruleItem}>
            ✅ Cada respuesta correcta otorga 1 punto al equipo correspondiente
          </Text>
          <Text style={styles.ruleItem}>
            ⏭️ Si nadie acierta, no se otorgan puntos y se pasa a la siguiente pregunta
          </Text>
          <Text style={styles.ruleItem}>
            🔄 El juego alterna turnos entre equipos automáticamente
          </Text>
          <Text style={styles.ruleItem}>
            🏆 Gana el equipo con más puntos al final (modo rondas) o el primero en alcanzar la puntuación objetivo (modo puntos)
          </Text>
          <Text style={styles.ruleItem}>
            🤝 En caso de empate, se declara un empate
          </Text>
          <Text style={styles.ruleItem}>
            🎯 El juez debe ser imparcial y decidir quién respondió primero y correctamente
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎮 Ejemplos de Preguntas</Text>
        <View style={styles.examplesContainer}>
          <View style={styles.exampleCard}>
            <Text style={styles.exampleEmojis}>👑🦁</Text>
            <Text style={styles.exampleAnswer}>Respuesta: El Rey León</Text>
            <Text style={styles.exampleCategory}>Categoría: Películas</Text>
          </View>
          <View style={styles.exampleCard}>
            <Text style={styles.exampleEmojis}>💃🐒</Text>
            <Text style={styles.exampleAnswer}>Respuesta: Dance Monkey</Text>
            <Text style={styles.exampleCategory}>Categoría: Canciones</Text>
          </View>
          <View style={styles.exampleCard}>
            <Text style={styles.exampleEmojis}>🦐😴🌊➡️</Text>
            <Text style={styles.exampleAnswer}>Respuesta: Camarón que se duerme, se lo lleva la corriente</Text>
            <Text style={styles.exampleCategory}>Categoría: Refranes</Text>
          </View>
          <View style={styles.exampleCard}>
            <Text style={styles.exampleEmojis}>🕷️👨</Text>
            <Text style={styles.exampleAnswer}>Respuesta: Spider-Man</Text>
            <Text style={styles.exampleCategory}>Categoría: Personajes</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ¡Que disfrutes jugando Trivia de Emojis! 🎉
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
    color: '#FF6B6B',
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
    color: '#FF6B6B',
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
    backgroundColor: '#FF6B6B',
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
    color: '#FF6B6B',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#FF6B6B',
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
  categoriesList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#FFEBEE',
  },
  categoryItem: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 28,
    marginBottom: 8,
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
    borderColor: '#FF6B6B',
  },
  ruleItem: {
    fontSize: 15,
    color: '#C0392B',
    lineHeight: 28,
    marginBottom: 8,
    fontWeight: '600',
  },
  examplesContainer: {
    gap: 15,
  },
  exampleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  exampleEmojis: {
    fontSize: 48,
    marginBottom: 10,
  },
  exampleAnswer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  exampleCategory: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FF6B6B',
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

