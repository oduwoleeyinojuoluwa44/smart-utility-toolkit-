import { useCallback, useEffect, useMemo, useState } from 'react';

import { getStoredNotes, saveStoredNotes } from '../storage/notesStorage';
import { Note, NoteStatus } from '../types';

type NoteInput = {
  title: string;
  content: string;
  status?: NoteStatus;
  isPinned?: boolean;
};

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent');

  useEffect(() => {
    async function loadNotes() {
      const storedNotes = await getStoredNotes();
      // Migration & Initial Sort
      const migratedNotes = storedNotes.map(n => ({
        ...n,
        status: n.status || 'active',
        isPinned: n.isPinned || false,
      }));
      setNotes(migratedNotes);
      setIsLoading(false);
    }

    void loadNotes();
  }, []);

  const persist = useCallback(async (nextNotes: Note[]) => {
    setNotes(nextNotes);
    await saveStoredNotes(nextNotes);
  }, []);

  const saveNote = useCallback(
    async (input: NoteInput, noteId?: string) => {
      const title = input.title.trim();
      const content = input.content.trim();
      const status = input.status || 'active';
      const isPinned = input.isPinned ?? false;

      if (!title && !content) {
        return false;
      }

      const now = new Date().toISOString();
      const nextNotes = noteId
        ? notes.map((note) =>
            note.id === noteId ? { ...note, title, content, status, isPinned, updatedAt: now } : note,
          )
        : [
            {
              id: `${Date.now()}`,
              title,
              content,
              status,
              isPinned,
              createdAt: now,
              updatedAt: now,
            },
            ...notes,
          ];

      await persist(nextNotes);
      return true;
    },
    [notes, persist],
  );

  const toggleArchive = useCallback(async (id: string) => {
    const nextNotes = notes.map(n => 
      n.id === id ? { ...n, status: (n.status === 'archived' ? 'active' : 'archived') as NoteStatus } : n
    );
    await persist(nextNotes);
  }, [notes, persist]);

  const togglePin = useCallback(async (id: string) => {
    const nextNotes = notes.map(n => 
      n.id === id ? { ...n, isPinned: !n.isPinned } : n
    );
    await persist(nextNotes);
  }, [notes, persist]);

  const deleteNote = useCallback(
    async (id: string) => {
      const nextNotes = notes.filter((note) => note.id !== id);
      await persist(nextNotes);
    },
    [notes, persist],
  );

  const filteredNotes = useMemo(() => {
    let result = notes.filter(n => {
      const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           n.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = showArchived ? n.status === 'archived' : n.status !== 'archived';
      return matchesSearch && matchesStatus;
    });

    // Sorting
    result.sort((a, b) => {
      // Pinned notes always first (if in active list)
      if (!showArchived && a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }
      
      const timeA = Date.parse(a.createdAt);
      const timeB = Date.parse(b.createdAt);
      return sortBy === 'recent' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [notes, searchQuery, showArchived, sortBy]);

  return {
    notes: filteredNotes,
    allNotesCount: notes.length,
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
    togglePin,
  };
}
