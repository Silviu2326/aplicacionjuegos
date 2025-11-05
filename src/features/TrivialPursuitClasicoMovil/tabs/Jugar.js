import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Animated, TextInput, Modal } from 'react-native';
import { getRandomQuestion, getAllCategories, CATEGORIES } from '../constants/TrivialPursuitClasicoData';

export const TrivialPursuitClasicoMovilJugar = () => {
  // Estado de jugadores
  const [jugadores, setJugadores] = useState([]);
  const [jugadorActual, setJugadorActual] = useState(0);
  const [numJugadores, setNumJugadores] = useState(2);
  
  // Estado del juego
  const [estadoJuego, setEstadoJuego] = useState('config'); // config, jugando, pregunta, finalizado
  const [dadoResultado, setDadoResultado] = useState(null);
  const [mostrandoDado, setMostrandoDado] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [categoriaPregunta, setCategoriaPregunta] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [preguntasUsadas, setPreguntasUsadas] = useState([]);
  const [modoVictoria, setModoVictoria] = useState('normal'); // normal, rapido
  
  // Configuración
  const [nombresJugadores, setNombresJugadores] = useState(['Jugador 1', 'Jugador 2']);
  const [configurado, setConfigurado] = useState(false);
  
  // Animaciones
  const [dadoAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));

  // Colores para los jugadores
  const COLORES_JUGADORES = ['#E74C3C', '#3498DB', '#27AE60', '#F39C12', '#9B59B6', '#E91E63'];

  // Inicializar jugadores
  useEffect(() => {
    if (numJugadores >= 2 && numJugadores <= 6) {
      const nuevosJugadores = Array.from({ length: numJugadores }, (_, i) => ({
        id: i,
        nombre: nombresJugadores[i] || `Jugador ${i + 1}`,
        color: COLORES_JUGADORES[i],
        quesitos: {
          geografia: false,
          arte_literatura: false,
          historia: false,
          entretenimiento: false,
          ciencias_naturaleza: false,
          deportes_pasatiempos: false,
        },
        enCentro: false,
      }));
      setJugadores(nuevosJugadores);
    }
  }, [numJugadores]);

  // Actualizar nombres de jugadores
  useEffect(() => {
    if (jugadores.length > 0) {
      const nuevosJugadores = jugadores.map((jugador, i) => ({
        ...jugador,
        nombre: nombresJugadores[i] || jugador.nombre,
      }));
      setJugadores(nuevosJugadores);
    }
  }, [nombresJugadores]);

  // Animación de dado
  const lanzarDado = () => {
    setMostrandoDado(true);
    dadoAnim.setValue(0.5);
    
    Animated.sequence([
      Animated.timing(dadoAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dadoAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dadoAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dadoAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const resultado = Math.floor(Math.random() * 6) + 1;
      setDadoResultado(resultado);
    });
  };

  // Obtener nueva pregunta
  const obtenerNuevaPregunta = (categoriaId) => {
    let nuevaPregunta;
    let intentos = 0;
    
    do {
      nuevaPregunta = getRandomQuestion(categoriaId);
      intentos++;
    } while (preguntasUsadas.includes(nuevaPregunta.id) && intentos < 50);
    
    if (nuevaPregunta) {
      setPreguntaActual(nuevaPregunta);
      // Buscar la categoría por su id
      const categoriaEncontrada = Object.values(CATEGORIES).find(c => c.id === nuevaPregunta.categoria);
      setCategoriaPregunta(categoriaEncontrada || Object.values(CATEGORIES)[0]);
      setPreguntasUsadas([...preguntasUsadas, nuevaPregunta.id]);
      setRespuestaSeleccionada(null);
      setMostrarRespuesta(false);
      setEstadoJuego('pregunta');
      
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Alert.alert('¡Felicidades!', 'Has completado todas las preguntas disponibles. Reiniciando...');
      setPreguntasUsadas([]);
      obtenerNuevaPregunta(categoriaId);
    }
  };

  // Iniciar juego
  const iniciarJuego = () => {
    if (jugadores.length < 2) {
      Alert.alert('Error', 'Se necesitan al menos 2 jugadores');
      return;
    }
    
    setConfigurado(true);
    setEstadoJuego('jugando');
    setJugadorActual(0);
    setDadoResultado(null);
    setPreguntasUsadas([]);
  };

  // Seleccionar categoría después de lanzar dado
  const seleccionarCategoria = (categoriaId) => {
    obtenerNuevaPregunta(categoriaId);
  };

  // Responder pregunta
  const responderPregunta = (indiceRespuesta) => {
    setRespuestaSeleccionada(indiceRespuesta);
    setMostrarRespuesta(true);
    
    const correcta = indiceRespuesta === preguntaActual.respuesta;
    const jugador = jugadores[jugadorActual];
    const categoria = categoriaPregunta.id;
    
    if (correcta) {
      // Verificar si es una casilla de quesito
      const esCasillaQuesito = !jugador.quesitos[categoria];
      
      if (esCasillaQuesito) {
        // Ganar quesito
        const nuevosJugadores = [...jugadores];
        nuevosJugadores[jugadorActual].quesitos[categoria] = true;
        setJugadores(nuevosJugadores);
        
        // Verificar victoria
        const todosQuesitos = Object.values(nuevosJugadores[jugadorActual].quesitos).every(q => q === true);
        
        if (todosQuesitos && modoVictoria === 'normal') {
          // Debe ir al centro
          Alert.alert(
            '🎉 ¡Tienes todos los quesitos!',
            'Ahora debes ir al centro y responder una pregunta final. Los otros jugadores elegirán la categoría.',
            [
              {
                text: 'Ir al Centro',
                onPress: () => {
                  const jugadoresActualizados = [...nuevosJugadores];
                  jugadoresActualizados[jugadorActual].enCentro = true;
                  setJugadores(jugadoresActualizados);
                  setEstadoJuego('jugando');
                  setDadoResultado(null);
                },
              },
            ]
          );
          return;
        } else if (todosQuesitos && modoVictoria === 'rapido') {
          // Victoria inmediata en modo rápido
          finalizarJuego(nuevosJugadores[jugadorActual]);
          return;
        }
        
        Alert.alert('✅ Correcto', `¡Has ganado el quesito de ${categoriaPregunta.name}!`);
        setEstadoJuego('jugando');
        setDadoResultado(null);
        cambiarTurno();
      } else {
        // Ya tiene el quesito, puede seguir
        Alert.alert('✅ Correcto', 'Ya tienes este quesito. Puedes seguir jugando.');
        setEstadoJuego('jugando');
        setDadoResultado(null);
        // Puede volver a lanzar
      }
    } else {
      Alert.alert('❌ Incorrecto', `La respuesta correcta era: ${preguntaActual.opciones[preguntaActual.respuesta]}`);
      setEstadoJuego('jugando');
      setDadoResultado(null);
      cambiarTurno();
    }
  };

  // Pregunta final en el centro
  const iniciarPreguntaFinal = (categoriaId) => {
    obtenerNuevaPregunta(categoriaId);
  };

  // Responder pregunta final
  const responderPreguntaFinal = (indiceRespuesta) => {
    setRespuestaSeleccionada(indiceRespuesta);
    setMostrarRespuesta(true);
    
    const correcta = indiceRespuesta === preguntaActual.respuesta;
    const jugador = jugadores[jugadorActual];
    
    if (correcta) {
      finalizarJuego(jugador);
    } else {
      Alert.alert('❌ Incorrecto', 'Debes salir del centro e intentar de nuevo.');
      const nuevosJugadores = [...jugadores];
      nuevosJugadores[jugadorActual].enCentro = false;
      setJugadores(nuevosJugadores);
      setEstadoJuego('jugando');
      setDadoResultado(null);
      cambiarTurno();
    }
  };

  // Cambiar turno
  const cambiarTurno = () => {
    const siguienteJugador = (jugadorActual + 1) % jugadores.length;
    setJugadorActual(siguienteJugador);
  };

  // Finalizar juego
  const finalizarJuego = (ganador) => {
    setEstadoJuego('finalizado');
    
    Alert.alert(
      '🎉 ¡Juego Finalizado!',
      `🏆 ${ganador.nombre} es el ganador!\n\n¡Felicidades por completar todos los quesitos!`,
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

  // Resetear juego
  const resetearJuego = () => {
    const nuevosJugadores = jugadores.map(j => ({
      ...j,
      quesitos: {
        geografia: false,
        arte_literatura: false,
        historia: false,
        entretenimiento: false,
        ciencias_naturaleza: false,
        deportes_pasatiempos: false,
      },
      enCentro: false,
    }));
    setJugadores(nuevosJugadores);
    setJugadorActual(0);
    setEstadoJuego('jugando');
    setDadoResultado(null);
    setPreguntaActual(null);
    setPreguntasUsadas([]);
  };

  // Contar quesitos de un jugador
  const contarQuesitos = (jugador) => {
    return Object.values(jugador.quesitos).filter(q => q === true).length;
  };

  // Pantalla de configuración
  if (!configurado) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.configContainer}>
          <Text style={styles.configTitle}>⚙️ Configuración del Juego</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Número de Jugadores: {numJugadores}</Text>
            <View style={styles.sliderContainer}>
              <TouchableOpacity
                style={styles.sliderButton}
                onPress={() => setNumJugadores(Math.max(2, numJugadores - 1))}
              >
                <Text style={styles.sliderButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.sliderValue}>{numJugadores}</Text>
              <TouchableOpacity
                style={styles.sliderButton}
                onPress={() => setNumJugadores(Math.min(6, numJugadores + 1))}
              >
                <Text style={styles.sliderButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {Array.from({ length: numJugadores }).map((_, i) => (
            <View key={i} style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre del Jugador {i + 1}</Text>
              <TextInput
                style={styles.textInput}
                value={nombresJugadores[i] || ''}
                onChangeText={(text) => {
                  const nuevosNombres = [...nombresJugadores];
                  nuevosNombres[i] = text;
                  setNombresJugadores(nuevosNombres);
                }}
                placeholder={`Jugador ${i + 1}`}
                placeholderTextColor="#999"
              />
            </View>
          ))}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Modo de Juego</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[styles.radioButton, modoVictoria === 'normal' && styles.radioButtonActive]}
                onPress={() => setModoVictoria('normal')}
              >
                <Text style={[styles.radioText, modoVictoria === 'normal' && styles.radioTextActive]}>
                  Clásico (6 quesitos + centro)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, modoVictoria === 'rapido' && styles.radioButtonActive]}
                onPress={() => setModoVictoria('rapido')}
              >
                <Text style={[styles.radioText, modoVictoria === 'rapido' && styles.radioTextActive]}>
                  Rápido (3 quesitos)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={iniciarJuego}>
            <Text style={styles.startButtonText}>🎮 Iniciar Juego</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Pantalla de juego finalizado
  if (estadoJuego === 'finalizado') {
    const ganador = jugadores.find(j => 
      Object.values(j.quesitos).every(q => q === true) || 
      (modoVictoria === 'rapido' && contarQuesitos(j) >= 3)
    ) || jugadores[0];
    
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.finalContainer}>
          <Text style={styles.finalTitle}>🎉 ¡Juego Finalizado!</Text>
          
          <View style={styles.ganadorContainer}>
            <Text style={styles.ganadorText}>🏆 Ganador</Text>
            <Text style={styles.ganadorNombre}>{ganador.nombre}</Text>
            <Text style={styles.ganadorSubtext}>
              {contarQuesitos(ganador)} quesitos completados
            </Text>
          </View>
          
          <View style={styles.resultadosContainer}>
            <Text style={styles.resultadosTitle}>Resultados Finales</Text>
            {jugadores.map((jugador, i) => (
              <View key={i} style={styles.resultadoCard}>
                <View style={[styles.resultadoColor, { backgroundColor: jugador.color }]} />
                <Text style={styles.resultadoNombre}>{jugador.nombre}</Text>
                <Text style={styles.resultadoQuesitos}>{contarQuesitos(jugador)}/6</Text>
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

  const jugador = jugadores[jugadorActual];

  // Pantalla de pregunta
  if (estadoJuego === 'pregunta' && preguntaActual) {
    const esPreguntaFinal = jugador.enCentro;
    const categoria = categoriaPregunta || Object.values(CATEGORIES)[0];
    
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.jugadorHeader}>
          <View style={[styles.jugadorBadge, { backgroundColor: jugador.color }]}>
            <Text style={styles.jugadorNombre}>{jugador.nombre}</Text>
          </View>
          {esPreguntaFinal && (
            <Text style={styles.preguntaFinalText}>🎯 PREGUNTA FINAL</Text>
          )}
        </View>

        <Animated.View style={[styles.preguntaCard, { opacity: fadeAnim }]}>
          <View style={[styles.categoriaBadge, { backgroundColor: categoria.color }]}>
            <Text style={styles.categoriaIcon}>{categoria.icon}</Text>
            <Text style={styles.categoriaText}>{categoria.name}</Text>
          </View>
          
          <Text style={styles.preguntaText}>{preguntaActual.pregunta}</Text>
          
          <View style={styles.opcionesContainer}>
            {preguntaActual.opciones.map((opcion, i) => {
              let buttonStyle = styles.opcionButton;
              let textStyle = styles.opcionText;
              
              if (mostrarRespuesta) {
                if (i === preguntaActual.respuesta) {
                  buttonStyle = [styles.opcionButton, styles.opcionCorrecta];
                  textStyle = [styles.opcionText, styles.opcionTextCorrecta];
                } else if (i === respuestaSeleccionada && i !== preguntaActual.respuesta) {
                  buttonStyle = [styles.opcionButton, styles.opcionIncorrecta];
                  textStyle = [styles.opcionText, styles.opcionTextIncorrecta];
                }
              }
              
              return (
                <TouchableOpacity
                  key={i}
                  style={buttonStyle}
                  onPress={() => {
                    if (!mostrarRespuesta) {
                      if (esPreguntaFinal) {
                        responderPreguntaFinal(i);
                      } else {
                        responderPregunta(i);
                      }
                    }
                  }}
                  disabled={mostrarRespuesta}
                >
                  <Text style={textStyle}>{opcion}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          
          {mostrarRespuesta && (
            <TouchableOpacity
              style={styles.continuarButton}
              onPress={() => {
                setEstadoJuego('jugando');
                setPreguntaActual(null);
                setDadoResultado(null);
              }}
            >
              <Text style={styles.continuarButtonText}>Continuar</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
    );
  }

  // Pantalla principal del juego
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header con información del jugador actual */}
      <View style={styles.gameHeader}>
        <View style={[styles.jugadorActualCard, { borderColor: jugador.color }]}>
          <Text style={styles.turnoText}>Turno de:</Text>
          <Text style={[styles.jugadorActualNombre, { color: jugador.color }]}>
            {jugador.nombre}
          </Text>
          {jugador.enCentro && (
            <Text style={styles.centroText}>📍 En el Centro</Text>
          )}
        </View>
      </View>

      {/* Quesitos del jugador */}
      <View style={styles.quesitosContainer}>
        <Text style={styles.quesitosTitle}>Tus Quesitos ({contarQuesitos(jugador)}/6)</Text>
        <View style={styles.quesitosGrid}>
          {Object.values(CATEGORIES).map((categoria) => (
            <View key={categoria.id} style={styles.quesitoItem}>
              <View style={[
                styles.quesitoIcon,
                { backgroundColor: jugador.quesitos[categoria.id] ? categoria.color : '#ECECEC' },
              ]}>
                <Text style={styles.quesitoEmoji}>
                  {jugador.quesitos[categoria.id] ? '✅' : '⬜'}
                </Text>
              </View>
              <Text style={styles.quesitoLabel}>{categoria.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Dado */}
      {!dadoResultado && (
        <View style={styles.dadoContainer}>
          <TouchableOpacity style={styles.dadoButton} onPress={lanzarDado}>
            <Animated.View style={[styles.dado, { transform: [{ scale: dadoAnim }] }]}>
              <Text style={styles.dadoText}>🎲</Text>
              <Text style={styles.dadoLabel}>Lanzar Dado</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      )}

      {/* Resultado del dado y selección de categoría */}
      {dadoResultado && !preguntaActual && (
        <View style={styles.dadoResultContainer}>
          <Text style={styles.dadoResultText}>Has obtenido: {dadoResultado}</Text>
          
          {jugador.enCentro ? (
            <View style={styles.categoriasContainer}>
              <Text style={styles.categoriasTitle}>
                Los otros jugadores eligen la categoría para la pregunta final:
              </Text>
              <View style={styles.categoriasGrid}>
                {Object.values(CATEGORIES).map((categoria) => (
                  <TouchableOpacity
                    key={categoria.id}
                    style={[styles.categoriaButton, { backgroundColor: categoria.color }]}
                    onPress={() => iniciarPreguntaFinal(categoria.id)}
                  >
                    <Text style={styles.categoriaButtonIcon}>{categoria.icon}</Text>
                    <Text style={styles.categoriaButtonText}>{categoria.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.categoriasContainer}>
              <Text style={styles.categoriasTitle}>Selecciona una categoría:</Text>
              <View style={styles.categoriasGrid}>
                {Object.values(CATEGORIES).map((categoria) => {
                  const tieneQuesito = jugador.quesitos[categoria.id];
                  return (
                    <TouchableOpacity
                      key={categoria.id}
                      style={[
                        styles.categoriaButton,
                        { backgroundColor: categoria.color },
                        tieneQuesito && styles.categoriaButtonYaTiene,
                      ]}
                      onPress={() => seleccionarCategoria(categoria.id)}
                    >
                      <Text style={styles.categoriaButtonIcon}>{categoria.icon}</Text>
                      <Text style={styles.categoriaButtonText}>{categoria.name}</Text>
                      {tieneQuesito && (
                        <Text style={styles.yaTieneText}>✓ Ya tienes</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      )}

      {/* Lista de jugadores */}
      <View style={styles.jugadoresListContainer}>
        <Text style={styles.jugadoresListTitle}>Jugadores</Text>
        {jugadores.map((j, i) => (
          <View
            key={i}
            style={[
              styles.jugadorItem,
              i === jugadorActual && styles.jugadorItemActive,
            ]}
          >
            <View style={[styles.jugadorColorDot, { backgroundColor: j.color }]} />
            <Text style={styles.jugadorItemNombre}>{j.nombre}</Text>
            <Text style={styles.jugadorItemQuesitos}>
              {contarQuesitos(j)}/6
            </Text>
            {j.enCentro && <Text style={styles.centroBadge}>📍</Text>}
          </View>
        ))}
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
    padding: 15,
    paddingBottom: 30,
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
    color: '#9B59B6',
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
    backgroundColor: '#9B59B6',
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
    backgroundColor: '#9B59B6',
    borderColor: '#8E44AD',
  },
  radioText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  radioTextActive: {
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#9B59B6',
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
  gameHeader: {
    marginBottom: 15,
  },
  jugadorActualCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  turnoText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  jugadorActualNombre: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  centroText: {
    fontSize: 12,
    color: '#F39C12',
    marginTop: 5,
    fontWeight: '600',
  },
  quesitosContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quesitosTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 15,
    textAlign: 'center',
  },
  quesitosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
  },
  quesitoItem: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 10,
  },
  quesitoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  quesitoEmoji: {
    fontSize: 24,
  },
  quesitoLabel: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  dadoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  dadoButton: {
    alignItems: 'center',
  },
  dado: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#9B59B6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  dadoText: {
    fontSize: 50,
  },
  dadoLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  dadoResultContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dadoResultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9B59B6',
    textAlign: 'center',
    marginBottom: 20,
  },
  categoriasContainer: {
    marginTop: 10,
  },
  categoriasTitle: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  categoriasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
  },
  categoriaButton: {
    width: '30%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  categoriaButtonYaTiene: {
    opacity: 0.7,
  },
  categoriaButtonIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  categoriaButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  yaTieneText: {
    color: '#fff',
    fontSize: 9,
    marginTop: 3,
    fontWeight: '600',
  },
  jugadoresListContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jugadoresListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 15,
  },
  jugadorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
  },
  jugadorItemActive: {
    backgroundColor: '#F4ECF7',
    borderWidth: 2,
    borderColor: '#9B59B6',
  },
  jugadorColorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  jugadorItemNombre: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
  },
  jugadorItemQuesitos: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  centroBadge: {
    fontSize: 16,
    marginLeft: 5,
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
    marginTop: 15,
  },
  jugadorHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  jugadorBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  jugadorNombre: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  preguntaFinalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F39C12',
    marginTop: 5,
  },
  categoriaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 15,
    marginBottom: 20,
  },
  categoriaIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  categoriaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  preguntaText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 28,
  },
  opcionesContainer: {
    gap: 12,
  },
  opcionButton: {
    backgroundColor: '#f8f9fa',
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  opcionCorrecta: {
    backgroundColor: '#27AE60',
    borderColor: '#229954',
  },
  opcionIncorrecta: {
    backgroundColor: '#E74C3C',
    borderColor: '#C0392B',
  },
  opcionText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
    textAlign: 'center',
  },
  opcionTextCorrecta: {
    color: '#fff',
  },
  opcionTextIncorrecta: {
    color: '#fff',
  },
  continuarButton: {
    backgroundColor: '#9B59B6',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  continuarButtonText: {
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
    color: '#9B59B6',
    marginBottom: 30,
  },
  ganadorContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 25,
    backgroundColor: '#F4ECF7',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#9B59B6',
  },
  ganadorText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  ganadorNombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 10,
  },
  ganadorSubtext: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  resultadosContainer: {
    width: '100%',
    marginBottom: 30,
  },
  resultadosTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 15,
    textAlign: 'center',
  },
  resultadoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultadoColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  resultadoNombre: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
  },
  resultadoQuesitos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  resetButton: {
    backgroundColor: '#9B59B6',
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

