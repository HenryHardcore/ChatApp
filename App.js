import { enableScreens } from 'react-native-screens';
enableScreens();
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './Header'
import Chatovi from './Chatovi'
import Footer from './Footer'
import { AuthProvider } from './auth';
import Loginscreen from './Loginscreen'
import RegisterScreen from './Registerscreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
      <SafeAreaProvider>
        <View style={styles.root}>
          <StatusBar style="light" translucent />
          <SafeAreaView style={styles.safeArea}>
            <Header/>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Loginscreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </Stack.Navigator>
            </NavigationContainer>
            <Footer/>
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000', 
  },
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
  }
});
