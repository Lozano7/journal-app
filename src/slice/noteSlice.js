import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import loadNotes from '../helpers/loadNotes';
export const startNewNote = createAsyncThunk(
  'note/startNewNote',
  async (note, { dispatch, getState }) => {
    const { uid } = getState().user;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };
    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(
      noteActions.activeNote({
        id: doc.id,
        title: '',
        body: '',
        url: '',
        date: new Date().getTime(),
      })
    );
  }
);
export const startDeleteNote = createAsyncThunk(
  'note/deleteNote',
  async (noteId, { dispatch, getState }) => {
    const { uid } = getState().user;
    await db.doc(`${uid}/journal/notes/${noteId}`).delete();
    dispatch(noteActions.deleteNote(noteId));
  }
);
export const startSaveNote = createAsyncThunk(
  'note/startSaveNote',
  async (note, { dispatch, getState }) => {
    const { uid } = getState().user;
    const { notes } = getState().note;
    const { id, ...noteData } = note;
    const noteToFirestore = { ...noteData };
    if (!noteToFirestore.url) delete noteToFirestore.url;
    try {
      await db.doc(`${uid}/journal/notes/${id}`).update(noteToFirestore);
      dispatch(noteActions.udpdateNote(note));
      if (!notes.some((note) => note.id === id)) {
        dispatch(noteActions.addNote(note));
      }
      Swal.fire('Saved!', 'Your note has been saved', 'success');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  }
);

export const startUploading = createAsyncThunk(
  'note/startUploading',
  async (file, { dispatch, getState }) => {
    const { active: activeNote } = getState().note;
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    const updateNote = { ...activeNote };
    dispatch(noteActions.activeNote({ ...activeNote, url: fileUrl }));
    updateNote.url = fileUrl;
    dispatch(startSaveNote(updateNote));
    Swal.close();
  }
);

export const loadingNotes = createAsyncThunk(
  'note/loadingNotes',
  async ({ id }, { dispatch }) => {
    const notes = await loadNotes(id);
    if (notes.length > 0) {
      dispatch(noteActions.setNotes(notes));
    }
  }
);

const noteSlice = createSlice({
  name: 'note',
  initialState: {
    notes: [],
    active: null,
  },
  reducers: {
    activeNote: (state, action) => {
      return {
        ...state,
        active: action.payload,
      };
    },
    setNotes: (state, action) => {
      return {
        ...state,
        notes: action.payload,
      };
    },
    addNote: (state, action) => {
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    },
    udpdateNote: (state, action) => {
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.id) {
            return action.payload;
          }
          return note;
        }),
      };
    },
    deleteNote: (state, action) => {
      return {
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    },
    logoutCleaning: (state) => {
      return {
        notes: [],
        active: null,
      };
    },
  },
});

export const { reducer: noteReducer, actions: noteActions } = noteSlice;
