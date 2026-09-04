import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import HomeScreen from './src/sreens/HomeScreen';
import FormSreen from './src/sreens/FormSreen';
import AnalysesScreen from './src/sreens/AnalysesScreen';
import ProfileScreen from './src/sreens/ProfileScreen';
import { getWorkouts, saveWorkout, deleteWorkout } from './src/services/storageService';

export default function App() {
  const [tab, setTab] = useState('home');
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getWorkouts();
    setWorkouts(data);
  };

  const handleSave = async (newWorkout) => {
    const updated = await saveWorkout(newWorkout);
    setWorkouts(updated);
    setTab('home');
  };

  const handleDelete = async (id) => {
    const updated = await deleteWorkout(id);
    setWorkouts(updated);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <View style={styles.content}>
        {tab === 'home' && (
          <HomeScreen
            workouts={workouts}
            onDelete={handleDelete}
            onOpenForm={() => setTab('form')}
          />
        )}
        {tab === 'form' && (
          <FormSreen
            onSave={handleSave}
            onCancel={() => setTab('home')}
          />
        )}
        {tab === 'analyses' && <AnalysesScreen />}
        {tab === 'profile' && <ProfileScreen />}
      </View>

      {tab !== 'form' && (
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={() => setTab('home')} style={styles.tabItem}>
            <Text style={[styles.tabText, tab === 'home' && styles.activeTab]}>Treinos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('analyses')} style={styles.tabItem}>
            <Text style={[styles.tabText, tab === 'analyses' && styles.activeTab]}>Análises</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('profile')} style={styles.tabItem}>
            <Text style={[styles.tabText, tab === 'profile' && styles.activeTab]}>Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingVertical: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeTab: {
    color: '#CCFF00',
  },
});