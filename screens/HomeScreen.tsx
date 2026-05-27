import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function HomeScreen({ navigation, route }: any) {
  const username = route?.params?.username || "Usuario";
  const role = route?.params?.role?.trim().toLowerCase() || "user";

  // ✅ LOGOUT
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        
        {/* BOTÓN SIDEBAR */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>

        <Text style={styles.title}>🎬 GameStore</Text>

        <Text style={styles.subtitle}>
          Bienvenido {username}
        </Text>

        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>
            {role === "admin" ? "👑 ADMIN" : "👤 USER"}
          </Text>
        </View>
      </View>

      {/* CONTENIDO TIPO NOTICIAS */}
      <View style={styles.bigCard}>
        <Text style={styles.cardText}>
          🔥 Promoción de la semana
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text style={styles.cardText}>
            🎮 Nuevo juego disponible
          </Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.cardText}>
            🎥 Estreno exclusivo
          </Text>
        </View>
      </View>

      <View style={styles.bigCard}>
        <Text style={styles.cardText}>
          ⭐ Recomendado para ti
        </Text>
      </View>

      {/* BOTONES GRANDES */}
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate("Movies")}
      >
        <Text style={styles.mainButtonText}>
          🎥 IR A PELÍCULAS
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate("Games")}
      >
        <Text style={styles.mainButtonText}>
          🎮 IR A JUEGOS
        </Text>
      </TouchableOpacity>

      {/* ADMIN PANEL */}
      {role === "admin" && (
        <View style={styles.adminPanel}>
          <Text style={styles.adminTitle}>
            🔥 Panel Administrador
          </Text>

          <Text style={styles.permission}>✅ CRUD Películas</Text>
          <Text style={styles.permission}>✅ CRUD Videojuegos</Text>
        </View>
      )}

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          🚪 Cerrar sesión
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  header: {
    marginTop: 40,
    marginBottom: 20,
  },

  menu: {
    color: "#fff",
    fontSize: 28,
    marginBottom: 10,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: 5,
  },

  roleBadge: {
    backgroundColor: "#6366f1",
    padding: 6,
    borderRadius: 15,
    marginTop: 10,
    alignSelf: "flex-start",
  },

  roleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  bigCard: {
    backgroundColor: "#1e293b",
    padding: 25,
    borderRadius: 20,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallCard: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 20,
    width: "48%",
    marginBottom: 15,
  },

  cardText: {
    color: "#fff",
  },

  mainButton: {
    backgroundColor: "#3b82f6",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 15,
  },

  mainButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  adminPanel: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },

  adminTitle: {
    color: "#f59e0b",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  permission: {
    color: "#22c55e",
    marginBottom: 5,
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});