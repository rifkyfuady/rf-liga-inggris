import {
  openDB
} from 'idb';

const dbPromise = openDB('liga-inggris', 1, {
  upgrade(db) {
      db.createObjectStore('jadwal', {
          keyPath: "id"
      });
      db.createObjectStore('klub', {
          keyPath: "id"
      });
  },
});

const idbjadwal = {
  async get(key) {
      return (await dbPromise).get('jadwal', key);
  },
  async set(val) {
      return (await dbPromise).put('jadwal', val);
  },
  async delete(key) {
      return (await dbPromise).delete('jadwal', key);
  },
  async clear() {
      return (await dbPromise).clear('jadwal');
  },
  async keys() {
      return (await dbPromise).getAllKeys('jadwal');
  },
  async all() {
      return (await dbPromise).getAll('jadwal');
  },
};

const idbklub = {
  async get(key) {
      return (await dbPromise).get('klub', key);
  },
  async set(val) {
      return (await dbPromise).put('klub', val);
  },
  async delete(key) {
      return (await dbPromise).delete('klub', key);
  },
  async clear() {
      return (await dbPromise).clear('klub');
  },
  async keys() {
      return (await dbPromise).getAllKeys('klub');
  },
  async all() {
      return (await dbPromise).getAll('klub');
  },
};

export {
  idbjadwal,
  idbklub
};