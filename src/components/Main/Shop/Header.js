import React, { Component } from 'react';
import { View, Dimensions, Image, Text,
          TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import icLogo from '../../../media/appIcon/ic_logo.png';
import icMenu from '../../../media/appIcon/ic_menu.png';
import global from '../../global';
import search from '../../../api/searchProduct';
import I18n from '../../../../i18n.js';

const { height } = Dimensions.get('window');

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: ''
    };
  }
  onSearch() {
    const { txtSearch } = this.state;
    search(txtSearch)
    .then(arrProduct => global.setSearchArray(arrProduct))
    .catch(err => console.log('error search::', err));
    this.setState({ txtSearch: '' });
  }
  render() {
    return (
      <View
        style={styles.wrapper}
      >
        <View style={styles.row1}>
          <TouchableOpacity
            onPress={this.props.onOpen}
          >
            <Image source={icMenu} style={styles.iconStyle} />
          </TouchableOpacity>
          <Text style={styles.titleStyle}>{I18n.t('Greeting')}</Text>
          <Image source={icLogo} style={styles.iconStyle} />
        </View>
      <TextInput
        placeholder={I18n.t('SearchBar')}
        underlineColorAndroid="transparent"
        style={styles.textInput}
        value={this.state.txtSearch}
        onChangeText={text => this.setState({ txtSearch: text })}
        onFocus={() => global.gotoSearch()}
        onSubmitEditing={() => this.onSearch()}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: height / 8,
    backgroundColor: '#34B089',
    padding: 10,
    justifyContent: 'space-around' },
  row1: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  textInput: {
    height: height / 22,
    backgroundColor: '#FFF',
    paddingVertical: 0
  },
  titleStyle: { color: '#fff', fontFamily: 'Calibri', fontSize: 18 },
  iconStyle: { width: 25, height: 25 }
});
