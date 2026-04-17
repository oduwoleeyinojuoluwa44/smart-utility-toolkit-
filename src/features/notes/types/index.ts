export type NoteStatus = 'active' | 'archived' | 'draft';

export type Note = {
  id: string;
  title: string;
  content: string;
  status: NoteStatus;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
};
