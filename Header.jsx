import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDPas as wp } from "react-native-responsive-screen";
import img from "./fotografije/ikon.png"



function Header() {
  return(
  <View style={styles.header}>
    <Text style={styles.text}>Mesindžer
      
    </Text>
    <TouchableOpacity style={styles.button}>
      <ImageBackground
        source={img}
        style={styles.image}
      >
      </ImageBackground>
    </TouchableOpacity>
  </View>)
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    height: hp('7%'),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  text: {
    fontSize:  hp('7%') * 0.6,
    color: 'white',
    flexDirection: 'row'
  },
  button: {
    width: hp('4.5%'),
    height: hp('4.5%'),
  },
  image: {
    width: '100%',
    height: '100%',
  }
})

export default Header
