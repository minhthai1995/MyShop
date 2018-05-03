import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import global from '../global';
import saveToken from '../../api/saveToken';
import profileIcon from '../../media/temp/profile.png';
import I18n from '../../../i18n.js';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      isSignIn: false
    };
    global.onSignIn = this.onSignIn.bind(this);
    global.gotoChangeInfo = this.gotoChangeInfo.bind(this);
  }
  onSignIn(user) {
    this.setState({ user });
  }
  onSignOut() {
    this.setState({ user: false });
    saveToken('');
    this.props.navigation.navigate('ManHinh_Authentication');
  }
  gotoChangeInfo() {
    this.props.navigation.navigate('ManHinh_ChangeInfo', this.state.user);
  }
  changeToVNamese() {
    I18n.locale = 'vi';
    console.log('I18n ne', I18n);
    global.forceUpdate();
    global.forceUpdateHome();
    try {
      global.forceUpdateCart();
    } catch (e) {
      console.log(e);
    }
    // if (typeof global.forceUpdateCart === 'function') {
    //     console.log('UPDATE CART FORCE');
    // } else {
    //     console.log('NOT UPDATE CART FORCE');
    // }
  }
  changeToEnglish() {
    I18n.locale = 'en';
    console.log('I18n ne', I18n);
    global.forceUpdate();
    global.forceUpdateHome();
    try {
      global.forceUpdateCart();
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { user } = this.state;
    const logoutJSX = (
      <View style={styles.contentContainer}>
        <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => this.props.navigation.navigate('ManHinh_Authentication')}
        >
          <Text style={styles.btnText}>{I18n.t('Login')}</Text>
        </TouchableOpacity>
        <View />
        <View style={styles.signControl}>
          <TouchableOpacity style={styles.signInStyle} onPress={this.changeToVNamese.bind(this)}>
            <Text style={this.state.isSignIn ? styles.activeStyle : styles.inactiveStyle}>
              VI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpStyle} onPress={this.changeToEnglish.bind(this)}>
            <Text style={this.state.isSignIn ? styles.inactiveStyle : styles.activeStyle}>
              EN
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    );
    const loginJSX = (
      <View style={styles.contentContainer}>
        <Text style={styles.userName}>{user ? user.name : '' }</Text>
        <View>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => this.props.navigation.navigate('ManHinh_OrderHistory')}
          >
            <Text style={styles.btnText}>{I18n.t('OrderHistory')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => this.props.navigation.navigate('ManHinh_ChangeInfo', user)}
          >
            <Text style={styles.btnText}>{I18n.t('ChangeInfo')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle} onPress={this.onSignOut.bind(this)}>
            <Text style={styles.btnText}>{I18n.t('SignOut')}</Text>
          </TouchableOpacity>
        </View>
        <View />
        <View style={styles.signControl}>
          <TouchableOpacity style={styles.signInStyle} onPress={this.changeToVNamese.bind(this)}>
            <Text style={styles.inactiveStyle}>
              VI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpStyle} onPress={this.changeToEnglish.bind(this)}>
            <Text style={styles.inactiveStyle}>
              EN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    const menuJSX = this.state.user ? loginJSX : logoutJSX;
    return (
      <View style={styles.container}>
        <Image source={profileIcon} style={styles.profile} />
            {menuJSX}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34B089',
    borderRightWidth: 5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 30
  },
  btnStyle: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 200,
    marginBottom: 10
  },
  btnText: {
    fontSize: 18,
    color: '#34B089'
  },
  userName: {
    color: '#fff',
    fontSize: 15
  },
   contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  inactiveStyle: {
    color: '#D7D7D7'
  },
  activeStyle: {
    color: '#34B089'
  },
  signInStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 17,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginRight: 2
  },
  signUpStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 17,
    flex: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 2
  },
  signControl: {
    flexDirection: 'row',
    width: 200,
  }
});
