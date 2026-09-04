import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import ExerciceCard from '../components/ExerciceCard';

export default function HomeScreen({ workouts, onDelete, onEdit, onOpenForm }) {
  return (
    <View style={styles.container}>
      <Header title="Meus Treinos" subtitle="FitTrack • Gestão & Persistência" />

      {workouts.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Nenhum treino registrado ainda</Text>
          <Text style={styles.emptySub}>
            Sua jornada começa agora! Toque no botão abaixo para adicionar sua primeira sessão.
          </Text>
        </View>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExerciceCard workout={item} onDelete={onDelete} onEdit={onEdit} />
          )}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={onOpenForm}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  list: {
    padding: 20,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySub: {
    color: '#777777',
    textAlign: 'center',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#CCFF00',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 28,
    color: '#000000',
    fontWeight: 'bold',
  },
});