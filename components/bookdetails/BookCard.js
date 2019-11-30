import React from 'react';
import {
    Surface,
    Text,
    Paragraph,
    Button,
    Provider,
    Portal,
    Modal,
} from 'react-native-paper';

import {
    View,
    Image,
    ScrollView,
} from 'react-native';

import ViewMoreText from 'react-native-view-more-text';

import Styles from './styles';

import {
    Linking,
    } from 'expo';

export default class BookCardComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book: props.book,
            downloadModalVisible: false,
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

    dismissModal = () => {
        this.setState({downloadModalVisible: false});
    }

    openModal = () => {
        this.setState({downloadModalVisible: true});
    }

    render(){
        return(
            <Provider
                style={Styles.activityStyle}>
                <Portal>
                    <Modal
                        visible={this.state.downloadModalVisible}
                        onDismiss={this.dismissModal}>
                           
                        </Modal>
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
                        <Button
                            mode='outlined'
                            icon='download'
                            style={Styles.downloadButton}
                            onPress={this.openModal} >
                            Download
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
                </Portal>
            </Provider>
        )
    }
}