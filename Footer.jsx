import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native"
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import menu from './fotografije/menu.png'
import chats from "./fotografije/chats.png"

function Footer() {
  return(
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button}>
        <ImageBackground
          source={chats}
          style={styles.image}
        >
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <ImageBackground
          source={menu}
          style={styles.image}
        >
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'red',
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