import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import {persistStore} from 'redux-persist'
import { Provider, connect } from 'react-redux';

import reducers from './utils/reducers'
import factory from './utils/store'

import Navigation from './containers/Navigation'

var store = factory(reducers);

const ConnectedRouter = connect()(Navigation);

class Les1 extends Component {
  constructor() {
    super();
    this.state = { 
      rehydrated: false
    }
  }

  componentWillMount() {           
    persistStore(store, 
      {
        storage: AsyncStorage,
        blacklist: ['inputs']
      }, 
      () => {
        this.setState({ rehydrated: true })
    })
  }

  render() {
    if(!this.state.rehydrated){
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
        </View>
      )
    }

    return (
      <Provider store={store}>
        <ConnectedRouter />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Les1;
