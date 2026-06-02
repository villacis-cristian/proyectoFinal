import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addMovie } from '../../services/movieService';

// ─────────────────────────────────────────
// PALETA
// ─────────────────────────────────────────
const C = {
  bg:       '#150018',
  surface:  '#240e28',
  mid:      '#331d37',
  accent:   '#422b47',
  muted:    '#513957',
  gray1:    '#2a2a2d',
  gray3:    '#6b6b72',
  white:    '#f0eef2',
  offwhite: '#c9c6cd',
  green:    '#22c55e',
  primary:  '#a406f9',
  dark:     '#69049f',
  accentLt: '#c560fb',
  red:      '#e53e3e',
};

// ─────────────────────────────────────────
// ADD MOVIE SCREEN
// ─────────────────────────────────────────
export default function AddMovieScreen({ navigation }: any) {
  const [title, setTitle]             = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre]             = useState('');
  const [price, setPrice]             = useState('');
  const [image, setImage]             = useState('');

  const [titleFocus, setTitleFocus]   = useState(false);
  const [descFocus, setDescFocus]     = useState(false);
  const [genreFocus, setGenreFocus]   = useState(false);
  const [priceFocus, setPriceFocus]   = useState(false);

  const btnTranslate = useRef(new Animated.Value(0)).current;
  const pressAnim = (toValue: number) =>
    Animated.timing(btnTranslate, { toValue, duration: 60, useNativeDriver: true }).start();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleAddMovie = async () => {
    if (!title || !description || !genre || !price || !image) {
      Alert.alert('ERROR', 'COMPLETE ALL FIELDS');
      return;
    }
    try {
      await addMovie({ title, description, genre, price: Number(price), image });
      Alert.alert('SYSTEM READY', 'MOVIE ADDED');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('ERROR', error.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* ── TITLE BAR ── */}
      <View style={styles.titleBar}>
        <View style={styles.titleDots}>
          <View style={[styles.dot, { backgroundColor: C.red     }]} />
          <View style={[styles.dot, { backgroundColor: '#d97706' }]} />
          <View style={[styles.dot, { backgroundColor: C.green   }]} />
        </View>
        <Text style={styles.titleBarText}>AVASHI'KOL · ADD_MOVIE.EXE</Text>
        <View style={{ width: 48 }} />
      </View>
      <View style={styles.divider} />

      <ScrollView contentContainerStyle={styles.container}>

        {/* ── PROMPT ── */}
        <View style={styles.promptBlock}>
          <Text style={styles.promptLine}>
            <Text style={styles.promptGreen}>system</Text>
            <Text style={styles.promptMuted}>@avashi</Text>
            <Text style={styles.promptWhite}> ~ % </Text>
            <Text style={styles.promptAccent}>movie --add</Text>
          </Text>
          <Text style={styles.promptComment}>{`// ingresa los datos de la nueva película`}</Text>
        </View>

        {/* ── SECTION TITLE ── */}
        <View style={styles.sectionRow}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionLabel}>■ ADD MOVIE ■</Text>
          <View style={styles.sectionLine} />
        </View>

        {/* ── IMAGE PICKER ── */}
        <TouchableOpacity style={styles.imageButton} onPress={pickImage} activeOpacity={0.85}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageIcon}>🎬</Text>
              <Text style={styles.imageText}>▸ SELECT IMAGE</Text>
            </View>
          )}
          {image && (
            <View style={styles.imageOverlay}>
              <Text style={styles.imageOverlayText}>▶ CHANGE</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* ── FIELDS ── */}
        {[
          { label: '▸ TITLE',       value: title,       setter: setTitle,       focus: titleFocus, setFocus: setTitleFocus, placeholder: 'MOVIE TITLE',  multi: false, numeric: false },
          { label: '▸ DESCRIPTION', value: description, setter: setDescription, focus: descFocus,  setFocus: setDescFocus,  placeholder: 'MOVIE DESC...', multi: true,  numeric: false },
          { label: '▸ GENRE',       value: genre,       setter: setGenre,       focus: genreFocus, setFocus: setGenreFocus, placeholder: 'GENRE',         multi: false, numeric: false },
          { label: '▸ PRICE',       value: price,       setter: setPrice,       focus: priceFocus, setFocus: setPriceFocus, placeholder: '0.00',          multi: false, numeric: true  },
        ].map((field) => (
          <View key={field.label} style={styles.fieldWrap}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={[styles.input, field.focus && styles.inputFocus, field.multi && styles.textArea]}
              placeholder={field.placeholder}
              placeholderTextColor={C.muted}
              value={field.value}
              onChangeText={field.setter}
              multiline={field.multi}
              keyboardType={field.numeric ? 'numeric' : 'default'}
              onFocus={() => field.setFocus(true)}
              onBlur={() => field.setFocus(false)}
            />
          </View>
        ))}

        {/* ── SAVE BUTTON ── */}
        <Animated.View style={[styles.btnWrap, { transform: [{ translateX: btnTranslate }, { translateY: btnTranslate }] }]}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={1}
            onPressIn={() => pressAnim(3)}
            onPressOut={() => pressAnim(0)}
            onPress={handleAddMovie}
          >
            <Text style={styles.buttonText}>▶ SAVE MOVIE</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ── BACK ── */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.75}>
          <Text style={styles.backText}>◄ CANCEL</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: C.bg },

  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.mid,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 50,
  },
  titleDots:    { flexDirection: 'row', gap: 6 },
  dot:          { width: 10, height: 10, borderRadius: 5 },
  titleBarText: { color: C.offwhite, fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 1 },
  divider:      { height: 1, backgroundColor: C.accent },

  container: { padding: 16, paddingBottom: 60 },

  promptBlock: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: C.gray1,
    borderWidth: 1,
    borderColor: C.accent,
    marginBottom: 16,
  },
  promptLine:    { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
  promptGreen:   { color: C.green,    fontFamily: 'PressStart2P-Regular', fontSize: 7 },
  promptMuted:   { color: C.muted,    fontFamily: 'PressStart2P-Regular', fontSize: 7 },
  promptWhite:   { color: C.offwhite, fontFamily: 'PressStart2P-Regular', fontSize: 7 },
  promptAccent:  { color: C.accentLt, fontFamily: 'PressStart2P-Regular', fontSize: 7 },
  promptComment: { color: C.gray3,    fontFamily: 'PressStart2P-Regular', fontSize: 6, letterSpacing: 0.5 },

  sectionRow:   { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionLine:  { flex: 1, height: 1, backgroundColor: C.accent },
  sectionLabel: { color: C.offwhite, fontFamily: 'PressStart2P-Regular', fontSize: 8, letterSpacing: 2 },

  imageButton: {
    backgroundColor: C.surface,
    height: 180,
    borderWidth: 1,
    borderColor: C.accent,
    marginBottom: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image:            { width: '100%', height: '100%' },
  imagePlaceholder: { alignItems: 'center', gap: 10 },
  imageIcon:        { fontSize: 32 },
  imageText:        { color: C.muted, fontFamily: 'PressStart2P-Regular', fontSize: 8, letterSpacing: 2 },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.mid,
    paddingVertical: 6,
    alignItems: 'center',
  },
  imageOverlayText: { color: C.green, fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 2 },

  fieldWrap: { marginBottom: 14 },
  label: {
    color: C.offwhite,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    letterSpacing: 1,
    marginBottom: 6,
  },
  input: {
    backgroundColor: C.mid,
    color: C.white,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 8,
    letterSpacing: 2,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: C.accent,
  },
  inputFocus: { borderColor: C.accentLt, backgroundColor: C.accent },
  textArea:   { height: 100, textAlignVertical: 'top' },

  btnWrap: { marginTop: 8, marginBottom: 12 },
  button: {
    backgroundColor: C.primary,
    borderWidth: 1,
    borderColor: C.accentLt,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 6,
  },
  buttonText: { color: C.white, fontFamily: 'PressStart2P-Regular', fontSize: 10, letterSpacing: 3 },

  backBtn:  { alignItems: 'center', paddingVertical: 12 },
  backText: { color: C.muted, fontFamily: 'PressStart2P-Regular', fontSize: 8, letterSpacing: 2 },
});