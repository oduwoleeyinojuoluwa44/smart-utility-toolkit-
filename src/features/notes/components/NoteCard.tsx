import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../../../shared/components/AppButton';
import { AppCard } from '../../../shared/components/AppCard';
import { theme } from '../../../shared/theme';
import { Note } from '../types';

type NoteCardProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
};

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <AppCard style={styles.card}>
      <Pressable onPress={() => onEdit(note)} style={styles.content}>
        <Text style={styles.title}>{note.title || 'Untitled note'}</Text>
        <Text style={styles.body} numberOfLines={3}>
          {note.content || 'No additional content.'}
        </Text>
        <Text style={styles.timestamp}>
          Updated {new Date(note.updatedAt).toLocaleDateString()}
        </Text>
      </Pressable>
      <View style={styles.actions}>
        <View style={styles.actionItem}>
          <AppButton title="Edit" variant="secondary" onPress={() => onEdit(note)} />
        </View>
        <View style={styles.actionItem}>
          <AppButton title="Delete" variant="danger" onPress={() => onDelete(note.id)} />
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.lg,
  },
  content: {
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  body: {
    color: theme.colors.mutedText,
    lineHeight: 22,
  },
  timestamp: {
    color: theme.colors.mutedText,
    fontSize: theme.typography.sizes.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionItem: {
    flex: 1,
  },
});
