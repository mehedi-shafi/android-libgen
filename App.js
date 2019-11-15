import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStckNavigator, createStackNavigator } from 'react-navigation-stack';

// activities
import MainActivity from './components/activity/mainactivity/MainActivity';
import SearchResultActivity from './components/activity/searchresult/SearchResult';

const ROOT_STACK = createStackNavigator(
  {
    Home: MainActivity,
    SearchResult: SearchResultActivity
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(ROOT_STACK);

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <AppContainer />
    );
  }
}