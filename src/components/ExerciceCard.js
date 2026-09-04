import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ExerciceCard({ workout, onDelete }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{workout.title}</Text>
        <Text style={styles.details}>
          {workout.category} • {workout.duration} min
        </Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(workout.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CCFF00',
  },
  details: {
    fontSize: 14,
    color: '#A1A1A1',
    marginTop: 4,
  },
  deleteBtn: {
    backgroundColor: '#331111',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: {
    color: '#FF5252',
    fontSize: 12,
    fontWeight: 'bold',
  },
});