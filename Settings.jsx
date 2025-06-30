import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  Alert,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import avatar from './fotografije/avatar.jpg'
import darkmode from './fotografije/darkmode-white.png'
import darkmodee from './fotografije/darkmode-black.png'
import At from './fotografije/@-white.png'
import Att from './fotografije/@-black.png'
import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

export default function Settings() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [activeStatus, setActiveStatus] = useState(true);
  const [username, setUsername] = useState('manojlo123');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [avatarUri, setAvatarUri] = useState(null);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Camera access is required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setAvatarUri(imageUri); 
    }

    setAvatarModalVisible(false); 
  };

  const handlePickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Gallery access is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setAvatarUri(imageUri); 
    }

    setAvatarModalVisible(false); 
  };

  const handleUsernameChange = () => {
    setUsername(newUsername);
    setEditingUsername(false);
    setModalVisible(false);
    Alert.alert('Saved', `Username updated to "${newUsername}"`);
  };

  const handleCopyLink = () => {
    Alert.alert('Copied', `Link copied: https://yourapp.com/u/${username}`);
  };

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => setAvatarModalVisible(true)}>
          <Image source={avatarUri ? { uri: avatarUri } : avatar} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={[styles.name, darkMode && styles.darkText]}>Manojlo Stanarević</Text>
        
        <Text style={[styles.subText, darkMode && styles.darkText]}>@{username}</Text>
        
      </View>

      <View style={styles.section}>
        <View style={styles.settingRow}>
          <View style={styles.labelRow}>
            <Image source={darkMode ? darkmode : darkmodee} style={styles.ikonice} />
            <Text style={[styles.label, darkMode && styles.darkText]}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={darkMode ? '#1e90ff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={[styles.label, darkMode && styles.darkText]}>Active Status</Text>
        
          <Switch
            value={activeStatus}
            onValueChange={setActiveStatus}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={activeStatus ? '#1e90ff' : '#f4f3f4'}
          />
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.settingRow}>
            <View style={styles.labelRow}>
              <Image source={darkMode ? At : Att} style={styles.ikonice} />
              <Text style={[styles.label, darkMode && styles.darkText]}>Username</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, darkMode && styles.darkContainer]}>
            {editingUsername ? (
              <>
                <Text style={[styles.labell, darkMode && styles.lighttext]}>New Username (Username must be unique)</Text>
                <TextInput
                  style={[styles.input, darkMode && styles.darkInput]}
                  value={newUsername}
                  onChangeText={setNewUsername}
                />
                <TouchableOpacity style={styles.button} onPress={handleUsernameChange}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity onPress={() => setEditingUsername(true)}>
                  <Text style={styles.modalOption}>Edit Username</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCopyLink}>
                  <Text style={styles.modalOption}>Copy Link</Text>
                </TouchableOpacity>
              </>
            )}
            <Pressable onPress={() => {
              setModalVisible(false)
              setEditingUsername(false)
              }}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={avatarModalVisible}
        onRequestClose={() => setAvatarModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, darkMode && styles.darkContainer]}>
            <Text style={[styles.headline, darkMode && styles.lightHeadline]}>
              Change Profile Picture
            </Text>

            <TouchableOpacity onPress={handleTakePhoto}>
              <Text style={styles.modalOption}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePickFromGallery}>
              <Text style={styles.modalOption}>Choose from Gallery</Text>
            </TouchableOpacity>

            <Pressable onPress={() => setAvatarModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  labell: {
    fontSize: 16,
    color: 'black',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  ikonice: {
    width: 30,
    height: 30,
    marginRight: 15,
    resizeMode: 'contain',
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  lighttext: {
    color: 'white',
    fontSize: 16,
  },
  lightHeadline: {
    color: 'white',
    fontSize: 23,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#222',
  },
  subText: {
    fontSize: 20,
    color: '#555',
  },
  darkText: {
    color: '#eee',
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 20,
    color: 'black',
  },
  headline: {
    fontSize: 23,
    marginBottom: 8,
    color: '#222',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    color: '#000',
  },
  darkInput: {
    backgroundColor: '#222',
    color: '#eee',
    borderColor: '#555',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 12,
    color: '#1e90ff',
  },
  modalCancel: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});