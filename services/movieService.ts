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

// OBTENER PELÍCULAS
export const getMovies =
async () => {

  const querySnapshot =
    await getDocs(
      collection(db, 'movies')
    );

  const movies: any = [];

  querySnapshot.forEach((document) => {

    movies.push({

      id: document.id,

      ...document.data(),
    });
  });

  return movies;
};

// AGREGAR
export const addMovie =
async (movie: any) => {

  await addDoc(
    collection(db, 'movies'),
    movie
  );
};

// EDITAR
export const editMovie =
async (
  id: string,
  movie: any
) => {

  await updateDoc(
    doc(db, 'movies', id),
    movie
  );
};

// ELIMINAR
export const deleteMovie =
async (id: string) => {

  await deleteDoc(
    doc(db, 'movies', id)
  );
};