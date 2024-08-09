// src/features/notes/notesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Note = {
  id: number;
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
      state.notes = [action.payload, ...state.notes];
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      state.notes = state.notes.map(note =>
        note.id === action.payload.id ? action.payload : note
      );
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    selectNote: (state, action: PayloadAction<Note | null>) => {
      state.selectedNote = action.payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, selectNote } = notesSlice.actions;
export default notesSlice.reducer;
