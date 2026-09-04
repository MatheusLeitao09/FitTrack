import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@fittrack_workouts';

export const getWorkouts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    return [];
  }
};

export const saveWorkout = async (workout) => {
  try {
    const current = await getWorkouts();
    const newWorkout = { ...workout, id: Date.now().toString() };
    const updated = [newWorkout, ...current];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
  }
};

export const deleteWorkout = async (id) => {
  try {
    const current = await getWorkouts();
    const updated = current.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
  }
};