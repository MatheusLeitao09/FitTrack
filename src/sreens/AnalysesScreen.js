import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';

export default function AnalysesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header title="Análises" subtitle="Seu progresso semanal" />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Resumo das Atividades</Text>

        <View style={styles.statsRow}>
          <View style={styles.card}>
            <Text style={styles.cardValue}>24</Text>

            <Text style={styles.cardLabel}>Treinos Realizados</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardValue}>1.2k</Text>

            <Text style={styles.cardLabel}>Minutos Ativos</Text>
          </View>
        </View>

        <View style={styles.cardFull}>
          <Text style={styles.cardValue}>8.5k</Text>

          <Text style={styles.cardLabel}>Calorias Queimadas (kcal)</Text>
        </View>

        <Text style={styles.sectionTitle}>Progresso por Categoria</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Força</Text>

            <Text style={styles.progressValue}>60%</Text>
          </View>

          <View style={styles.barBg}>
            <View style={[styles.barFill, { width: '60%' }]} />
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Cardio</Text>

            <Text style={styles.progressValue}>35%</Text>
          </View>

          <View style={styles.barBg}>
            <View style={[styles.barFill, { width: '35%', backgroundColor: '#00E5FF' }]} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1E1E1E',
    width: '48%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardFull: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardValue: {
    color: '#CCFF00',
    fontSize: 26,
    fontWeight: 'bold',
  },
  cardLabel: {
    color: '#A1A1A1',
    fontSize: 12,
    marginTop: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  progressValue: {
    color: '#A1A1A1',
    fontSize: 14,
  },
  barBg: {
    backgroundColor: '#2A2A2A',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    backgroundColor: '#CCFF00',
    height: '100%',
  },
});