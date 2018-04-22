/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StatusBar
} from 'react-native';
import { MyStack } from './Router.js';
// import Authentication from './src/components/Authentication/Authentication';
// import ChangeInfo from './src/components/ChangeInfo/ChangeInfo';
// import OrderHistory from './src/components/OrderHistory/OrderHistory';
// import Main from './src/components/Main/Main';

StatusBar.setHidden(true);

export default class App extends Component {
  render() {
    return (
        <MyStack />
    );
  }
}
