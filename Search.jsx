import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { DarkModeContext } from './DarkModeContext';
import { auth, db } from './firebase/firebase';
import debounce from 'lodash.debounce';
import avatar from './fotografije/avatar.jpg'

export default function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const { darkMode } = useContext(DarkModeContext);
  const navigation = useNavigation();
  const currentUser = auth.currentUser;

  const fetchUsers = debounce(async (text) => {
    if (text.trim() === '') {
      setResults([]);
      return;
    }

    const q = query(
      collection(db, 'users'),
      where('username', '>=', text),
      where('username', '<=', text + '\uf8ff'),
      limit(10)
    );

    const snapshot = await getDocs(q);
    const users = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(user => user.id !== currentUser.uid);

    setResults(users);
  }, 300);

  const handleChange = (text) => {
    setSearch(text);
    fetchUsers(text);
  };

  const handleUserPress = async (userIdToChatWith) => {
    const chatsQuery = query(
      collection(db, 'chats'),
      where('members', 'array-contains', currentUser.uid)
    );
    const chatsSnapshot = await getDocs(chatsQuery);

    const existingChat = chatsSnapshot.docs.find(doc =>
      doc.data().members.includes(userIdToChatWith)
    );

    if (existingChat) {
      navigation.navigate('Chat', { chatId: existingChat.id });
    } else {
      const newChatRef = await addDoc(collection(db, 'chats'), {
        members: [currentUser.uid, userIdToChatWith],
        createdAt: new Date(),
        lastMessage: '',
        lastMessageTime: null
      });

      navigation.navigate('Chat', { chatId: newChatRef.id });
    }
  };

  return (
    <View style={darkMode ? styles.container : styles.containerblack}>
      <Text style={darkMode ? styles.label : styles.labelblack}>Search people by username</Text>
      <TextInput
        placeholder="Type a username..."
        value={search}
        onChangeText={handleChange}
        style={darkMode ? styles.input : styles.inputblack}
        placeholderTextColor="#aaa"
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultItem} onPress={() => handleUserPress(item.id)}>
            <Image
              source={ item.photoURL ? { uri: item.photoURL } : avatar }
              style={styles.avatar}
            />
            <View>
              <Text style={darkMode ? styles.username : styles.usernameblack}>{item.firstName} {item.lastName}</Text>
              <Text style={{ color: darkMode ? '#aaa' : '#333' }}>@{item.username}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  containerblack: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  labelblack: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    backgroundColor: '#222',
  },
  inputblack: {
    height: 50,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#000',
    backgroundColor: '#E4E4E4'
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    color: '#fff',
  },
  usernameblack: {
    fontSize: 16,
    color: '#000',
  },
});