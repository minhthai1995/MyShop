import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';
import global from '../../../global';

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    global.forceUpdateHome = this.forceUpdateHome.bind(this);
  }

  forceUpdateHome() {
    console.log('FORCE UPDATE HOME');
    this.setState({});
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#DBDBD8' }}>
        <Collection />
        <Category navigation={navigation} types={this.props.screenProps.type} />
        <TopProduct navigation={navigation} topProducts={this.props.screenProps.product} />
      </ScrollView>
    );
  }
}
