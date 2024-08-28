import {
  addNote,
  deleteNote,
  getNotes,
  Note,
  updateNote,
} from "./features/notes/notesSlice";
import { AppDispatch } from "./store";
interface ApiResponse {
  message: string;
  notes: Note[];
}
// interface NoteInput {
//   title: string;
//   content: string;
// }

const fetchNotes = async (dispatch: AppDispatch) => {
  const response = await fetch("http://localhost:5000/all-notes");
  const data: ApiResponse = await response.json();
  if (data.notes) {
    dispatch(getNotes(data.notes));
  } else {
    console.error("Notes found in response");
  }
};
const addNotes = async (dispatch: AppDispatch, formData: Omit<Note, "_id">) => {
  //   const newNote = {
  //     title:formData.title,
  //     conten:formData.content,
  //   };
  try {
    const response = await fetch("http://localhost:5000/add-note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data: ApiResponse = await response.json();
    console.log(data);

    const savedNote = data.notes[0];
    dispatch(addNote(savedNote));
  } catch (error) {
    throw new Error("error");
  }
};
const updateNotes=async(dispatch:AppDispatch,formData:Note)=>{
  try{
const response= await fetch(`http://localhost:5000/update-note/${formData._id}`,{
  method:"Put",
  headers:{
    "Content-Type":"Application/json"
  },
  body:JSON.stringify(formData)
})
const data:ApiResponse=await response.json()
const savedNote=data.notes[0]
// Dispatch the updated note to the store
dispatch(updateNote(savedNote))
  }catch(error){
throw new Error("error")
  }
}
const deleteNotes = async (dispatch: AppDispatch, _id:string) => {
  try {
    const response = await fetch(`http://localhost:5000/delete-note/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      }
    
    });
  
    if(!response.ok) throw new Error ("failed to dlete Note")
    dispatch(deleteNote(_id));
  } catch (error) {
    console.error("Error occured while trying to delete",error);
  }
};

export { fetchNotes, addNotes,updateNotes, deleteNotes };
