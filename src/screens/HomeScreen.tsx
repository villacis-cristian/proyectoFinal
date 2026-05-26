import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎮 GameFlix Store</Text>

      <Text style={styles.subtitle}>
        Tienda de películas y videojuegos
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Movies')}
      >
        <Text style={styles.buttonText}>🎬 Películas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Games')}
      >
        <Text style={styles.buttonText}>🎮 Videojuegos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.buttonText}>👤 Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60,
  },

  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 40,
    marginTop: 10,
  },

  button: {
    backgroundColor: '#7c3aed',
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});