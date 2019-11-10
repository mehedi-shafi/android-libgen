import React from 'react';
import {
    Surface,
    Text,
    Button,    
} from 'react-native-paper';

export default class BookRowComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: props.title,
            author: props.author,
            year: props.year,
            pageno: props.pageno,
            format: props.format,
            thumbnail: props.thumbnail
        };
    }

    render(){
        
    }
}