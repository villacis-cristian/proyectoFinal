import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

import { db }
from './firebaseConfig';

// OBTENER JUEGOS
export const getGames =
async () => {

  const querySnapshot =
    await getDocs(
      collection(db, 'games')
    );

  const games: any = [];

  querySnapshot.forEach((document) => {

    games.push({

      id: document.id,

      ...document.data(),
    });
  });

  return games;
};

// AGREGAR
export const addGame =
async (game: any) => {

  await addDoc(
    collection(db, 'games'),
    game
  );
};

// EDITAR
export const editGame =
async (
  id: string,
  game: any
) => {

  await updateDoc(
    doc(db, 'games', id),
    game
  );
};

// ELIMINAR
export const deleteGame =
async (id: string) => {

  await deleteDoc(
    doc(db, 'games', id)
  );
};