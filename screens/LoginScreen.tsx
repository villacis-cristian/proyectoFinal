import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useState }
from 'react';

import {
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {
  doc,
  getDoc,
} from 'firebase/firestore';

import {
  auth,
  db,
} from '../services/firebaseConfig';

export default function LoginScreen({
  navigation,
}: any) {

  // ESTADOS
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  // LOGIN
  const handleLogin =
    async () => {

      if (!email || !password) {

        Alert.alert(
          'Error',
          'Completa todos los campos'
        );

        return;
      }

      try {

        // LOGIN FIREBASE AUTH
        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        const uid =
          userCredential.user.uid;

        // BUSCAR USUARIO EN FIRESTORE
        const userRef =
          doc(db, 'users', uid);

        const userSnap =
          await getDoc(userRef);

        // VALIDAR
        if (!userSnap.exists()) {

          Alert.alert(
            'Error',
            'Usuario no encontrado'
          );

          return;
        }

        // DATOS
        const userData =
          userSnap.data();

        console.log(
          'USUARIO:',
          userData
        );

        console.log(
          'ROLE:',
          userData.role
        );

        // NAVEGAR
        navigation.replace(
          'Home',
          {
            username:
              userData.username,

            role:
              userData.role,
          }
        );

      } catch (error: any) {

        Alert.alert(
          'Error',
          error.message
        );
      }
    };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        🎬 GameStore
      </Text>

      {/* EMAIL */}
      <TextInput
        style={styles.input}
        placeholder='Correo'
        placeholderTextColor='#888'
        value={email}
        onChangeText={setEmail}
      />

      {/* PASSWORD */}
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        placeholderTextColor='#888'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* BOTÓN LOGIN */}
      <TouchableOpacity

        style={styles.button}

        onPress={handleLogin}
      >

        <Text style={styles.buttonText}>
          Iniciar Sesión
        </Text>

      </TouchableOpacity>

      {/* REGISTER */}
      <TouchableOpacity

        onPress={() =>
          navigation.navigate(
            'Register'
          )
        }
      >

        <Text style={styles.registerText}>
          ¿No tienes cuenta?
          Regístrate
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
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
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
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  registerText: {
    color: '#38bdf8',
    textAlign: 'center',
    fontSize: 16,
  },
});