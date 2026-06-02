import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  StatusBar,
  Animated,
} from 'react-native';
import MovieCard from '../../components/MovieCard';
import { getMovies, deleteMovie } from '../../services/movieService';

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
// BLINKING CURSOR
// ─────────────────────────────────────────
function BlinkingCursor({ color = C.green }: { color?: string }) {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(opacity, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.delay(500),
        Animated.timing(opacity, { toValue: 1, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return <Animated.Text style={[styles.cursor, { opacity, color }]}>█</Animated.Text>;
}

// ─────────────────────────────────────────
// SCREEN
// ─────────────────────────────────────────
export default function MoviesScreen({ navigation, route }: any) {
  const role = route.params?.role?.trim()?.toLowerCase() || 'user';
  const [movies, setMovies] = useState([]);

  const backTranslate = useRef(new Animated.Value(0)).current;
  const addTranslate  = useRef(new Animated.Value(0)).current;

  const pressAnim = (val: Animated.Value, toValue: number) => {
    Animated.timing(val, { toValue, duration: 60, useNativeDriver: true }).start();
  };

  const loadMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  const handleDelete = async (id: string) => {
    Alert.alert('DELETE FILE', 'DELETE MOVIE?', [
      { text: 'CANCEL' },
      { text: 'DELETE', onPress: async () => { await deleteMovie(id); loadMovies(); } },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => loadMovies());
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* ── TITLE BAR ── */}
      <View style={styles.titleBar}>
        <View style={styles.titleDots}>
          <View style={[styles.dot, { backgroundColor: C.red     }]} />
          <View style={[styles.dot, { backgroundColor: '#d97706' }]} />
          <View style={[styles.dot, { backgroundColor: C.green   }]} />
        </View>
        <Text style={styles.titleBarText}>AVASHI'KOL · MOVIES.EXE</Text>
        <View style={{ width: 48 }} />
      </View>
      <View style={styles.divider} />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <Text style={styles.titleMain}>MOVIE</Text>
        <Text style={styles.titleSub}>ARCADE</Text>
        <View style={styles.subRow}>
          <Text style={styles.subtitleText}>ACCESS TERMINAL </Text>
          <BlinkingCursor />
        </View>
      </View>

      <View style={styles.divider} />

      {/* ── PROMPT ── */}
      <View style={styles.promptBlock}>
        <Text style={styles.promptLine}>
          <Text style={styles.promptGreen}>system</Text>
          <Text style={styles.promptMuted}>@avashi</Text>
          <Text style={styles.promptWhite}> ~ % </Text>
          <Text style={styles.promptAccent}>load --movies</Text>
        </Text>
        <Text style={styles.promptComment}>{`// catálogo de películas disponibles`}</Text>
      </View>

      {/* ── BUTTONS ROW ── */}
      <View style={styles.btnRow}>
        <Animated.View style={{ transform: [{ translateX: backTranslate }, { translateY: backTranslate }] }}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={1}
            onPressIn={() => pressAnim(backTranslate, 3)}
            onPressOut={() => pressAnim(backTranslate, 0)}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>◄ BACK</Text>
          </TouchableOpacity>
        </Animated.View>

        {role === 'admin' && (
          <Animated.View style={{ transform: [{ translateX: addTranslate }, { translateY: addTranslate }] }}>
            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={1}
              onPressIn={() => pressAnim(addTranslate, 3)}
              onPressOut={() => pressAnim(addTranslate, 0)}
              onPress={() => navigation.navigate('AddMovie', { role })}
            >
              <Text style={styles.addButtonText}>▶ ADD MOVIE</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      {/* ── DECOR ── */}
      <View style={styles.decorRow}>
        <Text style={styles.decorText}>INSERT COIN</Text>
        <View style={styles.decorLine} />
        <Text style={styles.decorText}>PRESS START</Text>
      </View>

      {/* ── LIST ── */}
      <FlatList
        data={movies}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <MovieCard
            movie={item}
            role={role}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => navigation.navigate('EditMovie', { movie: item, role })}
          />
        )}
      />

      {/* ── PIXELS ── */}
      <View style={styles.pixelRow}>
        <View style={[styles.pixel, { backgroundColor: C.primary  }]} />
        <View style={[styles.pixel, { backgroundColor: C.accentLt }]} />
        <View style={[styles.pixel, { backgroundColor: C.green    }]} />
      </View>
    </View>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingTop: 50 },

  // ── TITLE BAR ──
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.mid,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  titleDots:    { flexDirection: 'row', gap: 6 },
  dot:          { width: 10, height: 10, borderRadius: 5 },
  titleBarText: { color: C.offwhite, fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 1 },
  divider:      { height: 1, backgroundColor: C.accent },

  // ── HEADER ──
  header: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 18 },
  titleMain: {
    color: C.primary,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 34,
    letterSpacing: 5,
    lineHeight: 44,
  },
  titleSub: {
    color: C.white,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 26,
    letterSpacing: 5,
    lineHeight: 36,
  },
  subRow:       { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  subtitleText: { color: C.green, fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 3 },
  cursor:       { fontFamily: 'PressStart2P-Regular', fontSize: 7 },

  // ── PROMPT ──
  promptBlock: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: C.gray1,
    borderBottomWidth: 1,
    borderBottomColor: C.accent,
  },
  promptLine:    { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
  promptGreen:   { color: C.green,    fontFamily: 'PressStart2P-Regular', fontSize: 7 },
  promptMuted:   { color: C.muted,    fontFamily: 'PressStart2P-Regular', fontSize: 7 },
  promptWhite:   { color: C.offwhite, fontFamily: 'PressStart2P-Regular', fontSize: 7 },
  promptAccent:  { color: C.accentLt, fontFamily: 'PressStart2P-Regular', fontSize: 7 },
  promptComment: { color: C.gray3,    fontFamily: 'PressStart2P-Regular', fontSize: 6, letterSpacing: 0.5 },

  // ── BUTTONS ──
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.accent,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 6,
  },
  backButtonText: { color: C.white, fontFamily: 'PressStart2P-Regular', fontSize: 9, letterSpacing: 2 },
  addButton: {
    backgroundColor: C.primary,
    borderWidth: 1,
    borderColor: C.accentLt,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 6,
  },
  addButtonText: { color: C.white, fontFamily: 'PressStart2P-Regular', fontSize: 9, letterSpacing: 2 },

  // ── DECOR ──
  decorRow: { alignItems: 'center', paddingHorizontal: 16, marginBottom: 10 },
  decorText: { color: C.accentLt, fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 3, marginVertical: 4 },
  decorLine: { width: '100%', height: 1, backgroundColor: C.accent, marginVertical: 6 },

  // ── PIXELS ──
  pixelRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, paddingVertical: 14 },
  pixel:    { width: 10, height: 10 },
});