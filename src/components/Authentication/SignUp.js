import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import register from '../../api/register';
import I18n from '../../../i18n.js';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: ''
    };
  }

  onSuccess() {
    Alert.alert(
      'Notice',
      'Sign Up Successfully',
      [
        { text: 'OK', onPress: () => this.props.gotoSignIn() },
      ],
      { cancelable: false }
    );
  }
  onFail() {
    Alert.alert(
      'Notice',
      'Invalid Name/Email',
      [
        { text: 'OK', onPress: () => console.log('Ask me later pressed') },
      ],
      { cancelable: false }
    );
  }
  registerUser() {
    const { name, email, password, rePassword } = this.state;
    if (password === rePassword) {
        register(name, email, password)
        .then(res => {
          if (res === 'THANH_CONG') return this.onSuccess();
          this.onFail();
        });
    }
  }
  render() {
    return (
      <View>
        <TextInput
          style={styles.inputStyle}
          placeholder={I18n.t('Name')}
          underlineColorAndroid="transparent"
          value={this.state.name}
          onChangeText={text => this.setState({ name: text })}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder={I18n.t('Email')}
          underlineColorAndroid="transparent"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          style={styles.inputStyle}
          secureTextEntry
          placeholder={I18n.t('Password')}
          underlineColorAndroid="transparent"
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />
        <TextInput
          style={styles.inputStyle}
          secureTextEntry
          placeholder={I18n.t('RePassword')}
          underlineColorAndroid="transparent"
          value={this.state.rePassword}
          onChangeText={text => this.setState({ rePassword: text })}
        />

        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={this.registerUser.bind(this)}
        >
          <Text style={styles.btnText}>{I18n.t('SignUpNow')}</Text>
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
