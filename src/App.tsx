import React from "react"
import { NoteList} from "./components/Notes"
import { NoteForm } from "./components/NotesForm"

import './App.css'

import { Provider } from "react-redux"
import { store } from "./store"
export const App:React.FC = () => {
 
  return (
<Provider store={store}>
  <div className="AppContainer">
<NoteForm/>
<NoteList/>
  </div>
</Provider>
   

  )
}
