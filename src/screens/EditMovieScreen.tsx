import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

import { useState } from 'react';

import {
  updateDoc,
  doc,
} from 'firebase/firestore';

import * as ImagePicker from 'expo-image-picker';

import { db } from '../services/firebaseConfig';

export default function EditMovieScreen({
  navigation,
  route,
}: any) {

  // DATOS RECIBIDOS
  const movie = route.params.movie;

  // ESTADOS
  const [title, setTitle] =
    useState(movie.title);

  const [description, setDescription] =
    useState(movie.description);

  const [genre, setGenre] =
    useState(movie.genre);

  const [price, setPrice] =
    useState(String(movie.price));

  const [image, setImage] =
    useState(movie.image);

  // SELECCIONAR IMAGEN
  const pickImage = async () => {

    const result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,

        aspect: [16, 9],

        quality: 1,
      });

    if (!result.canceled) {

      setImage(
        result.assets[0].uri
      );
    }
  };

  // ACTUALIZAR PELÍCULA
  const updateMovie = async () => {

    if (
      !title ||
      !description ||
      !genre ||
      !price ||
      !image
    ) {

      Alert.alert(
        'Error',
        'Completa todos los campos'
      );

      return;
    }

    try {

      await updateDoc(
        doc(db, 'movies', movie.id),
        {
          title,
          description,
          genre,
          price: Number(price),
          image,
        }
      );

      Alert.alert(
        'Éxito',
        'Película actualizada'
      );

      navigation.goBack();

    } catch (error: any) {

      Alert.alert(
        'Error',
        error.message
      );
    }
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        ✏️ Editar Película
      </Text>

      {/* IMAGEN */}
      <TouchableOpacity
        style={styles.imageButton}
        onPress={pickImage}
      >

        {image ? (

          <Image
            source={{ uri: image }}
            style={styles.image}
          />

        ) : (

          <Text style={styles.imageText}>
            Seleccionar Imagen
          </Text>
        )}

      </TouchableOpacity>

      {/* TÍTULO */}
      <TextInput
        style={styles.input}
        placeholder='Título'
        placeholderTextColor='#888'
        value={title}
        onChangeText={setTitle}
      />

      {/* DESCRIPCIÓN */}
      <TextInput
        style={[
          styles.input,
          styles.textArea,
        ]}
        placeholder='Descripción'
        placeholderTextColor='#888'
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      {/* GÉNERO */}
      <TextInput
        style={styles.input}
        placeholder='Género'
        placeholderTextColor='#888'
        value={genre}
        onChangeText={setGenre}
      />

      {/* PRECIO */}
      <TextInput
        style={styles.input}
        placeholder='Precio'
        placeholderTextColor='#888'
        keyboardType='numeric'
        value={price}
        onChangeText={setPrice}
      />

      {/* BOTÓN */}
      <TouchableOpacity
        style={styles.button}
        onPress={updateMovie}
      >
        <Text style={styles.buttonText}>
          Guardar Cambios
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
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30,
    textAlign: 'center',
  },

  imageButton: {
    backgroundColor: '#1e1e1e',
    height: 220,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageText: {
    color: '#aaa',
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

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#7c3aed',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});