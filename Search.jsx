import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

export default function Search() {
  const [search, setSearch] = useState('');
  const { darkMode } = useContext(DarkModeContext);

  return (
    <View style={darkMode ? styles.container : styles.containerblack}>
      <Text style={darkMode ? styles.label : styles.labelblack}>Search people by username</Text>
      <TextInput
        placeholder="Type a username..."
        value={search}
        onChangeText={setSearch}
        style={darkMode ? styles.input : styles.inputblack}
        placeholderTextColor="#aaa"
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
    color: '#fff',
    backgroundColor: '#E4E4E4'
  }
});