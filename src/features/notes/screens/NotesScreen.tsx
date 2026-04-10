import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { AppCard } from '../../../shared/components/AppCard';
import { AppButton } from '../../../shared/components/AppButton';
import { AppHeader } from '../../../shared/components/AppHeader';
import { Screen } from '../../../shared/components/Screen';
import { theme } from '../../../shared/theme';
import { NoteCard } from '../components/NoteCard';
import { NoteEditor } from '../components/NoteEditor';
import { NotesEmptyState } from '../components/NotesEmptyState';
import { useNotes } from '../hooks/useNotes';
import { Note } from '../types';

type NotesScreenProps = {
  onResetOnboarding?: () => Promise<void>;
};

export function NotesScreen({ onResetOnboarding }: NotesScreenProps) {
  const { notes, isLoading, saveNote, deleteNote } = useNotes();
  const [editorVisible, setEditorVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const openCreate = () => {
    setSelectedNote(null);
    setEditorVisible(true);
  };

  const openEdit = (note: Note) => {
    setSelectedNote(note);
    setEditorVisible(true);
  };

  const closeEditor = () => {
    setEditorVisible(false);
    setSelectedNote(null);
  };

  return (
    <Screen>
      <AppHeader
        title="Notes"
        subtitle="Capture quick reminders, utility values, and personal checklists even when you are offline."
      />

      <AppCard style={styles.heroCard}>
        <View style={styles.heroRow}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroEyebrow}>Offline ready</Text>
            <Text style={styles.heroTitle}>Your quick notes stay close</Text>
            <Text style={styles.heroText}>
              Jot down measurements, reminders, and utility details without leaving the app.
            </Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeNumber}>{notes.length}</Text>
            <Text style={styles.heroBadgeLabel}>Saved notes</Text>
          </View>
        </View>
      </AppCard>

      <AppButton title="Create a new note" onPress={openCreate} />

      {isLoading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      ) : notes.length === 0 ? (
        <NotesEmptyState />
      ) : (
        notes.map((note) => (
          <NoteCard key={note.id} note={note} onEdit={openEdit} onDelete={deleteNote} />
        ))
      )}

      {onResetOnboarding ? (
        <AppButton title="Show onboarding again" variant="secondary" onPress={() => void onResetOnboarding()} />
      ) : null}

      <NoteEditor visible={editorVisible} initialNote={selectedNote} onClose={closeEditor} onSave={saveNote} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: '#EEF7EC',
    borderColor: '#D0E8CA',
  },
  heroRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    alignItems: 'center',
  },
  heroTextWrap: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  heroEyebrow: {
    color: theme.colors.success,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
  },
  heroTitle: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.xl,
  },
  heroText: {
    color: theme.colors.mutedText,
    lineHeight: 21,
  },
  heroBadge: {
    width: 86,
    height: 86,
    borderRadius: 28,
    backgroundColor: theme.colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
  },
  heroBadgeNumber: {
    color: theme.colors.surface,
    fontSize: 26,
    fontWeight: theme.typography.weights.bold,
  },
  heroBadgeLabel: {
    color: '#D1FAE5',
    fontSize: theme.typography.sizes.xs,
    textAlign: 'center',
  },
  loaderWrap: {
    paddingVertical: theme.spacing.xxxl,
  },
});
