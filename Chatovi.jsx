import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from './DarkModeContext';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "./firebase/firebase";
import img1 from './fotografije/bjelac.jpg'; 

function Chatovi({ navigation }) {
  const { darkMode } = useContext(DarkModeContext);
  const currentUser = auth.currentUser;
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", currentUser.uid),
      orderBy("lastMessageTime", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setChats([]);
      } else {
        setChats(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={darkMode ? styles.container : styles.containerblack}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Chat", { chatId: item.id })}>
            <View style={styles.chatItem}>
              <Image source={img1} style={styles.avatar} />
              <View style={styles.chatContent}>
                <Text style={darkMode ? styles.username : styles.usernameblack}>
                  {item.name || "Unknown User"}
                </Text>
                <Text style={darkMode ? styles.message : styles.messageblack}>
                  {item.lastMessage || "No messages yet"}
                </Text>
              </View>
              <Text style={darkMode ? styles.time : styles.timeblack}>
                {item.lastMessageTime?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || ''}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={{ color: darkMode ? 'white' : 'black', textAlign: 'center', marginTop: 20 }}>
            Oops, looks like you have no chats yet 😅
          </Text>
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

export default Chatovi