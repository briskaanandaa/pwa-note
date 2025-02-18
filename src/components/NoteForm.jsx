import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const NoteForm = ({ onSave, editNote }) => {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (editNote) setNote(editNote.content);
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.trim()) {
      onSave({ id: editNote?.id || Date.now(), content: note });
      setNote("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <textarea
        className="w-full p-2 border"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Tulis catatan..."
      />
      <Button type="submit" size="lg">
        {editNote ? "Update" : "Simpan"}
      </Button>
    </form>
  );
};

export default NoteForm;
