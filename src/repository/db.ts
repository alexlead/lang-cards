import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface AppDB extends DBSchema {
  folders: {
    key: number;
    value: {
      id: number;
      folder: string;
      slug: string;
      parentId: number | null;
    };
    indexes: { 'by-slug': string };
  };
  words: {
    key: number;
    value: {
      id: number;
      folderId: number;
      word: string;
      transcription: string;
      translation: string;
    };
    indexes: { 'by-folderId': number };
  };
}

let db: IDBPDatabase<AppDB>;

export const initDB = async () => {
  db = await openDB<AppDB>('FolderWordDB', 2, { 
    upgrade(db, oldVersion, newVersion) {
      if (oldVersion < 1) {
        const folderStore = db.createObjectStore('folders', { keyPath: 'id', autoIncrement: true });
        folderStore.createIndex('by-slug', 'slug');

        const wordStore = db.createObjectStore('words', { keyPath: 'id', autoIncrement: true });
        wordStore.createIndex('by-folderId', 'folderId');
      }

      if (oldVersion < 2) {
        console.log('Database upgraded to version 2');
      }
    },
  });
};


const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_') 
    .replace(/(^-|-$)/g, ''); 

export const folderDB = {
  async add(folder: string, parentId: number | null = null) {
    const slug = generateSlug(folder);
    const exists = await db.getFromIndex('folders', 'by-slug', slug);
    if (exists) throw new Error('Folder with this slug already exists');
    return db.put('folders', { id: Date.now(), folder, slug, parentId });
  },
  async delete(id: number) {
    return db.delete('folders', id);
  },
  async update(id: number, folder: string) {
    const existing = await db.get('folders', id);
    if (existing) {
      existing.folder = folder;
      existing.slug = generateSlug(folder);
      await db.put('folders', existing);
    }
  },
  async getAll() {
    return db.getAll('folders');
  },
  async getBySlug(slug: string) {
    return db.getFromIndex('folders', 'by-slug', slug);
  },
};


export const wordDB = {
  async add(folderId: number, word: string, transcription: string, translation: string) {
    return db.put('words', { id: Date.now(), folderId, word, transcription, translation });
  },
  async delete(id: number) {
    return db.delete('words', id);
  },
  async deleteMultiple(ids: number[]) {
    for (const id of ids) {
      await db.delete('words', id);
    }
  },
  async update(id: number, updates: Partial<{ word: string; transcription: string; translation: string }>) {
    const existing = await db.get('words', id);
    if (existing) {
      Object.assign(existing, updates);
      await db.put('words', existing);
    }
  },
  async getAll() {
    return db.getAll('words');
  },
  async getByFolderId(folderId: number) {
    return db.getAllFromIndex('words', 'by-folderId', folderId);
  },
};