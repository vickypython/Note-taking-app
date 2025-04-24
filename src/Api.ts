import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  Note,
  } from "./features/notes/notesSlice";
import { AppDispatch } from "./store";
const BaseUrl:string=import.meta.env.VITE_API_BASE_URL
interface ApiResponse {
  message: string; //"{Body:'message',stkcallback:'{vvaj}'"
  notes: Note[];
}
// interface NoteInput {
//   title: string;
//   content: string;
// }

const fetchNotes = async (dispatch: AppDispatch) => {
  const userToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${BaseUrl}/all-notes`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("failed to fetch the notes");
    }
    const data: ApiResponse = await response.json();
    if (data.notes && data.notes.length > 0) {
      dispatch(getNotes(data.notes));
    } else {
      console.error("No Notes  found in the  response");
      dispatch(getNotes([]));
    }
  } catch (error) {
    console.error("fetchNotes Error:", error);
  }
};
const addNotes = async (dispatch: AppDispatch, formData: Omit<Note, "_id">) => {
  //   const newNote = {
  //     title:formData.title,
  //     conten:formData.content,
  //   };
  const userToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${BaseUrl}/add-note`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to add new notes");
    }
    const data: ApiResponse = await response.json();
    console.log(data);

    const savedNote = data.notes[0];
    dispatch(addNote(savedNote));
  } catch (error) {
    console.error("Error while trying to add new notes", error);
  }
};
const updateNotes = async (dispatch: AppDispatch, formData: Note) => {
  try {
    const response = await fetch(
      `${BaseUrl}/update-note/${formData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error("failed to update note:");
    }
    const data: ApiResponse = await response.json();
    const savedNote = data.notes[0];
    // Dispatch the updated note to the store
    dispatch(updateNote(savedNote));
  } catch (error) {
    console.error("update function error:", error);
  }
};
const deleteNotes = async (dispatch: AppDispatch, _id: string) => {
  try {
    const response = await fetch(`${BaseUrl}/delete-note/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    if (!response.ok) throw new Error("failed to delete Note");
    dispatch(deleteNote(_id));
  } catch (error) {
    console.error("Error occured while trying to delete:", error);
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
};
export { fetchNotes, addNotes, updateNotes, deleteNotes };
