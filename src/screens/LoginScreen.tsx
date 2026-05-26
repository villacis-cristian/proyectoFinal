import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useState } from 'react';
import {
  signInWithEmailAndPassword
} from 'firebase/auth';

import {
  doc,
  getDoc
} from 'firebase/firestore';

import {
  auth,
  db
} from '../services/firebaseConfig';
export default function LoginScreen({ navigation }: any) {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const handleLogin = async () => {

  if (!email || !password) {

    Alert.alert(
      'Error',
      'Completa todos los campos'
    );

    return;
  }

  try {

    // LOGIN FIREBASE
    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    // BUSCAR DATOS EN FIRESTORE
    const userDoc = await getDoc(
      doc(db, 'users', user.uid)
    );

    if (userDoc.exists()) {

      const userData = userDoc.data();

      Alert.alert(
        'Bienvenido',
        `Rol: ${userData.role}`
      );

      // ENVIAR DATOS A HOME
      navigation.navigate(
        'Home',
        {
          username: userData.username,
          role: userData.role,
        }
      );

    }

  } catch (error: any) {

    Alert.alert(
      'Error Login',
      error.message
    );
  }
};

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>
        🎮
      </Text>

      <Text style={styles.title}>
        GameFlix Store
      </Text>

      <Text style={styles.subtitle}>
        Iniciar Sesión
      </Text>

      <TextInput
        style={styles.input}
        placeholder='Correo'
        placeholderTextColor='#888'
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        placeholderTextColor='#888'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.link}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 25,
  },

  logo: {
    fontSize: 70,
    textAlign: 'center',
    marginBottom: 20,
  },

  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
    fontSize: 18,
  },

  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#7c3aed',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  link: {
    color: '#7c3aed',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 16,
  },
});