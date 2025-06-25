import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header'
import Chatovi from './Chatovi'

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <View style={styles.root}>
          <View style={styles.statusBarBackground} />
          <StatusBar style="light" translucent />
          <SafeAreaView style={styles.safeArea}>
            <Header/>
            <Chatovi/>
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000', 
  },
  statusBarBackground: {
    height: StatusBar.currentHeight || 24, 
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
