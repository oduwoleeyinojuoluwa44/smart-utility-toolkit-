import React from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { Screen } from '../../../shared/components/Screen';
import { SectionTitle } from '../../../shared/components/SectionTitle';
import { AppHeader } from '../../../shared/components/AppHeader';
import { theme } from '../../../shared/theme';

import { useTasks } from '../hooks/useTasks';
import { TaskCard } from '../components/TaskCard';
import { TaskInput } from '../components/TaskInput';
import { TasksEmptyState } from '../components/TasksEmptyState';

export function TasksScreen() {
  const { tasks, isLoading, addTask, toggleTask, editTask, deleteTask } = useTasks();

  if (isLoading) {
    return (
      <Screen contentContainerStyle={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Screen>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Screen scroll={false} contentContainerStyle={styles.container}>
            <AppHeader 
              title="Tasks" 
              subtitle="Manage your daily checklists and productivity goals."
            />

            <TaskInput onAdd={addTask} />

            <SectionTitle title="Your Checklist" />
            
            {tasks.length === 0 ? (
              <TasksEmptyState />
            ) : (
              <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TaskCard
                    task={item}
                    onToggle={toggleTask}
                    onEdit={editTask}
                    onDelete={deleteTask}
                  />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
              />
            )}
          </Screen>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingTop: 60,
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 100, // Space for the bottom navigation bar
    paddingTop: 12,
  },
});
