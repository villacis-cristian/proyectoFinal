import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

import MovieCard
from '../../components/MovieCard';

import {
  getMovies,
  deleteMovie,
} from '../../services/movieService';

export default function MoviesScreen({
  navigation,
  route,
}: any) {

  // ROLE LIMPIO
  const role =
    route.params?.role
      ?.trim()
      .toLowerCase() || 'user';

  // ESTADO
  const [movies, setMovies] =
    useState([]);

  // CARGAR
  const loadMovies =
    async () => {

      const data =
        await getMovies();

      setMovies(data);
    };

  // ELIMINAR
  const handleDelete =
    async (id: string) => {

      Alert.alert(
        'Eliminar',
        '¿Eliminar película?',
        [

          {
            text: 'Cancelar',
          },

          {
            text: 'Eliminar',

            onPress: async () => {

              await deleteMovie(id);

              loadMovies();
            },
          },
        ]
      );
    };

  // RECARGAR
  useEffect(() => {

    const unsubscribe =
      navigation.addListener(
        'focus',
        () => {

          loadMovies();
        }
      );

    return unsubscribe;

  }, [navigation]);

  return (

    <View style={styles.container}>

      {/* ADMIN */}
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

      {/* LISTA */}
      <FlatList

        data={movies}

        keyExtractor={(item: any) =>
          item.id
        }

        renderItem={({ item }: any) => (

          <MovieCard

            movie={item}

            role={role}

            onDelete={() =>
              handleDelete(item.id)
            }

            onEdit={() =>
              navigation.navigate(
                'EditMovie',
                {
                  movie: item,
                  role,
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
    marginBottom: 20,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});