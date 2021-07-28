import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// activities
import MainActivity from './components/activity/mainactivity';
import SearchResultActivity from './components/activity/searchresult';
import BookDetailsActivity from './components/activity/bookdetails';
import Preference from './components/activity/preference';

const ROOT_STACK = createStackNavigator(
  {
    Home: {
      screen: MainActivity,
      navigationOptions: {
        header: null
      }
    },
    SearchResult: SearchResultActivity,
    BookDetails: BookDetailsActivity,
    Preference: {
      screen: Preference,
      navigationOptions: {
        header: null,
      }
    }
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