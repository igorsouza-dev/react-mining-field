import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import params from './params';
import MineField from './components/MineField';
import { 
  createMinedBoard,
  cloneBoard,
  openField,
  hasExploded,
  isGameWon,
  showMines,
  toggleFlag
} from './functions';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }
  getMinesAmount = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    const minesAmount = Math.ceil(rows * columns * params.difficultLevel);
    // return createMinedBoard(rows, columns, minesAmount);
    return minesAmount;
  }
  createState = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return {
      board: createMinedBoard(rows, columns, this.getMinesAmount()),
      gameWon: false,
      gameLost: false
    }
  }
  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const gameLost = hasExploded(board);
    const gameWon = isGameWon(board);

    if (gameLost) {
      showMines(board);
      Alert.alert('Game Over!', 'You lost!')
    }
    if (gameWon) {
      Alert.alert('Congratulations!', 'You won!');
    }

    this.setState({ board, gameWon, gameLost });
  }
  onFlag = (row, column) => {
    const board = cloneBoard(this.state.board);
    toggleFlag(board, row, column);

    const gameWon = isGameWon(board);
    
    if (gameWon) {
      Alert.alert('Congratulations!', 'You won!');
    }

    this.setState({ board, gameWon });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to the game!</Text>
        <Text style={styles.instructions}>Touch the squares to uncover mines. Long touch to flag the square.</Text>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} onFlag={this.onFlag} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    fontWeight: 'bold'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#aaa',
  }
});
