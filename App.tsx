
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello word!</Text>
      <Text style={styles.title}>Testando meu primeiro app em react native</Text>
      <StatusBar style="auto" backgroundColor='red' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
   color: '#FFF',
  },
});
