import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import icBack from '../../media/appIcon/back_white.png';
import icLogo from '../../media/appIcon/ic_logo.png';
//import register from '../../api/register';
import I18n from '../../../i18n.js';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: false
    };
  }
  signInClicked() {
    this.setState({
      isSignIn: true
    });
  }

  signUpClicked() {
    this.setState({
      isSignIn: false
    });
  }
  gotoSignIn() {
    this.setState({
      isSignIn: true
    });
  }
  goBackToMain() {
     this.props.navigation.goBack();
  }
  render() {
    const mainJSX = this.state.isSignIn ?
          <SignIn goBackToMain={this.goBackToMain.bind(this)} /> :
          <SignUp gotoSignIn={this.gotoSignIn.bind(this)} goBackToMain={this.goBackToMain.bind(this)} />;
    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <TouchableOpacity
              onPress={() => this.goBackToMain()}
          >
            <Image source={icBack} style={styles.iconStyle} />
          </TouchableOpacity>
          <Text style={styles.titleStyle}>{I18n.t('Greeting')}</Text>
          <Image source={icLogo} style={styles.iconStyle} />
        </View>
          {mainJSX}
        <View style={styles.signControl}>
          <TouchableOpacity style={styles.signInStyle} onPress={this.signInClicked.bind(this)}>
            <Text style={this.state.isSignIn ? styles.activeStyle : styles.inactiveStyle}>
              {I18n.t('Login')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpStyle} onPress={this.signUpClicked.bind(this)}>
            <Text style={this.state.isSignIn ? styles.inactiveStyle : styles.activeStyle}>
              {I18n.t('Register')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34B089',
    padding: 20,
    justifyContent: 'space-between'
  },
  row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleStyle: { color: '#fff', fontFamily: 'Calibri', fontSize: 20 },
  iconStyle: { width: 25, height: 25 },
  signControl: {
    flexDirection: 'row',
    width: 300,
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
  }
});
