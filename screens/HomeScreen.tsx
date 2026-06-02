import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Linking,
  TextInput,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebaseConfig';

// ─────────────────────────────────────────
// PALETA
// ─────────────────────────────────────────
const C = {
  bg:      '#150018',   // color5 — fondo más oscuro
  surface: '#240e28',   // color4 — cards base
  mid:     '#331d37',   // color3 — superficies elevadas
  accent:  '#422b47',   // color2 — bordes sutiles / hover
  muted:   '#513957',   // color1 — texto muted
  // grises neutros
  gray1:   '#2a2a2d',   // gris oscuro (fondos alternativos)
  gray2:   '#3d3d42',   // gris medio
  gray3:   '#6b6b72',   // gris claro (texto secundario)
  gray4:   '#a8a8b0',   // gris muy claro
  white:   '#f0eef2',   // blanco suave — texto principal
  offwhite:'#c9c6cd',   // blanco roto — subtítulos
  black:   '#000000',
  green:   '#22c55e',
  red:     '#e53e3e',
};

const SHD = {
  shadowColor:   '#000',
  shadowOffset:  { width: 2, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius:  0,
  elevation:     4,
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
// SECTION HEADER
// ─────────────────────────────────────────
function SectionHeader({ label }: { label: string }) {
  return (
    <View style={styles.sectionRow}>
      <View style={styles.sectionLine} />
      <Text style={styles.sectionLabel}>■ {label} ■</Text>
      <View style={styles.sectionLine} />
    </View>
  );
}

// ─────────────────────────────────────────
// HERO NEWS CARD
// ─────────────────────────────────────────
function HeroNewsCard({
  tag, title, sub, emoji, onPress,
}: {
  tag: string; title: string; sub: string; emoji: string; onPress?: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.heroCard} onPress={onPress}>
      <View style={styles.heroImg}>
        <Text style={styles.heroEmoji}>{emoji}</Text>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>■ {tag}</Text>
        </View>
      </View>
      <View style={styles.heroBody}>
        <Text style={styles.heroMeta}>▸ {tag} · FEATURED</Text>
        <Text style={styles.heroTitle}>{title}</Text>
        <Text style={styles.heroSub}>{sub}</Text>
        <Text style={styles.heroLink}>READ MORE ▶</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────
// MINI NEWS CARD
// ─────────────────────────────────────────
function MiniNewsCard({
  tag, tagColor, title, emoji, onPress,
}: {
  tag: string; tagColor: string; title: string; emoji: string; onPress?: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.miniCard} onPress={onPress}>
      <View style={styles.miniImg}>
        <Text style={styles.miniEmoji}>{emoji}</Text>
      </View>
      <View style={styles.miniBody}>
        <Text style={[styles.miniTag, { color: tagColor }]}>{tag}</Text>
        <Text style={styles.miniTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────
// ACCORDION ITEM (Admin Panel)
// ─────────────────────────────────────────
function AccordionItem({
  label, description, isOpen, onPress,
}: {
  label: string; description: string; isOpen: boolean; onPress: () => void;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isOpen ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const maxHeight = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 80] });
  const opacity   = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity activeOpacity={0.85} style={styles.accordionHeader} onPress={onPress}>
        <Text style={styles.accordionLabel}>{label}</Text>
        <Text style={[styles.accordionArrow, { color: isOpen ? C.green : C.gray3 }]}>
          {isOpen ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      <Animated.View style={{ maxHeight, opacity, overflow: 'hidden' }}>
        <Text style={styles.accordionDesc}>{description}</Text>
      </Animated.View>
    </View>
  );
}

// ─────────────────────────────────────────
// SOCIAL BUTTON
// ─────────────────────────────────────────
function SocialBtn({
  emoji, name, color, url,
}: {
  emoji: string; name: string; color: string; url: string;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.socialBtn}
      onPress={() => Linking.openURL(url)}
    >
      <View style={[styles.socialIcon, { backgroundColor: color }]}>
        <Text style={styles.socialEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.socialName}>{name}</Text>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────
// SCREEN
// ─────────────────────────────────────────
export default function HomeScreen({ navigation }: any) {
  const [role, setRole]         = useState('user');
  const [username, setUsername] = useState('PLAYER');
  const [search, setSearch]     = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (!auth.currentUser) return;
      const ref  = doc(db, 'users', auth.currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setRole(data.role?.trim().toLowerCase() || 'user');
        setUsername(data.username || 'PLAYER');
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => { await signOut(auth); };
  const isAdmin = role === 'admin';

  const toggleAccordion = (key: string) => {
    setOpenAccordion(prev => (prev === key ? null : key));
  };

  const accordionItems = [
    {
      key: 'games',
      label: '🎮 CRUD JUEGOS',
      description: 'Gestiona el catálogo de videojuegos: crea, edita, elimina y consulta títulos, géneros, plataformas y fechas de lanzamiento.',
    },
    {
      key: 'users',
      label: '👤 LISTA DE USUARIOS',
      description: 'Consulta y administra los usuarios registrados, sus roles, estados de cuenta y actividad reciente en la plataforma.',
    },
    {
      key: 'updates',
      label: '🔄 ACTUALIZACIONES Y MÁS',
      description: 'Gestiona parches, anuncios, noticias y contenido editorial. Publica o archiva actualizaciones del sistema y novedades.',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>

      {/* ══ HEADER ══ */}
      <View style={styles.header}>

        {/* Sidebar btn difuminado */}
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.menuBtn}
          onPress={() => navigation.toggleDrawer()}
        >
          <Text style={styles.menuBtnText}>☰</Text>
        </TouchableOpacity>

        {/* Logo junto: AVASHI'KOL */}
        <View style={styles.headerCenter}>
          <Text style={styles.companyLogo}>
            AVASHI<Text style={styles.companyApos}>'</Text>KOL
          </Text>
          <View style={styles.systemRow}>
            <Text style={styles.systemText}>◄ BIENVENIDO ► </Text>
            <BlinkingCursor />
          </View>
        </View>

        <View style={styles.playerTag}>
          <Text style={styles.playerName}>{username.toUpperCase()}</Text>
          <Text style={[styles.roleText, { color: isAdmin ? C.green : C.offwhite }]}>
            {isAdmin ? '◆ ADMIN' : '▶ P1'}
          </Text>
        </View>

      </View>

      {/* ══ NAV BAR: botones izq + buscador der ══ */}
      <View style={styles.navBar}>
        {/* Botones izquierda */}
        <View style={styles.navBtnGroup}>
          {[
            { label: 'GAMES',  screen: 'Games'  },
            { label: 'MOVIES', screen: 'Movies' },
            { label: 'SERIES', screen: 'Series' },
          ].map((item) => (
            <TouchableOpacity
              key={item.screen}
              activeOpacity={0.85}
              style={styles.navPill}
              onPress={() => navigation.navigate(item.screen, { username, role })}
            >
              <Text style={styles.navPillText}>▶ {item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Buscador derecha */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="BUSCAR..."
            placeholderTextColor={C.gray3}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
        </View>
      </View>

      {/* ══ ADMIN BANNER ══ */}
      {isAdmin && (
        <View style={styles.adminBanner}>
          <Text style={styles.adminBannerText}>⚡ ADMIN MODE ACTIVE ⚡</Text>
        </View>
      )}

      <View style={styles.inner}>

        {/* ══ ADMIN TERMINAL (antes de FEATURED) ══ */}
        {isAdmin && (
          <>
            <SectionHeader label="ADMIN TERMINAL" />
            <View style={styles.adminPanelRow}>

              {/* Izquierda: acordeón */}
              <View style={styles.adminLeft}>
                <Text style={styles.adminTitle}>◆ CONTROL PANEL</Text>
                <View style={styles.adminDivider} />
                {accordionItems.map((item) => (
                  <AccordionItem
                    key={item.key}
                    label={item.label}
                    description={item.description}
                    isOpen={openAccordion === item.key}
                    onPress={() => toggleAccordion(item.key)}
                  />
                ))}
              </View>

              {/* Derecha: acceso inventario */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.adminRight}
                onPress={() => navigation.navigate('Inventory', { username, role })}
              >
                <Text style={styles.inventoryIcon}>📦</Text>
                <Text style={styles.inventoryLabel}>ACCEDER AL{'\n'}INVENTARIO</Text>
                <Text style={styles.inventoryArrow}>▶</Text>
              </TouchableOpacity>

            </View>
          </>
        )}

        {/* ══ HERO NEWS ══ */}
        <SectionHeader label="FEATURED" />
        <HeroNewsCard
          tag="GAMES"
          title="VOID TOURNAMENT SEASON 3 ANNOUNCED"
          sub="LIMITED TIME EVENT · JOIN NOW"
          emoji="🔥"
          onPress={() => navigation.navigate('Games', { username, role })}
        />

        {/* ══ NEWS GRID ══ */}
        <SectionHeader label="LATEST NEWS" />
        <View style={styles.grid}>
          <MiniNewsCard
            tag="MOVIE"  tagColor={C.offwhite}
            title="VOID RUNNER TRAILER OUT"
            emoji="🎥"
            onPress={() => navigation.navigate('Movies', { username, role })}
          />
          <MiniNewsCard
            tag="SERIES" tagColor={C.green}
            title="NEON ARC SEASON 2 DROPS"
            emoji="📺"
            onPress={() => navigation.navigate('Series', { username, role })}
          />
          <MiniNewsCard
            tag="GAME"   tagColor={C.white}
            title="CYBER QUEST PATCH 2.4 LIVE"
            emoji="🎮"
            onPress={() => navigation.navigate('Games', { username, role })}
          />
          <MiniNewsCard
            tag="TOP"    tagColor={C.muted}
            title="PIXEL SAGA STAFF CHOICE"
            emoji="⭐"
            onPress={() => navigation.navigate('Games', { username, role })}
          />
        </View>

        {/* ══ FOLLOW US + SOBRE NOSOTROS ══ */}
        <SectionHeader label="FOLLOW US" />
        <View style={styles.followRow}>

          {/* Izquierda: sobre nosotros */}
          <View style={styles.aboutBox}>
            <Text style={styles.aboutTitle}>■ SOBRE NOSOTROS</Text>
            <Text style={styles.aboutText}>
              Avashi'Kol es tu plataforma de entretenimiento digital. Cubrimos videojuegos, películas y series con reviews, noticias y lanzamientos. Únete a la comunidad y mantente al día con lo mejor del mundo geek.
            </Text>
          </View>

          {/* Derecha: social icons pequeños */}
          <View style={styles.socialGrid}>
            <SocialBtn emoji="📸" name=""       color="#E1306C" url="https://instagram.com"  />
            <SocialBtn emoji="🎵" name=""       color="#FF0050" url="https://tiktok.com"     />
            <SocialBtn emoji="▶"  name=""       color="#FF0000" url="https://youtube.com"    />
            <SocialBtn emoji="✕"  name=""        color={C.gray2} url="https://x.com"          />
            <SocialBtn emoji="💬" name=""       color="#5865F2" url="https://discord.com"    />
            <SocialBtn emoji="🎮" name=""       color="#9146FF" url="https://twitch.tv"      />
            <SocialBtn emoji="👾" name=""       color="#FF4500" url="https://reddit.com"     />
            <SocialBtn emoji="📘" name=""       color="#1877F2" url="https://facebook.com"   />
          </View>

        </View>

        {/* ══ PIXEL DOTS ══ */}
        <View style={styles.pixelRow}>
          <View style={[styles.pixel, { backgroundColor: C.white }]} />
          <View style={[styles.pixel, { backgroundColor: C.offwhite }]} />
          <View style={[styles.pixel, { backgroundColor: C.green }]} />
        </View>

        <Text style={styles.footer}>AVASHI'KOL © 2025 · PRESS START</Text>

        {/* ══ LOGOUT pequeño, esquina izquierda, rojo ══ */}
        <TouchableOpacity activeOpacity={0.85} style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>◄ LOGOUT</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: C.bg },
  inner:     { paddingHorizontal: 14 },

  // ── HEADER ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.surface,
    borderBottomWidth: 1,
    borderBottomColor: C.accent,
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 12,
  },
  menuBtn: {
    backgroundColor: C.mid,
    paddingHorizontal: 10,
    paddingVertical: 8,
    opacity: 0.5,          // difuminado
  },
  menuBtnText:  { color: C.white, fontFamily: 'PressStart2P-Regular', fontSize: 13 },
  headerCenter: { alignItems: 'center' },
  companyLogo: {
    color: C.white,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 20,
    letterSpacing: 3,
    lineHeight: 28,
  },
  companyApos: { color: C.green },
  systemRow:   { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  systemText:  { color: C.green, fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 2 },
  cursor:      { fontFamily: 'PressStart2P-Regular', fontSize: 7, marginLeft: 3 },
  playerTag:   { alignItems: 'center', gap: 4 },
  playerName:  { color: C.offwhite, fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 1 },
  roleText:    { fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 1 },

  // ── NAV BAR ──
  navBar: {
    backgroundColor: C.mid,
    borderBottomWidth: 1,
    borderBottomColor: C.accent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 6,
    gap: 6,
  },
  navBtnGroup: { flexDirection: 'row', gap: 4 },
  navPill: {
    backgroundColor: C.accent,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  navPillText: {
    color: C.white,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    letterSpacing: 1,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.gray1,
    borderWidth: 1,
    borderColor: C.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 6,
  },
  searchIcon:  { fontSize: 10 },
  searchInput: {
    flex: 1,
    color: C.white,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    letterSpacing: 1,
    padding: 0,
  },

  // ── ADMIN BANNER ──
  adminBanner: {
    backgroundColor: C.green,
    paddingVertical: 9,
    alignItems: 'center',
  },
  adminBannerText: {
    color: C.black,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 9,
    letterSpacing: 3,
  },

  // ── SECTION HEADER ──
  sectionRow:   { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, marginTop: 18 },
  sectionLine:  { flex: 1, height: 1, backgroundColor: C.accent },
  sectionLabel: { color: C.offwhite, fontFamily: 'PressStart2P-Regular', fontSize: 8, letterSpacing: 2 },

  // ── ADMIN PANEL ──
  adminPanelRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  adminLeft: {
    flex: 1,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.accent,
    padding: 14,
    ...SHD,
  },
  adminTitle:   { color: C.green,   fontFamily: 'PressStart2P-Regular', fontSize: 8,  letterSpacing: 2, marginBottom: 10 },
  adminDivider: { height: 1, backgroundColor: C.accent, marginBottom: 10 },

  // Accordion
  accordionItem:   { borderBottomWidth: 1, borderBottomColor: C.mid, paddingBottom: 4, marginBottom: 4 },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  accordionLabel:  { color: C.white, fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 1, flex: 1 },
  accordionArrow:  { fontFamily: 'PressStart2P-Regular', fontSize: 7 },
  accordionDesc:   {
    color: C.gray4,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 6,
    letterSpacing: 0.5,
    lineHeight: 12,
    paddingBottom: 8,
    paddingHorizontal: 2,
  },

  adminRight: {
    width: 100,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.green,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...SHD,
  },
  inventoryIcon:  { fontSize: 28 },
  inventoryLabel: {
    color: C.green,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    letterSpacing: 1,
    lineHeight: 14,
    textAlign: 'center',
  },
  inventoryArrow: { color: C.green, fontFamily: 'PressStart2P-Regular', fontSize: 10 },

  // ── HERO CARD ──
  heroCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.accent,
    marginBottom: 16,
    ...SHD,
  },
  heroImg: {
    backgroundColor: C.bg,
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: C.accent,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroEmoji:     { fontSize: 48 },
  heroBadge: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: C.white,
    paddingHorizontal: 7, paddingVertical: 3,
  },
  heroBadgeText: { color: C.bg, fontFamily: 'PressStart2P-Regular', fontSize: 6, letterSpacing: 1 },
  heroBody:      { padding: 12 },
  heroMeta:      { color: C.muted,    fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 1, marginBottom: 6 },
  heroTitle:     { color: C.white,    fontFamily: 'PressStart2P-Regular', fontSize: 10, letterSpacing: 1, lineHeight: 18, marginBottom: 6 },
  heroSub:       { color: C.offwhite, fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 1, marginBottom: 8 },
  heroLink:      { color: C.green,    fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 2 },

  // ── MINI CARDS ──
  grid:     { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 4 },
  miniCard: {
    width: '48%',
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.accent,
    marginBottom: 12,
    ...SHD,
  },
  miniImg:   {
    backgroundColor: C.bg,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: C.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniEmoji: { fontSize: 26 },
  miniBody:  { padding: 8 },
  miniTag:   { fontFamily: 'PressStart2P-Regular', fontSize: 6, letterSpacing: 1, marginBottom: 5 },
  miniTitle: { color: C.white, fontFamily: 'PressStart2P-Regular', fontSize: 7, letterSpacing: 1, lineHeight: 13 },

  // ── FOLLOW US ──
  followRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  aboutBox: {
    flex: 1,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.accent,
    padding: 12,
    ...SHD,
  },
  aboutTitle: {
    color: C.green,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    letterSpacing: 1,
    marginBottom: 8,
  },
  aboutText: {
    color: C.gray4,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 6,
    letterSpacing: 0.5,
    lineHeight: 13,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 130,
    gap: 6,
    justifyContent: 'flex-end',
  },
  socialBtn: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.accent,
    paddingVertical: 6,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 60,
  },
  socialIcon:  {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  socialEmoji: { fontSize: 10 },
  socialName:  { color: C.gray4, fontFamily: 'PressStart2P-Regular', fontSize: 5, letterSpacing: 0.5 },

  // ── PIXEL DOTS ──
  pixelRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 12 },
  pixel:    { width: 8, height: 8 },

  // ── FOOTER ──
  footer: {
    color: C.muted,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 6,
    letterSpacing: 2,
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 12,
  },

  // ── LOGOUT ──
  logoutBtn: {
    alignSelf: 'flex-start',
    backgroundColor: C.red,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  logoutText: {
    color: C.white,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 7,
    letterSpacing: 2,
  },
});
