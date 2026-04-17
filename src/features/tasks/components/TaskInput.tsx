import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Keyboard,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { TaskPriority } from '../types';

type TaskInputProps = {
  onAdd: (title: string, priority: TaskPriority) => void;
};

export function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
    setValue('');
    setPriority('medium');
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onAdd(trimmed, priority);
    closeModal();
  };

  const PriorityChip = ({ p, label, color }: { p: TaskPriority, label: string, color: string }) => (
    <Pressable 
      onPress={() => setPriority(p)}
      style={[
        styles.priorityChip, 
        priority === p && { backgroundColor: color, borderColor: color }
      ]}
    >
      <Text style={[styles.priorityChipText, priority === p && styles.priorityChipTextActive]}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <>
      <View style={styles.triggerRow}>
        <Pressable style={styles.triggerButton} onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.triggerText}>Add task</Text>
        </Pressable>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          style={styles.modalRoot}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable style={styles.backdrop} onPress={closeModal} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="What needs to be done?"
              placeholderTextColor="#94A3B8"
              value={value}
              onChangeText={setValue}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
              autoFocus
            />

            <View style={styles.priorityRow}>
              <Text style={styles.priorityLabel}>Priority:</Text>
              <View style={styles.chips}>
                <PriorityChip p="high" label="High" color="#0D9488" />
                <PriorityChip p="medium" label="Med" color="#D97706" />
                <PriorityChip p="low" label="Low" color="#64748B" />
              </View>
            </View>

            <View style={styles.actionsRow}>
              <Pressable style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.addButton, !value.trim() && styles.addButtonDisabled]}
                onPress={handleSubmit}
                disabled={!value.trim()}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  triggerRow: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  triggerButton: {
    backgroundColor: '#0F172A',
    borderRadius: 999,
    paddingHorizontal: 16,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  triggerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  input: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  addButton: {
    minWidth: 88,
    height: 42,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  addButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 12,
  },
  priorityLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  chips: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  priorityChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  priorityChipTextActive: {
    color: '#FFFFFF',
  },
  actionsRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelButton: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  cancelText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '700',
  },
});
