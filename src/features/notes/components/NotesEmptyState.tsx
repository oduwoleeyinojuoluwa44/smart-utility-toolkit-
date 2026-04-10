import React from 'react';

import { EmptyState } from '../../../shared/components/EmptyState';

export function NotesEmptyState() {
  return (
    <EmptyState
      title="No notes yet"
      message="Create your first note to keep quick reminders and utility details in one place."
    />
  );
}
