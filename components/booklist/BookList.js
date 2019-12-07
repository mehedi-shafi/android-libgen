import React from 'react';
import { 
    FlatList,
    TouchableOpacity
} from 'react-native';

import BookRowComponent from '../bookrow/BookRow';
import styles from './styles';

import Search from '../../api/search';

import {
    ActivityIndicator,
    Snackbar
} from 'react-native-paper';

export default class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookList: props.bookList,
            nextPage: 2,
            currentListLoc: 0,
            searchParam: props.searchParam,
            errorSnack: false,
            loading: false,
            noMore: false
        }
    }

    openBookDetails = (item) => {
        console.log(`Opening book ${item.title}`);
        this.props.navigation.navigate('BookDetails', {
            'book': item});
    }

    fetchMoreBooks = () => {
        if (this.state.noMore) return null;
        this.setState({loading: true});       
        let opts = this.state.searchParam;
        opts['pageNo'] = this.state.nextPage;
        Search(opts, (response, error) => {
            if (error){
                this.setState({errorSnack: true, loading: false, noMore: true});
            }
            else{
                let tempList = this.state.bookList;
                let tempNextPage = this.state.nextPage + 1;
                tempList.push(...response);
                this.setState({bookList: tempList, loading: false, nextPage: tempNextPage});                
            }
        })
    }
    
    renderFooter = () =>{
        if (!this.state.loading && !this.state.errorSnack) return null;
        if (this.state.errorSnack){
            return (
                <Snackbar
                    visible={this.state.errorSnack}
                    onDismiss={() => this.setState({ errorSnack: false })}>
                    No more book loaded.
                </Snackbar>
            )
        }
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
                        <TouchableOpacity 
                            onPress={() => {
                                this.openBookDetails(item);
                            }}>
                            <BookRowComponent book={item}/>
                        </TouchableOpacity>
                }
                keyExtractor={
                    (item, index) => index.toString()}
                renderFooter={this.renderFooter}
                onEndReached={this.fetchMoreBooks}
                onEndReachedThreshold={3}/>                    
        )
    }
}