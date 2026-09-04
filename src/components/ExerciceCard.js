import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ExerciceCard({ workout, onDelete, onEdit }) {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{workout.title}</Text>
        <Text style={styles.details}>
          {workout.category} • {workout.duration} min
        </Text>
        {workout.exercises && workout.exercises.length > 0 && (
          <Text style={styles.subEntityText}>
            🏋️ {workout.exercises.length} exercício(s) detalhado(s)
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(workout)} style={styles.editBtn}>
          <Text style={styles.editBtnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(workout.id)} style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#CCFF00',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  details: {
    fontSize: 14,
    color: '#A1A1A1',
    marginTop: 4,
  },
  subEntityText: {
    fontSize: 12,
    color: '#CCFF00',
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  editBtn: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  editBtnText: {
    color: '#00E5FF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteBtn: {
    backgroundColor: '#331111',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  deleteBtnText: {
    color: '#FF5252',
    fontSize: 12,
    fontWeight: 'bold',
  },
});