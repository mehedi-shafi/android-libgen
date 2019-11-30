import React from 'react';
import BookList from '../../booklist/BookList';

export default class SearchResultActivity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookList: props.navigation.getParam('bookList')
        };    
    }

    render(){
        return (
            <BookList
                bookList={this.state.bookList}
                navigation={this.props.navigation} />
        );
    }
}