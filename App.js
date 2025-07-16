import { enableScreens } from 'react-native-screens';
enableScreens();

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigationState } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import Loginscreen from './Loginscreen';
import RegisterScreen from './Registerscreen';
import Chatovi from './Chatovi'; 
import Settings from './Settings';
import Search from './Search';
import { DarkModeProvider } from './DarkModeContext';
import { AuthProvider, useAuth } from './auth';
import Chat from './Chat'

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </DarkModeProvider>
  );
}

function InnerApp() {
  const navigationRef = useNavigationContainerRef();
  const [currentRouteName, setCurrentRouteName] = useState(null);
  const { userLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (navigationRef.isReady()) {
      setCurrentRouteName(navigationRef.getCurrentRoute()?.name);
    }
  }, [navigationRef]);

  const handleStateChange = () => {
    const currentRoute = navigationRef.getCurrentRoute();
    setCurrentRouteName(currentRoute?.name);
  };
  
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
    <NavigationContainer
      ref={navigationRef}
      onReady={handleStateChange}
      onStateChange={handleStateChange}
    >
      <View style={styles.root}>
        <StatusBar style="light" translucent />
        <SafeAreaView style={styles.safeArea}>
          
          {userLoggedIn && currentRouteName !== 'Chat' && <Header />}

          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none', }}>
            {userLoggedIn ? (
              <>
                <Stack.Screen name="Chatovi" component={Chatovi} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Chat" component={Chat} /> 
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Loginscreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            )}
          </Stack.Navigator>

          {userLoggedIn && currentRouteName !== 'Chat' && <Footer />}
          
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