import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';

export default class HomeView extends Component {
  render() {
    const { navigation } = this.props;
    console.log(this.props.screenProps);
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#DBDBD8' }}>
        <Collection />
        <Category navigation={navigation} types={this.props.screenProps.type} />
        <TopProduct navigation={navigation} topProducts={this.props.screenProps.product} />
      </ScrollView>
    );
  }
}
