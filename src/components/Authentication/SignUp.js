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
          placeholder="Enter your name"
          underlineColorAndroid="transparent"
          value={this.state.name}
          onChangeText={text => this.setState({ name: text })}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter your email"
          underlineColorAndroid="transparent"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          style={styles.inputStyle}
          secureTextEntry
          placeholder="Enter your password "
          underlineColorAndroid="transparent"
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />
        <TextInput
          style={styles.inputStyle}
          secureTextEntry
          placeholder="Re-enter your password"
          underlineColorAndroid="transparent"
          value={this.state.rePassword}
          onChangeText={text => this.setState({ rePassword: text })}
        />

        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={this.registerUser.bind(this)}
        >
          <Text style={styles.btnText}>SIGN UP NOW</Text>
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
