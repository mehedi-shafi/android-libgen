import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import MainActivity from './MainActivity';
import BookRowComponent from './BookRow';
import {Book, SampleBook} from './Book';

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      // <MainActivity />
      <BookRowComponent
        book={SampleBook} 
      />
    );
  }
}