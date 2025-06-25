import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import img1 from './fotografije/bjelac.jpg';
import img2 from './fotografije/bjelac2.webp';

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

  return (
    <View style={styles.container}>
      <FlatList
        data={niz}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <Image source={item.profileImg} style={styles.avatar} />
            <View style={styles.chatContent}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.message}>
                {item.lastMessageSender && (
                  <Text style={styles.senderLabel}>{item.lastMessageSender} </Text>
                )}
                {item.lastMessage}
              </Text>
            </View>
            <Text style={styles.time}>{item.timeOfLastMessage}</Text>
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
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
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
  message: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 2,
  },
  senderLabel: {
    color: '#aaa',
    fontWeight: 'bold',
  },
  time: {
    position: 'absolute',
    right: 0,
    top: 10,
    color: '#888',
    fontSize: 14,
  },
});

export default Chatovi;