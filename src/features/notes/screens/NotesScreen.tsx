import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppButton } from '../../../shared/components/AppButton';
import { AppHeader } from '../../../shared/components/AppHeader';
import { Screen } from '../../../shared/components/Screen';
import { theme } from '../../../shared/theme';
import { NoteCard } from '../components/NoteCard';
import { NoteEditor } from '../components/NoteEditor';
import { NotesEmptyState } from '../components/NotesEmptyState';
import { useNotes } from '../hooks/useNotes';
import { Note } from '../types';

export function NotesScreen() {
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

      <NoteEditor visible={editorVisible} initialNote={selectedNote} onClose={closeEditor} onSave={saveNote} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  loaderWrap: {
    paddingVertical: theme.spacing.xxxl,
  },
});
