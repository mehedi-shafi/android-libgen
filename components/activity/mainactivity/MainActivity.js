import React from 'react';

import CONFIG from '../../../config';

import {
    View,
    StyleSheet
} from 'react-native';

import { 
    Searchbar,
    Text,
} from 'react-native-paper';

// import FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

import Search from '../../../api/search';
import Book from '../../../models/Book';
import styles from './styles';

const searchTip = "Search with book name, author name, or ISBN";  

export default class MainActivity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchString: '',
            searching: false,
            searchResult: []
        };    
        this.requestWriteStoragePermission.bind(this);
        this.requestWriteStoragePermission()
            .then((res) => {
                console.log('Permission granted');
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    runSearch = () => {
        Search({
            query: this.state.searchString,
            count: 25,
            sort: 'def',
            sortmode: 'ASC',
            column: 'def',
            mirror: CONFIG.baseUrl,
        }, (response) => {       
            this.setState({searchResult: response});
            this.createBookList();
            
        });
    };

    async requestWriteStoragePermission () {
        return await Permissions.askAsync(Permissions.WRITE_EXTERNAL_STORAGE);
        const { status, permissions } = await Permissions.askAsync(Permissions.WRITE_EXTERNAL_STORAGE);
        if (status === 'granted') {
          return {'granted': status};
        } else {
          throw new Error('Storage permission not granted');
        }
    }

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
            </View>
        )
    }
}