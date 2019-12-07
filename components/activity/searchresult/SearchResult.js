import React from 'react';
import BookList from '../../booklist/BookList';

export default class SearchResultActivity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookList: props.navigation.getParam('bookList'),
            searchParam: props.navigation.getParam('searchParam')
        };    
    }

    render(){
        return (
            <BookList
                bookList={this.state.bookList}
                searchParam={this.state.searchParam}
                navigation={this.props.navigation} />
        );
    }
}