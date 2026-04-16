import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

export function NotesScreen() {
  const { 
    notes, 
    isLoading, 
    searchQuery, 
    setSearchQuery, 
    showArchived, 
    setShowArchived,
    sortBy,
    setSortBy,
    saveNote, 
    deleteNote,
    toggleArchive,
    togglePin
  } = useNotes();
  
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
        title="Utility Toolkit"
        subtitle="Manage your quick notes, calculations, and utility data."
      />

      {/* Search Bar matching the design */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={theme.colors.mutedText} style={styles.searchIcon} />
        <TextInput
          placeholder="Search your notes..."
          placeholderTextColor={theme.colors.mutedText}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.controlsRow}>
        <Text style={styles.sectionHeading}>
          {showArchived ? 'Archive' : 'Recent Notes'}
        </Text>
        
        <View style={styles.controlButtons}>
          <Pressable 
            onPress={() => setSortBy(sortBy === 'recent' ? 'oldest' : 'recent')} 
            style={styles.iconButton}
          >
            <Ionicons 
              name={sortBy === 'recent' ? "filter" : "filter-outline"} 
              size={22} 
              color={theme.colors.text} 
            />
          </Pressable>
          <Pressable 
            onPress={() => setShowArchived(!showArchived)} 
            style={[styles.archiveToggle, showArchived && styles.archiveToggleActive]}
          >
            <Ionicons 
              name={showArchived ? "journal" : "archive-outline"} 
              size={22} 
              color={showArchived ? theme.colors.primary : theme.colors.text} 
            />
          </Pressable>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      ) : notes.length === 0 ? (
        <NotesEmptyState />
      ) : (
        <View style={styles.notesList}>
          {notes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onEdit={openEdit} 
              onDelete={deleteNote} 
              onToggleArchive={toggleArchive}
              onTogglePin={togglePin}
            />
          ))}
        </View>
      )}

      <View style={styles.fabContainer}>
        <AppButton title="Create a new note" onPress={openCreate} />
      </View>

      <NoteEditor visible={editorVisible} initialNote={selectedNote} onClose={closeEditor} onSave={saveNote} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9', // Light gray background from design
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionHeading: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  archiveToggle: {
    padding: 4,
  },
  archiveToggleActive: {
    // Optional indicator
  },
  notesList: {
    gap: theme.spacing.sm,
    paddingBottom: 80,
  },
  loaderWrap: {
    paddingVertical: theme.spacing.xxxl,
    alignItems: 'center',
  },
  fabContainer: {
    marginTop: theme.spacing.lg,
  },
});
