import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        {otherUser && (
          <>
            <Image source={{ uri: otherUser.photoURL }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>
                {otherUser.firstName} {otherUser.lastName}
              </Text>
            </View>
          </>
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
    backgroundColor: '#111',
    padding: 12,
    paddingTop: 50,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatBody: {
    flex: 1,
    padding: 20,
  },
});