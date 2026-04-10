import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../../../shared/components/AppButton';
import { AppCard } from '../../../shared/components/AppCard';
import { AppInput } from '../../../shared/components/AppInput';
import { theme } from '../../../shared/theme';
import { Note } from '../types';

type NoteEditorProps = {
  visible: boolean;
  initialNote?: Note | null;
  onClose: () => void;
  onSave: (payload: { title: string; content: string }, noteId?: string) => Promise<boolean>;
};

export function NoteEditor({ visible, initialNote, onClose, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (visible) {
      setTitle(initialNote?.title ?? '');
      setContent(initialNote?.content ?? '');
      setShowValidation(false);
    }
  }, [initialNote, visible]);

  const handleSave = async () => {
    const didSave = await onSave({ title, content }, initialNote?.id);
    if (!didSave) {
      setShowValidation(true);
      return;
    }

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <AppCard style={styles.card}>
          <Text style={styles.title}>{initialNote ? 'Edit note' : 'Create note'}</Text>
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
              <AppButton title="Save note" onPress={handleSave} />
            </View>
          </View>
        </AppCard>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    padding: theme.spacing.lg,
  },
  card: {
    gap: theme.spacing.lg,
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
