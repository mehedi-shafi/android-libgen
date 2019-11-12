import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import MainActivity from './components/activity/mainactivity/MainActivity';
import BookRowComponent from './components/bookrow/BookRow';
import { SampleBook } from './models/Book';

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