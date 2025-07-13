import { View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'; 
import settings from './fotografije/settings.png';
import settingss from './fotografije/settingsblack.png'
import chats from "./fotografije/chats.png";
import chatss from './fotografije/chatsblack.png'
import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

function Footer() {
  const navigation = useNavigation(); 
  const { darkMode } = useContext(DarkModeContext);

  return (
    <View style={darkMode ? styles.footer : styles.footerlight}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chatovi')}> 
        <ImageBackground
          source={darkMode ? chats : chatss}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}> 
        <ImageBackground
          source={darkMode ? settings: settingss}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'black',
    height: hp('7%'),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35
  },
  footerlight: {
    backgroundColor: 'white',
    height: hp('7%'),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35
  },
  button: {
    width: hp('4.5%'),
    height: hp('4.5%'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default Footer