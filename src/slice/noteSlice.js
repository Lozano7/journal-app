import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
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

export const startUploading = createAsyncThunk(
  'note/startUploading',
  async (file, { dispatch, getState }) => {
    console.log(file);
    // const { uid } = getState().user;
    // const note = getState().note.active;
    // const fileName = `${uid}/${note.id}/${file.name}`;
    // const fileRef = await db.ref(fileName);
    // await fileRef.put(file);
    // const url = await fileRef.getDownloadURL();
    // dispatch(
    //   noteActions.udpdateNote({
    //     id: note.id,
    //     url,
    //   })
    // );
  }
);
export const startSaveNote = createAsyncThunk(
  'note/startSaveNote',
  async (note, { dispatch, getState }) => {
    const { uid } = getState().user;
    const { id, ...noteData } = note;
    const noteToFirestore = { ...noteData };
    if (!noteToFirestore.url) delete noteToFirestore.url;
    try {
      await db.doc(`${uid}/journal/notes/${id}`).update(noteToFirestore);
      dispatch(noteActions.udpdateNote(note));
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
  },
});

export const { reducer: noteReducer, actions: noteActions } = noteSlice;
