import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://i.pravatar.cc/300',
        }}
        style={styles.avatar}
      />

      <Text style={styles.username}>
        Andrakolis
      </Text>

      <Text style={styles.email}>
        usuario@email.com
      </Text>

      <Text style={styles.role}>
        Rol: USER
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Cerrar Sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },

  username: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  email: {
    color: '#aaa',
    marginTop: 10,
    fontSize: 16,
  },

  role: {
    color: '#7c3aed',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },

  button: {
    marginTop: 40,
    backgroundColor: '#dc2626',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
