import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { deleteNote, selectNote } from '../features/notes/notesSlice';

export const NoteList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const handleDelete = (e: React.MouseEvent, noteId: number) => {
    e.stopPropagation();
    dispatch(deleteNote(noteId));
  };

  return (
    <div className='note-grid'>
      {notes.map(note => (
        <div className='note-item' key={note.id} onClick={() => dispatch(selectNote(note))}>
          <div className='note-header'>
            <button onClick={e => handleDelete(e, note.id)}>x</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
