import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '../../../shared/components/AppButton';
import { AppCard } from '../../../shared/components/AppCard';
import { AppInput } from '../../../shared/components/AppInput';
import { theme } from '../../../shared/theme';
import { Note, NoteStatus } from '../types';

type NoteEditorProps = {
  visible: boolean;
  initialNote?: Note | null;
  onClose: () => void;
  onSave: (payload: { title: string; content: string; status?: NoteStatus }, noteId?: string) => Promise<boolean>;
};

export function NoteEditor({ visible, initialNote, onClose, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<NoteStatus>('active');
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (visible) {
      setTitle(initialNote?.title ?? '');
      setContent(initialNote?.content ?? '');
      setStatus(initialNote?.status ?? 'active');
      setShowValidation(false);
    }
  }, [initialNote, visible]);

  const handleSave = async (saveStatus: NoteStatus = 'active') => {
    const didSave = await onSave({ title, content, status: saveStatus }, initialNote?.id);
    if (!didSave) {
      setShowValidation(true);
      return;
    }

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View>
                <AppCard style={styles.card}>
                  <View style={styles.editorHeader}>
                    <Text style={styles.title}>{initialNote ? 'Edit note' : 'Create note'}</Text>
                    {initialNote?.status === 'archived' && (
                      <View style={styles.archiveIndicator}>
                        <Ionicons name="archive" size={14} color={theme.colors.mutedText} />
                        <Text style={styles.archiveLabel}>Archived</Text>
                      </View>
                    )}
                  </View>
                  
                  <AppInput label="Title" value={title} onChangeText={setTitle} placeholder="Quick reminder" />
                  <AppInput
                    label="Content"
                    value={content}
                    onChangeText={setContent}
                    placeholder="Write your note here"
                    multiline
                    textAlignVertical="top"
                    style={styles.textArea}
                  />
                  {showValidation ? <Text style={styles.validation}>Enter a title or note content before saving.</Text> : null}
                  
                  <View style={styles.actions}>
                    <View style={styles.actionItem}>
                      <AppButton title="Cancel" variant="secondary" onPress={onClose} />
                    </View>
                    <View style={styles.actionItem}>
                      <AppButton 
                        title={initialNote?.status === 'draft' ? "Update Draft" : "Draft"} 
                        variant="secondary" 
                        onPress={() => handleSave('draft')} 
                      />
                    </View>
                    <View style={styles.actionItem}>
                      <AppButton title="Save note" onPress={() => handleSave('active')} />
                    </View>
                  </View>
                </AppCard>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    padding: theme.spacing.lg,
  },
  card: {
    gap: theme.spacing.lg,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  archiveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  archiveLabel: {
    fontSize: 12,
    color: theme.colors.mutedText,
    fontWeight: '600',
  },

  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  textArea: {
    minHeight: 120,
  },
  validation: {
    color: theme.colors.danger,
    fontSize: theme.typography.sizes.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionItem: {
    flex: 1,
  },
});
