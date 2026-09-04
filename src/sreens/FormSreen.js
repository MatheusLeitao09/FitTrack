import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

const CATEGORIES = ['Força', 'Cardio', 'Yoga', 'Funcional', 'Crossfit'];

export default function FormSreen({ workoutToEdit, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Força');
  const [duration, setDuration] = useState('');
  
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');
  const [exercisesList, setExercisesList] = useState([]);

  useEffect(() => {
    if (workoutToEdit) {
      setTitle(workoutToEdit.title);
      setCategory(workoutToEdit.category || 'Força');
      setDuration(workoutToEdit.duration);
      setExercisesList(workoutToEdit.exercises || []);
    }
  }, [workoutToEdit]);

  const handleAddSubExercise = () => {
    if (!exerciseName || !exerciseReps) {
      Alert.alert('Atenção', 'Informe o nome e as repetições do exercício.');
      return;
    }
    const newEx = { id: Date.now().toString(), name: exerciseName, reps: exerciseReps };
    setExercisesList([...exercisesList, newEx]);
    setExerciseName('');
    setExerciseReps('');
  };

  const handleRemoveSubExercise = (id) => {
    setExercisesList(exercisesList.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    if (!title || !duration) {
      Alert.alert('Atenção', 'Preencha o título e a duração do treino!');
      return;
    }

    onSave({
      id: workoutToEdit ? workoutToEdit.id : null,
      title,
      category,
      duration,
      exercises: exercisesList,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        {workoutToEdit ? 'Editar Treino' : 'Registrar Novo Treino'}
      </Text>

      <Text style={styles.label}>Título do Treino</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Destruidor Matinal"
        placeholderTextColor="#666"
        value={title}
        onChangeText={setTitle}
      />

      {/* SELEÇÃO DE CATEGORIA */}
      <Text style={styles.label}>Selecionar Categoria</Text>
      <View style={styles.categoryContainer}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryBtn, category === cat && styles.categoryBtnActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Duração (minutos)</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: 45"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <View style={styles.subEntitySection}>
        <Text style={styles.subHeader}>🏋️ Exercícios da Rotina</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Exercício (ex: Supino Reto)"
          placeholderTextColor="#666"
          value={exerciseName}
          onChangeText={setExerciseName}
        />

        <TextInput
          style={styles.input}
          placeholder="Séries x Reps (ex: 3x12 - 80kg)"
          placeholderTextColor="#666"
          value={exerciseReps}
          onChangeText={setExerciseReps}
        />

        <TouchableOpacity style={styles.addSubBtn} onPress={handleAddSubExercise}>
          <Text style={styles.addSubBtnText}>+ Vincular Exercício</Text>
        </TouchableOpacity>

        {exercisesList.map((item) => (
          <View key={item.id} style={styles.subItemCard}>
            <Text style={styles.subItemText}>• {item.name} ({item.reps})</Text>
            <TouchableOpacity onPress={() => handleRemoveSubExercise(item.id)}>
              <Text style={styles.removeSubText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>
          {workoutToEdit ? 'Atualizar Treino' : 'Salvar Treino'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
        <Text style={styles.cancelBtnText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 6,
    color: '#FFFFFF',
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryBtn: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryBtnActive: {
    backgroundColor: '#CCFF00',
    borderColor: '#CCFF00',
  },
  categoryText: {
    color: '#AAA',
    fontSize: 13,
    fontWeight: 'bold',
  },
  categoryTextActive: {
    color: '#000',
  },
  subEntitySection: {
    backgroundColor: '#181818',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 16,
  },
  subHeader: {
    color: '#CCFF00',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  addSubBtn: {
    backgroundColor: '#2A2A2A',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  addSubBtnText: {
    color: '#00E5FF',
    fontWeight: 'bold',
  },
  subItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  subItemText: {
    color: '#EEE',
  },
  removeSubText: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
  saveBtn: {
    backgroundColor: '#CCFF00',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: {
    color: '#000',
    fontWeight: 'bold',
  },
  cancelBtn: {
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  cancelBtnText: {
    color: '#888',
  },
});