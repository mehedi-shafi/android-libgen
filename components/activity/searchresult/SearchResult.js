import React from 'react';
import { Appbar } from 'react-native-paper';
import { View, } from 'react-native';
import Styles from './styles';
import BookList from '../../booklist/BookList';
import { getSampleBookList } from '../../../models/Book';

export default class SearchResultActivity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookList: props.navigation.getParam('bookList')
        };    
    }

    render(){
        return (
            <View style={Styles.fullScreen}>
                <BookList
                    bookList={this.state.bookList} />
            </View>
        );
    }
}