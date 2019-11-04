import React from 'react';

import {
    View,
    StyleSheet,
} from 'react-native';

import { 
    Searchbar,
    Text,
} from 'react-native-paper';

import Search from './search';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignContent: 'center',
        justifyContent: 'center',
    },
    searchbox:{
        margin: 20,
        backgroundColor:'#333333'
    },
    underText:{
        color: '#ffffff',
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
            console.log(response);
        });
    };

    render(){
        return(
            <View
             style={styles.container}>
                <Searchbar
                    style={styles.searchbox}
                    placeholder={searchTip}
                    onChangeText={searchString => { this.setState({ searchString }); }}
                    value={this.state.searchString}
                    onSubmitEditing={this.runSearch}
                />
                <Text
                    style={styles.underText}
                >{searchTip}</Text>
            </View>
        );
    }
}