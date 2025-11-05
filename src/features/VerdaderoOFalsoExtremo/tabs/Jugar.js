import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Animated, TextInput } from 'react-native';
import { getRandomQuestion, getAllCategories, CATEGORIES } from '../constants/VerdaderoOFalsoExtremoData';

export const VerdaderoOFalsoExtremoJugar = () => {
  // Estado de jugadores
  const [jugadores, setJugadores] = useState([]);
  const [modoJuego, setModoJuego] = useState('individual'); // 'individual' o 'multijugador'
  const [nombreJugador, setNombreJugador] = useState('');
  
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
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState(15);
  const [temporizadorActivo, setTemporizadorActivo] = useState(false);
  
  // Configuración
  const [configurado, setConfigurado] = useState(false);
  
  // Animaciones
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));
  const [pulseAnim] = useState(new Animated.Value(1));
  const timerAnimation = useRef(new Animated.Value(1)).current;

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

  // Efecto para temporizador
  useEffect(() => {
    let interval = null;
    if (temporizadorActivo && tiempoRestante > 0 && estadoJuego === 'jugando') {
      interval = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            setTemporizadorActivo(false);
            if (respuestaSeleccionada === null) {
              // Tiempo agotado sin respuesta
              setEstadoJuego('revelando');
              setMostrarRespuesta(true);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (tiempoRestante === 0 && estadoJuego === 'jugando' && respuestaSeleccionada === null) {
      setEstadoJuego('revelando');
      setMostrarRespuesta(true);
    }
    return () => clearInterval(interval);
  }, [temporizadorActivo, tiempoRestante, estadoJuego, respuestaSeleccionada]);

  // Animación del temporizador
  useEffect(() => {
    if (temporizadorActivo) {
      Animated.sequence([
        Animated.timing(timerAnimation, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(timerAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [tiempoRestante, temporizadorActivo]);

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
      setRespuestaSeleccionada(null);
      setTiempoRestante(15);
      setTemporizadorActivo(true);
    } else {
      Alert.alert('¡Felicidades!', 'Has completado todas las preguntas disponibles. Reiniciando...');
      setPreguntasUsadas([]);
      obtenerNuevaPregunta();
    }
  };

  const iniciarJuego = () => {
    if (modoJuego === 'multijugador' && jugadores.length < 2) {
      Alert.alert('Error', 'Necesitas al menos 2 jugadores para el modo multijugador');
      return;
    }
    
    if (modoJuego === 'individual' && !nombreJugador.trim()) {
      Alert.alert('Error', 'Por favor, introduce tu nombre');
      return;
    }
    
    if (modoJuego === 'individual') {
      setJugadores([{ nombre: nombreJugador, puntuacion: 0, aciertos: 0, fallos: 0 }]);
    }
    
    setConfigurado(true);
    setEstadoJuego('jugando');
    setRondaActual(1);
    setPreguntasUsadas([]);
    obtenerNuevaPregunta();
  };

  const seleccionarRespuesta = (esVerdadero) => {
    if (respuestaSeleccionada !== null || estadoJuego !== 'jugando') return;
    
    setRespuestaSeleccionada(esVerdadero);
    setTemporizadorActivo(false);
    
    // Calcular puntos según velocidad
    const puntosBase = 10;
    const puntosBonus = Math.floor(tiempoRestante / 3); // Bonus por velocidad
    const puntos = puntosBase + puntosBonus;
    
    const esCorrecto = preguntaActual.respuesta === esVerdadero;
    
    if (modoJuego === 'individual') {
      const jugadorActualizado = {
        ...jugadores[0],
        puntuacion: esCorrecto ? jugadores[0].puntuacion + puntos : jugadores[0].puntuacion,
        aciertos: esCorrecto ? jugadores[0].aciertos + 1 : jugadores[0].aciertos,
        fallos: !esCorrecto ? jugadores[0].fallos + 1 : jugadores[0].fallos,
      };
      setJugadores([jugadorActualizado]);
    } else {
      // En multijugador, cada jugador selecciona su respuesta
      // Por simplicidad, aquí solo actualizamos el primero que responde
      const jugadorActualizado = {
        ...jugadores[0],
        puntuacion: esCorrecto ? jugadores[0].puntuacion + puntos : jugadores[0].puntuacion,
        aciertos: esCorrecto ? jugadores[0].aciertos + 1 : jugadores[0].aciertos,
        fallos: !esCorrecto ? jugadores[0].fallos + 1 : jugadores[0].fallos,
      };
      setJugadores([jugadorActualizado, ...jugadores.slice(1)]);
    }
    
    setTimeout(() => {
      setEstadoJuego('revelando');
      setMostrarRespuesta(true);
    }, 500);
  };

  const siguientePregunta = () => {
    // Verificar condiciones de victoria
    if (modoVictoria === 'puntos') {
      const ganador = jugadores.find(j => j.puntuacion >= puntuacionObjetivo);
      if (ganador) {
        finalizarJuego(ganador);
        return;
      }
    }
    
    if (modoVictoria === 'rondas' && rondaActual >= rondasTotales) {
      finalizarJuego(null);
      return;
    }
    
    setRondaActual(rondaActual + 1);
    setEstadoJuego('jugando');
    setTiempoRestante(15);
    obtenerNuevaPregunta();
  };

  const finalizarJuego = (ganador) => {
    setEstadoJuego('finalizado');
    setTemporizadorActivo(false);
    
    if (ganador) {
      Alert.alert(
        '🎉 ¡Victoria!',
        `🏆 ${ganador.nombre} gana con ${ganador.puntuacion} puntos!\n\nAciertos: ${ganador.aciertos}\nFallos: ${ganador.fallos}`,
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
    } else {
      // Modo por rondas - ganador es el que tiene más puntos
      const ganadorFinal = jugadores.reduce((prev, current) => 
        (prev.puntuacion > current.puntuacion) ? prev : current
      );
      
      Alert.alert(
        '🎉 ¡Juego Finalizado!',
        `🏆 ${ganadorFinal.nombre} gana con ${ganadorFinal.puntuacion} puntos!\n\nAciertos: ${ganadorFinal.aciertos}\nFallos: ${ganadorFinal.fallos}`,
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
    }
  };

  const resetearJuego = () => {
    setJugadores(jugadores.map(j => ({ ...j, puntuacion: 0, aciertos: 0, fallos: 0 })));
    setRondaActual(1);
    setEstadoJuego('jugando');
    setPreguntasUsadas([]);
    setPreguntaActual(null);
    setMostrarRespuesta(false);
    setRespuestaSeleccionada(null);
    setTiempoRestante(15);
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

  const agregarJugador = () => {
    if (nombreJugador.trim()) {
      setJugadores([...jugadores, { nombre: nombreJugador, puntuacion: 0, aciertos: 0, fallos: 0 }]);
      setNombreJugador('');
    }
  };

  if (!configurado) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.configContainer}>
          <Text style={styles.configTitle}>⚙️ Configuración del Juego</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Modo de Juego</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[styles.radioButton, modoJuego === 'individual' && styles.radioButtonActive]}
                onPress={() => {
                  setModoJuego('individual');
                  setJugadores([]);
                }}
              >
                <Text style={[styles.radioText, modoJuego === 'individual' && styles.radioTextActive]}>
                  Individual
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, modoJuego === 'multijugador' && styles.radioButtonActive]}
                onPress={() => setModoJuego('multijugador')}
              >
                <Text style={[styles.radioText, modoJuego === 'multijugador' && styles.radioTextActive]}>
                  Multijugador
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {modoJuego === 'individual' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tu Nombre</Text>
              <TextInput
                style={styles.textInput}
                value={nombreJugador}
                onChangeText={setNombreJugador}
                placeholder="Introduce tu nombre"
                placeholderTextColor="#999"
              />
            </View>
          )}

          {modoJuego === 'multijugador' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Jugadores ({jugadores.length})</Text>
              <View style={styles.addPlayerContainer}>
                <TextInput
                  style={[styles.textInput, { flex: 1, marginRight: 10 }]}
                  value={nombreJugador}
                  onChangeText={setNombreJugador}
                  placeholder="Nombre del jugador"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.addButton} onPress={agregarJugador}>
                  <Text style={styles.addButtonText}>+ Agregar</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.jugadoresList}>
                {jugadores.map((jugador, index) => (
                  <View key={index} style={styles.jugadorItem}>
                    <Text style={styles.jugadorNombre}>{jugador.nombre}</Text>
                    <TouchableOpacity onPress={() => setJugadores(jugadores.filter((_, i) => i !== index))}>
                      <Text style={styles.removeButton}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

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
    const ganador = jugadores.reduce((prev, current) => 
      (prev.puntuacion > current.puntuacion) ? prev : current
    );
    
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.finalContainer}>
          <Text style={styles.finalTitle}>🎉 ¡Juego Finalizado!</Text>
          
          <View style={styles.ganadorContainer}>
            <Text style={styles.ganadorText}>🏆 Ganador</Text>
            <Text style={styles.ganadorNombre}>{ganador.nombre}</Text>
            <Text style={styles.ganadorPuntos}>{ganador.puntuacion} puntos</Text>
          </View>
          
          <View style={styles.resultadosContainer}>
            {jugadores.map((jugador, index) => (
              <View key={index} style={styles.resultadoCard}>
                <Text style={styles.resultadoNombre}>{jugador.nombre}</Text>
                <Text style={styles.resultadoPuntos}>{jugador.puntuacion} puntos</Text>
                <Text style={styles.resultadoStats}>
                  ✅ {jugador.aciertos} | ❌ {jugador.fallos}
                </Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.resetButton} onPress={resetearJuego}>
            <Text style={styles.resetButtonText}>🔄 Nueva Partida</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const porcentajeTiempo = (tiempoRestante / 15) * 100;
  const colorTiempo = tiempoRestante <= 5 ? '#E74C3C' : tiempoRestante <= 10 ? '#F39C12' : '#27AE60';

  return (
    <View style={styles.container}>
      {/* Scoreboard */}
      <View style={styles.scoreboard}>
        <Text style={styles.rondaText}>Ronda {rondaActual}/{rondasTotales}</Text>
        {jugadores.map((jugador, index) => (
          <View key={index} style={styles.scoreCard}>
            <Text style={styles.scoreNombre}>{jugador.nombre}</Text>
            <Text style={styles.scorePuntos}>{jugador.puntuacion}</Text>
          </View>
        ))}
      </View>

      {/* Temporizador */}
      {estadoJuego === 'jugando' && (
        <View style={styles.timerContainer}>
          <Animated.View
            style={[
              styles.timerCircle,
              {
                transform: [{ scale: timerAnimation }],
                borderColor: colorTiempo,
              },
            ]}
          >
            <Text style={[styles.timerText, { color: colorTiempo }]}>
              {tiempoRestante}
            </Text>
          </Animated.View>
        </View>
      )}

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
            
            <Text style={styles.preguntaText}>{preguntaActual.texto}</Text>
            
            {!mostrarRespuesta ? (
              <View style={styles.answerButtons}>
                <TouchableOpacity
                  style={[
                    styles.answerButton,
                    styles.trueButton,
                    respuestaSeleccionada === true && styles.answerButtonSelected,
                  ]}
                  onPress={() => seleccionarRespuesta(true)}
                  disabled={respuestaSeleccionada !== null}
                >
                  <Text style={styles.answerButtonText}>✅ VERDADERO</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.answerButton,
                    styles.falseButton,
                    respuestaSeleccionada === false && styles.answerButtonSelected,
                  ]}
                  onPress={() => seleccionarRespuesta(false)}
                  disabled={respuestaSeleccionada !== null}
                >
                  <Text style={styles.answerButtonText}>❌ FALSO</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.respuestaContainer}>
                <View style={[
                  styles.resultBadge,
                  preguntaActual.respuesta ? styles.resultTrue : styles.resultFalse,
                ]}>
                  <Text style={styles.resultBadgeText}>
                    {preguntaActual.respuesta ? '✅ VERDADERO' : '❌ FALSO'}
                  </Text>
                </View>
                
                {respuestaSeleccionada !== null && (
                  <View style={[
                    styles.userResult,
                    preguntaActual.respuesta === respuestaSeleccionada ? styles.userResultCorrect : styles.userResultWrong,
                  ]}>
                    <Text style={styles.userResultText}>
                      {preguntaActual.respuesta === respuestaSeleccionada ? '🎉 ¡Correcto!' : '😔 Incorrecto'}
                    </Text>
                  </View>
                )}
                
                <Text style={styles.explicacionText}>{preguntaActual.explicacion}</Text>
                
                <TouchableOpacity style={styles.siguienteButton} onPress={siguientePregunta}>
                  <Text style={styles.siguienteButtonText}>➡️ Siguiente Pregunta</Text>
                </TouchableOpacity>
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
    color: '#E74C3C',
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
    backgroundColor: '#E74C3C',
    borderColor: '#C0392B',
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
    backgroundColor: '#E74C3C',
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
    backgroundColor: '#E74C3C',
    borderColor: '#C0392B',
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
    backgroundColor: '#E74C3C',
    borderColor: '#C0392B',
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
    backgroundColor: '#E74C3C',
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
  addPlayerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#27AE60',
    padding: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  jugadoresList: {
    maxHeight: 150,
  },
  jugadorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  jugadorNombre: {
    fontSize: 16,
    color: '#2c3e50',
  },
  removeButton: {
    color: '#E74C3C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreboard: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#E74C3C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rondaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  scoreCard: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    minWidth: 100,
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
    color: '#E74C3C',
  },
  timerContainer: {
    alignItems: 'center',
    padding: 20,
  },
  timerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
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
    borderColor: '#E74C3C',
  },
  categoriaBadge: {
    backgroundColor: '#E74C3C',
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
  preguntaText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 30,
  },
  answerButtons: {
    gap: 15,
  },
  answerButton: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 3,
  },
  trueButton: {
    backgroundColor: '#27AE60',
    borderColor: '#229954',
  },
  falseButton: {
    backgroundColor: '#E74C3C',
    borderColor: '#C0392B',
  },
  answerButtonSelected: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  answerButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  respuestaContainer: {
    marginTop: 20,
  },
  resultBadge: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  resultTrue: {
    backgroundColor: '#D5F4E6',
    borderWidth: 3,
    borderColor: '#27AE60',
  },
  resultFalse: {
    backgroundColor: '#FADBD8',
    borderWidth: 3,
    borderColor: '#E74C3C',
  },
  resultBadgeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  userResult: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  userResultCorrect: {
    backgroundColor: '#D5F4E6',
  },
  userResultWrong: {
    backgroundColor: '#FADBD8',
  },
  userResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  explicacionText: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 20,
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
  },
  siguienteButton: {
    backgroundColor: '#E74C3C',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
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
    color: '#E74C3C',
    marginBottom: 30,
  },
  ganadorContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 25,
    backgroundColor: '#FFF5F5',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#E74C3C',
  },
  ganadorText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  ganadorNombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 10,
  },
  ganadorPuntos: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
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
    marginBottom: 5,
  },
  resultadoPuntos: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 5,
  },
  resultadoStats: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  resetButton: {
    backgroundColor: '#E74C3C',
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

