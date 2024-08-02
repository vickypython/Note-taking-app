import { useContext } from "react"
import { NotesContext } from "../context/NotesContex"
import { Note } from "../context/NotesReducer"
// import { Note } from "../context/NotesReducer"
export const Notes:React.FC = () => {
  const {notes,dispatch}=useContext(NotesContext)
  const handleDelete = (e: React.MouseEvent, noteId: number) => {
    e.stopPropagation()
    dispatch({
      type:'DELETE_Note',
      payload:noteId
    })
    // const updatedNote = notes.filter(note => note.id !== noteId)
    // setNotes(updatedNote)
    // const  handledelete= {...notes}
    // delete handleDelete[notes]
    // return handleDelete
  }
  return (
    <div className='note-grid'>
    {notes.map(note => (
      <div className='note-item' key={note.id} onClick={(e) => handleDelete(e,note.id)}>
        <div className='note-header'>
          <button onClick={(e) => handleDelete(e, note.id)}>x</button>
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>

      </div>))}
  </div>
  )
}
