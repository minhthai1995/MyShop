import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import bannerImage from '../../../../media/temp/banner.jpg';
import I18n from '../../../../../i18n.js';

const { width, height } = Dimensions.get('window');
export default class Collection extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.wrapper}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.textStyle}>{I18n.t('ShowCase')}</Text>
        </View>
        <View style={{ flex: 4 }} >
          <Image source={bannerImage} style={styles.imageStyle} />
        </View>
      </TouchableOpacity>
    );
  }
}

const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;

const styles = StyleSheet.create({
  wrapper: {
      height: height / 3,
      backgroundColor: '#FFF',
      elevation: 3,
      margin: 10,
      shadowColor: '#2E272B',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      padding: 10,
      paddingTop: 0
  },
  textStyle: {
      fontSize: 20,
      color: '#AFAEAF'
  },
  imageStyle: {
      height: imageHeight,
      width: imageWidth,

  }
});
