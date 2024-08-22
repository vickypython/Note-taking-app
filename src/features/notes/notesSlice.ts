// src/features/notes/notesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Note = {
  _id: string;
  title: string;
  content: string;
};

 export interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
}

const initialState: NotesState = {
  notes: [],
  selectedNote: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      const {payload}=action
     state.notes=[payload, ...state.notes]
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const {payload}=action
      state.notes = state.notes.map(note =>
        note._id === payload._id ? payload : note
      );
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const {payload}=action
      state.notes = state.notes.filter(note => note._id !== payload);
    },
    selectNote: (state, action: PayloadAction<Note | null>) => {
      const {payload}=action
      state.selectedNote = payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, selectNote } = notesSlice.actions;
export default notesSlice.reducer;
