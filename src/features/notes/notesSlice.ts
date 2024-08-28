// src/features/notes/notesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes = [...state.notes, action.payload];
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const { payload } = action;
      state.notes = state.notes.map((note) =>
        note._id === payload._id ? payload : note
      );
    },
    getNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    deleteNote: (state, action: PayloadAction<string>) => {
     
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    selectNote: (state, action: PayloadAction<Note | null>) => {
      state.selectedNote = action.payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, selectNote, getNotes } =
  notesSlice.actions;
export default notesSlice.reducer;
