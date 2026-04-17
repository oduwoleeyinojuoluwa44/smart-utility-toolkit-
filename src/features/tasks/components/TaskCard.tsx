import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../../../shared/theme';
import { Task } from '../types';

type TaskCardProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

export function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const getPriorityStyles = (p: string) => {
    switch (p) {
      case 'high': return { bg: '#CCFBF1', text: '#0D9488', label: 'HIGH PRIORITY' };
      case 'medium': return { bg: '#FEF3C7', text: '#D97706', label: 'MEDIUM' };
      case 'low': return { bg: '#F1F5F9', text: '#64748B', label: 'LOW' };
      default: return { bg: '#F1F5F9', text: '#64748B', label: 'NORMAL' };
    }
  };

  const pStyles = getPriorityStyles(task.priority);

  const handleSave = () => {
    if (editValue.trim() && editValue !== task.title) {
      onEdit(task.id, editValue);
    } else {
      setEditValue(task.title); // reset on empty/no-change
    }
    setIsEditing(false);
  };

  return (
    <View style={styles.card}>
      <Pressable 
        onPress={() => onToggle(task.id)} 
        style={styles.checkboxContainer}
      >
        <View style={[styles.checkbox, task.completed && styles.checkboxActive]}>
          {task.completed && <Ionicons name="checkmark" size={14} color="#FFF" />}
        </View>
      </Pressable>

      <View style={styles.contentContainer}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editValue}
            onChangeText={setEditValue}
            onBlur={handleSave}
            onSubmitEditing={handleSave}
            autoFocus
            returnKeyType="done"
          />
        ) : (
          <View>
            <Text 
              style={[styles.title, task.completed && styles.titleCompleted]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
            <View style={[styles.priorityBadge, { backgroundColor: pStyles.bg }]}>
              <Text style={[styles.priorityText, { color: pStyles.text }]}>
                {pStyles.label}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        {!isEditing && (
          <Pressable onPress={() => setIsEditing(true)} style={styles.actionBtn}>
            <Ionicons name="pencil" size={18} color={theme.colors.mutedText} />
          </Pressable>
        )}
        <Pressable onPress={() => onDelete(task.id)} style={styles.actionBtn}>
          <Ionicons name="trash" size={18} color={theme.colors.danger} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkboxContainer: {
    paddingRight: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '600',
    lineHeight: 22,
  },
  titleCompleted: {
    color: theme.colors.mutedText,
    textDecorationLine: 'line-through',
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
    padding: 0,
    margin: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  actions: {
    flexDirection: 'row',
    paddingLeft: 8,
    gap: 12,
  },
  actionBtn: {
    padding: 4,
  },
});
