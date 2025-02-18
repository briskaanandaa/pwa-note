import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { addNote, getNotes, updateNote, deleteNote } from "./db/indexedDB";
import { registerSW } from "virtual:pwa-register";

function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };
    fetchNotes();

    // Cek apakah PWA sudah terinstal
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Tangkap event install
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    // Daftarkan Service Worker PWA
    registerSW({
      onNeedRefresh() {
        if (confirm("Aplikasi telah diperbarui. Muat ulang sekarang?")) {
          location.reload();
        }
      },
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
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

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA Installed");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-5 p-4 border rounded shadow-lg">
      <h1 className="text-xl font-bold text-center mb-4">Note App</h1>

      {!isInstalled && deferredPrompt && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={handleInstallPWA}
        >
          Install Aplikasi
        </button>
      )}

      <NoteForm onSave={handleSave} editNote={editNote} />
      <NoteList notes={notes} onEdit={setEditNote} onDelete={handleDelete} />
    </div>
  );
}

export default App;
