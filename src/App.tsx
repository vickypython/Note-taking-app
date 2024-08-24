import React, { useEffect } from "react"
import { NoteList } from "./components/Notes"
import { NoteForm } from "./components/NotesForm"

import './App.css'

import { Provider, useDispatch } from "react-redux"
import { store } from "./store"
import { fetchNotes } from "./Api"

const AppContent: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    fetchNotes(dispatch)
  }, [dispatch])
  return (
    <div className="AppContainer">
      <NoteForm />
      <NoteList />
    </div>

  )
}
export const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>

  )
}
