import React, { Component } from 'react';
import {} from 'react-native';
import { CartStack } from './CartRouter.js';

export default class Cart extends Component {
  render() {
    const { cartArray } = this.props;
    console.log('cart ne', cartArray);
    return (
      <CartStack screenProps={cartArray} />
    );
  }
}
