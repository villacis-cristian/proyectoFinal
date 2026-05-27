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

import { useState }
from 'react';

import * as ImagePicker
from 'expo-image-picker';

import {
  addGame,
} from '../../services/gameService';

export default function AddGameScreen({
  navigation,
}: any) {

  // ESTADOS
  const [title, setTitle] =
    useState('');

  const [
    description,
    setDescription,
  ] = useState('');

  const [genre, setGenre] =
    useState('');

  const [platform, setPlatform] =
    useState('');

  const [price, setPrice] =
    useState('');

  const [image, setImage] =
    useState('');

  // IMAGEN
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

  // AGREGAR
  const handleAddGame =
    async () => {

      if (
        !title ||
        !description ||
        !genre ||
        !platform ||
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

        await addGame({

          title,

          description,

          genre,

          platform,

          price:
            Number(price),

          image,
        });

        Alert.alert(
          'Éxito',
          'Juego agregado'
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
        🎮 Agregar Juego
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

        value={description}

        onChangeText={
          setDescription
        }
      />

      {/* GÉNERO */}
      <TextInput
        style={styles.input}
        placeholder='Género'
        placeholderTextColor='#888'
        value={genre}
        onChangeText={setGenre}
      />

      {/* PLATAFORMA */}
      <TextInput
        style={styles.input}
        placeholder='Plataforma'
        placeholderTextColor='#888'
        value={platform}
        onChangeText={setPlatform}
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

        onPress={
          handleAddGame
        }
      >

        <Text style={styles.buttonText}>
          Guardar Juego
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
    marginBottom: 40,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});