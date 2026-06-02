import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";

import {
  signOut
} from "firebase/auth";

import {
  auth
} from "../services/firebaseConfig";

// ─────────────────────────────────────────
// COLORS
// ─────────────────────────────────────────
const COLORS = {

  bg: '#100119',

  surface: '#2E0246',

  primary: '#A406F9',

  primaryDark: '#69049F',

  accent: '#C560FB',

  text: '#F6E6FE',

  green: '#22c55e',

  shadow: '#000',
};

export default function CustomDrawer({
  navigation
}: any) {

  // USERNAME
  const username =
    "PLAYER 1";

  // CURSOR CRT
  const [cursorVisible,
    setCursorVisible] =
    useState(true);

  // BUTTON ANIMATIONS
  const logoutTranslate =
    useRef(
      new Animated.Value(0)
    ).current;

  const btn1Translate =
    useRef(
      new Animated.Value(0)
    ).current;

  const btn2Translate =
    useRef(
      new Animated.Value(0)
    ).current;

  const btn3Translate =
    useRef(
      new Animated.Value(0)
    ).current;

  const btn4Translate =
    useRef(
      new Animated.Value(0)
    ).current;

  // CRT CURSOR EFFECT
  useEffect(() => {

    const interval =
      setInterval(() => {

        setCursorVisible(
          prev => !prev
        );

      }, 500);

    return () =>
      clearInterval(interval);

  }, []);

  // LOGOUT
  const handleLogout =
    async () => {

      await signOut(auth);
    };

  return (

    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor={
          COLORS.bg
        }
      />

      {/* CRT */}
      <View
        style={styles.scanlines}
        pointerEvents="none"
      />

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.logo}>
          ARCADE
        </Text>

        <Text style={styles.logo2}>
          SYSTEM
        </Text>

        <Text style={styles.subtitle}>
          ACCESS TERMINAL
          {cursorVisible
            ? ' █'
            : ''}
        </Text>

      </View>

      {/* PROFILE */}
      <View style={styles.profile}>

        <View style={styles.avatarFrame}>

          <Image
            source={{
              uri:
                "https://i.pravatar.cc/150"
            }}
            style={styles.avatar}
          />

        </View>

        <Text style={styles.username}>
          ◄ {username} ►
        </Text>

        <Text style={styles.status}>
          SYSTEM READY
        </Text>

      </View>

      {/* DIVIDER */}
      <View style={styles.line} />

      {/* BUTTON 1 */}
      <Animated.View
        style={{
          transform: [
            {
              translateX:
                btn1Translate
            },
            {
              translateY:
                btn1Translate
            },
          ],
        }}
      >

        <TouchableOpacity

          activeOpacity={1}

          style={styles.item}

          onPressIn={() => {

            Animated.timing(
              btn1Translate,
              {
                toValue: 4,
                duration: 60,
                useNativeDriver: true,
              }
            ).start();
          }}

          onPressOut={() => {

            Animated.timing(
              btn1Translate,
              {
                toValue: 0,
                duration: 60,
                useNativeDriver: true,
              }
            ).start();
          }}
        >

          <Text style={styles.text}>
            ▶ MOVIES
          </Text>

        </TouchableOpacity>

      </Animated.View>

      {/* BUTTON 2 */}
      <Animated.View
        style={{
          transform: [
            {
              translateX:
                btn2Translate
            },
            {
              translateY:
                btn2Translate
            },
          ],
        }}
      >

        <TouchableOpacity

          activeOpacity={1}

          style={styles.item}

          onPressIn={() => {

            Animated.timing(
              btn2Translate,
              {
                toValue: 4,
                duration: 60,
                useNativeDriver: true,
              }
            ).start();
          }}

          onPressOut={() => {

            Animated.timing(
              btn2Translate,
              {
                toValue: 0,
                duration: 60,
                useNativeDriver: true,
              }
            ).start();
          }}
        >

          <Text style={styles.text}>
            ■ FAVORITES
          </Text>

        </TouchableOpacity>

      </Animated.View>

      {/* BUTTON 3 */}
      <Animated.View
        style={{
          transform: [
            {
              translateX:
                btn3Translate
            },
            {
              translateY:
                btn3Translate
            },
          ],
        }}
      >

        <TouchableOpacity

          activeOpacity={1}

          style={styles.item}

          onPressIn={() => {

            Animated.timing(
              btn3Translate,
              {
                toValue: 4,
                duration: 60,
                useNativeDriver: true,
              }
            ).start();
          }}

          onPressOut={() => {

            Animated.timing(
              btn3Translate,
              {
                toValue: 0,
                duration: 60,
                useNativeDriver: true,
              }
            ).start();
          }}
        >

          <Text style={styles.text}>
            ▸ SETTINGS
          </Text>

        </TouchableOpacity>

      </Animated.View>

      {/* BUTTON 4 */}
      <Animated.View
        style={{
          transform: [
            {
              translateX:
                btn4Translate
            },
            {
              translateY:
                btn4Translate
            },
          ],
        }}
      >

        <TouchableOpacity

          activeOpacity={1}

          style={styles.item}

          onPressIn={() => {

            Animated.timing(
              btn4Translate,
              {
                toValue: 4,
                duration: 60,
                useNativeDriver: true,
              }
            ).start();
          }}

          onPressOut={() => {

            Animated.timing(
              btn4Translate,
              {
                toValue: 0,
                duration: 60,
                useNativeDriver: true,
              }
            ).start();
          }}
        >

          <Text style={styles.text}>
            ► STORE
          </Text>

        </TouchableOpacity>

      </Animated.View>

      {/* SPACE */}
      <View style={{ flex: 1 }} />

      {/* FOOTER */}
      <View style={styles.footer}>

        <Text style={styles.support}>
          INSERT COIN
        </Text>

        <Text style={styles.support}>
          PRESS START
        </Text>

        <Text style={styles.support}>
          PLAYER ONLINE
        </Text>

      </View>

      {/* PIXELS */}
      <View style={styles.pixelRow}>

        <View
          style={[
            styles.pixel,
            {
              backgroundColor:
                COLORS.primary
            },
          ]}
        />

        <View
          style={[
            styles.pixel,
            {
              backgroundColor:
                COLORS.accent
            },
          ]}
        />

        <View
          style={[
            styles.pixel,
            {
              backgroundColor:
                COLORS.green
            },
          ]}
        />

      </View>

      {/* LOGOUT */}
      <Animated.View
        style={{
          transform: [
            {
              translateX:
                logoutTranslate
            },
            {
              translateY:
                logoutTranslate
            },
          ],
        }}
      >

        <TouchableOpacity

          activeOpacity={1}

          style={styles.logout}

          onPressIn={() => {

            Animated.timing(
              logoutTranslate,
              {
                toValue: 4,
                duration: 60,
                useNativeDriver: true,
              }
            ).start();
          }}

          onPressOut={() => {

            Animated.timing(
              logoutTranslate,
              {
                toValue: 0,
                duration: 60,
                useNativeDriver: true,
              }
            ).start();
          }}

          onPress={handleLogout}
        >

          <Text style={styles.logoutText}>
            ■ LOGOUT
          </Text>

        </TouchableOpacity>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({

  // CONTAINER
  container: {

    flex: 1,

    backgroundColor:
      COLORS.bg,

    padding: 20,
  },

  // CRT
  scanlines: {

    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    opacity: 0.03,

    borderTopWidth: 1,

    borderTopColor:
      '#ffffff08',
  },

  // HEADER
  header: {

    alignItems: 'center',

    marginTop: 20,

    marginBottom: 30,
  },

  logo: {

    color: COLORS.primary,

    fontFamily:
      'PressStart2P-Regular',

    fontSize: 34,

    letterSpacing: 5,

    textTransform:
      'uppercase',

    textShadowColor: '#000',

    textShadowOffset: {
      width: 6,
      height: 6,
    },

    textShadowRadius: 0,
  },

  logo2: {

    color: COLORS.text,

    fontFamily:
      'PressStart2P-Regular',

    fontSize: 24,

    marginTop: 14,

    letterSpacing: 5,

    textTransform:
      'uppercase',

    textShadowColor: '#000',

    textShadowOffset: {
      width: 5,
      height: 5,
    },

    textShadowRadius: 0,
  },

  subtitle: {

    color: COLORS.green,

    fontFamily:
      'PressStart2P-Regular',

    fontSize: 9,

    marginTop: 18,

    letterSpacing: 3,

    textTransform:
      'uppercase',

    textShadowColor: '#000',

    textShadowOffset: {
      width: 3,
      height: 3,
    },

    textShadowRadius: 0,
  },

  // PROFILE
  profile: {

    alignItems: 'center',

    marginBottom: 26,
  },

  avatarFrame: {

    borderWidth: 4,

    borderColor:
      COLORS.primary,

    padding: 8,

    backgroundColor:
      COLORS.surface,

    shadowColor: '#000',

    shadowOffset: {
      width: 6,
      height: 6,
    },

    shadowOpacity: 1,

    shadowRadius: 0,

    elevation: 10,
  },

  avatar: {

    width: 90,

    height: 90,
  },

  username: {

    color: COLORS.text,

    fontFamily:
      'PressStart2P-Regular',

    fontSize: 10,

    marginTop: 18,

    letterSpacing: 3,

    textTransform:
      'uppercase',

    textShadowColor: '#000',

    textShadowOffset: {
      width: 3,
      height: 3,
    },

    textShadowRadius: 0,
  },

  status: {

    color: COLORS.green,

    fontFamily:
      'PressStart2P-Regular',

    fontSize: 8,

    marginTop: 12,

    letterSpacing: 3,

    textTransform:
      'uppercase',
  },

  // LINE
  line: {

    width: '100%',

    height: 3,

    backgroundColor:
      COLORS.primaryDark,

    marginBottom: 24,
  },

  // BUTTON
  item: {

    backgroundColor:
      COLORS.surface,

    borderWidth: 4,

    borderColor:
      COLORS.primary,

    paddingVertical: 18,

    paddingHorizontal: 14,

    marginBottom: 18,

    shadowColor: '#000',

    shadowOffset: {
      width: 6,
      height: 6,
    },

    shadowOpacity: 1,

    shadowRadius: 0,

    elevation: 10,
  },

  text: {

    color: COLORS.text,

    fontFamily:
      'PressStart2P-Regular',

    fontSize: 10,

    letterSpacing: 3,

    textTransform:
      'uppercase',

    textShadowColor: '#000',

    textShadowOffset: {
      width: 2,
      height: 2,
    },

    textShadowRadius: 0,
  },

  // FOOTER
  footer: {

    marginBottom: 18,
  },

  support: {

    color: COLORS.accent,

    fontFamily:
      'PressStart2P-Regular',

    fontSize: 8,

    letterSpacing: 3,

    textTransform:
      'uppercase',

    marginBottom: 8,

    textShadowColor: '#000',

    textShadowOffset: {
      width: 2,
      height: 2,
    },

    textShadowRadius: 0,
  },

  // PIXELS
  pixelRow: {

    flexDirection: 'row',

    justifyContent: 'center',

    gap: 10,

    marginBottom: 24,
  },

  pixel: {

    width: 14,

    height: 14,

    borderWidth: 2,

    borderColor: '#000',

    shadowColor: '#000',

    shadowOffset: {
      width: 2,
      height: 2,
    },

    shadowOpacity: 1,

    shadowRadius: 0,
  },

  // LOGOUT
  logout: {

    backgroundColor:
      COLORS.primaryDark,

    borderWidth: 4,

    borderColor: '#000',

    paddingVertical: 18,

    alignItems: 'center',

    shadowColor: '#000',

    shadowOffset: {
      width: 6,
      height: 6,
    },

    shadowOpacity: 1,

    shadowRadius: 0,

    elevation: 10,
  },

  logoutText: {

    color: COLORS.text,

    fontFamily:
      'PressStart2P-Regular',

    fontSize: 10,

    letterSpacing: 3,

    textTransform:
      'uppercase',

    textShadowColor: '#000',

    textShadowOffset: {
      width: 2,
      height: 2,
    },

    textShadowRadius: 0,
  },
});