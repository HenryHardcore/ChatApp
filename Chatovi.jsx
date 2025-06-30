import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import img1 from './fotografije/bjelac.jpg';
import img2 from './fotografije/bjelac2.webp';
import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

function Chatovi() {
  const niz = [
    {
      profileImg: img1,
      username: 'Katarina Stanojlovic',
      lastMessage: 'vazi vazi',
      lastMessageSender: 'You:',
      timeOfLastMessage: '3:55 PM',
    },
    {
      profileImg: img2,
      username: 'Manojlo Stanarevic',
      lastMessage: 'vaziiii',
      lastMessageSender: '',
      timeOfLastMessage: 'Yesterday',
    },
  ];
  const { darkMode } = useContext(DarkModeContext);

  return (
    <View style={darkMode ? styles.container : styles.containerblack}>
      <FlatList
        data={niz}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <Image source={item.profileImg} style={styles.avatar} />
            <View style={styles.chatContent}>
              <Text style={darkMode ? styles.username : styles.usernameblack}>{item.username}</Text>
              <Text style={ darkMode ? styles.message : styles.messageblack}>
                {item.lastMessageSender && (
                  <Text style={darkMode ? styles.senderLabel : styles.senderblack}>{item.lastMessageSender} </Text>
                )}
                {item.lastMessage}
              </Text>
            </View>
            <Text style={darkMode ? styles.time : styles.timeblack}>{item.timeOfLastMessage}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  containerblack: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  usernameblack: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  message: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 2,
  },
  messageblack: {
    color: '#42B2B2B',
    fontSize: 16,
    marginTop: 2,
  },
  senderLabel: {
    color: '#aaa',
    fontWeight: 'bold',
  },
  senderblack: {
    color: '#2B2B2B',
    fontWeight: 'bold',
  },
  time: {
    position: 'absolute',
    right: 0,
    top: 10,
    color: '#888',
    fontSize: 16,
  },
  timeblack: {
    position: 'absolute',
    right: 0,
    top: 10,
    color: '#2F2F2F',
    fontSize: 16,
  }
});

export default Chatovi;