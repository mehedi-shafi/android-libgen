import React from 'react';
import {
    Paper,
    Card,
    Button,
    Text,
    Paragraph,
} from 'react-native-paper';

import Styles from './styles';
import {
    FileSystem,
    } from 'expo';


export default class BookCardComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book: props.book
        };
    }

    startDownload = () => {
        // const saveLocation = ${FileSystem}
    }

    render(){
        return(
            <Card >
                <Text style={Styles.titleText}>{this.state.book.title}</Text>
                <Text style={Styles.subTitleText}>{this.state.book.author}</Text>
                <Card.Content>
                    <Paragraph>
                        {this.state.book.description}
                    </Paragraph>
                    <Card.Cover source={{ uri: this.state.book.thumb_url}} />
                    <Card.Actions>
                        <Button onPress={this.startDownload}>Download</Button> 
                        <Button>Torrent</Button>
                    </Card.Actions>
                </Card.Content>
            </Card>
        )
    }
}