import React from 'react';

import {
    Surface,
    Text,
    Button,
    Title,
    Subheading,   
} from 'react-native-paper';

import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    body:{
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',  
    },
    bookRowCard:{
        height: 250,
        margin: 20,
        padding: 10,
        elevation: 5,
        justifyContent: 'center'
    },
    titleText:{
        textAlign: 'justify'
    }
});

export default class BookRowComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book:   props.book
        };
    }

    render(){
        return(
            <Surface style={style.body}>
                <Surface style={style.bookRowCard}>
                    <Title style={style.titleText}>{this.state.book.title}</Title>
                    <Subheading>{this.state.book.author}</Subheading>
                    <Text>Language: {this.state.book.language}</Text>
                    <Text>Year: {this.state.book.year}</Text>
                    <Text>Number of pages: {this.state.book.pageno}</Text>
                    <Text>Format: {this.state.book.file_type}</Text>
                </Surface>
            </Surface>
        )
    }
}