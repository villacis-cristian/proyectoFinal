

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  createUserWithEmailAndPassword
} from 'firebase/auth';

import {
  doc,
  setDoc
} from 'firebase/firestore';

import {
  auth,
  db
} from '../services/firebaseConfig';
import { useState } from 'react';

export default function RegisterScreen({ navigation }: any) {

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const handleRegister = async () => {

  if (!username || !email || !password) {

    Alert.alert(
      'Error',
      'Completa todos los campos'
    );

    return;
  }

  try {

    // CREAR USUARIO EN FIREBASE AUTH
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    // GUARDAR DATOS EN FIRESTORE
    await setDoc(
      doc(db, 'users', user.uid),
      {
        username,
        email,
        role: 'user',
        createdAt: new Date(),
      }
    );

    Alert.alert(
      'Éxito',
      'Usuario registrado correctamente'
    );

    navigation.navigate('Login');

  } catch (error: any) {

    Alert.alert(
      'Error Firebase',
      error.message
    );
  }
};
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.logo}>
        🎬🎮
      </Text>

      <Text style={styles.title}>
        Crear Cuenta
      </Text>

      <Text style={styles.subtitle}>
        Regístrate en GameFlix Store
      </Text>

      <TextInput
        style={styles.input}
        placeholder='Usuario'
        placeholderTextColor='#888'
        value={username}
        onChangeText={setUsername}
      />

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
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>
          Registrarse
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.link}>
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 25,
  },

  logo: {
    fontSize: 60,
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
    fontSize: 16,
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
    marginBottom: 40,
    fontSize: 16,
  },
});