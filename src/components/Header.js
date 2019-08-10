import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Flag from './Flag';

export default props => 
    <View style={styles.container}>
        <View style={styles.flagContainer}>
            <TouchableOpacity onPress={props.onFlagPress} style={styles.flagButton}>
                <Flag bigger></Flag>
            </TouchableOpacity>
            <Text style={styles.flagsLeft}>= {props.flagsLeft}</Text>
        </View>
        <TouchableOpacity style={styles.newGameButton} onPress={props.onNewGamePress}>
            <Text style={styles.newGameButtonLabel}>New Game</Text>
        </TouchableOpacity>
    </View>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    flagButton: {
        marginTop: 10,
        minWidth: 30,
    },
    flagsLeft: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20,
    },
    flagContainer: {
        flexDirection: 'row',
    },
    newGameButton: {
        backgroundColor: '#999',
        padding: 5,
    },
    newGameButtonLabel: {
        fontSize: 20,
        color: '#ddd',
        fontWeight: 'bold',
    }
});