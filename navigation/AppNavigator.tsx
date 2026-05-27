import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// AUTH
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

// HOME
import HomeScreen from "../screens/HomeScreen";

// MOVIES (crudMovies)
import MoviesScreen from "../screens/crudMovies/MoviesScreen";
import AddMovieScreen from "../screens/crudMovies/AddMovieScreen";
import EditMovieScreen from "../screens/crudMovies/EditMovieScreen";

// GAMES (crudGames)
import GamesScreen from "../screens/crudGames/GamesScreen";
import AddGameScreen from "../screens/crudGames/AddGameScreen";
import EditGameScreen from "../screens/crudGames/EditGameScreen";

// OTHER
import ProfileScreen from "../screens/ProfileScreen";
import DetailScreen from "../screens/DetailScreen";
import BuyScreen from "../screens/BuyScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "#fff",
          contentStyle: {
            backgroundColor: "#121212",
          },
        }}
      >
        {/* LOGIN */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* REGISTER */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        {/* HOME */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        {/* MOVIES */}
        <Stack.Screen
          name="Movies"
          component={MoviesScreen}
          options={{ title: "Películas" }}
        />

        <Stack.Screen
          name="AddMovie"
          component={AddMovieScreen}
          options={{ title: "Agregar Película" }}
        />

        <Stack.Screen
          name="EditMovie"
          component={EditMovieScreen}
          options={{ title: "Editar Película" }}
        />

        {/* GAMES */}
        <Stack.Screen
          name="Games"
          component={GamesScreen}
          options={{ title: "Videojuegos" }}
        />

        <Stack.Screen
          name="AddGame"
          component={AddGameScreen}
          options={{ title: "Agregar Juego" }}
        />

        <Stack.Screen
          name="EditGame"
          component={EditGameScreen}
          options={{ title: "Editar Juego" }}
        />

        {/* DETAIL */}
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
        />

        {/* BUY */}
        <Stack.Screen
          name="Buy"
          component={BuyScreen}
        />

        {/* PROFILE */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
