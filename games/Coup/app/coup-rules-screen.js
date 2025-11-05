import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export const CoupRulesScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reglas de Coup</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción General</Text>
          <Text style={styles.paragraph}>
            Coup es un juego de engaño y deducción ambientado en un futuro distópico donde los jugadores son líderes de familias influyentes en una ciudad-estado corrupta. El objetivo es ser el último jugador con influencia.
          </Text>
          <Text style={styles.paragraph}>
            Cada jugador comienza con dos cartas de personaje boca abajo (influencia) y dos monedas. Estas cartas pertenecen a una de cinco clases: Duque, Asesino, Capitán, Embajador o Condesa.
          </Text>
          <Text style={styles.paragraph}>
            La clave del juego es que puedes realizar cualquier acción de personaje, independientemente de las cartas que realmente tengas. Sin embargo, cualquier otro jugador puede desafiar tu acción.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparación</Text>
          <Text style={styles.paragraph}>
            Cada jugador recibe 2 monedas y 2 cartas de personaje (influencia) boca abajo. El resto de las cartas forman el mazo de la Corte y las monedas restantes forman el Tesoro.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Turno del Jugador</Text>
          <Text style={styles.paragraph}>
            En tu turno, debes realizar UNA acción. Las acciones disponibles son:
          </Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Ingreso:</Text> Toma 1 moneda del Tesoro. No se puede desafiar ni bloquear.</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Ayuda Exterior:</Text> Toma 2 monedas del Tesoro. Cualquier jugador puede bloquear esta acción afirmando tener un Duque.</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Golpe de Estado (Coup):</Text> Paga 7 monedas al Tesoro y elige a otro jugador para que pierda una influencia. Esta acción es imparable. Si comienzas tu turno con 10 o más monedas, DEBES realizar esta acción.</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Acción de Personaje:</Text> Realiza la acción de uno de los 5 personajes. Puedes hacer esto incluso si no tienes la carta (farolear).</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones de Personaje</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Duque (Impuesto):</Text> Toma 3 monedas del Tesoro.</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Asesino (Asesinar):</Text> Paga 3 monedas y elige a un jugador para que pierda una influencia. Puede ser bloqueado por un jugador que afirme tener una Condesa.</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Capitán (Extorsionar):</Text> Roba 2 monedas de otro jugador. Puede ser bloqueado por un jugador que afirme tener un Capitán o un Embajador.</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Embajador (Intercambio):</Text> Roba 2 cartas del mazo, míralas junto con tus cartas actuales y devuelve 2 cartas al mazo.</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Condesa:</Text> Bloquea un intento de Asesinato contra ti.</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desafíos</Text>
          <Text style={styles.paragraph}>
            Después de que un jugador declare una acción de personaje (o un bloqueo), cualquier otro jugador puede decir '¡Te desafío!'.
          </Text>
          <Text style={styles.paragraph}>
            El jugador desafiado debe revelar la carta de personaje correspondiente:
          </Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Si tiene la carta (Desafío Falla):</Text> El retador pierde una influencia. El jugador desafiado baraja la carta revelada en el mazo, roba una nueva y la acción se resuelve.</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Si no tiene la carta (Desafío Exitoso):</Text> El jugador desafiado pierde una influencia por su farol y la acción se anula.</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pérdida de Influencia</Text>
          <Text style={styles.paragraph}>
            Cuando un jugador pierde una influencia, debe elegir una de sus cartas boca abajo, voltearla y dejarla boca arriba. Esa carta y sus habilidades ya no se pueden usar.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eliminación y Victoria</Text>
          <Text style={styles.paragraph}>
            Cuando un jugador pierde sus dos influencias (sus dos cartas están boca arriba), queda eliminado del juego. El último jugador que conserve al menos una influencia gana la partida.
          </Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: '#666',
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 8,
    color: '#666',
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
