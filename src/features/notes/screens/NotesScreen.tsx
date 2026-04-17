import React, { useState } from 'react';
import { ActivityIndicator, SectionList, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppHeader } from '../../../shared/components/AppHeader';
import { Screen } from '../../../shared/components/Screen';
import { theme } from '../../../shared/theme';
import { NoteCard } from '../components/NoteCard';
import { NoteEditor } from '../components/NoteEditor';
import { NotesEmptyState } from '../components/NotesEmptyState';
import { useNotes } from '../hooks/useNotes';

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
  type NoteItem = (typeof notes)[number];
  
  const [editorVisible, setEditorVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);

  const openCreate = () => {
    setSelectedNote(null);
    setEditorVisible(true);
  };

  const openEdit = (note: NoteItem) => {
    setSelectedNote(note);
    setEditorVisible(true);
  };

  const closeEditor = () => {
    setEditorVisible(false);
    setSelectedNote(null);
  };

  const pinnedNotes = !showArchived ? notes.filter((note) => note.isPinned) : [];
  const allVisibleNotes = !showArchived ? notes.filter((note) => !note.isPinned) : notes;
  type NoteRow = { rowKey: string; note: NoteItem };
  const sections = [
    ...(pinnedNotes.length > 0
      ? [{ title: 'Pinned', data: pinnedNotes.map((note) => ({ rowKey: `pinned-${note.id}`, note })) }]
      : []),
    ...(allVisibleNotes.length > 0
      ? [
          {
            title: showArchived ? 'Archive' : 'Notes',
            data: allVisibleNotes.map((note) => ({ rowKey: `notes-${note.id}`, note })),
          },
        ]
      : []),
  ];

  return (
    <Screen scroll={false} contentContainerStyle={styles.container}>
      <AppHeader title="Notes" />

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#64748B" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#64748B"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.controlsRow}>
        <Text style={styles.sectionHeading}>{notes.length} {notes.length === 1 ? 'Note' : 'Notes'}</Text>

        <View style={styles.controlButtons}>
          <Pressable onPress={() => setSortBy(sortBy === 'recent' ? 'oldest' : 'recent')} style={styles.controlChip}>
            <Ionicons name={sortBy === 'recent' ? 'arrow-down' : 'arrow-up'} size={14} color="#334155" />
            <Text style={styles.controlChipText}>{sortBy === 'recent' ? 'Newest' : 'Oldest'}</Text>
          </Pressable>
          <Pressable onPress={() => setShowArchived(!showArchived)} style={styles.controlChip}>
            <Ionicons
              name={showArchived ? 'document-text-outline' : 'archive-outline'}
              size={14}
              color="#334155"
            />
            <Text style={styles.controlChipText}>{showArchived ? 'Notes' : 'Archive'}</Text>
          </Pressable>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator color="#0F172A" />
        </View>
      ) : notes.length === 0 ? (
        <View style={styles.emptyStateContainer}>{showArchived ? <Text style={styles.emptyText}>No archived notes</Text> : <NotesEmptyState />}</View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item: NoteRow) => item.rowKey}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => <Text style={styles.sectionLabel}>{section.title}</Text>}
          renderItem={({ item }: { item: NoteRow }) => (
            <NoteCard
              note={item.note}
              onEdit={openEdit}
              onDelete={deleteNote}
              onToggleArchive={toggleArchive}
              onTogglePin={togglePin}
            />
          )}
        />
      )}

      <Pressable style={styles.fab} onPress={openCreate}>
        <Ionicons name="create-outline" size={24} color="#FFFFFF" />
      </Pressable>

      <NoteEditor visible={editorVisible} initialNote={selectedNote} onClose={closeEditor} onSave={saveNote} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 0,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    marginTop: 8,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  controlChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  controlChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 96,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 6,
  },
  loaderWrap: {
    paddingVertical: theme.spacing.xxxl,
    alignItems: 'center',
  },
  fabContainer: {
    marginTop: theme.spacing.lg,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FACC15',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
