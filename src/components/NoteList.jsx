const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <ul className="mt-4">
      {notes.map((note) => (
        <li
          key={note.id}
          className="p-3 border rounded mb-2 flex justify-between"
        >
          <span>{note.content}</span>
          <div>
            <button className="mr-2 text-blue-500" onClick={() => onEdit(note)}>
              Edit
            </button>
            <button className="text-red-500" onClick={() => onDelete(note.id)}>
              Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
