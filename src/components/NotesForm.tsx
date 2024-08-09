import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addNote, updateNote, selectNote } from '../features/notes/notesSlice';

 export const NoteForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedNote = useSelector((state: RootState) => state.notes.selectedNote);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedNote]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote = {
      id: Date.now(),
      title,
      content,
    };
    dispatch(addNote(newNote));
    setTitle('');
    setContent('');
  };

  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNote) return;
    const updatedNote = {
      ...selectedNote,
      title,
      content,
    };
    dispatch(updateNote(updatedNote));
    dispatch(selectNote(null));
  };

  const handleCancel = () => {
    dispatch(selectNote(null));
    setTitle('');
    setContent('');
  };

  return (
    <form className='note-form' onSubmit={e => (selectedNote ? handleUpdateNote(e) : handleAddNote(e))}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' required />
      <textarea rows={10} value={content} onChange={e => setContent(e.target.value)} placeholder='Content' required />
      {selectedNote ? (
        <div>
          <button type="submit">Update</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button type="submit">Add Note</button>
      )}
    </form>
  );
};

export default NoteForm;
