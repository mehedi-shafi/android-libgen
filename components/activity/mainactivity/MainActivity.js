import React from 'react';

import CONFIG from '../../../config';

import {
    View,
    StyleSheet
} from 'react-native';

import { 
    Searchbar,
    Text,
    Snackbar,
} from 'react-native-paper';

import Search from '../../../api/search';
import Book, 
{ SampleBook } from '../../../models/Book';

import styles from './styles';

const searchTip = "Search with book name, author name, or ISBN";  

export default class MainActivity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchString: '',
            searching: false,
            searchResult: [],
            errorSnack: false,
        };
    }

    runSearch = () => {
        Search({
            query: this.state.searchString,
            count: 25,
            sort: 'def',
            sortmode: 'ASC',
            column: 'def',
            mirror: CONFIG.baseUrl,
        }, (response, error) => {
            if(error){                
                this.setState({errorSnack: true});
            }else{
                console.log(response);
                this.setState({searchResult: response});
                this.createBookList();            
            }
        });
    };

    createBookList = () => {
        let books = [];
        for (let i = 0; i < this.state.searchResult.length; ++i){
            books.push(new Book(this.state.searchResult[i]));
        }
        this.props.navigation.navigate('SearchResult', {
                'bookList': books});
    }

    render(){        
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
                <Snackbar
                    visible={this.state.errorSnack}
                    onDismiss={() => this.setState({ errorSnack: false })}>
                    Please provide a different search string.
                </Snackbar>
            </View>
        )
    }
}