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
import I18n from './i18n.js';
import global from './src/components/global';
// import Authentication from './src/components/Authentication/Authentication';
// import ChangeInfo from './src/components/ChangeInfo/ChangeInfo';
// import OrderHistory from './src/components/OrderHistory/OrderHistory';
// import Main from './src/components/Main/Main';

StatusBar.setHidden(true);

export default class App extends Component {
  constructor(props) {
    super(props);
    global.forceUpdateAppStack = this.forceUpdateAppStack.bind(this);
  }
  forceUpdateAppStack() {
    console.log('FORCE UPDATE APPSTACK');
    this.setState({});
  }

  render() {
    const locale = I18n.locale;
    console.log('locale ne', locale);
    return (
        <MyStack screenProps={locale} />
    );
  }
}
