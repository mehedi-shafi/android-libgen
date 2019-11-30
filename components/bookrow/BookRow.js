import React from 'react';

import {
    Surface,
    Provider,
    Text,
    Button,
    Title,
    Subheading,
    Portal,
    Modal  
} from 'react-native-paper';

import styles from './style';
import BookCardComponent from '../bookdetails/BookCard';

export default class BookRowComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book: props.book,
            detailsVisible: false
        };
    }

    render(){
        return(
            <Surface style={styles.body}>                
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
            </Surface>
        )
    }
}