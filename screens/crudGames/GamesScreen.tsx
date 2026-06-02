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

import GameCard from '../../components/GameCard';
import { getGames, deleteGame } from '../../services/gameService';

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

export default function GamesScreen({ navigation, route }: any) {

  const role = route?.params?.role?.trim()?.toLowerCase() || 'user';

  const [games, setGames]                 = useState<any[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [loading, setLoading]             = useState(true);

  const backTranslate = useRef(new Animated.Value(0)).current;
  const addTranslate  = useRef(new Animated.Value(0)).current;

  // Cursor CRT
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(p => !p), 500);
    return () => clearInterval(interval);
  }, []);

  // Cargar juegos + recargar en focus
  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const data = await getGames();
        setGames(data);
      } catch {
        Alert.alert('ERROR', 'No se pudieron cargar los juegos');
      } finally {
        setLoading(false);
      }
    };

    loadGames();
    const unsubscribe = navigation.addListener('focus', loadGames);
    return unsubscribe;
  }, [navigation]);

  // Eliminar
  const handleDelete = async (id: string) => {
    Alert.alert('DELETE FILE', '¿ELIMINAR ESTE JUEGO?', [
      { text: 'CANCEL', style: 'cancel' },
      {
        text: 'DELETE',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteGame(id);
            setGames(prev => prev.filter(g => g.id !== id));
          } catch {
            Alert.alert('ERROR', 'No se pudo eliminar');
          }
        },
      },
    ]);
  };

  const pressIn  = (a: Animated.Value) =>
    Animated.timing(a, { toValue: 4, duration: 60, useNativeDriver: true }).start();
  const pressOut = (a: Animated.Value) =>
    Animated.timing(a, { toValue: 0, duration: 60, useNativeDriver: true }).start();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.scanlines} pointerEvents="none" />

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Text style={styles.topAccent}>◄ PLAYER 1 ►</Text>
        <View style={styles.square} />
        <Text style={styles.topGreen}>SYSTEM READY</Text>
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>GAME</Text>
        <Text style={styles.title2}>ARCADE</Text>
        <Text style={styles.subtitle}>
          ACCESS TERMINAL {cursorVisible ? '█' : ' '}
        </Text>
      </View>

      {/* BACK */}
      <Animated.View style={{ transform: [{ translateX: backTranslate }, { translateY: backTranslate }] }}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={1}
          onPressIn={() => pressIn(backTranslate)}
          onPressOut={() => pressOut(backTranslate)}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>◄ BACK</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ADD (solo admin) */}
      {role === 'admin' && (
        <Animated.View style={{ transform: [{ translateX: addTranslate }, { translateY: addTranslate }] }}>
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={1}
            onPressIn={() => pressIn(addTranslate)}
            onPressOut={() => pressOut(addTranslate)}
            onPress={() => navigation.navigate('AddGame', { role })}
          >
            <Text style={styles.addText}>▶ ADD GAME</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* LISTA EN GRID 2 COLUMNAS */}
      {loading ? (
        <View style={styles.centered}>
          <Text style={styles.loadingText}>► LOADING... {cursorVisible ? '█' : ' '}</Text>
        </View>
      ) : games.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.loadingText}>► NO GAMES FOUND</Text>
        </View>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item: any) => item.id}
          numColumns={2}                          // ← GRID 2 COLUMNAS
          columnWrapperStyle={styles.row}         // ← espacio entre columnas
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 8 }}
          renderItem={({ item }: any) => (
            <GameCard
              game={item}
              role={role}
              onDelete={() => handleDelete(item.id)}
              onEdit={() => navigation.navigate('EditGame', { game: item, role })}
            />
          )}
        />
      )}

      {/* PIXEL DOTS */}
      <View style={styles.pixelRow}>
        <View style={[styles.pixel, { backgroundColor: C.light }]} />
        <View style={[styles.pixel, { backgroundColor: C.cream }]} />
        <View style={[styles.pixel, { backgroundColor: C.green }]} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: C.bg, padding: 18 },
  scanlines:  { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.03 },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  topAccent: { color: C.cream, fontFamily: 'PressStart2P-Regular', fontSize: 9, letterSpacing: 2 },
  topGreen:  { color: C.green, fontFamily: 'PressStart2P-Regular', fontSize: 9, letterSpacing: 2 },
  square: {
    width: 12, height: 12,
    backgroundColor: C.mid,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: C.black,
  },

  header:  { alignItems: 'center', marginBottom: 20 },
  title: {
    color: C.light,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 32,
    letterSpacing: 4,
    textShadowColor: C.black,
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 0,
    lineHeight: 44,
  },
  title2: {
    color: C.cream,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 24,
    letterSpacing: 4,
    textShadowColor: C.black,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
    lineHeight: 36,
  },
  subtitle: { color: C.green, fontFamily: 'PressStart2P-Regular', fontSize: 9, letterSpacing: 3, marginTop: 10 },

  backButton: {
    backgroundColor: C.surface,
    borderWidth: 4,
    borderColor: C.mid,
    padding: 14,
    marginBottom: 12,
    
  },
  backText: { color: C.cream, fontFamily: 'PressStart2P-Regular', fontSize: 10, letterSpacing: 3 },

  addButton: {
    backgroundColor: C.mid,
    borderWidth: 4,
    borderColor: C.cream,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  
  },
  addText: { color: C.light, fontFamily: 'PressStart2P-Regular', fontSize: 11, letterSpacing: 3 },

  // ── GRID ──
  row: {
    justifyContent: 'space-between',  // espacio entre las 2 cards
    marginBottom: 0,
  },

  centered:    { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: C.green, fontFamily: 'PressStart2P-Regular', fontSize: 10, letterSpacing: 3 },

  pixelRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 16 },
  pixel:    { width: 12, height: 12, borderWidth: 2, borderColor: C.black },
});
