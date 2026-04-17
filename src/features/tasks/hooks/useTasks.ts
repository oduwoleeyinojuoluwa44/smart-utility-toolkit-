import { useState, useEffect, useCallback, useMemo } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { Task, TaskPriority } from '../types';
import { getStoredTasks, saveStoredTasks } from '../storage/tasksStorage';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Completed'>('All');
  const [isPrioritySort, setIsPrioritySort] = useState(false);

  // Load tasks on mount
  useEffect(() => {
    async function loadTasks() {
      try {
        const storedTasks = await getStoredTasks();
        // Migration to add priority if missing
        const migratedTasks = storedTasks.map(t => ({
          ...t,
          priority: t.priority || 'medium'
        }));
        setTasks(migratedTasks);
      } catch (error) {
        console.error('Failed to load tasks', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTasks();
  }, []);

  // Sync tasks to storage
  useEffect(() => {
    if (!isLoading) {
      saveStoredTasks(tasks).catch(error => {
        console.error('Failed to save tasks', error);
      });
    }
  }, [tasks, isLoading]);

  const addTask = useCallback((title: string, priority: TaskPriority = 'medium') => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTask: Task = {
      id: uuidv4(),
      title: trimmedTitle,
      completed: false,
      priority,
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
    if (!trimmedTitle) return; 
    setTasks(prev => 
      prev.map(t => t.id === id ? { ...t, title: trimmedTitle } : t)
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const momentum = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completedCount = tasks.filter(t => t.completed).length;
    return (completedCount / tasks.length) * 100;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Filter by Status
    if (filterStatus === 'Active') {
      result = result.filter(t => !t.completed);
    } else if (filterStatus === 'Completed') {
      result = result.filter(t => t.completed);
    }

    // Sort by Priority
    if (isPrioritySort) {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      result = [...result].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else {
      // Default sort by Date (newest first)
      result = [...result].sort((a, b) => b.createdAt - a.createdAt);
    }

    return result;
  }, [tasks, filterStatus, isPrioritySort]);

  return {
    tasks: filteredTasks,
    allTasksCount: tasks.length,
    isLoading,
    filterStatus,
    setFilterStatus,
    isPrioritySort,
    setIsPrioritySort,
    momentum,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
  };
}
