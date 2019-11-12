import React from 'react';

import BookListComponent from '../../booklist/BookList';

import {
    View,
    StyleSheet,
} from 'react-native';

import { 
    Searchbar,
    Text,
} from 'react-native-paper';

import Search from '../../../api/search';
import Book from '../../../models/Book';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center',
    },
    searchbox:{
        margin: 20,
        backgroundColor:'#fff'
    },
    underText:{
        color: '#000',
        marginLeft: 20,
        marginTop: 8,
        marginRight: 20,
        fontSize: 16
    }
  });


const searchTip = "Search with book name, author name, or ISBN";  

export default class MainActivity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchString: '',
            searching: false,
            searchResult: []
        };
    }

    runSearch = () => {
        Search({
            query: this.state.searchString,
            count: 25,
            sort: 'def',
            sortmode: 'ASC',
            column: 'def',
            mirror: 'http://gen.lib.rus.ec'
        }, (response) => {       
            this.setState({searchResult: response});
        });
    };

    createBookList = () => {
        let books = [];
        for (let i = 0; i < this.state.searchResult.length; ++i){
            books.push(new Book(this.state.searchResult[i]));
        }
        return books;
    }

    render(){
        if (this.state.searchResult.length > 0){
            return(
                <BookListComponent
                    bookList={this.createBookList()} />
            )
        }
        return(
            <View
             style={styles.container}>
                <Searchbar
                    style={styles.searchbox}
                    placeholder='Search for book'
                    onChangeText={searchString => { this.setState({ searchString }); }}
                    value={this.state.searchString}
                    onSubmitEditing={this.runSearch}
                />            
                <Text
                    style={styles.underText}
                >{searchTip}</Text>
            </View>
        )
    }
}