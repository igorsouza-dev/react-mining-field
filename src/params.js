import { Dimensions } from 'react-native';

const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, // header area proportion
    difficultLevel: 0.1,
    color1mines: '#2a28d7',
    color2mines: '#2b520f',
    color3to5mines: '#f9060a',
    colorMoreThan5mines: '#f221a9',
    getColumnsAmount() {
        const width = Dimensions.get('window').width;
        return Math.floor(width / this.blockSize);
    },
    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height;
        const boardHeight = totalHeight * (1 - params.headerRatio);
        return Math.floor(boardHeight / this.blockSize);
    }
}

export default params;