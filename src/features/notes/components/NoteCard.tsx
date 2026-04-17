import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../../../shared/theme';
import { Note } from '../types';

type NoteCardProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onTogglePin: (id: string) => void;
};

export function NoteCard({ note, onEdit, onDelete, onToggleArchive, onTogglePin }: NoteCardProps) {
  const isArchived = note.status === 'archived';
  const snippet = note.content.trim().replace(/\s+/g, ' ');

  const handleLongPress = () => {
    Alert.alert(
      note.title || 'Untitled note',
      'Choose an action',
      [
        {
          text: note.isPinned ? 'Unpin' : 'Pin',
          onPress: () => onTogglePin(note.id),
        },
        {
          text: isArchived ? 'Unarchive' : 'Archive',
          onPress: () => onToggleArchive(note.id),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(note.id),
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  return (
    <Pressable onPress={() => onEdit(note)} onLongPress={handleLongPress} style={styles.row}>
      <View style={styles.content}>
        <View style={styles.topLine}>
          <Text style={styles.dateText}>
            {new Date(note.updatedAt || note.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            })}
          </Text>
          <Pressable onPress={() => onTogglePin(note.id)} hitSlop={8} style={styles.pinButton}>
            <Ionicons name={note.isPinned ? 'pin' : 'pin-outline'} size={15} color="#64748B" />
          </Pressable>
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {note.title || 'Untitled note'}
        </Text>
        <Text style={styles.body} numberOfLines={2}>
          {snippet || 'No additional text'}
        </Text>
        <View style={styles.metaRow}>
          {note.status === 'draft' ? <Text style={styles.metaText}>Draft</Text> : null}
          {isArchived ? <Text style={styles.metaText}>Archived</Text> : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  content: {
    gap: 3,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0F172A',
  },
  body: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 18,
  },
  dateText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  metaText: {
    color: theme.colors.mutedText,
    fontSize: 12,
    fontWeight: '500',
  },
  pinButton: {
    padding: 2,
  },
});
