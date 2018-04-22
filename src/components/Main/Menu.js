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


export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false
    };
    global.onSignIn = this.onSignIn.bind(this);
  }
  componentDidMount() {

  }
  onSignIn(user) {
    this.setState({ user });
  }
  onSignOut() {
    this.setState({ user: false });
    saveToken('');
  }
  render() {
    const { user } = this.state;
    const logoutJSX = (
      <View>
        <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => this.props.navigation.navigate('ManHinh_Authentication')}
        >
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
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
            <Text style={styles.btnText}>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => this.props.navigation.navigate('ManHinh_ChangeInfo', user)}
          >
            <Text style={styles.btnText}>Change Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle} onPress={this.onSignOut.bind(this)}>
            <Text style={styles.btnText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View />
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
    alignItems: 'center'
  }
});
