import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DetailScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SABER MÁS</Text>

      <Text style={styles.text}>
        Sobre la aplicación
      </Text>

      <Text style={styles.text}>
        Ingrese aquí para continuar el proceso
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Ir a compra"
          onPress={() => navigation.navigate("Buy")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00ff66",
    letterSpacing: 3,
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    color: "#33ff99",
    fontFamily: "monospace",
    textAlign: "center",
    marginBottom: 8,
  },

  buttonContainer: {
    marginTop: 30,
    width: "60%",
  },
});