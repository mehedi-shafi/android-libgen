import React from 'react';
import {
    Paper,
    Card,
    Button,
    Title,
    Paragraph,
} from 'react-native-paper';


export default class BookCardComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: props.title,
            author: props.author,
            description: props.description
        }
    }

    render(){
        return(
            <Card>
                <Card.Title title={this.state.title}
                    subtitle={this.state.author} />
                <Card.Content>
                    <Paragraph>
                        {this.state.description}
                    </Paragraph>
                    <Card.Cover sourc={{ uri: 'https://picsum.photos/700'}} />
                    <Card.Actions>
                        <Button>Download</Button> 
                        <Button>Torrent</Button>
                    </Card.Actions>
                </Card.Content>
            </Card>
        )
    }
}