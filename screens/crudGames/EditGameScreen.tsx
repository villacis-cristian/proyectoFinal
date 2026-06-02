import React, { useState } from 'react';
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

import * as ImagePicker from 'expo-image-picker';
import { editGame } from '../../services/gameService';

// ─────────────────────────────────────────
// PALETA
// ─────────────────────────────────────────
const C = {
  bg:      '#360b41',
  surface: '#4f2c4d',
  mid:     '#7d677e',
  cream:   '#ccc9aa',
  light:   '#fafdea',
  black:   '#000000',
  green:   '#22c55e',
};

const SHD = {
  shadowColor:   '#000',
  shadowOffset:  { width: 5, height: 5 },
  shadowOpacity: 1,
  shadowRadius:  0,
  elevation:     10,
};

// ─────────────────────────────────────────
// FIELD COMPONENT
// ─────────────────────────────────────────
function PixelInput({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = 'default',
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: any;
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>▸ {label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
        placeholderTextColor={C.mid}
        multiline={multiline}
        keyboardType={keyboardType}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

// ─────────────────────────────────────────
// SCREEN
// ─────────────────────────────────────────
export default function EditGameScreen({ navigation, route }: any) {

  const game = route?.params?.game;

  if (!game) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>► ERROR: NO GAME DATA</Text>
      </View>
    );
  }

  const [title,       setTitle]       = useState(game.title       || '');
  const [description, setDescription] = useState(game.description || '');
  const [genre,       setGenre]       = useState(game.genre       || '');
  const [price,       setPrice]       = useState(String(game.price || ''));
  const [platform,    setPlatform]    = useState(game.platform    || '');
  const [date,        setDate]        = useState(game.date        || '');
  const [image,       setImage]       = useState(game.image       || '');

  // ── Seleccionar imagen ──
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // ── Guardar ──
  const handleSave = async () => {
    if (!title || !description || !genre || !price || !platform || !date) {
      Alert.alert('ERROR', 'COMPLETA TODOS LOS CAMPOS');
      return;
    }

    try {
      await editGame(game.id, {
        title,
        description,
        genre,
        price,
        platform,
        date,
        image,
      });
      Alert.alert('OK', 'JUEGO ACTUALIZADO');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('ERROR', error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>

      {/* ══ HEADER ══ */}
      <View style={styles.header}>
        <Text style={styles.title}>EDIT</Text>
        <Text style={styles.title2}>GAME</Text>
        <Text style={styles.subtitle}>► MODIFY RECORD █</Text>
      </View>

      {/* ══ IMAGEN ══ */}
      <View style={styles.fieldWrap}>
        <Text style={styles.label}>▸ IMAGE</Text>
        <TouchableOpacity style={styles.imageBtn} onPress={pickImage} activeOpacity={1}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>► TAP TO SELECT IMAGE</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* ══ CAMPOS ══ */}
      <PixelInput label="TITLE"       value={title}       onChangeText={setTitle}       />
      <PixelInput label="DESCRIPTION" value={description} onChangeText={setDescription} multiline />
      <PixelInput label="GENRE"       value={genre}       onChangeText={setGenre}       />
      <PixelInput label="PRICE"       value={price}       onChangeText={setPrice}       keyboardType="default" />
      <PixelInput label="PLATFORM"    value={platform}    onChangeText={setPlatform}    />
      <PixelInput label="DATE"        value={date}        onChangeText={setDate}        placeholder="YYYY-MM-DD" />

      {/* ══ BOTONES ══ */}
      <TouchableOpacity activeOpacity={1} style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>▶ SAVE CHANGES</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={1} style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>◄ CANCEL</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: C.bg,
    paddingHorizontal: 18,
  },

  errorText: {
    color: C.green,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 11,
    letterSpacing: 2,
  },

  // HEADER
  header: {
    alignItems: 'center',
    marginTop: 55,
    marginBottom: 28,
  },
  title: {
    color: C.light,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 30,
    letterSpacing: 4,
    textShadowColor: C.black,
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 0,
    lineHeight: 42,
  },
  title2: {
    color: C.cream,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 22,
    letterSpacing: 4,
    textShadowColor: C.black,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
    lineHeight: 34,
  },
  subtitle: {
    color: C.green,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 8,
    letterSpacing: 3,
    marginTop: 10,
  },

  // FIELD
  fieldWrap: {
    marginBottom: 18,
  },
  label: {
    color: C.cream,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 8,
    letterSpacing: 2,
    marginBottom: 8,
  },
  input: {
    backgroundColor: C.surface,
    color: C.light,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 9,
    letterSpacing: 1,
    padding: 14,
    borderWidth: 3,
    borderColor: C.mid,
    ...SHD,
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },

  // IMAGE
  imageBtn: {
    backgroundColor: C.surface,
    height: 180,
    borderWidth: 3,
    borderColor: C.mid,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...SHD,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    color: C.mid,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 8,
    letterSpacing: 2,
  },

  // BUTTONS
  saveBtn: {
    backgroundColor: C.mid,
    borderWidth: 4,
    borderColor: C.cream,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 14,
    ...SHD,
  },
  saveBtnText: {
    color: C.light,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 11,
    letterSpacing: 3,
  },
  backBtn: {
    backgroundColor: C.surface,
    borderWidth: 4,
    borderColor: C.mid,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
    ...SHD,
  },
  backBtnText: {
    color: C.cream,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 10,
    letterSpacing: 3,
  },
});
