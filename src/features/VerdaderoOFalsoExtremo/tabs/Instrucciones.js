import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const VerdaderoOFalsoExtremoInstrucciones = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.title}>📖 Cómo Jugar Verdadero o Falso Extremo</Text>
        <Text style={styles.description}>
          Verdadero o Falso Extremo es un adictivo juego de trivia social diseñado para poner a prueba tu intuición y tus conocimientos sobre los hechos más insólitos y sorprendentes del mundo. 
          El objetivo principal es acumular la mayor cantidad de puntos posible decidiendo correctamente si las afirmaciones presentadas son verdaderas o falsas.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objetivo del Juego</Text>
        <Text style={styles.sectionText}>
          El objetivo es acumular la mayor cantidad de puntos posible decidiendo correctamente si las afirmaciones presentadas son verdaderas o falsas. 
          Ideal para jugar solo o en grupo con amigos y familiares (2-8 jugadores recomendados), cada ronda presenta una declaración cuidadosamente elaborada que parece increíble, pero que podría ser cierta.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Número de Jugadores</Text>
        <Text style={styles.sectionText}>
          Puedes jugar de dos formas:
        </Text>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>👤 <Text style={styles.bold}>Modo Individual:</Text> Juegas solo contra el tiempo y acumulas puntos.</Text>
          <Text style={styles.listItem}>👥 <Text style={styles.bold}>Modo Multijugador:</Text> De 2 a 8 jugadores compiten entre sí para ver quién obtiene más puntos.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Configuración Inicial</Text>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepText}>
            Selecciona el modo de juego: Individual o Multijugador
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepText}>
            Si es individual, introduce tu nombre. Si es multijugador, agrega los nombres de todos los jugadores (mínimo 2)
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepText}>
            Elige el modo de victoria: por rondas (el juego termina después de X rondas) o por puntos (el juego termina cuando alguien alcanza X puntos)
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>4</Text>
          <Text style={styles.stepText}>
            Configura el número de rondas o la puntuación objetivo según el modo elegido
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>5</Text>
          <Text style={styles.stepText}>
            Opcionalmente, selecciona un nivel de dificultad (Fácil, Medio, Difícil) o déjalo en "Todos" para variedad
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>6</Text>
          <Text style={styles.stepText}>
            Selecciona las categorías que deseas incluir (Ciencia, Historia, Naturaleza, etc.) o déjalas todas seleccionadas
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>7</Text>
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
            <Text style={styles.listItem}>• Una afirmación en el centro de la pantalla</Text>
            <Text style={styles.listItem}>• La categoría a la que pertenece (Ciencia, Historia, etc.)</Text>
            <Text style={styles.listItem}>• El marcador de puntos en la parte superior</Text>
            <Text style={styles.listItem}>• La ronda actual que se está jugando</Text>
            <Text style={styles.listItem}>• Un temporizador de 15 segundos que cuenta hacia atrás</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>⏱️ El Temporizador</Text>
          <Text style={styles.cardText}>
            Cada pregunta tiene un tiempo límite de 15 segundos. El temporizador cambia de color:
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>🟢 <Text style={styles.bold}>Verde (15-10 segundos):</Text> Tiempo suficiente, respira tranquilo</Text>
            <Text style={styles.listItem}>🟡 <Text style={styles.bold}>Amarillo (9-5 segundos):</Text> Se está acabando el tiempo, decide rápido</Text>
            <Text style={styles.listItem}>🔴 <Text style={styles.bold}>Rojo (4-0 segundos):</Text> ¡Últimos segundos! Si no respondes, perderás la oportunidad</Text>
          </View>
          <Text style={styles.cardText}>
            <Text style={styles.highlight}>Consejo:</Text> Responder más rápido te da puntos bonus, pero es mejor ser preciso que rápido e incorrecto.
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>✅ Seleccionar Verdadero o Falso</Text>
          <Text style={styles.cardText}>
            Una vez que hayas leído la afirmación y pensado tu respuesta, presiona uno de los botones:
          </Text>
          
          <View style={styles.buttonExample}>
            <View style={[styles.buttonIcon, { backgroundColor: '#27AE60' }]}>
              <Text style={styles.buttonIconText}>✅</Text>
            </View>
            <View style={styles.buttonInfo}>
              <Text style={styles.buttonTitle}>VERDADERO</Text>
              <Text style={styles.buttonDescription}>
                Presiona este botón si crees que la afirmación es verdadera. El botón es verde para indicar "correcto" o "sí".
              </Text>
            </View>
          </View>

          <View style={styles.buttonExample}>
            <View style={[styles.buttonIcon, { backgroundColor: '#E74C3C' }]}>
              <Text style={styles.buttonIconText}>❌</Text>
            </View>
            <View style={styles.buttonInfo}>
              <Text style={styles.buttonTitle}>FALSO</Text>
              <Text style={styles.buttonDescription}>
                Presiona este botón si crees que la afirmación es falsa. El botón es rojo para indicar "incorrecto" o "no".
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>🎉 Ver la Respuesta</Text>
          <Text style={styles.cardText}>
            Después de seleccionar tu respuesta (o cuando se acabe el tiempo), aparecerá:
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>• La respuesta correcta (VERDADERO o FALSO) destacada en color</Text>
            <Text style={styles.listItem}>• Si acertaste o fallaste con un mensaje visual</Text>
            <Text style={styles.listItem}>• Una explicación detallada que contextualiza el hecho y te ayuda a entender por qué es verdadero o falso</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>📊 Sistema de Puntos</Text>
          <Text style={styles.cardText}>
            Los puntos se otorgan de la siguiente manera:
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>• <Text style={styles.bold}>Puntos base:</Text> 10 puntos por cada respuesta correcta</Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>Bonus por velocidad:</Text> Puntos extra según cuánto tiempo te haya sobrado del temporizador (hasta 5 puntos adicionales)</Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>Respuesta incorrecta:</Text> 0 puntos</Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>Sin respuesta:</Text> 0 puntos (si se acaba el tiempo sin responder)</Text>
          </View>
          <Text style={styles.cardText}>
            <Text style={styles.highlight}>Ejemplo:</Text> Si respondes correctamente en 12 segundos, obtienes 10 puntos base + 1 punto bonus = 11 puntos totales.
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>➡️ Siguiente Pregunta</Text>
          <Text style={styles.cardText}>
            Después de ver la respuesta y la explicación, presiona el botón "Siguiente Pregunta" para avanzar a la siguiente ronda. 
            El marcador se actualiza automáticamente y el juego continúa hasta alcanzar la condición de victoria.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔄 Modos de Victoria</Text>
        
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>📊 Modo por Rondas</Text>
          <Text style={styles.cardText}>
            El juego termina cuando se han completado todas las rondas preestablecidas (por ejemplo, 10, 15 o 20 rondas). 
            El jugador o equipo con más puntos al final de todas las rondas es el ganador.
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.highlight}>Ideal para:</Text> Partidas más largas donde todos tienen la misma cantidad de oportunidades.
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>🎯 Modo por Puntos</Text>
          <Text style={styles.cardText}>
            El juego termina cuando un jugador o equipo alcanza la puntuación objetivo preestablecida (por ejemplo, 50, 100 o 150 puntos). 
            El primer jugador en llegar a esa puntuación es el ganador.
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.highlight}>Ideal para:</Text> Partidas más dinámicas y rápidas con un objetivo claro de alcanzar.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Fin del Juego</Text>
        <Text style={styles.sectionText}>
          Una vez que se cumpla la condición de victoria (rondas completadas o puntuación alcanzada), 
          la aplicación mostrará una pantalla final con el marcador completo y declarará al ganador. 
          Podrás ver estadísticas detalladas como aciertos, fallos y puntos totales.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Categorías Disponibles</Text>
        <View style={styles.categoriesList}>
          <Text style={styles.categoryItem}>🔬 <Text style={styles.bold}>Ciencia:</Text> Hechos científicos sorprendentes y curiosidades</Text>
          <Text style={styles.categoryItem}>📜 <Text style={styles.bold}>Historia:</Text> Eventos históricos y datos curiosos del pasado</Text>
          <Text style={styles.categoryItem}>🌿 <Text style={styles.bold}>Naturaleza:</Text> Datos sobre plantas, ecosistemas y fenómenos naturales</Text>
          <Text style={styles.categoryItem}>🎬 <Text style={styles.bold}>Cultura Pop:</Text> Cine, música, series y entretenimiento</Text>
          <Text style={styles.categoryItem}>🌍 <Text style={styles.bold}>Geografía:</Text> Países, ciudades, montañas y lugares del mundo</Text>
          <Text style={styles.categoryItem}>🐾 <Text style={styles.bold}>Animales:</Text> Curiosidades sobre el reino animal</Text>
          <Text style={styles.categoryItem}>🔮 <Text style={styles.bold}>Mitos y Leyendas:</Text> Desmentir o confirmar creencias populares</Text>
          <Text style={styles.categoryItem}>💻 <Text style={styles.bold}>Tecnología:</Text> Innovaciones tecnológicas y datos digitales</Text>
          <Text style={styles.categoryItem}>🍕 <Text style={styles.bold}>Comida:</Text> Datos curiosos sobre alimentos y gastronomía</Text>
          <Text style={styles.categoryItem}>⚽ <Text style={styles.bold}>Deportes:</Text> Curiosidades del mundo deportivo</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Consejos para Jugar Mejor</Text>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipItem}>🎯 <Text style={styles.bold}>Confía en tu primera impresión:</Text> A menudo, tu instinto inicial es correcto</Text>
          <Text style={styles.tipItem}>⏱️ <Text style={styles.bold}>Gestiona tu tiempo:</Text> No te apresures demasiado, pero tampoco te quedes pensando demasiado tiempo</Text>
          <Text style={styles.tipItem}>🧠 <Text style={styles.bold}>Lee cuidadosamente:</Text> Algunas afirmaciones pueden tener palabras clave que te den pistas</Text>
          <Text style={styles.tipItem}>📖 <Text style={styles.bold}>Aprende de las explicaciones:</Text> Cada respuesta viene con una explicación que te ayuda a entender mejor el mundo</Text>
          <Text style={styles.tipItem}>🎲 <Text style={styles.bold}>No todo es obvio:</Text> Las afirmaciones más increíbles pueden ser verdaderas, y las que parecen lógicas pueden ser falsas</Text>
          <Text style={styles.tipItem}>🏆 <Text style={styles.bold}>En multijugador, compite amistosamente:</Text> El objetivo es divertirse y aprender juntos</Text>
          <Text style={styles.tipItem}>🎉 <Text style={styles.bold}>¡Disfruta y diviértete!</Text> Cada partida es una oportunidad para aprender algo nuevo</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Reglas Importantes</Text>
        <View style={styles.rulesContainer}>
          <Text style={styles.ruleItem}>
            ✅ Cada respuesta correcta otorga puntos base (10) más bonus por velocidad
          </Text>
          <Text style={styles.ruleItem}>
            ❌ Las respuestas incorrectas no otorgan puntos
          </Text>
          <Text style={styles.ruleItem}>
            ⏱️ Si no respondes antes de que se acabe el tiempo, no obtienes puntos
          </Text>
          <Text style={styles.ruleItem}>
            🎯 Solo puedes seleccionar una respuesta por pregunta
          </Text>
          <Text style={styles.ruleItem}>
            🏆 Gana el jugador con más puntos al final (modo rondas) o el primero en alcanzar la puntuación objetivo (modo puntos)
          </Text>
          <Text style={styles.ruleItem}>
            🤝 En caso de empate, se puede jugar una ronda de desempate o compartir la victoria
          </Text>
          <Text style={styles.ruleItem}>
            📊 Todas tus partidas se guardan en el historial para que puedas revisar tus estadísticas
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎮 Ejemplos de Afirmaciones</Text>
        <View style={styles.examplesContainer}>
          <View style={styles.exampleCard}>
            <Text style={styles.exampleStatement}>El corazón de una ballena azul es tan grande que un ser humano podría nadar a través de sus arterias.</Text>
            <Text style={styles.exampleAnswer}>✅ VERDADERO</Text>
            <Text style={styles.exampleExplanation}>El corazón de una ballena azul puede pesar hasta 180 kg y sus arterias principales tienen el tamaño suficiente para que una persona pequeña pueda pasar por ellas.</Text>
            <Text style={styles.exampleCategory}>Categoría: Ciencia</Text>
          </View>
          <View style={styles.exampleCard}>
            <Text style={styles.exampleStatement}>Los humanos solo utilizan el 10% de su capacidad cerebral.</Text>
            <Text style={[styles.exampleAnswer, { color: '#E74C3C' }]}>❌ FALSO</Text>
            <Text style={styles.exampleExplanation}>Es un mito popular. Los estudios con neuroimagen muestran que usamos prácticamente todo el cerebro, aunque no todas las partes al mismo tiempo.</Text>
            <Text style={styles.exampleCategory}>Categoría: Mitos</Text>
          </View>
          <View style={styles.exampleCard}>
            <Text style={styles.exampleStatement}>En el planeta Venus, un día es más largo que un año.</Text>
            <Text style={styles.exampleAnswer}>✅ VERDADERO</Text>
            <Text style={styles.exampleExplanation}>Venus tarda 243 días terrestres en rotar sobre su eje, pero solo 225 días en orbitar alrededor del Sol. Por lo tanto, un día venusiano es más largo que un año venusiano.</Text>
            <Text style={styles.exampleCategory}>Categoría: Ciencia</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ¡Que disfrutes jugando Verdadero o Falso Extremo! 🎉
        </Text>
        <Text style={styles.footerSubtext}>
          Pon a prueba tu conocimiento y diviértete con hechos increíbles
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
    color: '#E74C3C',
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
    color: '#E74C3C',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
    marginBottom: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  bold: {
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 8,
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
    borderColor: '#E74C3C',
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
    borderWidth: 2,
    borderColor: '#E74C3C',
  },
  exampleStatement: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  exampleAnswer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
    marginBottom: 10,
    textAlign: 'center',
  },
  exampleExplanation: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
    marginBottom: 10,
    textAlign: 'justify',
  },
  exampleCategory: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
    textAlign: 'center',
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
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
});

