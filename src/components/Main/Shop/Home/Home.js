import React, { Component } from 'react';
import {
} from 'react-native';
import { MainStack } from './HomeRouter.js';

export default class Home extends Component {
  render() {
    const { mainData } = this.props;
    return (
      <MainStack screenProps={mainData} />
    );
  }
}
