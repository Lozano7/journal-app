import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';
// import { NothingSelected } from './NothingSelected';

export const JournalScreen = () => {
  const { active } = useSelector((state) => state.note);
  return (
    <div className='journal__main-content'>
      <Sidebar />

      <main>{active ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};
