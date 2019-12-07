import React from 'react';
import {
    Surface,
    Text,
    Paragraph,
    Button,
    Chip,
} from 'react-native-paper';

import {
    View,
    Image,
    ScrollView,
    Linking,
} from 'react-native';

import ViewMoreText from 'react-native-view-more-text';

import Styles from './styles';

export default class BookCardComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book: props.book,
        };
    }

    startDownload = () => {
        Linking.openURL(this.state.book.direct_url);
    }

    startTorrentDownload = () => {
        Linking.openURL(this.state.book.torrent_url);
    }

    renderViewMoreOnPress = (onPress) => {
        return (
            <View style={Styles.expandableTextView}>
                <Text                
                    style={Styles.expandableText}
                    onPress={onPress}>View more ...</Text>
            </View>
        );
    }

    renderViewLessOnPress = (onPress) => {
        return (
            <View style={Styles.expandableTextView}>
                <Text                
                    style={Styles.expandableText}
                    onPress={onPress}>View less ...</Text>
            </View>
        )
    }

    render(){
        return(
            <View
                style={Styles.activityStyle}>
                <View
                    style={Styles.viewHolderCenter}>
                    <Surface
                        style={Styles.bookThumbNailHolder}>
                        <Image
                            style={Styles.bookThumbNail}
                            source={{uri: this.state.book.thumb_url}} />
                    </Surface>
                </View>
                <View
                    style={Styles.downloadSection}>
                    <Chip
                        textStyle={{textAlign: 'center'}} 
                        style={Styles.chipStyle}
                        mode='outlined'>
                            {this.state.book.file_type}
                    </Chip>
                    <Chip
                        textStyle={{textAlign: 'center'}}
                        style={Styles.chipStyle}
                        mode='outlined'>{this.state.book.fileSize}
                    </Chip>
                </View>
                <View
                    style={Styles.downloadSection}>                    
                    <Button
                        mode='outlined'
                        icon='download'
                        style={Styles.downloadButton}
                        onPress={this.startDownload} >
                        Download
                    </Button>
                    <Button
                        mode='outlined'
                        style={Styles.downloadButton}
                        icon={require('../../assets/magnet.png')}
                        onPress={this.startTorrentDownload}>
                        Torrent
                    </Button>
                </View>
                <View>
                    <Text
                        style={Styles.titleText}>
                            {this.state.book.title}
                    </Text>
                    <Text style={{textAlign: 'center'}}>By:{'  '}
                        <Text
                            style={Styles.subTitleText}>
                            {this.state.book.author}
                        </Text>
                    </Text>
                </View>
                <ScrollView
                    nestedScrollEnabled={true}
                    style={Styles.bookDescription}>
                    <ViewMoreText
                        numberOfLines={4}
                        renderViewLess={this.renderViewLessOnPress}
                        renderViewMore={this.renderViewMoreOnPress}
                        textStyle={{textAlign: 'justify', marginLeft: 10, marginRight: 10}}>                                                
                        <Paragraph>{this.state.book.description}</Paragraph>
                    </ViewMoreText>
                </ScrollView>
            </View>
        )
    }
}