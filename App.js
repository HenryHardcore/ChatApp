import { enableScreens } from 'react-native-screens';
enableScreens();

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import Loginscreen from './Loginscreen';
import RegisterScreen from './Registerscreen';
import Chatovi from './Chatovi'; 
import { AuthProvider, useAuth } from './auth';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

function InnerApp() {
  const { userLoggedIn, loading } = useAuth();
  console.log('userLoggedIn:', userLoggedIn, 'loading:', loading);
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <View style={styles.root}>
        <StatusBar style="light" translucent />
        <SafeAreaView style={styles.safeArea}>
          
          {userLoggedIn && <Header />}

          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {userLoggedIn ? (
              <Stack.Screen name="Home" component={Chatovi} />
            ) : (
              <>
                <Stack.Screen name="Login" component={Loginscreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            )}
          </Stack.Navigator>

          {userLoggedIn && <Footer />}
          
        </SafeAreaView>
      </View>
    </NavigationContainer>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  center: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});