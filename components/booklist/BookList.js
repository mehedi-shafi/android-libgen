import React from 'react';
import { FlatList, View } from 'react-native';

import BookRowComponent from '../bookrow/BookRow';
import styles from './styles';
import BookCardComponent from '../bookdetails/BookCard';

import Search from '../../api/search';

import {
    Modal,
    Provider,
    Portal,
    ActivityIndicator,
} from 'react-native-paper';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';

export default class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookList: props.bookList,
            nextPage: 2,
            currentListLoc: 0,
            searchParam: props.searchParam,
            errorSnack: false,
            loading: false
        }
    }

    fetchMoreBooks = () => {
        this.setState({loading: true});        
        let opts = this.state.searchParam;
        opts['pageNo'] = this.state.nextPage;
        Search(opts, (response, error) => {
            if (error){
                this.setState({errorSnack: true});
            }
            else{
                let tempList = this.state.bookList;
                let tempNextPage = this.state.nextPage + 1;
                tempList.push(...response);
                this.setState({bookList: tempList, loading: false, nextPage: tempNextPage});                
            }
        })
    }

    openBookDetails = (item) => {
        this.props.navigation.navigate('BookDetails', {
            'book': item});
    }
    
    renderFooter = () =>{
        if (!this.state.loading) return null;
        return (
            <ActivityIndicator animating={true} size='small' />
        )
    }

    render(){
        return (
            <FlatList
                data={this.state.bookList}
                renderItem={
                    ({item}) => 
                        <TouchableWithoutFeedback onPress={() => {this.openBookDetails(item);}}>
                            <BookRowComponent book={item}/>
                        </TouchableWithoutFeedback>                            
                }
                keyExtractor={
                    (item, index) => index.toString()}
                ListFooterComponent={this.renderFooter}
                onEndReached={this.fetchMoreBooks}
                onEndReachedThreshold={3}/>                    
        )
    }
}