import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { CHARACTER_INFO } from '../constants/MascaradeCharacterData';

export const MascaradeRulesScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>📖 Reglas de Mascarade</Text>
          <Text style={styles.subtitle}>Guía Completa del Juego</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Descripción General</Text>
          <Text style={styles.sectionText}>
            Mascarade es un juego de identidades ocultas, faroleo y caos diseñado para 3 a 8 jugadores. 
            Cada participante recibe una carta de personaje con una habilidad única. El objetivo es ser 
            el primer jugador en acumular 13 monedas.
          </Text>
          <View style={styles.highlightBox}>
            <Text style={styles.highlightText}>
              ⚡ <Text style={styles.bold}>Duración estimada:</Text> 15-30 minutos{'\n'}
              👥 <Text style={styles.bold}>Jugadores:</Text> 3-8 personas{'\n'}
              🎲 <Text style={styles.bold}>Complejidad:</Text> Media{'\n'}
              🎯 <Text style={styles.bold}>Objetivo:</Text> Acumular 13 monedas
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎬 Preparación del Juego</Text>
          <View style={styles.stepList}>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepText}>
                Cada jugador recibe una carta de personaje al azar y <Text style={styles.bold}>6 monedas</Text>.
              </Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>
                Las cartas se colocan <Text style={styles.bold}>boca arriba</Text> para que todos las vean y memoricen.
                Tienes unos segundos para recordar quién tiene qué personaje.
              </Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepText}>
                Después de un momento, todos los jugadores ponen sus cartas <Text style={styles.bold}>boca abajo</Text>.
                Ahora comienza el verdadero juego de memoria y faroleo.
              </Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.stepText}>
                Las monedas sobrantes y las cartas de personaje no utilizadas se dejan en el centro, 
                formando el <Text style={styles.bold}>'Banco'</Text> y el <Text style={styles.bold}>'Juzgado'</Text>.
              </Text>
            </View>
          </View>
          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>💡 Consejo:</Text>
            <Text style={styles.tipText}>
              Presta mucha atención durante la fase de memorización. Una buena memoria puede ser tu mejor arma.
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Primeras Rondas (Fase de Caos)</Text>
          <Text style={styles.sectionText}>
            Durante las <Text style={styles.bold}>primeras cuatro rondas</Text> del juego, el jugador en turno 
            <Text style={styles.bold}> DEBE</Text> realizar la acción de 'Intercambiar Cartas'. Esta fase inicial 
            es crucial para mezclar las cartas y crear confusión.
          </Text>
          <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>📝 Ejemplo:</Text>
            <Text style={styles.exampleText}>
              En la ronda 1, Ana debe intercambiar cartas. Elige a Carlos, toma ambas cartas bajo la mesa, 
              y decide si realmente intercambiarlas o devolverlas. Nadie sabe qué decidió, ¡ni siquiera Carlos!
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Turno de un Jugador</Text>
          <Text style={styles.sectionText}>
            A partir de la <Text style={styles.bold}>quinta ronda</Text>, en tu turno, debes elegir 
            <Text style={styles.bold}> UNA</Text> de las siguientes tres acciones:
          </Text>
          
          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>🔄 a) Intercambiar (o no) Cartas</Text>
            <Text style={styles.actionText}>
              Toma tu carta y la de otro jugador. Pásalas por debajo de la mesa y decide si las intercambias 
              o se las devuelves a su dueño original. Ni tú ni el otro jugador pueden ver las cartas durante 
              este proceso.
            </Text>
            <View style={styles.strategyBox}>
              <Text style={styles.strategyText}>
                <Text style={styles.bold}>Estrategia:</Text> Puedes hacer un "falso intercambio" para confundir 
                a tus oponentes sobre quién tiene qué carta.
              </Text>
            </View>
          </View>

          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>👁️ b) Mirar tu Carta</Text>
            <Text style={styles.actionText}>
              En secreto, mira tu propia carta de personaje para recordar quién eres. Esto consume tu turno, 
              pero es vital si has olvidado tu personaje.
            </Text>
            <View style={styles.strategyBox}>
              <Text style={styles.strategyText}>
                <Text style={styles.bold}>Estrategia:</Text> Úsalo cuando no estés seguro de tu personaje, 
                especialmente después de múltiples intercambios.
              </Text>
            </View>
          </View>

          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>📢 c) Anunciar un Rol</Text>
            <Text style={styles.actionText}>
              Declara en voz alta 'Soy el [Nombre del Personaje]' (por ejemplo, 'Soy el Rey'). Esta es la acción 
              más arriesgada pero también la más poderosa.
            </Text>
            <View style={styles.strategyBox}>
              <Text style={styles.strategyText}>
                <Text style={styles.bold}>Estrategia:</Text> Puedes anunciar un personaje que no tienes 
                (farolear) si crees que nadie te desafiará. ¡Pero ten cuidado con los desafíos!
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚔️ El Desafío</Text>
          <Text style={styles.sectionText}>
            Después de que un jugador anuncie un rol, los demás jugadores (en el sentido de las agujas del reloj) 
            tienen la oportunidad de desafiarlo, afirmando también ser ese personaje. Pueden decir 
            <Text style={styles.bold}> '¡No, YO soy el [Nombre del Personaje]!'</Text> o simplemente pasar.
          </Text>
          <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>📝 Ejemplo:</Text>
            <Text style={styles.exampleText}>
              Ana anuncia: "Soy el Rey". Carlos cree que él es el Rey, así que desafía: "¡No, YO soy el Rey!". 
              María decide pasar. Ahora Ana y Carlos deben revelar sus cartas.
            </Text>
          </View>
          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>💡 Consejo:</Text>
            <Text style={styles.tipText}>
              Desafiar es arriesgado. Si desafías y estás equivocado, pagarás una multa. Pero si estás en lo cierto, 
              podrás usar el poder del personaje.
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Resolución de la Acción</Text>
          
          <View style={styles.resolutionCard}>
            <Text style={styles.resolutionTitle}>✅ Sin Desafíos</Text>
            <Text style={styles.resolutionText}>
              Si nadie desafía al jugador activo, este utiliza el poder del personaje que anunció, 
              <Text style={styles.bold}> sin necesidad de revelar su carta</Text>. ¡El farol puede tener éxito!
            </Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleTitle}>📝 Ejemplo:</Text>
              <Text style={styles.exampleText}>
                Ana anuncia "Soy el Rey" y nadie la desafía. Aunque Ana realmente tiene la carta de la Reina, 
                puede usar el poder del Rey (tomar 3 monedas del Banco) sin revelar su carta. ¡Un farol exitoso!
              </Text>
            </View>
          </View>

          <View style={styles.resolutionCard}>
            <Text style={styles.resolutionTitle}>⚔️ Con Desafíos</Text>
            <Text style={styles.resolutionText}>
              Si uno o más jugadores desafían la declaración, el jugador activo y todos los que lo desafiaron 
              deben <Text style={styles.bold}>revelar su carta simultáneamente</Text>.
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>
                ✅ El jugador que <Text style={styles.bold}>realmente</Text> tenga la carta del personaje anunciado 
                utiliza su poder inmediatamente.
              </Text>
              <Text style={styles.bulletItem}>
                ❌ Todos los jugadores que afirmaron ser el personaje pero revelaron una carta diferente deben 
                pagar una <Text style={styles.bold}>multa de 1 moneda al 'Juzgado'</Text>.
              </Text>
            </View>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleTitle}>📝 Ejemplo:</Text>
              <Text style={styles.exampleText}>
                Ana anuncia "Soy el Rey" y Carlos la desafía. Ambos revelan: Ana tiene la Reina, Carlos tiene el Rey. 
                Carlos usa el poder del Rey (toma 3 monedas) y Ana paga 1 moneda al Juzgado por ser un impostor.
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Condición de Victoria</Text>
          <Text style={styles.sectionText}>
            El juego termina <Text style={styles.bold}>inmediatamente</Text> cuando un jugador alcanza 
            <Text style={styles.bold}> 13 o más monedas</Text>, declarándose ganador.
          </Text>
          <View style={styles.victoryCard}>
            <Text style={styles.victoryTitle}>💰 Victoria por Monedas</Text>
            <Text style={styles.victoryText}>
              Tan pronto como un jugador llega a 13 monedas (o más), el juego termina y ese jugador gana.
            </Text>
          </View>
          <View style={styles.victoryCard}>
            <Text style={styles.victoryTitle}>💸 Victoria por Bancarrota</Text>
            <Text style={styles.victoryText}>
              Si un jugador queda en <Text style={styles.bold}>bancarrota (0 monedas)</Text>, el juego termina 
              y el jugador <Text style={styles.bold}>más rico</Text> en ese momento gana.
            </Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleTitle}>📝 Ejemplo:</Text>
              <Text style={styles.exampleText}>
                Carlos tiene 0 monedas después de una penalización. El juego termina. Ana tiene 8 monedas, 
                Luis tiene 10, y María tiene 7. Luis gana por ser el más rico.
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎭 Personajes del Juego</Text>
          <Text style={styles.sectionText}>
            Cada personaje tiene un poder único que puede cambiar el curso del juego. Conoce sus habilidades:
          </Text>
          {Object.entries(CHARACTER_INFO).map(([key, info]) => (
            <View key={key} style={[styles.characterCard, { borderLeftColor: info.color }]}>
              <View style={styles.characterHeader}>
                <View style={[styles.characterColorIndicator, { backgroundColor: info.color }]} />
                <Text style={styles.characterName}>{info.name}</Text>
              </View>
              <View style={styles.characterPowerBox}>
                <Text style={styles.characterPowerLabel}>💪 Poder:</Text>
                <Text style={styles.characterPower}>{info.power}</Text>
              </View>
              <Text style={styles.characterDescription}>{info.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎓 Estrategias Avanzadas</Text>
          
          <View style={styles.strategySection}>
            <Text style={styles.strategyTitle}>🧠 Memoria y Observación</Text>
            <Text style={styles.strategyText}>
              • Presta atención a los intercambios y anuncios para rastrear quién podría tener qué carta.{'\n'}
              • Observa las reacciones de otros jugadores cuando se anuncian personajes.{'\n'}
              • Lleva un registro mental de los poderes que se han usado.
            </Text>
          </View>

          <View style={styles.strategySection}>
            <Text style={styles.strategyTitle}>🎲 Farolear con Inteligencia</Text>
            <Text style={styles.strategyText}>
              • Anuncia personajes poderosos cuando creas que nadie te desafiará.{'\n'}
              • Si alguien ya anunció un personaje, puedes anunciarlo también para confundir.{'\n'}
              • Ten cuidado: un farol fallido te costará 1 moneda.
            </Text>
          </View>

          <View style={styles.strategySection}>
            <Text style={styles.strategyTitle}>⚔️ Cuándo Desafiar</Text>
            <Text style={styles.strategyText}>
              • Desafía si estás seguro de tener el personaje anunciado.{'\n'}
              • Desafía si crees que el anunciante está faroleando.{'\n'}
              • Considera no desafiar si el riesgo es alto y no estás seguro.
            </Text>
          </View>

          <View style={styles.strategySection}>
            <Text style={styles.strategyTitle}>🔄 Estrategia de Intercambios</Text>
            <Text style={styles.strategyText}>
              • En las primeras rondas, intercambia estratégicamente para crear confusión.{'\n'}
              • Puedes hacer "falsos intercambios" para que otros piensen que cambiaste de personaje.{'\n'}
              • Intercambia con jugadores que tienen personajes poderosos si quieres obtenerlos.
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  highlightBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  highlightText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#333',
  },
  stepList: {
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    backgroundColor: '#2196F3',
    color: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 12,
    marginTop: 2,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  tipBox: {
    backgroundColor: '#FFF9C4',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#666',
  },
  exampleBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  exampleTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#666',
    fontStyle: 'italic',
  },
  actionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#666',
    marginBottom: 8,
  },
  strategyBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
  },
  strategyText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#2E7D32',
  },
  resolutionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resolutionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  resolutionText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#666',
    marginBottom: 8,
  },
  bulletList: {
    marginTop: 8,
    marginBottom: 8,
  },
  bulletItem: {
    fontSize: 13,
    lineHeight: 20,
    color: '#666',
    marginBottom: 6,
  },
  victoryCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  victoryTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  victoryText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#666',
  },
  characterCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  characterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  characterColorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  characterPowerBox: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  characterPowerLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  characterPower: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
    fontWeight: '600',
  },
  characterDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  strategySection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  strategyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  strategyText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#666',
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

