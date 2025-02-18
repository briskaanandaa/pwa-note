import { openDB } from 'idb';

const DB_NAME = 'notesDB';
const STORE_NAME = 'notes';

const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

export const addNote = async (note) => {
    const db = await initDB();
    return db.add(STORE_NAME, note);
};

export const getNotes = async () => {
    const db = await initDB();
    return db.getAll(STORE_NAME);
};

export const updateNote = async (note) => {
    const db = await initDB();
    return db.put(STORE_NAME, note);
};

export const deleteNote = async (id) => {
    const db = await initDB();
    return db.delete(STORE_NAME, id);
};
