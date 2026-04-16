import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppCard } from '../../../shared/components/AppCard';
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
  const isDraft = note.status === 'draft';

  return (
    <AppCard style={styles.card}>
      <Pressable onPress={() => onEdit(note)} style={styles.content}>
        <View style={styles.header}>
          <View style={styles.badgeContainer}>
            {isDraft && (
              <View style={[styles.statusBadge, styles.draftBadge]}>
                <Text style={styles.draftBadgeText}>DRAFT</Text>
              </View>
            )}
            {isArchived && (
              <View style={[styles.statusBadge, styles.archiveBadge]}>
                <Text style={styles.archiveBadgeText}>ARCHIVE</Text>
              </View>
            )}
          </View>
          
          <Pressable onPress={() => onTogglePin(note.id)} hitSlop={8}>
            <Ionicons 
              name={note.isPinned ? "pin" : "pin-outline"} 
              size={18} 
              color={note.isPinned ? theme.colors.primary : theme.colors.mutedText} 
            />
          </Pressable>
        </View>

        <Text style={styles.title} numberOfLines={1}>{note.title || 'Untitled note'}</Text>
        
        <Text style={styles.body} numberOfLines={2}>
          {note.content || 'No additional content.'}
        </Text>

        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={14} color={theme.colors.mutedText} />
            <Text style={styles.dateText}>
              {new Date(note.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>
          
          <View style={styles.actions}>
            <Pressable onPress={() => onToggleArchive(note.id)} hitSlop={8} style={styles.iconAction}>
              <Ionicons 
                name={isArchived ? "journal-outline" : "archive-outline"} 
                size={20} 
                color={theme.colors.mutedText} 
              />
            </Pressable>
            <Pressable onPress={() => onDelete(note.id)} hitSlop={8} style={styles.iconAction}>
              <Ionicons name="trash-outline" size={20} color={theme.colors.danger} />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    borderColor: '#F1F5F9',
    backgroundColor: theme.colors.surface,
  },
  content: {
    gap: theme.spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  draftBadge: {
    backgroundColor: '#F1F5F9',
  },
  draftBadgeText: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
  },
  archiveBadge: {
    backgroundColor: '#E2E8F0',
  },
  archiveBadgeText: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  body: {
    color: theme.colors.mutedText,
    fontSize: theme.typography.sizes.md,
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    color: theme.colors.mutedText,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  iconAction: {
    padding: 2,
  },
});
