import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  FlatList,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, auth } from './firebase/firebase';
import { Ionicons } from '@expo/vector-icons';
import { DarkModeContext } from './DarkModeContext';

export default function Chat() {
  const navigation = useNavigation();
  const route = useRoute();
  const { chatId } = route.params;
  const { darkMode } = useContext(DarkModeContext);
  const currentUser = auth.currentUser;

  const [message, setMessage] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const flatListRef = useRef(null);

  useEffect(() => {
    const loadChatHeader = async () => {
      const chatDoc = await getDoc(doc(db, 'chats', chatId));
      if (chatDoc.exists()) {
        const chatData = chatDoc.data();
        const otherUserId = chatData.members.find(uid => uid !== currentUser.uid);

        if (otherUserId) {
          const otherUserDoc = await getDoc(doc(db, 'users', otherUserId));
          if (otherUserDoc.exists()) {
            setOtherUser(otherUserDoc.data());
          }
        }
      }
    };
    loadChatHeader();
  }, [chatId]);

  useEffect(() => {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(30));

    const unsubscribe = onSnapshot(q, snapshot => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs.reverse());

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const messageData = {
      text: message.trim(),
      senderId: currentUser.uid,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);
      await updateDoc(doc(db, 'chats', chatId), {
        lastMessage: message.trim(),
        lastMessageTime: serverTimestamp(),
      });
      setMessage('');
      Keyboard.dismiss();
    } catch (err) {
      console.error('Send failed:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={darkMode ? styles.container : styles.containerblack}
      behavior="height"
      keyboardVerticalOffset={0}
    >
      <View style={{ flex: 1 }}>
        <View style={ darkMode ? styles.header : styles.headerblack}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={darkMode ? styles.backButton : styles.backbuttonblack}>
            <Ionicons name="arrow-back" size={35} color={darkMode ? "white" : "black"} />
          </TouchableOpacity>

          {otherUser && (
            <View style={styles.userInfo}>
              <Image
                source={
                  otherUser.photoURL
                    ? { uri: otherUser.photoURL }
                    : require('./fotografije/avatar.jpg')
                }
                style={styles.avatar}
              />
              <View>
                <Text style={darkMode ? styles.name : styles.nameblack}>
                  {otherUser.firstName} {otherUser.lastName}
                </Text>
                <Text style={darkMode ? styles.status : styles.statusblack}>Online</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.chatBody}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const isMe = item.senderId === currentUser.uid;
              return (
                <View style={[styles.messageBubble, isMe ? styles.myMessage : styles.theirMessage]}>
                  <Text style={{ color: 'white' }}>{item.text}</Text>
                </View>
              );
            }}
          />
        </View>

        <View style={darkMode ? styles.chatInputContainer : styles.chatblackinput}>
          <TextInput
            style={darkMode ? styles.chatInput : styles.chatinputblack}
            placeholder="Type a message..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  containerblack: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#000',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  headerblack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  backButton: {
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  nameblack: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  status: {
    color: '#aaa',
    fontSize: 16,
  },
  statusblack: {
    color: '#aaak',
    fontSize: 16,
  },
  chatBody: {
    flex: 1,
    padding: 20,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    paddingBottom: 35,
    borderTopColor: '#333',
    backgroundColor: '#000',
  },
  chatblackinput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    paddingBottom: 35,
    borderTopColor: '#333',
    backgroundColor: 'white',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#111',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 16,
  },
  chatinputblack: {
    flex: 1,
    backgroundColor: '#eeeeee',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 25,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 15,
    maxWidth: '75%',
  },
  myMessage: {
    backgroundColor: '#1e90ff',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
  },
});