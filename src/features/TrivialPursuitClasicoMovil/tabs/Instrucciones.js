import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CATEGORIES } from '../constants/TrivialPursuitClasicoData';

export const TrivialPursuitClasicoMovilInstrucciones = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.title}>📖 Cómo Jugar Trivial Pursuit Clásico</Text>
        <Text style={styles.description}>
          Trivial Pursuit Clásico es el icónico juego de trivia que pone a prueba tus conocimientos generales. 
          El objetivo es ser el primer jugador en coleccionar los seis quesitos de colores y responder correctamente 
          la pregunta final en el centro del tablero.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objetivo del Juego</Text>
        <Text style={styles.sectionText}>
          Ser el primer jugador en coleccionar los seis quesitos de diferentes colores, cada uno representando una categoría, 
          y luego responder correctamente una pregunta final en el centro del tablero. En el modo rápido, solo necesitas 
          conseguir 3 quesitos para ganar.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Número de Jugadores</Text>
        <Text style={styles.sectionText}>
          El juego está diseñado para 2 a 6 jugadores. Cada jugador elige un color único para su ficha y se turna para jugar.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎲 Las Categorías y sus Quesitos</Text>
        <View style={styles.categoriasContainer}>
          {Object.values(CATEGORIES).map((categoria) => (
            <View key={categoria.id} style={[styles.categoriaCard, { borderColor: categoria.color }]}>
              <View style={[styles.categoriaHeader, { backgroundColor: categoria.color }]}>
                <Text style={styles.categoriaIcon}>{categoria.icon}</Text>
                <Text style={styles.categoriaName}>{categoria.name}</Text>
              </View>
              <Text style={styles.categoriaDescription}>
                Preguntas sobre {categoria.name.toLowerCase()} para poner a prueba tus conocimientos en esta área.
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Cómo Jugar</Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Configuración Inicial</Text>
            <Text style={styles.stepText}>
              Selecciona el número de jugadores (2-6) e introduce el nombre de cada jugador. 
              Elige entre modo Clásico (6 quesitos + centro) o modo Rápido (3 quesitos).
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Lanzar el Dado</Text>
            <Text style={styles.stepText}>
              En tu turno, presiona el botón del dado para lanzarlo. El resultado (1-6) te indica cuántas casillas 
              puedes moverte. En esta versión móvil, el dado simplemente determina que puedes responder una pregunta.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Seleccionar Categoría</Text>
            <Text style={styles.stepText}>
              Después de lanzar el dado, selecciona una de las seis categorías disponibles. 
              Cada categoría tiene un color distintivo y un icono.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Responder la Pregunta</Text>
            <Text style={styles.stepText}>
              Se te mostrará una pregunta de opción múltiple de la categoría seleccionada. 
              Toca la opción que creas correcta. El juego te indicará inmediatamente si acertaste o no.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>5</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Ganar un Quesito</Text>
            <Text style={styles.stepText}>
              Si respondes correctamente y aún no tienes el quesito de esa categoría, lo obtienes. 
              Si ya tienes ese quesito, puedes seguir jugando. Si fallas, el turno pasa al siguiente jugador.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>6</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Ir al Centro</Text>
            <Text style={styles.stepText}>
              Una vez que tengas los 6 quesitos (o 3 en modo rápido), debes ir al centro. 
              Los otros jugadores elegirán la categoría de la pregunta final.
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>7</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Pregunta Final</Text>
            <Text style={styles.stepText}>
              Si respondes correctamente la pregunta final, ¡ganas el juego! Si fallas, debes salir del centro 
              y volver a intentarlo en un turno posterior.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎮 Modos de Juego</Text>
        
        <View style={styles.modoCard}>
          <Text style={styles.modoTitle}>📚 Modo Clásico</Text>
          <Text style={styles.modoDescription}>
            Debes recolectar los 6 quesitos de todas las categorías y luego responder correctamente 
            la pregunta final en el centro. Es el modo tradicional del juego.
          </Text>
        </View>

        <View style={styles.modoCard}>
          <Text style={styles.modoTitle}>⚡ Modo Rápido</Text>
          <Text style={styles.modoDescription}>
            Solo necesitas conseguir 3 quesitos de cualquier categoría para ganar. 
            Ideal para partidas más cortas y dinámicas.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Consejos para Jugar Mejor</Text>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipItem}>✨ Lee cuidadosamente todas las opciones antes de responder</Text>
          <Text style={styles.tipItem}>🎯 Prioriza las categorías en las que tienes más conocimientos</Text>
          <Text style={styles.tipItem}>📚 Mantén un registro de qué quesitos tiene cada jugador</Text>
          <Text style={styles.tipItem}>⏱️ Tómate tu tiempo para pensar, no hay límite de tiempo</Text>
          <Text style={styles.tipItem}>🤝 En el modo rápido, enfócate en tus 3 categorías más fuertes</Text>
          <Text style={styles.tipItem}>🎉 ¡Disfruta y aprende mientras juegas!</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Reglas Importantes</Text>
        <View style={styles.rulesContainer}>
          <Text style={styles.ruleItem}>
            🎲 Solo puedes responder una pregunta por turno (excepto si ya tienes el quesito y aciertas)
          </Text>
          <Text style={styles.ruleItem}>
            ✅ Debes responder correctamente para ganar un quesito que no tienes
          </Text>
          <Text style={styles.ruleItem}>
            🔄 Si ya tienes un quesito y aciertas, puedes seguir jugando
          </Text>
          <Text style={styles.ruleItem}>
            ❌ Si fallas una pregunta, pierdes tu turno
          </Text>
          <Text style={styles.ruleItem}>
            🎯 Para ganar en modo clásico, necesitas los 6 quesitos y responder correctamente la pregunta final
          </Text>
          <Text style={styles.ruleItem}>
            🏆 Los otros jugadores eligen la categoría de la pregunta final
          </Text>
          <Text style={styles.ruleItem}>
            🔁 Si fallas la pregunta final, debes salir del centro e intentar de nuevo
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Seguimiento del Progreso</Text>
        <Text style={styles.sectionText}>
          En la pantalla de juego puedes ver:
        </Text>
        <View style={styles.infoList}>
          <Text style={styles.infoItem}>• Los quesitos que has conseguido (marcados con ✅)</Text>
          <Text style={styles.infoItem}>• Los quesitos que te faltan (marcados con ⬜)</Text>
          <Text style={styles.infoItem}>• El progreso de todos los jugadores</Text>
          <Text style={styles.infoItem}>• Qué jugador tiene el turno actual</Text>
          <Text style={styles.infoItem}>• Si algún jugador está en el centro</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ¡Que disfrutes jugando Trivial Pursuit Clásico! 🎉
        </Text>
        <Text style={styles.footerSubtext}>
          Demuestra que eres el que más sabe
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
    color: '#9B59B6',
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
    color: '#8E44AD',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 24,
  },
  categoriasContainer: {
    marginTop: 10,
  },
  categoriaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoriaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  categoriaIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  categoriaName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoriaDescription: {
    fontSize: 14,
    color: '#34495e',
    padding: 15,
    lineHeight: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#9B59B6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginBottom: 5,
  },
  stepText: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 22,
  },
  modoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#9B59B6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginBottom: 8,
  },
  modoDescription: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: '#F4ECF7',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#9B59B6',
  },
  tipItem: {
    fontSize: 15,
    color: '#6C3483',
    lineHeight: 28,
    marginBottom: 8,
  },
  rulesContainer: {
    backgroundColor: '#FFF5F7',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#E91E63',
  },
  ruleItem: {
    fontSize: 15,
    color: '#C0392B',
    lineHeight: 28,
    marginBottom: 8,
    fontWeight: '600',
  },
  infoList: {
    marginTop: 10,
    paddingLeft: 10,
  },
  infoItem: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 26,
    marginBottom: 8,
  },
  footer: {
    marginTop: 20,
    padding: 25,
    backgroundColor: '#9B59B6',
    borderRadius: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
});

