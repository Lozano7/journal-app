import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../slice/noteSlice';

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: activeNote } = useSelector((state) => state.note);
  const handleSave = () => {
    dispatch(startSaveNote(activeNote));
  };
  const handlePictureClick = () => {
    document.querySelector('#file-selector').click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };
  return (
    <div className='notes__appbar'>
      <span>28 de agosto 2020</span>
      <input
        type='file'
        name='file'
        id='file-selector'
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept='image/*'
      />
      <div>
        <button className='btn' onClick={handlePictureClick}>
          Picture
        </button>

        <button className='btn' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
