import React, { useReducer } from "react"
import { Notes } from "./components/Notes"
import { NotesForm } from "./components/NotesForm"
import { NotesContext } from "./context/NotesContex"
import { notesReducer } from "./context/NotesReducer"
export const App:React.FC = () => {
 const [notes,dispatch]=useReducer(notesReducer,[])
  return (
<NotesContext.Provider value={{notes,dispatch}}>
  <div className="AppContainer">
<NotesForm/>
<Notes/>
  </div>
</NotesContext.Provider>
   

  )
}
