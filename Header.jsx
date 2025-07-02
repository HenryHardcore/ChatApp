import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import img from "./fotografije/ikon.png";
import imgg from './fotografije/edit-black.png'
import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

function Header() {
  const navigation = useNavigation();
  const { darkMode } = useContext(DarkModeContext);

  const goToSearch = () => {
    navigation.replace('Search'); 
  };

  return (
    <View style={darkMode ? styles.header: styles.headerlight}>
      <Text style={darkMode ? styles.text : styles.dark}>Mesindžer</Text>
      <TouchableOpacity style={styles.button} onPress={goToSearch}>
        <ImageBackground
          source={darkMode ? img : imgg}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    height: hp('7%'),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerlight: {
    backgroundColor: 'white',
    height: hp('7%'),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  text: {
    color: 'white',
    fontSize: hp('7%') * 0.6,
    fontWeight: 'bold',
  },
  dark: {
    color: 'black',
    fontSize: hp('7%') * 0.6,
    fontWeight: 'bold',
  },
  button: {
    width: 40,
    height: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default Header;