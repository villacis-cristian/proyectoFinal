import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator }
from '@react-navigation/native-stack';

// SCREENS
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

import MoviesScreen from '../screens/MoviesScreen';
import GamesScreen from '../screens/GamesScreen';

import AddMovieScreen from '../screens/AddMovieScreen';
import EditMovieScreen from '../screens/EditMovieScreen';

import AddGameScreen from '../screens/AddGameScreen';
import EditGameScreen from '../screens/EditGameScreen';

import ProfileScreen from '../screens/ProfileScreen';

const Stack =
  createNativeStackNavigator();

export default function AppNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator

        initialRouteName='Login'

        screenOptions={{

          headerStyle: {
            backgroundColor: '#121212',
          },

          headerTintColor: '#fff',

          contentStyle: {
            backgroundColor: '#121212',
          },
        }}
      >

        {/* LOGIN */}
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* REGISTER */}
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
        />

        {/* HOME */}
        <Stack.Screen
          name='Home'
          component={HomeScreen}
        />

        {/* MOVIES */}
        <Stack.Screen
          name='Movies'
          component={MoviesScreen}
          options={{
            title: 'Películas',
          }}
        />

        {/* GAMES */}
        <Stack.Screen
          name='Games'
          component={GamesScreen}
          options={{
            title: 'Videojuegos',
          }}
        />

        {/* ADD MOVIE */}
        <Stack.Screen
          name='AddMovie'
          component={AddMovieScreen}
          options={{
            title: 'Agregar Película',
          }}
        />

        {/* EDIT MOVIE */}
        <Stack.Screen
          name='EditMovie'
          component={EditMovieScreen}
          options={{
            title: 'Editar Película',
          }}
        />

        {/* ADD GAME */}
        <Stack.Screen
          name='AddGame'
          component={AddGameScreen}
          options={{
            title: 'Agregar Juego',
          }}
        />

        {/* EDIT GAME */}
        <Stack.Screen
          name='EditGame'
          component={EditGameScreen}
          options={{
            title: 'Editar Juego',
          }}
        />

        {/* PROFILE */}
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}