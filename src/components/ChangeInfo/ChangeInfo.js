
import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert
} from 'react-native';
//import backSpecial from '../../media/appIcon/backs.png';
import backList from '../../media/appIcon/backList.png';
import changeInfo from '../../api/changeInfo';
import getToken from '../../api/getToken';
import global from '../global';
import I18n from '../../../i18n.js';

export default class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        const user = this.props.navigation.state.params;
        this.state = {
            txtName: user.name,
            txtAddress: user.address,
            txtPhone: user.phone
        };
    }
    onChangeInfoSuccess() {
      Alert.alert(
        'Notice',
        'Update Infomation Successfully',
        [
          { text: 'OK', onPress: () => this.props.navigation.navigate('ManHinh_OrderHistory') },
        ],
        { cancelable: false }
      );
    }
    changeUserInfo() {
      const { txtName, txtAddress, txtPhone } = this.state;
      getToken()
      .then(token => changeInfo(token, txtName, txtAddress, txtPhone))
      .then((user) => {
        this.onChangeInfoSuccess();
        global.onSignIn(user);
      })
      .catch(err => console.log(err));
    }
    // goBackToMain() {
    //     const { navigator } = this.props;
    //     navigator.pop();
    // }
    render() {
        const {
            wrapper, header, headerTitle, backIconStyle, body,
            signInContainer, signInTextStyle, textInput
        } = styles;
        const { txtName, txtAddress, txtPhone } = this.state;
        return (
            <View style={wrapper}>
                <View style={header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image source={backList} style={backIconStyle} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>{I18n.t('UserInfo')}</Text>
                    <View style={{ width: 30 }} />
                </View>
                <View style={body}>
                    <TextInput
                        style={textInput}
                        placeholder={I18n.t('Name')}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        value={txtName}
                        onChangeText={text => this.setState({ ...this.state, txtName: text })}
                    />
                    <TextInput
                        style={textInput}
                        placeholder={I18n.t('Address')}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        value={txtAddress}
                        onChangeText={text => this.setState({ ...this.state, txtAddress: text })}
                    />
                    <TextInput
                        style={textInput}
                        placeholder={I18n.t('Phone')}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        value={txtPhone}
                        onChangeText={text => this.setState({ ...this.state, txtPhone: text })}
                    />
                    <TouchableOpacity
                      style={signInContainer}
                      onPress={this.changeUserInfo.bind(this)}
                    >
                        <Text style={signInTextStyle}>{I18n.t('ChangeInfomation')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center' },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#2ABB9C',
        borderWidth: 1
    },
    signInTextStyle: {
        color: '#FFF', fontFamily: 'Avenir', fontWeight: '600', paddingHorizontal: 20
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#2ABB9C',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    }
});
//
// import React, { Component } from 'react';
// import {
//   View,
//   Button
// } from 'react-native';
//
// export default class ChangeInfo extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, backgroundColor: 'yellow' }}>
//         <Button
//           onPress={() => this.props.navigation.goBack()}
//           title='Back to Main'
//         />
//       </View>
//     );
//   }
// }
