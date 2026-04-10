import AsyncStorage from '@react-native-async-storage/async-storage';

import { storageKeys } from '../../../shared/constants/storage';
import { Note } from '../types';

export async function getStoredNotes() {
  const rawValue = await AsyncStorage.getItem(storageKeys.notes);
  if (!rawValue) {
    return [] as Note[];
  }

  return JSON.parse(rawValue) as Note[];
}

export async function saveStoredNotes(notes: Note[]) {
  await AsyncStorage.setItem(storageKeys.notes, JSON.stringify(notes));
}
