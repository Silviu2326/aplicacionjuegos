import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const OrdenaLaHistoriaInstrucciones = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 ¿Qué es Ordena la Historia?</Text>
        <Text style={styles.text}>
          Ordena la Historia es un juego de comunicación y deducción donde los jugadores deben 
          reconstruir una historia dividida en fragmentos. Cada jugador recibe una frase secreta 
          y debe describirla sin leerla textualmente, colaborando con el equipo para determinar 
          el orden correcto de las frases.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objetivo del Juego</Text>
        <Text style={styles.text}>
          El objetivo es ordenar correctamente todas las frases de una historia en el orden 
          cronológico correcto. Los jugadores trabajan en equipo para comunicarse y deducir 
          cuál es el orden adecuado basándose en las descripciones de cada frase.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎮 Cómo Jugar</Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Selecciona un Paquete</Text>
            <Text style={styles.stepText}>
              Elige un paquete de historias (Aventura, Ciencia Ficción, Comedia, etc.) o 
              deja que el juego elija aleatoriamente.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Revela las Frases</Text>
            <Text style={styles.stepText}>
              Toca cada frase para revelarla. Una vez revelada, podrás ver su contenido 
              completo. Recuerda: no puedes leerla textualmente a otros jugadores.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Ordena las Frases</Text>
            <Text style={styles.stepText}>
              Basándote en las descripciones de cada frase, arrástralas al área de orden 
              seleccionado. Puedes reorganizarlas usando los botones ↑ y ↓ o eliminarlas 
              del orden si te equivocas.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Confirma el Orden</Text>
            <Text style={styles.stepText}>
              Una vez que hayas ordenado todas las frases, presiona "Confirmar Orden" para 
              verificar si es correcto. ¡Tienes tiempo limitado para completar cada ronda!
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Configuración</Text>
        
        <View style={styles.featureContainer}>
          <Text style={styles.featureTitle}>📊 Dificultades</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>Fácil:</Text>
            <Text style={styles.featureText}>
              Historias con 3-4 frases. Más tiempo disponible (6 minutos).
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>Normal:</Text>
            <Text style={styles.featureText}>
              Historias con 4-5 frases. Tiempo estándar (5 minutos).
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>Difícil:</Text>
            <Text style={styles.featureText}>
              Historias con 5-6 frases. Menos tiempo disponible (4 minutos).
            </Text>
          </View>
        </View>

        <View style={styles.featureContainer}>
          <Text style={styles.featureTitle}>📚 Paquetes de Historias</Text>
          <Text style={styles.featureText}>
            El juego incluye múltiples paquetes temáticos:
          </Text>
          <View style={styles.paquetesList}>
            <Text style={styles.paqueteItem}>🗺️ Aventura - Historias de exploración y tesoros</Text>
            <Text style={styles.paqueteItem}>🚀 Ciencia Ficción - Futuro y tecnología</Text>
            <Text style={styles.paqueteItem}>😄 Comedia - Situaciones divertidas</Text>
            <Text style={styles.paqueteItem}>🔍 Misterio - Enigmas y detectives</Text>
            <Text style={styles.paqueteItem}>💕 Romance - Historias de amor</Text>
            <Text style={styles.paqueteItem}>👻 Terror - Historias de miedo</Text>
            <Text style={styles.paqueteItem}>🧙 Fantasía - Magia y mundos mágicos</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Consejos y Estrategias</Text>
        
        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>💬</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Comunicación efectiva:</Text> Describe las acciones, 
            emociones y elementos clave de tu frase sin leerla palabra por palabra.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>🧠</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Pensamiento lógico:</Text> Busca palabras clave que 
            indiquen secuencia temporal (primero, después, finalmente, etc.) o causa-efecto.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>⏰</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Gestiona el tiempo:</Text> No te apresures, pero 
            tampoco pierdas demasiado tiempo en una sola frase. Prioriza el orden general primero.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>👥</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Trabajo en equipo:</Text> Escucha las descripciones 
            de otros jugadores y haz preguntas claras si algo no está claro.
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>🔄</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Reorganiza:</Text> No tengas miedo de cambiar el orden 
            si descubres nueva información. El orden es editable hasta que confirmes.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Sistema de Puntuación</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Puntos:</Text> Ganas 1 punto por cada historia ordenada correctamente.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Vidas:</Text> Comienzas con 3 vidas. Pierdes 1 vida por cada 
          respuesta incorrecta o cuando se agota el tiempo.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Rachas:</Text> El juego registra tu mejor racha de respuestas 
          correctas consecutivas. ¡Intenta batir tu récord!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Modo de Juego Individual</Text>
        <Text style={styles.text}>
          En este modo, juegas solo contra el tiempo. Se te asignan todas las frases de una historia 
          y debes ordenarlas correctamente. Es ideal para practicar y mejorar tus habilidades de 
          deducción y análisis.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❌ Errores Comunes</Text>
        
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ❌ <Text style={styles.bold}>Leer la frase textualmente:</Text> Esto rompe el 
            propósito del juego. Describe la acción o el concepto, no las palabras exactas.
          </Text>
        </View>

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ❌ <Text style={styles.bold}>No escuchar a otros:</Text> Presta atención a las 
            descripciones de todos, no solo la tuya.
          </Text>
        </View>

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ❌ <Text style={styles.bold}>Confirmar sin revisar:</Text> Asegúrate de revisar 
            el orden completo antes de confirmar.
          </Text>
        </View>

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ❌ <Text style={styles.bold}>Ignorar el tiempo:</Text> El tiempo es limitado. 
            Gestiona bien tus minutos para no quedarte sin tiempo.
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
          <Text style={styles.statsItem}>• Mejor racha de respuestas correctas</Text>
          <Text style={styles.statsItem}>• Tiempo total jugado</Text>
          <Text style={styles.statsItem}>• Precisión porcentual</Text>
          <Text style={styles.statsItem}>• Historias completadas por paquete</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎉 ¡Diviértete!</Text>
        <Text style={styles.text}>
          Ordena la Historia es un juego que combina comunicación, deducción y trabajo en equipo. 
          ¡Disfruta reconstruyendo historias fascinantes y desafía tus habilidades de análisis!
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Desarrollado para entretener y mejorar habilidades de comunicación y pensamiento lógico.
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
    color: '#2c3e50',
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
    backgroundColor: '#4ECDC4',
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
    color: '#4ECDC4',
    marginBottom: 3,
  },
  featureText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  paquetesList: {
    marginTop: 10,
    paddingLeft: 10,
  },
  paqueteItem: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 5,
  },
  tipContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#E8F8F7',
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

