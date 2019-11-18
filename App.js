import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// activities
import MainActivity from './components/activity/mainactivity/MainActivity';
import SearchResultActivity from './components/activity/searchresult/SearchResult';
import BookDetailsActivity from './components/activity/bookdetails/bookdetailsactivity';

const ROOT_STACK = createStackNavigator(
  {
    Home: MainActivity,
    SearchResult: SearchResultActivity,
    BookDetails: BookDetailsActivity,
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