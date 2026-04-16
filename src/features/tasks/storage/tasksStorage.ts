import AsyncStorage from '@react-native-async-storage/async-storage';

import { storageKeys } from '../../../shared/constants/storage';
import { Task } from '../types';

export async function getStoredTasks(): Promise<Task[]> {
  const rawValue = await AsyncStorage.getItem(storageKeys.tasks);
  if (!rawValue) {
    return [];
  }

  return JSON.parse(rawValue) as Task[];
}

export async function saveStoredTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(storageKeys.tasks, JSON.stringify(tasks));
}
