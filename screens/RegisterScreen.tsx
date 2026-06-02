import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Alert,
  StatusBar,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';

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
// REGISTER SCREEN
// ─────────────────────────────────────────
export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername]           = useState('');
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [loading, setLoading]             = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [emailFocus, setEmailFocus]       = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('ERROR', 'COMPLETE ALL FIELDS');
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        role: 'user',
        createdAt: new Date(),
      });
      Alert.alert('SYSTEM READY', 'USER REGISTERED');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('FIREBASE ERROR', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={C.bg} barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.container}>

        {/* ── TERMINAL FRAME ── */}
        <View style={styles.frame}>

          {/* Barra de título */}
          <View style={styles.titleBar}>
            <View style={styles.titleDots}>
              <View style={[styles.dot, { backgroundColor: C.red      }]} />
              <View style={[styles.dot, { backgroundColor: '#d97706'  }]} />
              <View style={[styles.dot, { backgroundColor: C.green    }]} />
            </View>
            <Text style={styles.titleBarText}>AVASHI'KOL · REGISTER.EXE</Text>
            <View style={{ width: 48 }} />
          </View>

          <View style={styles.divider} />

          {/* ── LOGO ── */}
          <View style={styles.logoWrap}>
            <Text style={styles.logoTop}>AVASHI</Text>
            <Text style={styles.logoBot}>'KOL</Text>
            <View style={styles.subRow}>
              <Text style={styles.logoSub}>◄ NEW PLAYER ► </Text>
              <BlinkingCursor />
            </View>
          </View>

          <View style={styles.divider} />

         
          {/* ── USERNAME ── */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>▸ USERNAME</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholder="ENTER USERNAME"
              placeholderTextColor={C.muted}
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
              style={[styles.input, usernameFocus && styles.inputFocus]}
            />
          </View>

          {/* ── EMAIL ── */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>▸ EMAIL</Text>
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
            onPress={handleRegister}
            activeOpacity={0.85}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? '▌▌  LOADING...' : '▶  PRESS START'}
            </Text>
          </TouchableOpacity>

          {/* ── FOOTER DECOR ── */}
          <View style={styles.footerDecor}>
            <Text style={styles.footerDecorText}>ACCESS TERMINAL</Text>
            <View style={styles.footerLine} />
            <Text style={styles.footerDecorText}>LOADING...</Text>
          </View>

          {/* ── LOGIN LINK ── */}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.75}
          >
            <Text style={styles.loginText}>▸ ALREADY HAVE ACCOUNT?</Text>
            <Text style={styles.loginText2}>[ LOGIN HERE ]</Text>
          </TouchableOpacity>

          <View style={styles.divider} />
          <Text style={styles.footer}>AVASHI'KOL © 2025 · PRESS START</Text>

        </View>

      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: C.bg,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
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
    paddingVertical: 24,
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

  // ── FOOTER DECOR ──
  footerDecor: {
    marginTop: 20,
    marginHorizontal: 16,
    alignItems: 'center',
    paddingBottom: 4,
  },
  footerDecorText: {
    color: C.green,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    letterSpacing: 3,
    marginVertical: 5,
  },
  footerLine: {
    width: '100%',
    height: 1,
    backgroundColor: C.accent,
    marginVertical: 6,
  },

  // ── LOGIN LINK ──
  loginBtn: {
    alignItems: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  loginText: {
    color: C.accentLt,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    letterSpacing: 2,
  },
  loginText2: {
    color: C.green,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 8,
    letterSpacing: 3,
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