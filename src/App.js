import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import params from './params';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Starting the game!</Text>
      <Text style={styles.instructions}>
        Grid size: {params.getRowsAmount()} X {params.getColumnsAmount()}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {

  }
});
