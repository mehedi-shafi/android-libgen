import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import BookRowComponent from '../bookrow/BookRow';

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
            <FlatList
                data={this.state.bookList}
                renderItem={({item}) => <BookRowComponent book={item}/>}>
            </FlatList>
        )
    }
}