import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// FIREBASE
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

// AUTH
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

// 🔥 IMPORTANTE: usar Drawer
import DrawerNavigator from "./DrawerNavigator";

// MOVIES
import MoviesScreen from "../screens/crudMovies/MoviesScreen";
import AddMovieScreen from "../screens/crudMovies/AddMovieScreen";
import EditMovieScreen from "../screens/crudMovies/EditMovieScreen";

// GAMES
import GamesScreen from "../screens/crudGames/GamesScreen";
import AddGameScreen from "../screens/crudGames/AddGameScreen";
import EditGameScreen from "../screens/crudGames/EditGameScreen";

// OTHER
import ProfileScreen from "../screens/ProfileScreen";
import DetailScreen from "../screens/DetailScreen";
import BuyScreen from "../screens/BuyScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "#fff",
          contentStyle: {
            backgroundColor: "#121212",
          },
          headerShown: false, // mejor para drawer
        }}
      >
        {user ? (
          <>
            {/* 🔥 AQUI VA EL SIDEBAR */}
            <Stack.Screen name="Main" component={DrawerNavigator} />

            {/* DEMÁS PANTALLAS */}
            <Stack.Screen name="Movies" component={MoviesScreen} />
            <Stack.Screen name="AddMovie" component={AddMovieScreen} />
            <Stack.Screen name="EditMovie" component={EditMovieScreen} />

            <Stack.Screen name="Games" component={GamesScreen} />
            <Stack.Screen name="AddGame" component={AddGameScreen} />
            <Stack.Screen name="EditGame" component={EditGameScreen} />

            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Buy" component={BuyScreen} />

            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}