import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const contentDB = await openDB("jate", 1);

  const tx = contentDB.transaction("jate", "readwrite");

  const store = tx.objectStore("jate");

  const request = store.add({ content });
  const result = await request;
  console.log("data saved to database", result);
};

export const getDb = async () => {
  const contentDB = await openDB("jate", 1);

  const tx = contentDB.transaction("jate", "readonly");

  const store = tx.objectStore("jate");

  const request = store.getAll();

  const result = await request;
  console.log("all content retreived from database", result);
};

initdb();
