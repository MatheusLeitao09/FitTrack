import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'; // Importação dos ícones do React Native
import FormSreen from './src/sreens/FormSreen';
import AnalysesScreen from './src/sreens/AnalysesScreen';
import ProfileScreen from './src/sreens/ProfileScreen';
import WorkoutDetailsScreen from './src/sreens/WorkoutDetailsScreen';
import ExerciceCard from './src/components/ExerciceCard';
import { getWorkouts, saveWorkout, deleteWorkout, getProfile } from './src/services/storageService';

export default function App() {
  const [tab, setTab] = useState('home');
  const [workouts, setWorkouts] = useState([]);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  // Recarrega os dados do perfil sempre que a aba ativa mudar para atualizar o nome no topo
  useEffect(() => {
    loadUserProfile();
  }, [tab]);

  const loadData = async () => {
    const data = await getWorkouts();
    setWorkouts(data);
    await loadUserProfile();
  };

  const loadUserProfile = async () => {
    try {
      const profile = await getProfile();
      if (profile && profile.name) {
        setUserName(profile.name);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do perfil:', error);
    }
  };

  const handleSave = async (workoutData) => {
    const updated = await saveWorkout(workoutData);
    setWorkouts(updated);
    setWorkoutToEdit(null);
    setTab('home');
  };

  const handleDelete = async (id) => {
    const updated = await deleteWorkout(id);
    setWorkouts(updated);
    if (selectedWorkout && selectedWorkout.id === id) {
      setSelectedWorkout(null);
      setTab('home');
    }
  };

  const handleOpenEdit = (workout) => {
    setWorkoutToEdit(workout);
    setTab('form');
  };

  const handleSelectWorkout = (workout) => {
    setSelectedWorkout(workout);
    setTab('details');
  };

  /* --- COMPONENTE: TELA DE INÍCIO (PAINEL GERAL) --- */
  const renderHomeScreen = () => {
    const recentWorkout = workouts.length > 0 ? workouts[0] : null;

    return (
      <View style={styles.pageContainer}>
        {/* Header Profissional */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>FitTrack</Text>
              <Text style={styles.welcomeText}>
                {userName ? `Olá, ${userName}! Vamos treinar.` : 'Olá! Vamos treinar hoje.'}
              </Text>
            </View>
          </View>

          {/* Botão de Engrenagem redirecionando para a aba de perfil */}
          <TouchableOpacity 
            style={styles.settingsBtn} 
            onPress={() => setTab('profile')}
            activeOpacity={0.7}
          >
            <Feather name="settings" size={22} color="#CCFF00" />
          </TouchableOpacity>
        </View>

        {workouts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600' }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <Text style={styles.emptyTitle}>Nenhum treino registrado ainda</Text>
            <Text style={styles.emptySub}>
              Sua jornada começa agora! Toque no botão abaixo para adicionar sua primeira sessão.
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.homeScrollContent}>
            {/* Banner de Destaque */}
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600' }}
              style={styles.bannerImageSmall}
              resizeMode="cover"
            />

            {/* Seção do Treino Mais Recente */}
            <Text style={styles.sectionTitle}>Última Atividade</Text>
            {recentWorkout && (
              <ExerciceCard
                workout={recentWorkout}
                onDelete={handleDelete}
                onEdit={handleOpenEdit}
                onPress={handleSelectWorkout}
              />
            )}

            {/* Acesso rápido para ver todos */}
            <TouchableOpacity style={styles.viewHistoryBtn} onPress={() => setTab('history')}>
              <Text style={styles.viewHistoryText}>Ver todo o histórico ({workouts.length}) →</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        <TouchableOpacity style={styles.fab} onPress={() => { setWorkoutToEdit(null); setTab('form'); }} activeOpacity={0.8}>
          <Feather name="plus" size={28} color="#000000" />
        </TouchableOpacity>
      </View>
    );
  };

  /* --- COMPONENTE: TELA DE HISTÓRICO (TODOS OS TREINOS) --- */
  const renderHistoryScreen = () => {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brandTitle}>Histórico de Treinos</Text>
            <Text style={styles.welcomeText}>Registro completo das suas sessões</Text>
          </View>
        </View>

        {workouts.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Nenhum registro no histórico</Text>
            <Text style={styles.emptySub}>Cadastre seu primeiro treino na página inicial.</Text>
          </View>
        ) : (
          <FlatList
            data={workouts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciceCard
                workout={item}
                onDelete={handleDelete}
                onEdit={handleOpenEdit}
                onPress={handleSelectWorkout}
              />
            )}
            contentContainerStyle={styles.list}
          />
        )}

        <TouchableOpacity style={styles.fab} onPress={() => { setWorkoutToEdit(null); setTab('form'); }} activeOpacity={0.8}>
          <Feather name="plus" size={28} color="#000000" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <View style={styles.content}>
        {tab === 'home' && renderHomeScreen()}
        {tab === 'history' && renderHistoryScreen()}
        {tab === 'details' && (
          <WorkoutDetailsScreen
            workout={selectedWorkout}
            onBack={() => setTab('home')}
            onEdit={(w) => {
              setWorkoutToEdit(w);
              setTab('form');
            }}
            onDelete={handleDelete}
          />
        )}
        {tab === 'form' && (
          <FormSreen
            workoutToEdit={workoutToEdit}
            onSave={handleSave}
            onCancel={() => {
              setWorkoutToEdit(null);
              setTab('home');
            }}
          />
        )}
        {tab === 'analyses' && <AnalysesScreen />}
        {tab === 'profile' && <ProfileScreen />}
      </View>

      {/* NAVEGAÇÃO INFERIOR COM REACT ICONS */}
      {tab !== 'form' && tab !== 'details' && (
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={() => setTab('home')} style={styles.tabItem}>
            <Feather name="home" size={20} color={tab === 'home' ? '#CCFF00' : '#888888'} />
            <Text style={[styles.tabText, tab === 'home' && styles.activeTab]}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('history')} style={styles.tabItem}>
            <Ionicons name="time-outline" size={22} color={tab === 'history' ? '#CCFF00' : '#888888'} />
            <Text style={[styles.tabText, tab === 'history' && styles.activeTab]}>Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('analyses')} style={styles.tabItem}>
            <Feather name="bar-chart-2" size={20} color={tab === 'analyses' ? '#CCFF00' : '#888888'} />
            <Text style={[styles.tabText, tab === 'analyses' && styles.activeTab]}>Análises</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('profile')} style={styles.tabItem}>
            <Feather name="user" size={20} color={tab === 'profile' ? '#CCFF00' : '#888888'} />
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
  pageContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCFF00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: '#888888',
    fontSize: 12,
  },
  settingsBtn: {
    padding: 8,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  homeScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  bannerImage: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 24,
  },
  bannerImageSmall: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySub: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  list: {
    padding: 20,
  },
  viewHistoryBtn: {
    marginTop: 12,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
  },
  viewHistoryText: {
    color: '#CCFF00',
    fontWeight: 'bold',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    backgroundColor: '#CCFF00',
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#CCFF00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 10,
    paddingBottom: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabText: {
    color: '#888888',
    fontSize: 12,
  },
  activeTab: {
    color: '#CCFF00',
    fontWeight: 'bold',
  },
});