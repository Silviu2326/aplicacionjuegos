import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MAP_ROOMS } from '../constants/AmongUsMesaGameSettings';

export const AmongUsMesaTaskItem = ({ task, onComplete, disabled = false }) => {
  const room = MAP_ROOMS.find(r => r.id === task.room);
  const isCompleted = task.completed;
  
  return (
    <View style={[styles.container, isCompleted && styles.completed]}>
      <View style={styles.taskInfo}>
        <View style={styles.taskHeader}>
          {task.icon && (
            <Text style={styles.taskIcon}>{task.icon}</Text>
          )}
          <Text style={[styles.taskName, isCompleted && styles.completedText]}>
            {task.name}
          </Text>
        </View>
        <Text style={[styles.taskDescription, isCompleted && styles.completedText]}>
          {task.description}
        </Text>
        <View style={styles.taskMeta}>
          <View style={styles.locationContainer}>
            <View
              style={[
                styles.roomIndicator,
                { backgroundColor: room?.color || '#ccc' },
              ]}
            />
            <Text style={styles.roomName}>{room?.name || task.room}</Text>
          </View>
          {task.difficulty && (
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>
                {task.difficulty === 'alta' ? '🔴' : task.difficulty === 'media' ? '🟡' : '🟢'} {task.difficulty}
              </Text>
            </View>
          )}
        </View>
      </View>
      {!isCompleted && !disabled && (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => onComplete && onComplete(task.id)}
        >
          <Text style={styles.completeButtonText}>Completar</Text>
        </TouchableOpacity>
      )}
      {isCompleted && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completed: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
  },
  taskInfo: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  taskMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  difficultyBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  roomName: {
    fontSize: 12,
    color: '#888',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  completeButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  checkmark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

