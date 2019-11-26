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
    Linking,
    } from 'expo';


export default class BookCardComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book: props.book
        };
    }

    startDownload = () => {
        Linking.openURL(this.state.book.direct_url);
    }

    startTorrentDownload = () => {
        Linking.openURL(this.state.book.torrent_url);
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
                        <Button onPress={this.startTorrentDownload}>Torrent</Button>
                    </Card.Actions>
                </Card.Content>
            </Card>
        )
    }
}