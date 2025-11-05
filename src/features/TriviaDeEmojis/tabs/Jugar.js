import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Animated, TextInput, Modal } from 'react-native';
import { getRandomQuestion, getAllCategories, CATEGORIES } from '../constants/TriviaDeEmojisData';

export const TriviaDeEmojisJugar = () => {
  // Estado de equipos/jugadores
  const [modoJuego, setModoJuego] = useState('equipos'); // 'equipos' o 'individual'
  const [equipo1, setEquipo1] = useState({ nombre: 'Equipo 1', puntuacion: 0 });
  const [equipo2, setEquipo2] = useState({ nombre: 'Equipo 2', puntuacion: 0 });
  const [jugadorActual, setJugadorActual] = useState(1);
  
  // Estado del juego
  const [rondaActual, setRondaActual] = useState(1);
  const [rondasTotales, setRondasTotales] = useState(10);
  const [puntuacionObjetivo, setPuntuacionObjetivo] = useState(15);
  const [modoVictoria, setModoVictoria] = useState('rondas'); // 'rondas' o 'puntos'
  
  // Estado de la pregunta actual
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [preguntasUsadas, setPreguntasUsadas] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState(null);
  
  // Estado del juego
  const [estadoJuego, setEstadoJuego] = useState('config'); // config, jugando, revelando, finalizado
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [equipoGanadorPunto, setEquipoGanadorPunto] = useState(null);
  
  // Configuración
  const [nombreEquipo1, setNombreEquipo1] = useState('Equipo 1');
  const [nombreEquipo2, setNombreEquipo2] = useState('Equipo 2');
  const [configurado, setConfigurado] = useState(false);
  
  // Animaciones
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));

  // Efecto para animación de entrada
  useEffect(() => {
    if (preguntaActual) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [preguntaActual]);

  // Inicializar categorías por defecto
  useEffect(() => {
    if (categoriasSeleccionadas.length === 0) {
      setCategoriasSeleccionadas(Object.values(CATEGORIES));
    }
  }, []);

  const obtenerNuevaPregunta = () => {
    let nuevaPregunta;
    let intentos = 0;
    
    do {
      nuevaPregunta = getRandomQuestion(
        categoriasSeleccionadas.length > 0 ? categoriasSeleccionadas[Math.floor(Math.random() * categoriasSeleccionadas.length)] : null,
        dificultadSeleccionada
      );
      intentos++;
    } while (preguntasUsadas.includes(nuevaPregunta.id) && intentos < 50);
    
    if (nuevaPregunta) {
      setPreguntaActual(nuevaPregunta);
      setPreguntasUsadas([...preguntasUsadas, nuevaPregunta.id]);
      setMostrarRespuesta(false);
      setEquipoGanadorPunto(null);
    } else {
      // Si se agotaron las preguntas, reiniciar
      Alert.alert('¡Felicidades!', 'Has completado todas las preguntas disponibles. Reiniciando...');
      setPreguntasUsadas([]);
      obtenerNuevaPregunta();
    }
  };

  const iniciarJuego = () => {
    if (!nombreEquipo1.trim() || !nombreEquipo2.trim()) {
      Alert.alert('Error', 'Por favor, introduce nombres para ambos equipos');
      return;
    }
    
    setEquipo1({ nombre: nombreEquipo1, puntuacion: 0 });
    setEquipo2({ nombre: nombreEquipo2, puntuacion: 0 });
    setConfigurado(true);
    setEstadoJuego('jugando');
    setRondaActual(1);
    setJugadorActual(1);
    setPreguntasUsadas([]);
    obtenerNuevaPregunta();
  };

  const revelarRespuesta = () => {
    setMostrarRespuesta(true);
    setEstadoJuego('revelando');
  };

  const otorgarPunto = (equipo) => {
    if (equipo === 1) {
      setEquipo1({ ...equipo1, puntuacion: equipo1.puntuacion + 1 });
    } else {
      setEquipo2({ ...equipo2, puntuacion: equipo2.puntuacion + 1 });
    }
    setEquipoGanadorPunto(equipo);
  };

  const siguientePregunta = () => {
    // Verificar condiciones de victoria
    if (modoVictoria === 'puntos') {
      if (equipo1.puntuacion >= puntuacionObjetivo) {
        finalizarJuego(equipo1);
        return;
      }
      if (equipo2.puntuacion >= puntuacionObjetivo) {
        finalizarJuego(equipo2);
        return;
      }
    }
    
    if (modoVictoria === 'rondas' && rondaActual >= rondasTotales) {
      finalizarJuego(null);
      return;
    }
    
    // Cambiar turno
    const nuevoJugador = jugadorActual === 1 ? 2 : 1;
    setJugadorActual(nuevoJugador);
    
    if (nuevoJugador === 1) {
      setRondaActual(rondaActual + 1);
    }
    
    setEstadoJuego('jugando');
    obtenerNuevaPregunta();
  };

  const finalizarJuego = (ganador) => {
    setEstadoJuego('finalizado');
    
    Alert.alert(
      '🎉 ¡Juego Finalizado!',
      ganador
        ? `🏆 ${ganador.nombre} gana con ${ganador.puntuacion} puntos!\n\n${equipo1.nombre}: ${equipo1.puntuacion} puntos\n${equipo2.nombre}: ${equipo2.puntuacion} puntos`
        : `🤝 ¡Empate!\n\n${equipo1.nombre}: ${equipo1.puntuacion} puntos\n${equipo2.nombre}: ${equipo2.puntuacion} puntos`,
      [
        {
          text: 'Nueva Partida',
          onPress: resetearJuego,
        },
        {
          text: 'Ver Resultados',
          style: 'cancel',
        },
      ]
    );
  };

  const resetearJuego = () => {
    setEquipo1({ nombre: nombreEquipo1, puntuacion: 0 });
    setEquipo2({ nombre: nombreEquipo2, puntuacion: 0 });
    setRondaActual(1);
    setJugadorActual(1);
    setEstadoJuego('jugando');
    setPreguntasUsadas([]);
    setPreguntaActual(null);
    setMostrarRespuesta(false);
    setEquipoGanadorPunto(null);
    obtenerNuevaPregunta();
  };

  const toggleCategoria = (categoria) => {
    if (categoriasSeleccionadas.includes(categoria)) {
      if (categoriasSeleccionadas.length > 1) {
        setCategoriasSeleccionadas(categoriasSeleccionadas.filter(c => c !== categoria));
      } else {
        Alert.alert('Atención', 'Debes seleccionar al menos una categoría');
      }
    } else {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
    }
  };

  if (!configurado) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.configContainer}>
          <Text style={styles.configTitle}>⚙️ Configuración del Juego</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre del Equipo 1</Text>
            <TextInput
              style={styles.textInput}
              value={nombreEquipo1}
              onChangeText={setNombreEquipo1}
              placeholder="Introduce el nombre del equipo 1"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre del Equipo 2</Text>
            <TextInput
              style={styles.textInput}
              value={nombreEquipo2}
              onChangeText={setNombreEquipo2}
              placeholder="Introduce el nombre del equipo 2"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Modo de Victoria</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[styles.radioButton, modoVictoria === 'rondas' && styles.radioButtonActive]}
                onPress={() => setModoVictoria('rondas')}
              >
                <Text style={[styles.radioText, modoVictoria === 'rondas' && styles.radioTextActive]}>
                  Por Rondas
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, modoVictoria === 'puntos' && styles.radioButtonActive]}
                onPress={() => setModoVictoria('puntos')}
              >
                <Text style={[styles.radioText, modoVictoria === 'puntos' && styles.radioTextActive]}>
                  Por Puntos
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {modoVictoria === 'rondas' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Número de Rondas: {rondasTotales}</Text>
              <View style={styles.sliderContainer}>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => setRondasTotales(Math.max(5, rondasTotales - 5))}
                >
                  <Text style={styles.sliderButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.sliderValue}>{rondasTotales}</Text>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => setRondasTotales(Math.min(50, rondasTotales + 5))}
                >
                  <Text style={styles.sliderButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {modoVictoria === 'puntos' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Puntuación Objetivo: {puntuacionObjetivo}</Text>
              <View style={styles.sliderContainer}>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => setPuntuacionObjetivo(Math.max(5, puntuacionObjetivo - 5))}
                >
                  <Text style={styles.sliderButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.sliderValue}>{puntuacionObjetivo}</Text>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => setPuntuacionObjetivo(Math.min(50, puntuacionObjetivo + 5))}
                >
                  <Text style={styles.sliderButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Dificultad</Text>
            <View style={styles.difficultyContainer}>
              {['facil', 'medio', 'dificil'].map((diff) => (
                <TouchableOpacity
                  key={diff}
                  style={[
                    styles.difficultyButton,
                    dificultadSeleccionada === diff && styles.difficultyButtonActive,
                    dificultadSeleccionada === null && styles.difficultyButtonActive,
                  ]}
                  onPress={() => setDificultadSeleccionada(dificultadSeleccionada === diff ? null : diff)}
                >
                  <Text style={[
                    styles.difficultyText,
                    (dificultadSeleccionada === diff || dificultadSeleccionada === null) && styles.difficultyTextActive,
                  ]}>
                    {diff === 'facil' ? 'Fácil' : diff === 'medio' ? 'Medio' : 'Difícil'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Categorías</Text>
            <View style={styles.categoriesContainer}>
              {getAllCategories().map((categoria) => (
                <TouchableOpacity
                  key={categoria}
                  style={[
                    styles.categoryButton,
                    categoriasSeleccionadas.includes(categoria) && styles.categoryButtonActive,
                  ]}
                  onPress={() => toggleCategoria(categoria)}
                >
                  <Text style={[
                    styles.categoryText,
                    categoriasSeleccionadas.includes(categoria) && styles.categoryTextActive,
                  ]}>
                    {categoria}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={iniciarJuego}>
            <Text style={styles.startButtonText}>🎮 Iniciar Juego</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  if (estadoJuego === 'finalizado') {
    const ganador = equipo1.puntuacion > equipo2.puntuacion ? equipo1 :
                   equipo2.puntuacion > equipo1.puntuacion ? equipo2 : null;
    
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.finalContainer}>
          <Text style={styles.finalTitle}>🎉 ¡Juego Finalizado!</Text>
          
          {ganador ? (
            <View style={styles.ganadorContainer}>
              <Text style={styles.ganadorText}>🏆 Ganador</Text>
              <Text style={styles.ganadorNombre}>{ganador.nombre}</Text>
              <Text style={styles.ganadorPuntos}>{ganador.puntuacion} puntos</Text>
            </View>
          ) : (
            <View style={styles.empateContainer}>
              <Text style={styles.empateText}>🤝 ¡Empate!</Text>
            </View>
          )}
          
          <View style={styles.resultadosContainer}>
            <View style={styles.resultadoCard}>
              <Text style={styles.resultadoNombre}>{equipo1.nombre}</Text>
              <Text style={styles.resultadoPuntos}>{equipo1.puntuacion} puntos</Text>
            </View>
            <View style={styles.resultadoCard}>
              <Text style={styles.resultadoNombre}>{equipo2.nombre}</Text>
              <Text style={styles.resultadoPuntos}>{equipo2.puntuacion} puntos</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.resetButton} onPress={resetearJuego}>
            <Text style={styles.resetButtonText}>🔄 Nueva Partida</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Scoreboard */}
      <View style={styles.scoreboard}>
        <View style={[styles.scoreCard, jugadorActual === 1 && styles.scoreCardActive]}>
          <Text style={styles.scoreNombre}>{equipo1.nombre}</Text>
          <Text style={styles.scorePuntos}>{equipo1.puntuacion}</Text>
          {jugadorActual === 1 && <Text style={styles.turnoText}>👈 Tu turno</Text>}
        </View>
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
          <Text style={styles.rondaText}>Ronda {rondaActual}</Text>
        </View>
        <View style={[styles.scoreCard, jugadorActual === 2 && styles.scoreCardActive]}>
          <Text style={styles.scoreNombre}>{equipo2.nombre}</Text>
          <Text style={styles.scorePuntos}>{equipo2.puntuacion}</Text>
          {jugadorActual === 2 && <Text style={styles.turnoText}>👈 Tu turno</Text>}
        </View>
      </View>

      {/* Pregunta Actual */}
      {preguntaActual && (
        <ScrollView style={styles.gameContainer} contentContainerStyle={styles.gameContent}>
          <Animated.View
            style={[
              styles.preguntaCard,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.categoriaBadge}>
              <Text style={styles.categoriaText}>{preguntaActual.categoria}</Text>
            </View>
            
            <View style={styles.emojisContainer}>
              <Text style={styles.emojisText}>{preguntaActual.emojis}</Text>
            </View>
            
            {!mostrarRespuesta ? (
              <TouchableOpacity style={styles.revelarButton} onPress={revelarRespuesta}>
                <Text style={styles.revelarButtonText}>🔍 Revelar Respuesta</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.respuestaContainer}>
                <Text style={styles.respuestaLabel}>Respuesta:</Text>
                <Text style={styles.respuestaText}>{preguntaActual.respuesta}</Text>
                
                <View style={styles.puntosButtons}>
                  <TouchableOpacity
                    style={[styles.puntoButton, styles.puntoButton1]}
                    onPress={() => otorgarPunto(1)}
                  >
                    <Text style={styles.puntoButtonText}>
                      ✅ {equipo1.nombre} +1
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.puntoButton, styles.puntoButton2]}
                    onPress={() => otorgarPunto(2)}
                  >
                    <Text style={styles.puntoButtonText}>
                      ✅ {equipo2.nombre} +1
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.puntoButton, styles.puntoButtonSkip]}
                    onPress={siguientePregunta}
                  >
                    <Text style={styles.puntoButtonText}>
                      ⏭️ Nadie
                    </Text>
                  </TouchableOpacity>
                </View>
                
                {equipoGanadorPunto && (
                  <TouchableOpacity style={styles.siguienteButton} onPress={siguientePregunta}>
                    <Text style={styles.siguienteButtonText}>➡️ Siguiente Pregunta</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </Animated.View>
        </ScrollView>
      )}
    </View>
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
  configContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  configTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#2c3e50',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  radioButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  radioButtonActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF5252',
  },
  radioText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  radioTextActive: {
    color: '#fff',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  sliderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sliderValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    minWidth: 40,
    textAlign: 'center',
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  difficultyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF5252',
  },
  difficultyText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  difficultyTextActive: {
    color: '#fff',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  categoryButtonActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF5252',
  },
  categoryText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#FF6B6B',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreboard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
  },
  scoreCardActive: {
    backgroundColor: '#FFF5F5',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  scoreNombre: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 5,
  },
  scorePuntos: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  turnoText: {
    fontSize: 10,
    color: '#FF6B6B',
    marginTop: 5,
    fontWeight: '600',
  },
  vsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7f8c8d',
  },
  rondaText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  gameContainer: {
    flex: 1,
  },
  gameContent: {
    padding: 20,
  },
  preguntaCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  categoriaBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  categoriaText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emojisContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    minHeight: 150,
  },
  emojisText: {
    fontSize: 64,
    textAlign: 'center',
  },
  revelarButton: {
    backgroundColor: '#FF6B6B',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  revelarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  respuestaContainer: {
    marginTop: 20,
  },
  respuestaLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 10,
    textAlign: 'center',
  },
  respuestaText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 25,
  },
  puntosButtons: {
    gap: 12,
  },
  puntoButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  puntoButton1: {
    backgroundColor: '#4ECDC4',
  },
  puntoButton2: {
    backgroundColor: '#FFE66D',
  },
  puntoButtonSkip: {
    backgroundColor: '#95A5A6',
  },
  puntoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  siguienteButton: {
    backgroundColor: '#FF6B6B',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  siguienteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  finalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 30,
  },
  ganadorContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 25,
    backgroundColor: '#FFF5F5',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  ganadorText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  ganadorNombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  ganadorPuntos: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  empateContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 25,
    backgroundColor: '#FFF9E6',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFC107',
  },
  empateText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  resultadosContainer: {
    width: '100%',
    gap: 15,
    marginBottom: 30,
  },
  resultadoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultadoNombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
  },
  resultadoPuntos: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

