import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function HomeScreen({
  navigation,
  route,
}: any) {

  const username =
    route.params?.username || 'Usuario';

  const role =
    route.params?.role || 'user';

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        🎮 GameFlix Store
      </Text>

      <Text style={styles.subtitle}>
        Bienvenido {username}
      </Text>

      <Text style={styles.role}>
        Rol: {role.toUpperCase()}
      </Text>

   <TouchableOpacity
  style={styles.button}
  onPress={() =>
    navigation.navigate(
      'Movies',
      {
        role: role,
        username: username,
      }
    )
  }
>
  <Text style={styles.buttonText}>
    🎬 Películas
  </Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.button}
  onPress={() =>
    navigation.navigate(
      'Games',
      {
        role: role,
        username: username,
      }
    )
  }
>
  <Text style={styles.buttonText}>
    🎮 Videojuegos
  </Text>
</TouchableOpacity>

      {/* SOLO ADMIN */}
      {role === 'admin' && (

        <View style={styles.adminBox}>

          <Text style={styles.adminText}>
            🔥 PANEL ADMIN ACTIVADO
          </Text>

          <TouchableOpacity
            style={styles.adminButton}
          >
            <Text style={styles.buttonText}>
              Agregar Película
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.adminButton}
          >
            <Text style={styles.buttonText}>
              Agregar Juego
            </Text>
          </TouchableOpacity>

        </View>
      )}

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.buttonText}>
          👤 Perfil
        </Text>
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
    marginTop: 50,
  },

  subtitle: {
    color: '#aaa',
    fontSize: 18,
    marginTop: 10,
  },

  role: {
    color: '#7c3aed',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 40,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#7c3aed',
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: 'center',
  },

  profileButton: {
    backgroundColor: '#2563eb',
    padding: 18,
    borderRadius: 14,
    marginTop: 30,
    alignItems: 'center',
  },

  adminBox: {
    marginTop: 20,
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 16,
  },

  adminText: {
    color: '#f59e0b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  adminButton: {
    backgroundColor: '#dc2626',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});