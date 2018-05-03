import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import register from '../../api/register';
import I18n from '../../../i18n.js';
import signIn from '../../api/signIn';
import global from '../global';
import saveToken from '../../api/saveToken';


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
  onSignIn() {
   const { name, email, password } = this.state;
   console.log('Name', name);
   console.log('email', email);
   console.log('password', password);
   signIn(email, password)
   .then(res => {
     global.onSignIn(res.user);
     this.props.goBackToMain();
     saveToken(res.token);
   })
   .catch(err => {
     console.log(err);
     register(name, email, password)
     .then(res => {
       console.log('ket qua dang nhap');
       if (res === 'THANH_CONG') {
         signIn(email, password)
         .then(response => {
           global.onSignIn(response.user);
           this.props.goBackToMain();
           saveToken(response.token);
         })
         .catch(error => console.log(error));
       }
     });
   });
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
  fbAuth() {
  LoginManager.logInWithReadPermissions(['public_profile'])
  .then((result) => {
    if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      AccessToken.getCurrentAccessToken().then(
          (data) => {  //eslint-disable-line
            const infoRequest = new GraphRequest(
              '/me?fields=name,picture',
              null,
              (er, re) => {
                  if (er) {
                    console.log('Error fetching data: ', er.toString());
                  } else {
                    console.log('Result Name: ', re);
                    this.setState({
                      name: re.name,
                      email: re.name,
                      password: '123abc',
                      rePassword: '123abc'
                    });
                    this.onSignIn();
                  }
                }

            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          }
        );
    }
  },
  (error) => {
    console.log(error);
  });
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
        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={this.fbAuth.bind(this)}
        >
          <Text style={styles.btnText}>SIGN IN WITH FACEBOOK</Text>
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
    justifyContent: 'center',
    marginBottom: 10
  },
  btnText: {
    color: '#fff',
    fontWeight: '500'
  }
});
