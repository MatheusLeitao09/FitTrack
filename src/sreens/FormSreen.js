import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function FormSreen({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');

  const handleSave = () => {
    if (!title || !category || !duration) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    onSave({ title, category, duration });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrar Novo Treino</Text>

      <Text style={styles.label}>Título do Treino</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Destruidor Matinal"
        placeholderTextColor="#666"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Força, Cardio, Yoga"
        placeholderTextColor="#666"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Duração (minutos)</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: 45"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Salvar Treino</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
        <Text style={styles.cancelBtnText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
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
  },
  cancelBtnText: {
    color: '#888',
  },
});