import React from 'react';
import { FlatList, View } from 'react-native';

import BookRowComponent from '../bookrow/BookRow';
import styles from './styles';

import {
    Surface,
    List,
} from 'react-native-paper';

export default class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookList: props.bookList
        }
    }

    render(){
        return (
            <View style={styles.fullScreen}>
                <FlatList
                data={this.state.bookList}
                renderItem={
                    ({item}) => <BookRowComponent book={item}/>
                }
                keyExtractor={
                    (item, index) => index.toString()}/>
            </View>
        )
    }
}