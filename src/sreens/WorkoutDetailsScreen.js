import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function WorkoutDetailsScreen({ workout, onBack, onEdit, onDelete }) {
  if (!workout) return null;

  // Mock visual dos dias da semana (D, S, T, Q, Q, S, S)
  const days = [
    { label: 'D', active: true },
    { label: 'S', active: true },
    { label: 'T', active: true },
    { label: 'Q', current: true },
    { label: 'Q', active: false },
    { label: 'S', active: false },
    { label: 'S', active: false },
  ];

  return (
    <View style={styles.container}>
      {/* Header Superior com ações */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Treino</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => onEdit(workout)} style={styles.iconBtn}>
            <Text style={styles.headerIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(workout.id)} style={styles.iconBtn}>
            <Text style={styles.headerIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.statusBadge}>TREINO CONCLUÍDO</Text>
        <Text style={styles.mainTitle}>{workout.title}</Text>

        {/* Cards de Métricas */}
        <View style={styles.cardsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>⏱️</Text>
            <Text style={styles.metricLabel}>Duração</Text>
            <Text style={styles.metricValue}>{workout.duration} min</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>🏋️</Text>
            <Text style={styles.metricLabel}>Categoria</Text>
            <Text style={styles.metricValue}>{workout.category || 'Força'}</Text>
          </View>
        </View>

        {/* Sequência Semanal */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionSubTitle}>Sequência Semanal</Text>
            <Text style={styles.fireIcon}>🔥</Text>
          </View>
          <View style={styles.daysRow}>
            {days.map((day, idx) => (
              <View key={idx} style={styles.dayCol}>
                <View
                  style={[
                    styles.dayCircle,
                    day.active && styles.dayActive,
                    day.current && styles.dayCurrent,
                  ]}
                >
                  <Text style={[styles.dayCheck, day.current && styles.dayCurrentText]}>
                    {day.active ? '✓' : day.current ? '⊙' : ''}
                  </Text>
                </View>
                <Text style={styles.dayLabel}>{day.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Detalhes da Rotina */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Detalhes da Rotina</Text>
          {workout.exercises && workout.exercises.length > 0 ? (
            workout.exercises.map((ex, index) => (
              <View key={ex.id || index} style={styles.exerciseItem}>
                <View style={styles.indexBox}>
                  <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{ex.name}</Text>
                  <Text style={styles.exerciseReps}>{ex.reps}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum exercício detalhado nesta rotina.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#121212',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  iconBtn: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  statusBadge: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
  },
  mainTitle: {
    color: '#CCFF00',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
    marginBottom: 20,
    textShadowColor: 'rgba(204, 255, 0, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
  },
  metricIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  metricLabel: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionCard: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionSubTitle: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: 'bold',
  },
  fireIcon: {
    fontSize: 14,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCol: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  dayActive: {
    backgroundColor: '#00E5FF',
  },
  dayCurrent: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00E5FF',
  },
  dayCheck: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dayCurrentText: {
    color: '#00E5FF',
  },
  dayLabel: {
    color: '#777777',
    fontSize: 11,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  indexBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  indexText: {
    color: '#888888',
    fontWeight: 'bold',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseReps: {
    color: '#888888',
    fontSize: 13,
    marginTop: 2,
  },
  emptyText: {
    color: '#666666',
    fontSize: 14,
  },
});