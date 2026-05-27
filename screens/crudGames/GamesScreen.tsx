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

import GameCard
from '../../components/GameCard';

import {
  getGames,
  deleteGame,
} from '../../services/gameService';

export default function GamesScreen({
  navigation,
  route,
}: any) {

  // ROLE LIMPIO
  const role =
    route.params?.role
      ?.trim()
      .toLowerCase() || 'user';

  // ESTADO
  const [games, setGames] =
    useState([]);

  // CARGAR
  const loadGames =
    async () => {

      const data =
        await getGames();

      setGames(data);
    };

  // ELIMINAR
  const handleDelete =
    async (id: string) => {

      Alert.alert(
        'Eliminar',
        '¿Eliminar juego?',
        [

          {
            text: 'Cancelar',
          },

          {
            text: 'Eliminar',

            onPress: async () => {

              await deleteGame(id);

              loadGames();
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

          loadGames();
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
              'AddGame',
              { role }
            )
          }
        >

          <Text style={styles.addButtonText}>
            + Agregar Juego
          </Text>

        </TouchableOpacity>
      )}

      {/* LISTA */}
      <FlatList

        data={games}

        keyExtractor={(item: any) =>
          item.id
        }

        renderItem={({ item }: any) => (

          <GameCard

            game={item}

            role={role}

            onDelete={() =>
              handleDelete(item.id)
            }

            onEdit={() =>
              navigation.navigate(
                'EditGame',
                {
                  game: item,
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