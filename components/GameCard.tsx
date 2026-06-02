import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width: SW } = Dimensions.get('window');

// Ancho de cada card: mitad de pantalla menos padding lateral (18*2) y gap entre columnas (8)
const CARD_W = (SW - 36 - 8) / 2;

const C = {
  bg:      '#360b41',
  surface: '#4f2c4d',
  mid:     '#7d677e',
  cream:   '#ccc9aa',
  light:   '#fafdea',
  black:   '#000000',
  green:   '#22c55e',
};

export default function GameCard({ game, role, onEdit, onDelete }: any) {
  return (
    <View style={styles.card}>

      {/* HEADER */}
      <View style={styles.cardHeader}>
        <Text style={styles.p1}>◄ P1 ►</Text>
        <View style={styles.dot} />
        <Text style={styles.ready}>READY</Text>
      </View>

      {/* IMAGE */}
      <Image
        source={{ uri: game.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* TITLE */}
      <Text numberOfLines={2} style={styles.title}>
        {game.title}
      </Text>

      <View style={styles.line} />

      {/* GENRE */}
      <Text numberOfLines={1} style={styles.genre}>■ {game.genre}</Text>

      {/* PLATFORM */}
      {game.platform ? (
        <Text numberOfLines={1} style={styles.platform}>▸ {game.platform}</Text>
      ) : null}

      {/* PRICE */}
      <Text style={styles.price}>▶ ${game.price}</Text>

      {/* DATE */}
      {game.date ? (
        <Text style={styles.date}>{game.date}</Text>
      ) : null}

      {/* DESCRIPTION */}
      <Text numberOfLines={3} style={styles.description}>
        {game.description}
      </Text>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ACCESS GRANTED</Text>
        <Text style={styles.footerText}>LOADING...</Text>
      </View>

      {/* ADMIN BUTTONS */}
      {role === 'admin' && (
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.editBtn} activeOpacity={1} onPress={onEdit}>
            <Text style={styles.btnText}>✏ EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.delBtn} activeOpacity={1} onPress={onDelete}>
            <Text style={styles.btnText}>❌ DEL</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    width: CARD_W,
    backgroundColor: C.surface,
    borderWidth: 4,
    borderColor: C.mid,
    padding: 10,
    marginBottom: 16,
    shadowColor: C.black,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  p1:    { color: C.cream, fontFamily: 'PressStart2P-Regular', fontSize: 6, letterSpacing: 1 },
  ready: { color: C.green, fontFamily: 'PressStart2P-Regular', fontSize: 6, letterSpacing: 1 },
  dot:   { width: 8, height: 8, backgroundColor: C.green, borderWidth: 2, borderColor: C.black },

  image: {
    width: '100%',
    height: 100,
    borderWidth: 3,
    borderColor: C.mid,
    marginBottom: 8,
    backgroundColor: C.bg,
  },

  title: {
    color: C.light,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 8,
    letterSpacing: 1,
    lineHeight: 14,
    minHeight: 28,
    textTransform: 'uppercase',
  },

  line: { width: '100%', height: 2, backgroundColor: C.mid, marginVertical: 6 },

  genre: {
    color: C.cream,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    letterSpacing: 1,
    marginBottom: 4,
  },

  platform: {
    color: C.mid,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 6,
    letterSpacing: 1,
    marginBottom: 4,
  },

  price: {
    color: C.green,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 8,
    letterSpacing: 1,
    marginBottom: 4,
  },

  date: {
    color: C.mid,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 6,
    letterSpacing: 1,
    marginBottom: 6,
  },

  description: {
    color: C.light,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    lineHeight: 13,
    minHeight: 40,
    opacity: 0.8,
  },

  footer: {
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: C.mid,
    paddingTop: 6,
  },
  footerText: {
    color: C.mid,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 6,
    letterSpacing: 1,
  },

  btnRow: { flexDirection: 'row', marginTop: 10, gap: 6 },
  editBtn: {
    flex: 1,
    backgroundColor: C.mid,
    borderWidth: 3,
    borderColor: C.black,
    paddingVertical: 8,
    alignItems: 'center',
  },
  delBtn: {
    flex: 1,
    backgroundColor: C.bg,
    borderWidth: 3,
    borderColor: C.mid,
    paddingVertical: 8,
    alignItems: 'center',
  },
  btnText: {
    color: C.light,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 6,
    letterSpacing: 1,
  },
});
