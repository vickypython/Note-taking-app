import React, { useState } from "react"
type Note = {
    id: number
    title: string
    description: string
}
const Practice = () => {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: 1,
            title: 'cut',
            description: "cut item"
        },
        {
            id: 2,
            title: 'cut',
            description: "cut item"
        }
    ])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)
    //update the ui
    const handleSetNotes = (event: React.FormEvent) => {
        event.preventDefault()
        //ypu have to create a body for the structure of your data
        const newNote: Note = {
            id: notes.length + 1,
            title: title,
            description: description
        }
        setNotes([newNote, ...notes])
        setTitle('')
        setDescription('')
    }
    //update when i select a note for user to update
    const handleselectedNotes = (note: Note) => {
        setSelectedNote(note)
        setTitle(note.title)
        setDescription(note.description)
    }
    const updateAfter = (event: React.FormEvent) => {
        event.preventDefault()
        if (!selectedNote) return
        const selected: Note = {
            id: selectedNote.id,
            title: title,
            description: description
        }
        const updatedOne = notes.map(note => (note.id === selectedNote.id ? selected:note))
    
        setNotes(updatedOne)
        setSelectedNote(null)
        setTitle('')
        setDescription('')
    }
    const handleCancel = () => {
        setSelectedNote(null)
        setTitle('')
        setDescription('')
    }
const handleDelete=(event:React.MouseEvent,noteId:number)=>{
    event.stopPropagation()
const toDelete=notes.filter(note=>note.id !== noteId)
setNotes(toDelete)


}

    return (

        <div>
            <form action="" onSubmit={(e) => (selectedNote ? updateAfter(e) : handleSetNotes(e))}>
                <input type="text" name="" id="" value={description} onChange={(e) => setDescription(e.target.value)} />
                <textarea name="" value={title} rows={20} onChange={(e) => setTitle(e.target.value)}></textarea>

                {(selectedNote ? (
                    <div>
                        <button type="submit">update</button>
                        <button onClick={handleCancel}>cancle</button>
                    </div>
                ) : (
                    <button type="submit">Add note</button>
                ))}



            </form>
            <div className="container">
                {
                    notes.map(note => (
                        <div className="cards one " key={note.id} onClick={() => handleselectedNotes(note)}>
                            <div>
                                <button onClick={(e)=>handleDelete(e,note.id)}>x</button>
                            </div>
                            <h2>{note.title}</h2>
                            <p>{note.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}
export default Practice