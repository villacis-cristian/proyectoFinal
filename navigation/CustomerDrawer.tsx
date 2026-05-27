import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function CustomDrawer({ navigation }: any) {
  const username = "Usuario";

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      {/* PERFIL */}
      <View style={styles.profile}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{username}</Text>
      </View>

      {/* OPCIONES */}
      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Botón 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Botón 2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Botón 3</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Botón 4</Text>
      </TouchableOpacity>

      {/* ESPACIO */}
      <View style={{ flex: 1 }} />

      {/* SOPORTE */}
      <Text style={styles.support}>Soporte</Text>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  profile: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
  },

  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  item: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  text: {
    color: "#fff",
  },

  support: {
    color: "#94a3b8",
    marginBottom: 10,
  },

  logout: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 10,
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});