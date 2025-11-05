import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useFeedTheKrakenStore } from '../store/feedTheKrakenStore';
import { TURN_PHASE, NAVIGATION_CARDS } from '../store/feedTheKrakenStore';
import { NAVIGATION_CARD_INFO } from '../constants/FeedTheKrakenGameData';

export const FeedTheKrakenNavigationCardSelector = () => {
  const {
    currentPhase,
    captainCards,
    lieutenantCards,
    navigatorCards,
    captainId,
    lieutenantId,
    navigatorId,
    captainPassCard,
    lieutenantPassCard,
    navigatorPlayCard,
    currentPlayerId,
    players,
  } = useFeedTheKrakenStore();

  const [showModal, setShowModal] = useState(false);
  const [availableCards, setAvailableCards] = useState([]);
  const [actionType, setActionType] = useState(''); // 'pass' or 'play'

  // Por ahora usar el primer jugador como currentPlayer (en producción sería dinámico)
  const currentPlayer = players.find(p => p.id === currentPlayerId) || players[0];

  // Determinar si el jugador actual debe ver el selector
  React.useEffect(() => {
    if (!currentPlayer) {
      setShowModal(false);
      return;
    }

    let shouldShow = false;
    let cards = [];
    let type = '';

    // Capitán pasa carta
    if (currentPhase === TURN_PHASE.CAPTAIN_CARD_PASS && 
        currentPlayer.id === captainId && 
        captainCards.length > 0) {
      cards = captainCards;
      type = 'pass';
      shouldShow = true;
    }
    // Teniente pasa carta
    else if (currentPhase === TURN_PHASE.LIEUTENANT_CARD_PASS && 
        currentPlayer.id === lieutenantId && 
        lieutenantCards.length > 0) {
      cards = lieutenantCards;
      type = 'pass';
      shouldShow = true;
    }
    // Navegante juega carta
    else if (currentPhase === TURN_PHASE.NAVIGATOR_CARD_PLAY && 
        currentPlayer.id === navigatorId && 
        navigatorCards.length > 0) {
      cards = navigatorCards;
      type = 'play';
      shouldShow = true;
    }

    if (shouldShow) {
      setAvailableCards(cards);
      setActionType(type);
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [currentPhase, captainCards, lieutenantCards, navigatorCards, currentPlayer, captainId, lieutenantId, navigatorId]);

  const handleCardSelect = (cardIndex) => {
    if (currentPhase === TURN_PHASE.CAPTAIN_CARD_PASS) {
      captainPassCard(cardIndex);
    } else if (currentPhase === TURN_PHASE.LIEUTENANT_CARD_PASS) {
      lieutenantPassCard(cardIndex);
    } else if (currentPhase === TURN_PHASE.NAVIGATOR_CARD_PLAY) {
      navigatorPlayCard(cardIndex);
    }
    setShowModal(false);
  };

  const getCardInfo = (cardType) => {
    return NAVIGATION_CARD_INFO[cardType] || NAVIGATION_CARD_INFO.blue;
  };

  if (!showModal || availableCards.length === 0) {
    return null;
  }

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {actionType === 'pass' ? 'Elige una carta para pasar' : 'Elige una carta para jugar'}
          </Text>
          <Text style={styles.modalDescription}>
            {actionType === 'pass' 
              ? 'Has recibido estas dos cartas de navegación. Elige una para pasarla en secreto al siguiente oficial.'
              : 'Elige una carta para jugar y determinar el rumbo del barco.'}
          </Text>

          <View style={styles.cardsContainer}>
            {availableCards.map((card, index) => {
              const cardInfo = getCardInfo(card);
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.cardButton, { backgroundColor: cardInfo.color }]}
                  onPress={() => handleCardSelect(index)}
                >
                  <Text style={styles.cardIcon}>{cardInfo.icon}</Text>
                  <Text style={styles.cardName}>{cardInfo.name}</Text>
                  <Text style={styles.cardDescription}>{cardInfo.description}</Text>
                  {cardInfo.lore && (
                    <Text style={styles.cardLore}>💭 {cardInfo.lore}</Text>
                  )}
                  {cardInfo.strategicValue && (
                    <Text style={styles.cardStrategic}>{cardInfo.strategicValue}</Text>
                  )}
                  {cardInfo.frequency && (
                    <Text style={styles.cardFrequency}>Frecuencia: {cardInfo.frequency}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.closeButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 25,
    width: '90%',
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  cardButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 150,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  cardIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 5,
  },
  cardLore: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8,
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 3,
  },
  cardStrategic: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 2,
  },
  cardFrequency: {
    fontSize: 9,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 2,
  },
  closeButton: {
    backgroundColor: '#666',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

