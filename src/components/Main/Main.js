
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Drawer from 'react-native-drawer';
import Menu from './Menu';
import Shop from './Shop/Shop';
import getToken from '../../api/getToken';
import checkLogin from '../../api/checkLogin';
import refreshToken from '../../api/refreshToken';
import global from '../global';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0.3
    };
    global.forceUpdate = this.forceUpdate.bind(this);
  }
  componentDidMount() {
    getToken()
    .then(token => checkLogin(token))
    .then(res => global.onSignIn(res.user))
    .catch(err => {
      console.log('LOI LOGIN', err);
      this.props.navigation.navigate('ManHinh_Authentication');
    });
    setInterval(() => {
      getToken()
      .then(token => {
        refreshToken(token);
        console.log('TOKEN REFRESHED::::', token);
      }
    );
  }, 300000);
  }
  forceUpdate() {
    console.log('FORCE UPDATE');
    this.setState({});
  }
  closeControlPanel = () => {
    this.drawer.close();
  };
  openControlPanel = () => {
    this.drawer.open();
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
          <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<Menu navigation={navigation} />}
          tapToClose
          openDrawerOffset={this.state.offset}
          >
            <Shop navigation={navigation} open={this.openControlPanel.bind(this)} />
          </Drawer>
      </View>
    );
  }
}
