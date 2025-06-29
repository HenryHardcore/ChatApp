import { View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'; 
import settings from './fotografije/settings.png'
import chats from "./fotografije/chats.png"

function Footer() {
  const navigation = useNavigation(); 

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chatovi')}> 
        <ImageBackground
          source={chats}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}> 
        <ImageBackground
          source={settings}
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