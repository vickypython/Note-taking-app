// import { handelAddNote, handleDelete } from './actiontype'
export type Note = {
    id: number;
    title: string;
    content: string;
}
export type NotesAction =
    | { type: 'ADD_NOTE'; payload: Note }
    | { type: 'UPDATE_NOTE'; payload: Note }
    | { type: 'DELETE_NOTE'; payload: number };
export const notesReducer = (state: Note[], action: NotesAction): Note[] => {
    switch (action.type) {
        case 'ADD_NOTE':
            return [ action.payload,...state]

        case 'UPDATE_NOTE':
            return state.map(note => note.id === action.payload.id ? action.payload : note)
        case 'DELETE_NOTE':
            return state.filter(note => note.id !== action.payload)
        default:
            return state
    }
}