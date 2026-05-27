import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function ProfileScreen({ route }: any) {
  // 🔥 DATOS DESDE NAVEGACIÓN
  const initialUsername = route?.params?.username || "Usuario";
  const role = route?.params?.role || "user";
  const initialEmail = "usuario@email.com";

  // ✅ ESTADOS EDITABLES
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [editing, setEditing] = useState(false);

  // ✅ GUARDAR CAMBIOS
  const handleSave = () => {
    setEditing(false);
    Alert.alert("Perfil actualizado");
  };

  // ✅ LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      {/* AVATAR */}
      <Image
        source={{ uri: "https://i.pravatar.cc/300" }}
        style={styles.avatar}
      />

      {/* USERNAME */}
      {editing ? (
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      ) : (
        <Text style={styles.username}>{username}</Text>
      )}

      {/* EMAIL */}
      {editing ? (
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      ) : (
        <Text style={styles.email}>{email}</Text>
      )}

      {/* ROLE */}
      <Text style={styles.role}>
        {role === "admin" ? "👑 ADMIN" : "👤 USER"}
      </Text>

      {/* BOTONES */}
      {editing ? (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditing(true)}
        >
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
      )}

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#6366f1",
  },

  username: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  email: {
    color: "#94a3b8",
    marginTop: 5,
    fontSize: 16,
  },

  role: {
    color: "#f59e0b",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    marginTop: 10,
    textAlign: "center",
  },

  editButton: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    width: "70%",
    alignItems: "center",
  },

  saveButton: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    width: "70%",
    alignItems: "center",
  },

  logoutButton: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    width: "70%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
