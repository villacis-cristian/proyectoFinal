import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";

export default function HomeScreen({ navigation, route }: any) {
  // USERNAME
  const username = route?.params?.username || "Usuario";

  // ROLE LIMPIO
  const role = route?.params?.role?.trim().toLowerCase() || "user";

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>🎬 GameStore</Text>

        <Text style={styles.subtitle}>
          Bienvenido {username}
        </Text>

        <View style={styles.roleContainer}>
          <Text style={styles.roleText}>
            {role === "admin" ? "👑 ADMIN" : "👤 USER"}
          </Text>
        </View>
      </View>

      {/* INFORMACIÓN */}
      <Text style={styles.text}>Deber sobre navegación</Text>
      <Text style={styles.text}>
        Cristian Andres Villacis Mendoza
      </Text>
      <Text style={styles.text}>
        Lenguaje de programación 4
      </Text>
      <Text style={styles.text}>React Native</Text>

      {/* MOVIES */}
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("Movies", {
            role,
            username,
          })
        }
      >
        <Text style={styles.cardTitle}>🎥 Películas</Text>
        <Text style={styles.cardDescription}>
          Explora el catálogo de películas
        </Text>
      </TouchableOpacity>

      {/* GAMES */}
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("Games", {
            role,
            username,
          })
        }
      >
        <Text style={styles.cardTitle}>🎮 Videojuegos</Text>
        <Text style={styles.cardDescription}>
          Explora el catálogo de videojuegos
        </Text>
      </TouchableOpacity>

      {/* PERFIL */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() =>
          navigation.navigate("Profile", {
            username,
            role,
          })
        }
      >
        <Text style={styles.profileButtonText}>
          Ver Perfil
        </Text>
      </TouchableOpacity>

      {/* BOTÓN EXTRA */}
      <View style={styles.buttonContainer}>
        <Button
          title="Ir a Detalle"
          onPress={() => navigation.navigate("Detail")}
        />
      </View>

      {/* PANEL ADMIN */}
      {role === "admin" && (
        <View style={styles.adminPanel}>
          <Text style={styles.adminTitle}>
            🔥 Panel Administrador
          </Text>

          <Text style={styles.permission}>
            ✅ CRUD Películas
          </Text>

          <Text style={styles.permission}>
            ✅ CRUD Videojuegos
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },

  header: {
    marginTop: 50,
    marginBottom: 40,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#aaa",
    fontSize: 18,
    marginTop: 10,
  },

  text: {
    fontSize: 16,
    color: "#33ff99",
    marginBottom: 8,
    textAlign: "center",
  },

  roleContainer: {
    backgroundColor: "#7c3aed",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    marginTop: 20,
  },

  });