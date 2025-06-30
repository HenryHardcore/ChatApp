import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function Search() {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search people by username</Text>
      <TextInput
        placeholder="Type a username..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // or use dynamic theming
  },
  label: {
    color: '#fff',
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
});