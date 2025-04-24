import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {   selectNote,} from '../features/notes/notesSlice';
import { deleteNotes } from '../Api';

export const NoteList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);
if(!Array.isArray(notes)){
  return <div>No notes available</div>
} 
  const handleDelete = async(e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    try {
      await deleteNotes(dispatch,noteId);
    } catch (error) {
      console.error("Error while deleting note",error)
    }
  };
 
  return (
    <div className='note-grid'>
      {notes.map(note => (
        <div className='note-item' key={note._id} onClick={() => dispatch(selectNote(note))}>
          <div className='note-header'>
            <button onClick={e => handleDelete(e, note._id)}>x</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
