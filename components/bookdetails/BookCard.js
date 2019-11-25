import React from 'react';
import {
    Paper,
    Card,
    Button,
    Text,
    Paragraph,
} from 'react-native-paper';
import RNBackgroundDownloader from 'react-native-background-downloader';

import Styles from './styles';

export default class BookCardComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book: props.book
        };
    }

    startDownload = () => {
        let task = RNBackgroundDownloader.download({
            id: this.state.book.id,
            url: this.state.book.direct_url,
            destination: `${RNBackgroundDownloader.directories.documents}/${this.state.book.title}.${this.state.book.file_type}`
        }).begin((expectedBytes) => {
            console.log(`Going to download ${expectedBytes} bytes!`);
        }).progress((percent) => {
            console.log(`Downloaded: ${percent * 100}%`);
        }).done(() => {
            console.log('Download is done!');
        }).error((error) => {
            console.log('Download canceled due to error: ', error);
        });
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