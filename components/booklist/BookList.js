import React from 'react';
import { FlatList, View } from 'react-native';

import BookRowComponent from '../bookrow/BookRow';
import styles from './styles';
import BookCardComponent from '../bookdetails/BookCard';

import {
    Modal,
    Provider,
    Portal,
} from 'react-native-paper';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';

export default class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookList: props.bookList,
        }
    }

    openBookDetails = (item) => {
        this.props.navigation.navigate('BookDetails', {
            'book': item});
    }

    render(){
        return (
            <FlatList
                data={this.state.bookList}
                renderItem={
                    ({item}) => 
                        <TouchableWithoutFeedback onPress={() => {this.openBookDetails(item);}}>
                            <BookRowComponent book={item}/>
                        </TouchableWithoutFeedback>                            
                }
                keyExtractor={
                    (item, index) => index.toString()}/>                    
        )
    }
}