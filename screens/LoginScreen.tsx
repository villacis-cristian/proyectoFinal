import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  Alert,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';

// ─────────────────────────────────────────
// PALETA
// ─────────────────────────────────────────
const C = {
  bg:       '#150018',   // fondo profundo
  surface:  '#240e28',   // cards / inputs
  mid:      '#331d37',   // bordes suaves
  accent:   '#422b47',   // hover / separadores
  muted:    '#513957',   // texto muted
  gray1:    '#2a2a2d',
  gray3:    '#6b6b72',
  white:    '#f0eef2',   // texto principal
  offwhite: '#c9c6cd',   // texto secundario
  green:    '#22c55e',
  primary:  '#a406f9',   // acento púrpura vivo
  dark:     '#69049f',
  accentLt: '#c560fb',
};

// ─────────────────────────────────────────
// BLINKING CURSOR
// ─────────────────────────────────────────
function BlinkingCursor() {
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

  return <Animated.Text style={[styles.cursor, { opacity }]}>█</Animated.Text>;
}

// ─────────────────────────────────────────
// LOGIN SCREEN
// ─────────────────────────────────────────
export default function LoginScreen({ navigation }: any) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [emailFocus, setEmailFocus]       = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('ERROR', 'COMPLETE ALL FIELDS');
      return;
    }
    if (loading) return;

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const userRef  = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        Alert.alert('ERROR', 'USER NOT FOUND');
        return;
      }

      const userData = userSnap.data();
      navigation.replace('Home', {
        username: userData.username,
        role: userData.role,
      });
    } catch (error: any) {
      Alert.alert('ERROR', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={C.bg} barStyle="light-content" />

      {/* ── TERMINAL FRAME ── */}
      <View style={styles.frame}>

        {/* Barra de título estilo terminal */}
        <View style={styles.titleBar}>
          <View style={styles.titleDots}>
            <View style={[styles.dot, { backgroundColor: '#e53e3e' }]} />
            <View style={[styles.dot, { backgroundColor: '#d97706' }]} />
            <View style={[styles.dot, { backgroundColor: C.green  }]} />
          </View>
          <Text style={styles.titleBarText}>AVASHI'KOL · AUTH.EXE</Text>
          <View style={{ width: 48 }} />
        </View>

        {/* Línea divisoria */}
        <View style={styles.divider} />

        {/* ── LOGO ── */}
        <View style={styles.logoWrap}>
          <Text style={styles.logoTop}>AVASHI</Text>
          <Text style={styles.logoBot}>'KOL</Text>
          <View style={styles.subRow}>
            <Text style={styles.logoSub}>◄ INSERT COIN ► </Text>
            <BlinkingCursor />
          </View>
        </View>

        <View style={styles.divider} />

        {/* ── PROMPT LINES ── */}
       

        {/* ── EMAIL ── */}
        <View style={styles.fieldWrap}>
          <Text style={styles.label}>▸ PLAYER EMAIL</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="PLAYER@AVASHI.COM"
            placeholderTextColor={C.muted}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            style={[styles.input, emailFocus && styles.inputFocus]}
          />
        </View>

        {/* ── PASSWORD ── */}
        <View style={styles.fieldWrap}>
          <Text style={styles.label}>▸ ACCESS CODE</Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="████████"
            placeholderTextColor={C.muted}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            style={[styles.input, passwordFocus && styles.inputFocus]}
          />
        </View>

        {/* ── BUTTON ── */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonLoading]}
          onPress={handleLogin}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? '▌▌  LOADING...' : '▶  PRESS START'}
          </Text>
        </TouchableOpacity>

        {/* ── REGISTER ── */}
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.75}
        >
          <Text style={styles.registerText}>[ ▶ CREATE ACCOUNT ]</Text>
        </TouchableOpacity>

        {/* ── FOOTER ── */}
        <View style={styles.divider} />
        <Text style={styles.footer}>AVASHI'KOL © 2025 · PRESS START</Text>

      </View>
    </View>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: C.bg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  // ── FRAME ──
  frame: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.accent,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },

  // ── TITLE BAR ──
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.mid,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  titleDots: { flexDirection: 'row', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  titleBarText: {
    color: C.offwhite,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    letterSpacing: 1,
  },

  divider: { height: 1, backgroundColor: C.accent },

  // ── LOGO ──
  logoWrap: {
    alignItems: 'center',
    paddingVertical: 28,
  },
  logoTop: {
    color: C.white,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 26,
    letterSpacing: 6,
    lineHeight: 36,
  },
  logoBot: {
    color: C.accentLt,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 26,
    letterSpacing: 6,
    lineHeight: 36,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  logoSub: {
    color: C.green,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    letterSpacing: 3,
  },
  cursor: {
    color: C.white,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    marginLeft: 3,
  },

  // ── PROMPT BLOCK ──
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

  // ── FIELDS ──
  fieldWrap: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
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
  inputFocus: {
    borderColor: C.accentLt,
    backgroundColor: C.accent,
  },

  // ── BUTTON ──
  button: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: C.primary,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.accentLt,
  },
  buttonLoading: {
    backgroundColor: C.dark,
    borderColor: C.muted,
  },
  buttonText: {
    color: C.white,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 10,
    letterSpacing: 3,
  },

  // ── REGISTER ──
  registerBtn: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  registerText: {
    color: C.green,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 8,
    letterSpacing: 2,
  },

  // ── FOOTER ──
  footer: {
    color: C.muted,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 6,
    letterSpacing: 2,
    textAlign: 'center',
    paddingVertical: 10,
  },
});