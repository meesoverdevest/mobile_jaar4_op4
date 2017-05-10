import React from 'react'
import { Router, Scene } from 'react-native-router-flux';

import BillingsScreen from './Billings';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const Navigation = () => {

  const TabIcon = ({ selected, title }) => {
    return (
      <Text style={{backgroundColor: selected ? 'orange' : 'black', color: selected ? 'black' : 'white', padding: 20, borderRadius: 10, overflow: 'hidden' }}>{title}</Text>
    );
  };

  return (
    <Router>
      <Scene key="root">
        <Scene key="tabbar"
          tabs
          tabBarStyle={{ backgroundColor: '#FFFFFF'}}
        >
          <Scene key="billings__tab" title="Billings" icon={TabIcon}>
            <Scene key="billings"
              component={BillingsScreen}
              title="Billings"
              initial
            />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  )
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  title:{
    fontSize: 36,
    top: -150,
    color: '#3498db'
  },
  spinner: {
    marginBottom: 50
  }
});

export default Navigation;