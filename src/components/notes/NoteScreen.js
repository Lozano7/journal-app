import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { noteActions, startDeleteNote } from '../../slice/noteSlice';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.note);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title } = formValues;
  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(noteActions.activeNote({ ...formValues }));
  }, [formValues, dispatch]);

  const handleDeleteNote = () => {
    dispatch(startDeleteNote(note.id));
  };
  return (
    <div className='notes__main-content'>
      <NotesAppBar />

      <div className='notes__content'>
        <input
          type='text'
          placeholder='Some awesome title'
          className='notes__title-input'
          autoComplete='off'
          name='title'
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder='What happened today'
          className='notes__textarea'
          value={body}
          name='body'
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className='notes__image'>
            <img src={note.url} alt='imagen' />
          </div>
        )}
      </div>
      <button className='btn btn-danger' onClick={handleDeleteNote}>
        Delete
      </button>
    </div>
  );
};
