import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../slice/noteSlice';
import { startLogout } from '../../slice/usersSlice';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.user);
  const handleLgout = () => {
    dispatch(startLogout());
  };
  const handleAddNew = () => {
    dispatch(startNewNote());
  };
  return (
    <aside className='journal__sidebar'>
      <div className='journal__sidebar-navbar'>
        <h3 className='mt-5'>
          <i className='far fa-moon'></i>
          <span> {name}</span>
        </h3>

        <button className='btn' onClick={handleLgout}>
          Logout
        </button>
      </div>

      <div onClick={handleAddNew} className='journal__new-entry'>
        <i className='far fa-calendar-plus fa-5x'></i>
        <p className='mt-5'>New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};
