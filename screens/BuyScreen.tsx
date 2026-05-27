import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function BuyScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>COMPRA COMPLETADA</Text>

      <Text style={styles.text}>
        Su compra se ha realizado
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Volver al inicio"
          onPress={() => navigation.navigate("Home")}
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
  },

  buttonContainer: {
    marginTop: 30,
    width: "60%",
  },
});