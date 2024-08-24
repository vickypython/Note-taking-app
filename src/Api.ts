import { addNote, getNotes, Note } from "./features/notes/notesSlice";
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
const addNotes = async (dispatch: AppDispatch, formData: Omit<Note,'_id'>) => {
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
    
    const savedNote=data.notes[0]
    dispatch(addNote(savedNote));
  } catch (error) {
    throw new Error("error");
  }
};

export { fetchNotes, addNotes };
