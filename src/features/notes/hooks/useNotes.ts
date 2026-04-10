import { useCallback, useEffect, useState } from 'react';

import { getStoredNotes, saveStoredNotes } from '../storage/notesStorage';
import { Note } from '../types';

type NoteInput = {
  title: string;
  content: string;
};

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadNotes() {
      const storedNotes = await getStoredNotes();
      setNotes(storedNotes.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)));
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

      if (!title && !content) {
        return false;
      }

      const now = new Date().toISOString();
      const nextNotes = noteId
        ? notes.map((note) =>
            note.id === noteId ? { ...note, title, content, updatedAt: now } : note,
          )
        : [
            {
              id: `${Date.now()}`,
              title,
              content,
              createdAt: now,
              updatedAt: now,
            },
            ...notes,
          ];

      const sortedNotes = [...nextNotes].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
      await persist(sortedNotes);
      return true;
    },
    [notes, persist],
  );

  const deleteNote = useCallback(
    async (id: string) => {
      const nextNotes = notes.filter((note) => note.id !== id);
      await persist(nextNotes);
    },
    [notes, persist],
  );

  return {
    notes,
    isLoading,
    saveNote,
    deleteNote,
  };
}
