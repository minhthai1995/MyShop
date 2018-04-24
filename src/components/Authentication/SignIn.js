import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';
import signIn from '../../api/signIn';
import global from '../global';
import saveToken from '../../api/saveToken';
import I18n from '../../../i18n.js';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onSignIn() {
    const { email, password } = this.state;
    signIn(email, password)
    .then(res => {
      global.onSignIn(res.user);
      this.props.goBackToMain();
      saveToken(res.token);
    })
    .catch(err => console.log(err));
  }
  render() {
    const { email, password } = this.state;
    return (
      <View>
        <TextInput
          style={styles.inputStyle}
           placeholder={I18n.t('Email')}
           underlineColorAndroid="transparent"
           value={email}
           onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          style={styles.inputStyle}
           placeholder={I18n.t('Password')}
           underlineColorAndroid="transparent"
           value={password}
           onChangeText={text => this.setState({ password: text })}
           secureTextEntry
        />
        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={this.onSignIn.bind(this)}
        >
          <Text style={styles.btnText}>{I18n.t('LoginNow')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 20
  },
  btnSignIn: {
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: '500'
  }
});
