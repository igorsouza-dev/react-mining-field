import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import params from '../params';
import Mine from './Mine';
import Flag from './Flag';

export default props => {
    const { mined, opened, nearMines, exploded, flagged } = props;

    const styleField = [styles.field];

    if (opened) styleField.push(styles.opened);
    if (exploded) styleField.push(styles.exploded);
    if (flagged) styleField.push(styles.flagged);
    if (!opened && !exploded) styleField.push(styles.regular);

    let color = null;
    if (nearMines > 0) {
        
        if (nearMines == 1) color = params.color1mines;
        if (nearMines == 2) color = params.color2mines;
        if (nearMines > 2 && nearMines < 6)  color = params.color3to5mines;
        if (nearMines >= 6) color = params.colorMoreThan5mines;
        
    }

    return (
        <View style={styleField}>
            {!mined && opened && nearMines > 0 ? 
            <Text style={[styles.label, {color: color}]}>{nearMines}</Text> : false}

            {mined && opened ? <Mine /> : false}

            {!opened && flagged ? <Flag /> : false }
        </View>
    );
}
const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize,
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#ccc',
        borderTopColor: '#ccc',
        borderRightColor: '#333',
        borderBottomColor: '#333',
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red'
    },
    flagged: {

    }
})