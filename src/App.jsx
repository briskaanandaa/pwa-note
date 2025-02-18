import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { addNote, getNotes, updateNote, deleteNote } from "./db/indexedDB";

function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    getNotes().then(setNotes);
  }, []);

  const handleSave = async (note) => {
    if (editNote) {
      await updateNote(note);
    } else {
      await addNote(note);
    }
    setNotes(await getNotes());
    setEditNote(null);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(await getNotes());
  };

  return (
    <div className="max-w-lg mx-auto mt-5 p-4 border rounded">
      <h1 className="text-xl font-bold text-center">Note App</h1>
      <NoteForm onSave={handleSave} editNote={editNote} />
      <NoteList notes={notes} onEdit={setEditNote} onDelete={handleDelete} />
    </div>
  );
}

export default App;
