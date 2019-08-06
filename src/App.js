import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import params from './params';
import Field from './components/Field';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Starting the game!</Text>
      <Text style={styles.instructions}>
        Grid size: {params.getRowsAmount()} X {params.getColumnsAmount()}
      </Text>
      <Field />
      <Field opened/>
    
      <Field opened nearMines={1}/>
      <Field opened nearMines={2}/>
      <Field opened nearMines={3}/>
      <Field opened nearMines={4}/>
      <Field opened nearMines={5}/>
      <Field opened nearMines={6}/>
      <Field opened nearMines={7}/>
      <Field mined/>
      <Field mined opened/>
      <Field mined opened exploded/>
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
    fontWeight: 'bold'
  }
});
