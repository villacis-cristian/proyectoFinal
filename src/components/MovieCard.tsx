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
  onDelete,
  onEdit,
}: any) {

  return (
    <View style={styles.card}>

      <Image
        source={{ uri: movie.image }}
        style={styles.image}
      />

      <Text style={styles.title}>
        {movie.title}
      </Text>

      <Text style={styles.genre}>
        {movie.genre}
      </Text>

      <Text style={styles.price}>
        ${movie.price}
      </Text>

      {/* SOLO ADMIN */}
      {role === 'admin' && (

        <View style={styles.buttonsContainer}>

          <TouchableOpacity
            style={styles.editButton}
            onPress={onEdit}
          >
            <Text style={styles.buttonText}>
              Editar
            </Text>
          </TouchableOpacity>

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
    borderRadius: 18,
    padding: 15,
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 220,
    borderRadius: 14,
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
  },

  genre: {
    color: '#aaa',
    marginTop: 5,
    fontSize: 16,
  },

  price: {
    color: '#7c3aed',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonsContainer: {
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