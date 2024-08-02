import { useContext, useState } from 'react'
import './App.css'
import { NotesContext } from '../context/NotesContex'
import { Note } from '../context/NotesReducer';

export const NotesForm = () => {
  const { notes, dispatch } = useContext(NotesContext)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }
    //updater function picks the newly created object and then spread the other objects
    // setNotes([newNote, ...notes])
    dispatch({
      type: 'ADD_NOTE',
      payload: newNote
    })

    // console.log(newNote);
    console.log("title: ", title);
    console.log("content: ", content);
    setTitle('')
    setContent('')
  }
  // const handleUpdate = (note: Note) => {
  //   setSelectedNote(note)//to save the clicked note to our selectedNotes
  //   //now populated the items
  //   setTitle(note.title)
  //   setContent(note.content)
  // }
  const handleUpdateNotes = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedNote) return //exit if there is no notes which is selected
    //updater object based on the id,title,content
    const updatedNotes: Note = {
      id: selectedNote.id,
      title: title,
      content: content
    }
    //generate new array after the updatedNotes object is created to return those items and also the exist ones
    // const updatedNotesList = notes.map(note => (note.id === selectedNote.id ? updatedNotes : note))
    // setNotes(updatedNotesList)
    dispatch({
      type: 'UPDATE_NOTE',
      payload: updatedNotes
    })
    setSelectedNote(null)
    setTitle('')
    setContent('')
  }
  const handleCancel = () => {
    setTitle('');
    setContent('');
    setSelectedNote(null);
  };
  return (
    <div className='AppContainer'>
      <form action="" className='note-form' onSubmit={(e) => selectedNote ? handleUpdateNotes(e) : handleAddNote(e)}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" id="title" placeholder='title' required />
        <textarea rows={10} value={content} onChange={(e) => setContent(e.target.value)} placeholder='Enter the decription' name='desc' required></textarea>
        {
          selectedNote ? (
            <div className='edit-buttons'>
              <button >update</button>
              <button onClick={handleCancel}>cancel</button>
            </div>

          ) :
            <button type="submit">Add Note</button>
        }
      </form>

    </div>
  )
}

