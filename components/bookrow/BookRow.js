import React from 'react';

import {
    Surface,
    Text,
} from 'react-native-paper';

import {
    View,
} from 'react-native';

import styles from './style';

export default class BookRowComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book: props.book,
        };
    }

    render(){
        return(
            <View style={styles.body}>                
                <Surface style={styles.bookRowCard}>
                    <Text style={styles.titleText}>{this.state.book.title}</Text>
                    <Text style={styles.subTitleText}>{this.state.book.author}</Text>
                    <Text>Language:{'  '}
                        <Text style={styles.infoText}>{this.state.book.language}</Text>
                    </Text>
                    <Text>Year: {'  '}
                        <Text style={styles.infoText}>{this.state.book.year}</Text>
                    </Text>
                    <Text>Number of pages: {'  '}
                        <Text style={styles.infoText}>{this.state.book.pageno}</Text>
                    </Text>
                    <Text>Format: {'  '}
                        <Text style={styles.infoText}>{this.state.book.file_type}</Text>
                    </Text>
                </Surface>
            </View>
        )
    }
}