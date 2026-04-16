import { useState, useEffect, useCallback } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { Task } from '../types';
import { getStoredTasks, saveStoredTasks } from '../storage/tasksStorage';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks on mount
  useEffect(() => {
    async function loadTasks() {
      try {
        const storedTasks = await getStoredTasks();
        setTasks(storedTasks);
      } catch (error) {
        console.error('Failed to load tasks', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTasks();
  }, []);

  // Sync tasks to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveStoredTasks(tasks).catch(error => {
        console.error('Failed to save tasks to local storage', error);
      });
    }
  }, [tasks, isLoading]);

  const addTask = useCallback((title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTask: Task = {
      id: uuidv4(),
      title: trimmedTitle,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks(prev => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => 
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }, []);

  const editTask = useCallback((id: string, newTitle: string) => {
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) {
      // If we attempt to edit it to blank space, we should probably delete it or ignore
      // According to input validation, we shouldn't let them submit blank.
      return; 
    }
    
    setTasks(prev => 
      prev.map(t => t.id === id ? { ...t, title: trimmedTitle } : t)
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  return {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
  };
}
