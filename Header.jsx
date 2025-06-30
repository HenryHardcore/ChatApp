import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import img from "./fotografije/ikon.png";

function Header() {
  const navigation = useNavigation();

  const goToSearch = () => {
    navigation.navigate('Search'); 
  };

  return (
    <View style={styles.header}>
      <Text style={styles.text}>Mesindžer</Text>
      <TouchableOpacity style={styles.button} onPress={goToSearch}>
        <ImageBackground
          source={img}
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
  text: {
    color: 'white',
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