import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function MovieCard({

  movie,

  role,

  onEdit,

  onDelete,

}: any) {

  return (

    <View style={styles.card}>

      {/* IMAGEN */}
      <Image
        source={{ uri: movie.image }}
        style={styles.image}
      />

      {/* INFO */}
      <Text style={styles.title}>
        {movie.title}
      </Text>

      <Text style={styles.genre}>
        🎭 {movie.genre}
      </Text>

      <Text style={styles.price}>
        💲 {movie.price}
      </Text>

      <Text style={styles.description}>
        {movie.description}
      </Text>

      {/* BOTONES ADMIN */}
      {role === 'admin' && (

        <View style={styles.buttonContainer}>

          {/* EDITAR */}
          <TouchableOpacity

            style={styles.editButton}

            onPress={onEdit}
          >

            <Text style={styles.buttonText}>
              Editar
            </Text>

          </TouchableOpacity>

          {/* ELIMINAR */}
          <TouchableOpacity

            style={styles.deleteButton}

            onPress={onDelete}
          >

            <Text style={styles.buttonText}>
              Eliminar
            </Text>

          </TouchableOpacity>

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  genre: {
    color: '#aaa',
    marginTop: 8,
    fontSize: 16,
  },

  price: {
    color: '#4ade80',
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },

  description: {
    color: '#ddd',
    marginTop: 10,
    fontSize: 15,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },

  editButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});