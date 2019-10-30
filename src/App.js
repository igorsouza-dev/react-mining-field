import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import params from './params';
import MineField from './components/MineField';
import Header from './components/Header';
import LevelSelection from './screens/LevelSelection';

import {
  createMinedBoard,
  cloneBoard,
  openField,
  hasExploded,
  isGameWon,
  showMines,
  toggleFlag,
  usedFlags
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
    return minesAmount;
  }
  createState = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return {
      board: createMinedBoard(rows, columns, this.getMinesAmount()),
      gameWon: false,
      gameLost: false,
      showLevelSelection: false,
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
  onLevelSelected = level => {
    params.difficultLevel = level;
    this.setState(this.createState());
  }
  onFlagPress = () => {
    this.setState({ showLevelSelection: true });
  }
  closeLevelSelection = () => {
    this.setState({ showLevelSelection: false });
  }
  render() {
    return (
      <View style={styles.container}>
        <LevelSelection
          isVisible={this.state.showLevelSelection}
          onCancel={this.closeLevelSelection}
          onLevelSelected={this.onLevelSelected} />
        <Header
          flagsLeft={this.getMinesAmount() - usedFlags(this.state.board)}
          onNewGamePress={() => this.setState(this.createState())}
          onFlagPress={() => this.onFlagPress()} />
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
