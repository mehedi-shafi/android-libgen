import React, {useEffect, useState} from 'react';
import { 
    FlatList,
    TouchableOpacity
} from 'react-native';
import { getConfig } from '../../services/SharedPreferences';
import { makeConfig } from '../../config';

import BookRowComponent from '../bookrow/BookRow';
import styles from './styles';

import Search from '../../api/search';

import {
    ActivityIndicator,
    Snackbar
} from 'react-native-paper';

let BookList = (props) => {

    let [ state, setState ] = useState({
        bookList: props.bookList,
        nextPage: 2,
        currentListLoc: 0,
        searchParam: props.searchParam,
        errorSnack: false,
        loading: false,
        noMore: false,
        pullMore: false,
    })

    let [ setting, setSetting ] = useState({});

    useEffect(() => {
        getConfig(values => {
            let [baseUrl, downloadUrl, cdnUrl] = values;
            setSetting(makeConfig(baseUrl, cdnUrl, downloadUrl));
        })
    }, []);

    useEffect(() => {
        if (state.pullMore){
            fetchMoreBooks();
        }
    }, [state.pullMore])

    let openBookDetails = (item) => {
        console.log(`Opening book ${item.title}`);
        props.navigation.navigate('BookDetails', {
            'book': item});
    }

    let fetchMoreBooks = () => {
        if (state.noMore) return null;
        setState({
            ...state,
            loading: true,
            pullMore: false,
        }); 
        let opts = state.searchParam;
        opts['pageNo'] = state.nextPage;
        Search(setting, opts, (response, error) => {
            if (error){
                setState({
                    ...state,
                    errorSnack: true, 
                    loading: false, 
                    noMore: true
                });
            }
            else{
                let tempList = state.bookList;
                let tempNextPage = state.nextPage + 1;
                tempList.push(...response);
                setState({bookList: tempList, loading: false, nextPage: tempNextPage});                
            }
        })
    }
    
    let renderFooter = () =>{
        if (!state.loading && !state.errorSnack) return null;
        if (state.errorSnack){
            return (
                <Snackbar
                    visible={state.errorSnack}
                    onDismiss={() => setState({ errorSnack: false })}>
                    No more book loaded.
                </Snackbar>
            )
        }
        return (
            <ActivityIndicator animating={true} size='small' />
        )
    }


    return (
        <FlatList
            data={state.bookList}
            renderItem={
                ({item}) => 
                    <TouchableOpacity 
                        onPress={() => {
                            openBookDetails(item);
                        }}>
                        <BookRowComponent book={item}/>
                    </TouchableOpacity>
            }
            keyExtractor={
                (item, index) => index.toString()}
            renderFooter={renderFooter}
            onEndReached={() => setState({...state, pullMore: true})}
            onEndReachedThreshold={3}/>                    
    )

}

export default BookList;