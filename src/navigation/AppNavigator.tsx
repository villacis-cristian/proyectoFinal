import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import MoviesScreen from '../screens/MoviesScreen';
import GamesScreen from '../screens/GamesScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
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
        <Stack.Screen
          name='Home'
          component={HomeScreen}
        />

        <Stack.Screen
          name='Movies'
          component={MoviesScreen}
        />

        <Stack.Screen
          name='Games'
          component={GamesScreen}
        />

        <Stack.Screen
          name='Login'
          component={LoginScreen}
        />

        <Stack.Screen
          name='Register'
          component={RegisterScreen}
        />

        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
