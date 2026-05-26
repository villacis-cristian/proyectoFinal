import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';

import {
  useEffect,
  useState,
} from 'react';

import { db } from '../services/firebaseConfig';

import MovieCard from '../components/MovieCard';

export default function MoviesScreen({
  navigation,
  route,
}: any) {

  const [movies, setMovies] = useState([]);
const role =
  route.params?.role || 'admin';
console.log('ROL ACTUAL:', role);
  // OBTENER PELÍCULAS
  const getMovies = async () => {

    const querySnapshot =
      await getDocs(
        collection(db, 'movies')
      );

    const moviesData: any = [];

    querySnapshot.forEach((doc) => {

      moviesData.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setMovies(moviesData);
  };

  // ELIMINAR
  const deleteMovie = async (id: string) => {

    Alert.alert(
      'Eliminar',
      '¿Deseas eliminar esta película?',
      [
        {
          text: 'Cancelar',
        },

        {
          text: 'Eliminar',

          onPress: async () => {

            await deleteDoc(
              doc(db, 'movies', id)
            );

            getMovies();
          },
        },
      ]
    );
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>

      {/* BOTÓN ADMIN */}
      {role === 'admin' && (

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate(
              'AddMovie',
              { role }
            )
          }
        >
          <Text style={styles.addButtonText}>
            + Agregar Película
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={movies}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (

          <MovieCard
            movie={item}
            role={role}

            onDelete={() =>
              deleteMovie(item.id)
            }

            onEdit={() =>
              navigation.navigate(
                'EditMovie',
                {
                  movie: item,
                }
              )
            }
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 15,
  },

  addButton: {
    backgroundColor: '#7c3aed',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },

  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});