import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Animated } from 'react-native';
import { HISTORIAS_ORDENA_LA_HISTORIA, getRandomStory, getStoriesByDifficulty } from '../constants/HistoriasOrdenaLaHistoria';
import { OrdenaLaHistoriaTarjetaFrase } from '../components/TarjetaFrase';
import { OrdenaLaHistoriaHUD } from '../components/HUD';
import { OrdenaLaHistoriaContenedorOrdenMejorado } from '../components/ContenedorOrden';

export const OrdenaLaHistoriaJugar = () => {
  const [puntuacion, setPuntuacion] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [rondaActual, setRondaActual] = useState(0);
  const [historiaActual, setHistoriaActual] = useState(null);
  const [frasesMezcladas, setFrasesMezcladas] = useState([]);
  const [ordenCorrecto, setOrdenCorrecto] = useState([]);
  const [ordenSeleccionado, setOrdenSeleccionado] = useState([]);
  const [dificultad, setDificultad] = useState('normal');
  const [estadoJuego, setEstadoJuego] = useState('idle'); // idle, playing, result, gameOver
  const [frasesReveladas, setFrasesReveladas] = useState({});
  const [fadeAnim] = useState(new Animated.Value(1));
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [mensajeFeedback, setMensajeFeedback] = useState('');
  const [tipoFeedback, setTipoFeedback] = useState('success');
  const [tiempoRestante, setTiempoRestante] = useState(null);
  const [tiempoTotal, setTiempoTotal] = useState(null);
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);

  useEffect(() => {
    if (estadoJuego === 'idle' || estadoJuego === 'result') {
      cargarNuevaRonda();
    }
  }, [rondaActual, dificultad]);

  useEffect(() => {
    if (tiempoRestante !== null && tiempoRestante > 0 && estadoJuego === 'playing') {
      const interval = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleTiempoAgotado();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [tiempoRestante, estadoJuego]);

  const cargarNuevaRonda = () => {
    let historia;
    
    if (paqueteSeleccionado) {
      const paquete = HISTORIAS_ORDENA_LA_HISTORIA[paqueteSeleccionado];
      if (paquete && paquete.stories.length > 0) {
        const historiasFiltradas = getStoriesByDifficulty(dificultad).filter(
          s => paquete.stories.some(ps => ps.id === s.id)
        );
        if (historiasFiltradas.length > 0) {
          historia = historiasFiltradas[Math.floor(Math.random() * historiasFiltradas.length)];
        } else {
          historia = paquete.stories[Math.floor(Math.random() * paquete.stories.length)];
        }
      }
    }
    
    if (!historia) {
      const historiasFiltradas = getStoriesByDifficulty(dificultad);
      if (historiasFiltradas.length > 0) {
        historia = historiasFiltradas[Math.floor(Math.random() * historiasFiltradas.length)];
      } else {
        historia = getRandomStory();
      }
    }

    if (!historia) return;

    const frases = [...historia.sentences];
    const ordenCorrecto = frases.map((_, index) => index);
    const frasesMezcladas = [...frases].sort(() => Math.random() - 0.5);

    setHistoriaActual(historia);
    setFrasesMezcladas(frasesMezcladas);
    setOrdenCorrecto(ordenCorrecto);
    setOrdenSeleccionado([]);
    setFrasesReveladas({});
    
    // Configurar tiempo según dificultad
    let tiempoBase = 300; // 5 minutos por defecto
    if (dificultad === 'facil') tiempoBase = 360; // 6 minutos
    else if (dificultad === 'dificil') tiempoBase = 240; // 4 minutos
    
    setTiempoTotal(tiempoBase);
    setTiempoRestante(tiempoBase);
    setEstadoJuego('playing');
    setMostrarFeedback(false);
  };

  const handleTiempoAgotado = () => {
    if (ordenSeleccionado.length === frasesMezcladas.length) {
      verificarOrden();
    } else {
      setMensajeFeedback('¡Tiempo agotado!');
      setTipoFeedback('error');
      mostrarAnimacionFeedback();
      const nuevaVida = vidas - 1;
      setVidas(nuevaVida);
      
      if (nuevaVida <= 0) {
        setTimeout(() => {
          mostrarGameOver();
        }, 2000);
      } else {
        setTimeout(() => {
          setRondaActual(rondaActual + 1);
          setEstadoJuego('idle');
        }, 2000);
      }
    }
  };

  const handleFraseSelect = (fraseTexto) => {
    if (estadoJuego !== 'playing') return;

    const indiceFrase = frasesMezcladas.indexOf(fraseTexto);
    if (indiceFrase === -1) return;

    // Revelar la frase
    setFrasesReveladas((prev) => ({
      ...prev,
      [indiceFrase]: true,
    }));

    // Si ya está en el orden, removerla
    if (ordenSeleccionado.includes(indiceFrase)) {
      setOrdenSeleccionado(ordenSeleccionado.filter((i) => i !== indiceFrase));
    } else {
      // Agregarla al final del orden
      if (ordenSeleccionado.length < frasesMezcladas.length) {
        setOrdenSeleccionado([...ordenSeleccionado, indiceFrase]);
      }
    }
  };

  const handleOrdenChange = (nuevoOrden) => {
    setOrdenSeleccionado(nuevoOrden);
  };

  const verificarOrden = () => {
    if (ordenSeleccionado.length !== frasesMezcladas.length) {
      Alert.alert('Completa el orden', 'Debes ordenar todas las frases antes de confirmar.');
      return;
    }

    const esCorrecto = JSON.stringify(ordenSeleccionado) === JSON.stringify(ordenCorrecto);

    if (esCorrecto) {
      setPuntuacion(puntuacion + 1);
      setMensajeFeedback('¡Correcto! 🎉');
      setTipoFeedback('success');
      mostrarAnimacionFeedback();
    } else {
      const nuevaVida = vidas - 1;
      setVidas(nuevaVida);
      setMensajeFeedback('Incorrecto. Pierdes una vida ❌');
      setTipoFeedback('error');
      mostrarAnimacionFeedback();

      if (nuevaVida <= 0) {
        setTimeout(() => {
          mostrarGameOver();
        }, 2000);
        return;
      }
    }

    setEstadoJuego('result');
    setTimeout(() => {
      setRondaActual(rondaActual + 1);
      setEstadoJuego('idle');
    }, 2500);
  };

  const mostrarAnimacionFeedback = () => {
    setMostrarFeedback(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMostrarFeedback(false);
      fadeAnim.setValue(1);
    });
  };

  const mostrarGameOver = () => {
    Alert.alert(
      '¡Fin del juego!',
      `Tu puntuación final: ${puntuacion} puntos\n¿Quieres jugar de nuevo?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Jugar de nuevo',
          onPress: () => {
            setPuntuacion(0);
            setVidas(3);
            setRondaActual(0);
            setEstadoJuego('idle');
            cargarNuevaRonda();
          },
        },
      ]
    );
  };

  const handleReset = () => {
    setPuntuacion(0);
    setVidas(3);
    setRondaActual(0);
    setOrdenSeleccionado([]);
    setFrasesReveladas({});
    cargarNuevaRonda();
  };

  const handleDificultadChange = (nuevaDificultad) => {
    setDificultad(nuevaDificultad);
    handleReset();
  };

  const handlePaqueteSelect = (paqueteId) => {
    setPaqueteSeleccionado(paqueteId);
    handleReset();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OrdenaLaHistoriaHUD 
        puntuacion={puntuacion} 
        vidas={vidas} 
        ronda={rondaActual + 1}
        dificultad={dificultad}
        onDificultadChange={handleDificultadChange}
        tiempoRestante={tiempoRestante}
        tiempoTotal={tiempoTotal}
      />

      {mostrarFeedback && (
        <Animated.View 
          style={[
            styles.feedbackContainer,
            { opacity: fadeAnim },
            tipoFeedback === 'success' ? styles.feedbackSuccess : styles.feedbackError,
          ]}
        >
          <Text style={styles.feedbackText}>{mensajeFeedback}</Text>
        </Animated.View>
      )}

      {/* Selector de paquete */}
      <View style={styles.paqueteSelector}>
        <Text style={styles.paqueteSelectorLabel}>Paquete de historias:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.paqueteButton,
              paqueteSeleccionado === null && styles.paqueteButtonSelected,
            ]}
            onPress={() => handlePaqueteSelect(null)}
          >
            <Text style={styles.paqueteButtonText}>🎲 Aleatorio</Text>
          </TouchableOpacity>
          {Object.values(HISTORIAS_ORDENA_LA_HISTORIA).map((paquete) => (
            <TouchableOpacity
              key={paquete.id}
              style={[
                styles.paqueteButton,
                paqueteSeleccionado === paquete.id && styles.paqueteButtonSelected,
              ]}
              onPress={() => handlePaqueteSelect(paquete.id)}
            >
              <Text style={styles.paqueteButtonText}>
                {paquete.icon} {paquete.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {historiaActual && frasesMezcladas.length > 0 && (
        <>
          <View style={styles.historiaInfo}>
            <Text style={styles.historiaTitulo}>{historiaActual.title}</Text>
            <Text style={styles.historiaCategoria}>
              {Object.values(HISTORIAS_ORDENA_LA_HISTORIA).find(p => 
                p.stories.some(s => s.id === historiaActual.id)
              )?.name || 'Historia'}
            </Text>
          </View>

          <View style={styles.gameArea}>
            <Text style={styles.sectionTitle}>Frases Disponibles</Text>
            <Text style={styles.sectionSubtitle}>
              Toca cada frase para revelarla y ordenarla
            </Text>
            
            <View style={styles.frasesGrid}>
              {frasesMezcladas.map((frase, index) => {
                const isRevealed = frasesReveladas[index] || false;
                const isSelected = ordenSeleccionado.includes(index);
                const positionInOrder = ordenSeleccionado.indexOf(index);
                
                return (
                  <OrdenaLaHistoriaTarjetaFrase
                    key={index}
                    frase={frase}
                    index={positionInOrder !== -1 ? positionInOrder : null}
                    isSelected={isSelected}
                    isRevealed={isRevealed}
                    onPress={() => handleFraseSelect(frase)}
                  />
                );
              })}
            </View>
          </View>

          <OrdenaLaHistoriaContenedorOrdenMejorado
            frases={frasesMezcladas}
            ordenSeleccionado={ordenSeleccionado}
            onOrdenChange={handleOrdenChange}
          />

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                (ordenSeleccionado.length !== frasesMezcladas.length || estadoJuego !== 'playing') && styles.confirmButtonDisabled,
              ]}
              onPress={verificarOrden}
              disabled={ordenSeleccionado.length !== frasesMezcladas.length || estadoJuego !== 'playing'}
            >
              <Text style={styles.confirmButtonText}>
                Confirmar Orden ({ordenSeleccionado.length}/{frasesMezcladas.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reiniciar Partida</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  },
  gameArea: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  frasesGrid: {
    marginBottom: 20,
  },
  historiaInfo: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historiaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  historiaCategoria: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  paqueteSelector: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paqueteSelectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 12,
  },
  paqueteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paqueteButtonSelected: {
    backgroundColor: '#4ECDC4',
    borderColor: '#45B7D1',
  },
  paqueteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  actionsContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  feedbackContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  feedbackSuccess: {
    backgroundColor: '#27ae60',
  },
  feedbackError: {
    backgroundColor: '#e74c3c',
  },
  feedbackText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

