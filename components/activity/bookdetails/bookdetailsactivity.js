import React from 'react';
import BookCardComponent from '../../bookdetails/BookCard';
import { View } from 'react-native';
import Styles from './styles';

export default class BookDetailsActivity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book: props.navigation.getParam('book')
        }
    }

    render(){
        return (
            <View style={Styles.fullscreen}>
                <BookCardComponent
                    book={this.state.book}/>
            </View>
        )
    }
}