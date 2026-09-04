import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Header from '../components/Header';
import { getProfile, saveProfile } from '../services/storageService';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    const data = await getProfile();
    setName(data.name);
    setGoal(data.goal);
    setWeight(data.weight);
  };

  const handleSaveProfile = async () => {
    if (!name || !goal || !weight) {
      Alert.alert('Atenção', 'Preencha todos os dados do perfil.');
      return;
    }

    await saveProfile({ name, goal, weight });
    setIsEditing(false);
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Header title="Meu Perfil" subtitle="FitTrack • Configurações Pessoais" />

      <ScrollView style={styles.content}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarText}>{name ? name.charAt(0).toUpperCase() : 'U'}</Text>
        </View>

        {!isEditing ? (
          <View style={styles.infoCard}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{name}</Text>

            <Text style={styles.label}>Objetivo</Text>
            <Text style={styles.value}>{goal}</Text>

            <Text style={styles.label}>Peso Atual (kg)</Text>
            <Text style={styles.value}>{weight} kg</Text>

            <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
              <Text style={styles.editBtnText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoCard}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#666"
            />

            <Text style={styles.label}>Objetivo</Text>
            <TextInput
              style={styles.input}
              value={goal}
              onChangeText={setGoal}
              placeholderTextColor="#666"
            />

            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              keyboardType="numeric"
              onChangeText={setWeight}
              placeholderTextColor="#666"
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
              <Text style={styles.saveBtnText}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
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
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#CCFF00',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  infoCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 20,
  },
  label: {
    color: '#888888',
    fontSize: 12,
    marginTop: 10,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  input: {
    backgroundColor: '#121212',
    color: '#FFFFFF',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  editBtn: {
    backgroundColor: '#2A2A2A',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  editBtnText: {
    color: '#CCFF00',
    fontWeight: 'bold',
  },
  saveBtn: {
    backgroundColor: '#CCFF00',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  saveBtnText: {
    color: '#000',
    fontWeight: 'bold',
  },
  cancelBtn: {
    padding: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  cancelBtnText: {
    color: '#888',
  },
});