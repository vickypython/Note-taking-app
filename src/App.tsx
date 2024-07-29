import { useState } from 'react'
import './App.css'
type Note = {
  id: number
  title: string
  content: string
}
export const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'test blal',
      content: 'just testing'
    },
    {
      id: 2,
      title: 'test blal',
      content: 'just testing'
    },
    {
      id: 3,
      title: 'test blal',
      content: 'just testing'
    }])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [selectedNotes, setSelectedNotes] = useState<Note | null>(null)
  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }
    //updater function picks the newly created object and then spread the other objects
    setNotes([newNote, ...notes])
 
    console.log(newNote);
    console.log("title: ", title);
    console.log("content: ", content);
    setTitle('')
    setContent('')
  }
  const handleUpdate = (note: Note) => {
    setSelectedNotes(note)//to save the clicked note to our selectedNotes
    //now populated the items
    setTitle(note.title)
    setContent(note.content)
  }
  const handleUpdateNotes=(e:React.FormEvent)=>{
    e.preventDefault()
    if(!selectedNotes)  return //exit if there is no notes which is selected
    //updater object based on the id,title,content
    const updatedNotes:Note={
      id:selectedNotes.id,
      title:title,
      content:content
    }
    //generate new array after the updatedNotes object is created to return those items and also the exist ones
    const updatedNotesList= notes.map(note=>(note.id===selectedNotes.id ?updatedNotes:note))
    setNotes(updatedNotesList)
    setTitle('')
    setContent('')
    setSelectedNotes(null)
  }

  return (
    <div className='AppContainer'>
      <form action="" className='note-form' onSubmit={handelSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" id="" placeholder='title' required />
        <textarea rows={10} value={content} onChange={(e) => setContent(e.target.value)} placeholder='Enter the decription' required></textarea>

        <button type="submit">Add Note</button>
      </form>
      <div className='note-grid'>
        {notes.map(note => (
          <div className='note-item' key={note.id} onClick={() => handleUpdate(note)}>
            <div className='note-header'>
              <button>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>))}
      </div>
    </div>
  )
}

