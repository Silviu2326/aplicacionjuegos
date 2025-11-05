import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const SuperheroeEnApurosInstrucciones = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🦸 ¿Qué es Superhéroe en Apuros?</Text>
        <Text style={styles.text}>
          Superhéroe en Apuros es un juego social de improvisación y creatividad diseñado para 
          2 o más jugadores, ideal para fiestas y reuniones. El objetivo principal no es competir, 
          sino generar risas y momentos memorables. La mecánica es sencilla: la aplicación asigna 
          a cada jugador una combinación única y aleatoria de un superpoder completamente absurdo 
          (como 'la capacidad de hablar con los muebles') y un problema mundano y cotidiano 
          (como 'se ha atascado la tostada en la tostadora').
        </Text>
        <Text style={styles.text}>
          El jugador en turno debe asumir su papel de superhéroe y narrar de la forma más épica, 
          creativa o hilarante posible cómo utilizaría su inútil poder para resolver la situación.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objetivo del Juego</Text>
        <Text style={styles.text}>
          El objetivo es crear historias divertidas y creativas combinando poderes absurdos con 
          problemas cotidianos. No hay ganadores ni perdedores oficiales, aunque opcionalmente se 
          puede activar un sistema de votación para que los demás jugadores elijan la historia 
          más ingeniosa de cada ronda. El juego fomenta el pensamiento rápido, la imaginación y 
          las habilidades narrativas.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎮 Cómo Jugar</Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Genera tu Misión</Text>
            <Text style={styles.stepText}>
              Presiona el botón "Generar Misión" para obtener una combinación aleatoria de un 
              superpoder absurdo y un problema cotidiano. La aplicación también generará un 
              nombre de superhéroe épico basado en tu poder.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Inicia tu Narración</Text>
            <Text style={styles.stepText}>
              Presiona "Iniciar Narración" para comenzar el temporizador. Tienes un tiempo límite 
              configurable (30, 60, 90 o 120 segundos) para improvisar y contar en voz alta una 
              historia sobre cómo resuelves el problema usando tu poder específico.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Sé Creativo y Diviértete</Text>
            <Text style={styles.stepText}>
              Cuenta tu historia de la forma más épica, creativa o hilarante posible. No hay 
              límites para tu imaginación. Puedes pausar y reanudar la narración si necesitas 
              pensar, o finalizarla cuando termines.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Votación (Opcional)</Text>
            <Text style={styles.stepText}>
              Si el modo de votación está activado, al finalizar la narración, los demás jugadores 
              pueden votar por tu historia. La aplicación registra los votos y tu puntuación.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>5</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Siguiente Turno</Text>
            <Text style={styles.stepText}>
              Pasa el dispositivo al siguiente jugador, quien repite el proceso desde el paso 1 
              para obtener una nueva misión. El juego puede continuar por el número de rondas que 
              los jugadores deseen.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Configuración</Text>
        
        <View style={styles.featureContainer}>
          <Text style={styles.featureTitle}>⏱️ Duración de Narración</Text>
          <Text style={styles.featureText}>
            Puedes configurar el tiempo disponible para cada narración:
          </Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>30 segundos:</Text>
            <Text style={styles.featureText}>
              Modo rápido, ideal para jugadores experimentados o cuando hay poco tiempo.
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>60 segundos:</Text>
            <Text style={styles.featureText}>
              Tiempo estándar, perfecto para la mayoría de jugadores.
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>90 segundos:</Text>
            <Text style={styles.featureText}>
              Tiempo extendido, ideal para historias más elaboradas.
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>120 segundos:</Text>
            <Text style={styles.featureText}>
              Tiempo máximo, para narraciones épicas y detalladas.
            </Text>
          </View>
        </View>

        <View style={styles.featureContainer}>
          <Text style={styles.featureTitle}>🗳️ Modo de Votación</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>Desactivado:</Text>
            <Text style={styles.featureText}>
              El juego se enfoca en la diversión y creatividad sin competencia. Perfecto para 
              grupos que solo quieren reírse y crear historias divertidas.
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>Activado:</Text>
            <Text style={styles.featureText}>
              Los demás jugadores pueden votar por las historias que más les gusten. Cada voto 
              suma puntos a tu puntuación. Ideal para grupos competitivos que quieren determinar 
              quién tiene la mejor historia.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Consejos y Estrategias</Text>
        
        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>🎭</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Actúa como un superhéroe:</Text> Adopta una personalidad 
            épica y dramática. Habla como si tu poder fuera el más importante del universo, incluso 
            si es completamente inútil.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>🤔</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Piensa fuera de la caja:</Text> Los poderes absurdos 
            requieren soluciones creativas. No intentes encontrar una solución lógica; encuentra 
            una forma hilarante e inesperada de usar tu poder.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>📖</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Construye una narrativa:</Text> No solo digas cómo 
            resolverías el problema. Cuenta una historia completa con un inicio, desarrollo y 
            final épico.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>😄</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>No tengas miedo al ridículo:</Text> Cuanto más absurda 
            y ridícula sea tu historia, más divertida será. El objetivo es hacer reír, no ser 
            serio.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>⏰</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Gestiona tu tiempo:</Text> Aprovecha el temporizador. 
            Puedes pausar si necesitas pensar, pero no te quedes demasiado tiempo en silencio.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>🎪</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Usa gestos y expresiones:</Text> Aunque estés narrando 
            en voz alta, los gestos y expresiones faciales pueden hacer tu historia aún más 
            divertida.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>🔄</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Aprovecha las combinaciones:</Text> A veces las 
            combinaciones más absurdas generan las mejores historias. No te desanimes si tu 
            poder parece completamente inútil para el problema.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Sistema de Puntuación</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Puntos:</Text> En modo votación, recibes 1 punto por cada 
          voto que obtenga tu historia.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Rondas:</Text> Se cuenta cada vez que completas una misión, 
          independientemente de si recibes votos o no.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Rachas:</Text> El juego registra tu mejor racha de votos 
          consecutivos. ¡Intenta batir tu récord!
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Historial:</Text> Todas tus partidas se guardan con detalles 
          completos de tus misiones, votos recibidos y tiempo utilizado.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎭 Ejemplos de Combinaciones</Text>
        <Text style={styles.text}>
          Aquí tienes algunos ejemplos de combinaciones que podrías obtener:
        </Text>
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleText}>
            <Text style={styles.exampleBold}>⚡ Superpoder:</Text> Controlar el crecimiento de las uñas
          </Text>
          <Text style={styles.exampleText}>
            <Text style={styles.exampleBold}>🚨 Problema:</Text> Se ha ido la luz en toda la casa
          </Text>
        </View>
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleText}>
            <Text style={styles.exampleBold}>⚡ Superpoder:</Text> Teletransportarse, pero solo a tiendas de calcetines
          </Text>
          <Text style={styles.exampleText}>
            <Text style={styles.exampleBold}>🚨 Problema:</Text> Te persigue una abeja muy insistente
          </Text>
        </View>
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleText}>
            <Text style={styles.exampleBold}>⚡ Superpoder:</Text> Hacer que cualquier queso cante ópera
          </Text>
          <Text style={styles.exampleText}>
            <Text style={styles.exampleBold}>🚨 Problema:</Text> El silencio en el ascensor es increíblemente incómodo
          </Text>
        </View>
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleText}>
            <Text style={styles.exampleBold}>⚡ Superpoder:</Text> Capacidad de oler los colores
          </Text>
          <Text style={styles.exampleText}>
            <Text style={styles.exampleBold}>🚨 Problema:</Text> Necesitas encontrar el mando a distancia de la tele
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎪 Modos de Juego</Text>
        
        <View style={styles.modeContainer}>
          <Text style={styles.modeTitle}>🎮 Modo Clásico</Text>
          <Text style={styles.modeText}>
            Cada jugador recibe una misión diferente y narra su historia. Los demás escuchan y 
            se divierten. Sin votación, sin competencia, solo diversión pura.
          </Text>
        </View>

        <View style={styles.modeContainer}>
          <Text style={styles.modeTitle}>🗳️ Modo Competitivo</Text>
          <Text style={styles.modeText}>
            Con el modo de votación activado, los jugadores votan por la mejor historia de cada 
            ronda. Al final de la partida, se puede ver quién obtuvo más votos y crear un 
            ranking divertido.
          </Text>
        </View>

        <View style={styles.modeContainer}>
          <Text style={styles.modeTitle}>🎭 Modo Dúo</Text>
          <Text style={styles.modeText}>
            Dos jugadores reciben la misma misión y deben narrar su solución. Los demás votan 
            por la mejor historia. Perfecto para crear rivalidades amistosas.
          </Text>
        </View>

        <View style={styles.modeContainer}>
          <Text style={styles.modeTitle}>🔗 Modo Cadena de Historias</Text>
          <Text style={styles.modeText}>
            El segundo jugador debe empezar su historia donde la terminó el anterior, creando 
            una narrativa colaborativa y caótica. ¡Las historias pueden volverse completamente 
            locas!
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❌ Errores Comunes</Text>
        
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ❌ <Text style={styles.bold}>Ser demasiado serio:</Text> Este es un juego para 
            reírse. No intentes encontrar soluciones lógicas o serias. Entre más absurdo, mejor.
          </Text>
        </View>

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ❌ <Text style={styles.bold}>No usar el poder:</Text> Asegúrate de que tu historia 
            realmente use el poder absurdo que te asignaron. No ignores el poder y cuentes una 
            historia normal.
          </Text>
        </View>

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ❌ <Text style={styles.bold}>Historia demasiado corta:</Text> Aprovecha el tiempo 
            disponible. Una historia de 5 segundos no es tan divertida como una narración épica 
            de 60 segundos.
          </Text>
        </View>

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ❌ <Text style={styles.bold}>No interactuar con el público:</Text> Mira a los demás 
            jugadores mientras narras. Ver sus reacciones puede inspirarte y hacer la experiencia 
            más divertida para todos.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Logros y Estadísticas</Text>
        <Text style={styles.text}>
          El juego registra todas tus partidas en el historial, incluyendo:
        </Text>
        <View style={styles.statsList}>
          <Text style={styles.statsItem}>• Puntuación total y por partida</Text>
          <Text style={styles.statsItem}>• Número de rondas completadas</Text>
          <Text style={styles.statsItem}>• Mejor racha de votos consecutivos</Text>
          <Text style={styles.statsItem}>• Tiempo total jugado</Text>
          <Text style={styles.statsItem}>• Promedio de votos por misión</Text>
          <Text style={styles.statsItem}>• Misiones más votadas</Text>
          <Text style={styles.statsItem}>• Tiempo promedio por narración</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎉 ¡Diviértete!</Text>
        <Text style={styles.text}>
          Superhéroe en Apuros es un juego que combina creatividad, improvisación y mucha diversión. 
          No te preocupes por ser perfecto; el objetivo es reírse y crear momentos memorables. 
          ¡Disfruta de las miles de combinaciones posibles y deja volar tu imaginación!
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Desarrollado para entretener y fomentar la creatividad, la improvisación y las risas 
          en grupo. ¡Que la diversión esté contigo!
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
  },
  section: {
    backgroundColor: '#ffffff',
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
    color: '#9B59B6',
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#9B59B6',
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
    color: '#2c3e50',
    marginBottom: 5,
  },
  stepText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  featureContainer: {
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  featureItem: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  featureLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 3,
  },
  featureText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#F4F1F8',
    borderRadius: 8,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  exampleContainer: {
    backgroundColor: '#F4F1F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#9B59B6',
  },
  exampleText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 5,
  },
  exampleBold: {
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  modeContainer: {
    backgroundColor: '#E8F8F5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  modeText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  errorContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#E74C3C',
  },
  errorText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  statsList: {
    marginTop: 10,
    paddingLeft: 10,
  },
  statsItem: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

