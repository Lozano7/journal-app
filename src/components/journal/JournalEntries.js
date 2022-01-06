import React from 'react';
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
  const { notes } = useSelector((state) => state.note);

  return (
    <div className='journal__entries'>
      {notes.length > 0 &&
        notes.map((note) => (
          <JournalEntry
            key={`${note.id} - ${Math.floor(Math.random() * 1000)}`}
            {...note}
          />
        ))}
    </div>
  );
};
