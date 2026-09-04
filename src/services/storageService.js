import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@fittrack_workouts';
const PROFILE_KEY = '@fittrack_profile';

// --- TREINOS ---
export const getWorkouts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Erro ao buscar treinos:', e);
    return [];
  }
};

export const saveWorkout = async (workout) => {
  try {
    const current = await getWorkouts();
    let updated;

    if (workout.id) {
      updated = current.map((item) => (item.id === workout.id ? workout : item));
    } else {
      const newWorkout = {
        ...workout,
        id: Date.now().toString(),
        createdAt: new Date().toLocaleDateString('pt-BR'),
        exercises: workout.exercises || []
      };
      updated = [newWorkout, ...current];
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Erro ao salvar treino:', e);
  }
};

export const deleteWorkout = async (id) => {
  try {
    const current = await getWorkouts();
    const updated = current.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Erro ao excluir treino:', e);
  }
};

// --- PERFIL (NOVO) ---
export const getProfile = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PROFILE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : { name: 'Matheus Leitão', goal: 'Ganho de Massa', weight: '75' };
  } catch (e) {
    console.error('Erro ao buscar perfil:', e);
    return { name: 'Matheus Leitão', goal: 'Ganho de Massa', weight: '75' };
  }
};

export const saveProfile = async (profileData) => {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profileData));
    return profileData;
  } catch (e) {
    console.error('Erro ao salvar perfil:', e);
  }
};