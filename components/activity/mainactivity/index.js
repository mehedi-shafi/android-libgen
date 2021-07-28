import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Settings
} from 'react-native';

import { 
    Searchbar,
    Text,
    Snackbar,
    ActivityIndicator,
    IconButton,
} from 'react-native-paper';

import Search from '../../../api/search';
import Book, 
{ SampleBook } from '../../../models/Book';
import CONFIG, { makeConfig } from '../../../config';
import {
    SP_KEY_BASE_URL,
    SP_KEY_DOWNLOAD_URL,
    SP_KEY_CDN_URL,
    getConfig,
    setConfig
} from '../../../services/SharedPreferences'

import styles from './styles';
import config from '../../../config';

const searchTip = "Search with book name, author name, or ISBN";  

let MainActivity = (props) => {

    let [state, setState] = useState({
        searchString: '',
        searching: false,
        searchResult: [],
        errorSnack: false,
        searchParam: {
            query: '',
            count: 25,
            sort: 'def',
            sortmode: 'ASC',
            column: 'def',
        }
    });

    let [setting, setSetting] = useState(CONFIG);

    let checkDefaults = () => {
        getConfig((values) => {
            let [baseUrl, downloadUrl, cdnUrl] = values;
            let error = false;
            if (baseUrl === "null"){
                setConfig(SP_KEY_BASE_URL, CONFIG.baseUrl);
                error = true;
            }
            if (cdnUrl === "null") {
                setConfig(SP_KEY_CDN_URL, CONFIG.cdnIP);
                error = true;
            }
            if (downloadUrl === "null") {
                setConfig(SP_KEY_DOWNLOAD_URL, CONFIG.downloadUrl);
                error = true;
            }
            if (error){
                getConfig(values => {
                    let [baseUrl, downloadUrl, cdnUrl] = values;
                    setSetting(makeConfig(baseUrl, cdnUrl, downloadUrl))
                })
            }
            else{
                setSetting(makeConfig(baseUrl, cdnUrl, downloadUrl));
            }
        });
    }   

    useEffect(() => {
        checkDefaults();
    }, [])

    useEffect(() => {
        setState({
            ...state,        
            searchParam: {
                ...state.searchParam,
                mirror: setting.baseUrl
            }
        });
    }, [setting]);
    

    let runSearch = (props) => {
        setState({...state, searching: true});

        Search(setting, state.searchParam, (response, error) => {        
            if(error){                
                setState({...state, errorSnack: true, searching: false});
            }else{
                setState({
                    ...state, 
                    searchResult: response, 
                    searching: false,
                });
            }
        });
    };

    useEffect(() => {
        let books = [];
        for (let i = 0; i < state.searchResult.length; ++i){
            books.push(new Book(state.searchResult[i]));
        }
        if (books.length > 0){
            props.navigation.navigate('SearchResult', {
                    'bookList': books,
                    'searchParam': state.searchParam});
        }
    }, [state.searchResult]);
    

    renderloading = () => {
        if (state.searching){
            return (
                <ActivityIndicator 
                    animating={true} 
                    size='large'
                    style={styles.activityIndicatorStyle} />
            )
        }else{
            return null;
        }
    }

    let searchInputChange = (searchString) => {
        setState({
            ...state,
            searchString: searchString,
            searchParam: {
                ...state.searchParam,
                query: searchString,                
            }
        });
    }
    
    return(
        <View
            style={styles.container}>
            <Searchbar
                style={styles.searchbox}
                placeholder='Search for book'
                onChangeText={searchString => { searchInputChange(searchString); }}
                value={state.searchString}
                onSubmitEditing={runSearch}
            />            
            <Text
                style={styles.underText}
            >{searchTip}</Text>
            {renderloading()}
            
            <Snackbar
                visible={state.errorSnack}
                onDismiss={() => setState({ errorSnack: false })}>
                Please provide a different search string.
            </Snackbar>
            <IconButton
                style={styles.preferenceButton}
                icon="settings"
                size={40}
                color="#264653"
                onPress={() => props.navigation.navigate('Preference')} />
        </View>
    )    
}

export default MainActivity;