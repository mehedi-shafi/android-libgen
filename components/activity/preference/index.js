import React, { useState, useEffect } from 'react';
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
    TextInput,
    Button
} from 'react-native-paper';

import styles from './styles';
import {
    makeConfig,
} from '../../../config';
import { SP_KEY_BASE_URL, SP_KEY_CDN_URL, SP_KEY_DOWNLOAD_URL, getConfig, setConfig } from '../../../services/SharedPreferences';


let Preference = (props) => {

    let [settings, setSettings] = useState({});

    let [ localStates, setLocalState ] = useState({});

    useEffect(() => {
        getConfig((config) => {
            let [baseUrl, downloadUrl, cdnUrl] = config;
            setSettings(makeConfig(baseUrl, cdnUrl, downloadUrl));
        });
    }, [])

    useEffect(() => {
        console.log('Updating local state')
        console.log(settings)
        setLocalState({
            [SP_KEY_BASE_URL]: {
                label: 'Base URL',
                value: settings.baseUrl,
                key: SP_KEY_BASE_URL,
            },
            [SP_KEY_CDN_URL] : {
                label: 'CDN URL',
                value: settings.cdnIP,
                key: SP_KEY_CDN_URL,
            },
            [SP_KEY_DOWNLOAD_URL]: {
                label: 'Download URL',
                value: settings.downloadUrl,
                key: SP_KEY_DOWNLOAD_URL
            },
        });
    }, [settings])


    let textChangeHandler = (key, value) => {
        let updatedState = {...localStates}
        updatedState[key] = {
            ...localStates[key]
        }
        updatedState[key]['value'] = value;

        setLocalState(updatedState);
    };

    let updateConfig = () => {
        setConfig(SP_KEY_BASE_URL, localStates[SP_KEY_BASE_URL].value);
        setConfig(SP_KEY_DOWNLOAD_URL, localStates[SP_KEY_DOWNLOAD_URL].value);
        setConfig(SP_KEY_CDN_URL, localStates[SP_KEY_CDN_URL].value);
        props.navigation.navigate('Home');
    }

    if (settings == {}){
        return null;
    }

    return <View
            style = { styles.container } >

            {Object.entries(localStates).map(item => 
                <TextInput
                    label={item[1].label}
                    value={item[1].value}
                    mode='outlined'
                    key={item[1].key}
                    style={styles.preferenceInput}
                    onChangeText={text => textChangeHandler(item[1].key, text)} />
            )}

            <Button
                mode='contained'
                style={styles.saveButton}
                onPress={() => updateConfig()}>
                    Save
            </Button>


        </View>

}

export default Preference;