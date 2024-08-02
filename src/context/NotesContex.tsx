import {  createContext, Dispatch, ReactNode, useReducer } from "react";
import { Note, notesReducer, NotesAction } from './NotesReducer';
type NotesProviderProps={
    children:ReactNode
}
type NotesContextType={
    notes:Note[]
    dispatch:Dispatch<NotesAction>
}

export const NotesContext=createContext<NotesContextType | undefined>(undefined)
 const NotesProvider:React.FC<NotesProviderProps>=({children})=>{
    const [notes,dispatch]=useReducer(notesReducer,[])
return(
    <NotesContext.Provider value={{notes,dispatch}}>
   {children}
  </NotesContext.Provider>
)


}
export default NotesProvider