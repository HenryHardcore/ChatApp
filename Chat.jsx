import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase/firebase';
import { Ionicons } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
} from 'react-native';

export default function Chat() {
  const navigation = useNavigation();
  const route = useRoute();
  const { chatId } = route.params;
  const [message, setMessage] = useState('');

  const currentUser = auth.currentUser;
  const [otherUser, setOtherUser] = useState(null);

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

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="height"
    keyboardVerticalOffset={0}
  >
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={35} color="white" />
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
              <Text style={styles.name}>
                {otherUser.firstName} {otherUser.lastName}
              </Text>
              <Text style={styles.status}>Online</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.chatBody}>
        <Text style={{ color: 'gray' }}>Chat screen here</Text>
      </View>

      <View style={styles.chatInputContainer}>
        <TextInput
          style={styles.chatInput}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
          returnKeyType="send"
          onSubmitEditing={() => {
            if (message.trim()) {
              console.log("Sending:", message);
              setMessage('');
              Keyboard.dismiss();
            }
          }}
        />
        <TouchableOpacity
          onPress={() => {
            if (message.trim()) {
              console.log("Sending:", message);
              setMessage('');
              Keyboard.dismiss();
            }
          }}
          style={styles.sendButton}
        >
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
  status: {
    color: '#aaa',
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
  chatInput: {
    flex: 1,
    backgroundColor: '#111',
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
});