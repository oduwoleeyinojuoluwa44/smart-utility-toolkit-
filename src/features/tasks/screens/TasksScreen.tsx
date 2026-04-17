import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, TouchableWithoutFeedback, Keyboard, Text, Pressable, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { Screen } from '../../../shared/components/Screen';
import { AppHeader } from '../../../shared/components/AppHeader';
import { CircularProgress } from '../../../shared/components/CircularProgress';
import { theme } from '../../../shared/theme';

import { useTasks } from '../hooks/useTasks';
import { TaskCard } from '../components/TaskCard';
import { TaskInput } from '../components/TaskInput';
import { TasksEmptyState } from '../components/TasksEmptyState';

export function TasksScreen() {
  const { 
    tasks, 
    isLoading, 
    filterStatus, 
    setFilterStatus, 
    isPrioritySort, 
    setIsPrioritySort, 
    momentum,
    addTask, 
    toggleTask, 
    editTask, 
    deleteTask 
  } = useTasks();

  const { width } = useWindowDimensions();
  const TAB_CONTAINER_WIDTH = width - 48; // Screen padding 24*2
  const [segmentedWidth, setSegmentedWidth] = React.useState(0);
  const TAB_WIDTH = (Math.max(segmentedWidth || TAB_CONTAINER_WIDTH, 0) - 8) / 3; // 8 is internal gap
  
  const slideX = useSharedValue(0);

  useEffect(() => {
    const index = filterStatus === 'All' ? 0 : filterStatus === 'Active' ? 1 : 2;
    slideX.value = withSpring(index * TAB_WIDTH, {
      damping: 20,
      stiffness: 150,
      overshootClamping: true,
    });
  }, [TAB_WIDTH, filterStatus, slideX]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  if (isLoading) {
    return (
      <Screen contentContainerStyle={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0F172A" />
      </Screen>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Screen scroll={false} contentContainerStyle={styles.container}>
            <AppHeader title="Tasks" />

            {/* Momentum Header Section */}
            <View style={styles.momentumCard}>
              <View style={styles.momentumTextContainer}>
                <Text style={styles.momentumLabel}>WEEKLY MOMENTUM</Text>
                <Text style={styles.momentumTitle}>{Math.round(momentum)}% tasks completed</Text>
              </View>
              <CircularProgress percentage={momentum} size={70} color="#0F172A" />
            </View>

            {/* Segmented Filter Control */}
            <View
              style={styles.segmentedContainer}
              onLayout={(event) => setSegmentedWidth(event.nativeEvent.layout.width)}
            >
              <Animated.View style={[styles.activeIndicator, animatedIndicatorStyle, { width: TAB_WIDTH }]} />
              <Pressable onPress={() => setFilterStatus('All')} style={styles.tabItem}>
                <Text style={[styles.tabText, filterStatus === 'All' && styles.tabTextActive]}>All</Text>
              </Pressable>
              <Pressable onPress={() => setFilterStatus('Active')} style={styles.tabItem}>
                <Text style={[styles.tabText, filterStatus === 'Active' && styles.tabTextActive]}>Active</Text>
              </Pressable>
              <Pressable onPress={() => setFilterStatus('Completed')} style={styles.tabItem}>
                <Text style={[styles.tabText, filterStatus === 'Completed' && styles.tabTextActive]}>Done</Text>
              </Pressable>
            </View>

            {/* Sort Controls */}
            <View style={styles.sortRow}>
              <Pressable 
                style={styles.sortBtn} 
                onPress={() => setIsPrioritySort(!isPrioritySort)}
              >
                <Ionicons 
                  name={isPrioritySort ? "filter" : "filter-outline"} 
                  size={16} 
                  color="#1E293B" 
                />
                <Text style={styles.sortText}>Sort by Priority</Text>
              </Pressable>
            </View>

            <TaskInput onAdd={addTask} />

            <View style={styles.listWrapper}>
              {tasks.length === 0 ? (
                <TasksEmptyState />
              ) : (
                <FlatList
                  style={styles.list}
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
            </View>
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
    paddingTop: 4,
    flex: 1,
    backgroundColor: 'transparent',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  momentumCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  momentumTextContainer: {
    flex: 1,
    gap: 4,
  },
  momentumLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
  },
  momentumTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 14,
    height: 50,
    padding: 4,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  activeIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sortText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  listContent: {
    paddingBottom: 24,
    paddingTop: 12,
  },
  listWrapper: {
    flex: 1,
    minHeight: 0,
  },
  list: {
    flex: 1,
  },
});
