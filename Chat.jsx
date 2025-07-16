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

export default function Chat() {
  const navigation = useNavigation();
  const route = useRoute();
  const { chatId } = route.params;

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>

        {otherUser && (
          <View style={styles.userInfo}>
            <Image
              source={
                otherUser.photoURL
                  ? { uri: otherUser.photoURL }
                  : require('./fotografije/avatar.jpg') // fallback image
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
    </View>
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
});