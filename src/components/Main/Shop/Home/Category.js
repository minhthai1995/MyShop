import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import I18n from '../../../../../i18n.js';

const { width, height } = Dimensions.get('window');
const url = 'http://unsmiling-plugs.000webhostapp.com/images/type/';
export default class Category extends Component {
  render() {
    const { types } = this.props;
    console.log('types nef', types);
    if (types != null) {
    return (
      <View style={styles.wrapper}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.textStyle}>{I18n.t('ListCategory')}</Text>
        </View>
        <View style={{ flex: 4 }} >
          <Swiper style={styles.swiperStyle}>
          {types.map(e => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ListProduct_View', e)}
              key={e.id}
            >
              <Image source={{ uri: `${url}${e.image}` }} style={styles.imageStyle} />
              <Text style={styles.cateTitle}>{e.name}</Text>
            </TouchableOpacity>
          ))}
          </Swiper>
        </View>
      </View>
    );
  }
  return null;
  }
}

const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;

const styles = StyleSheet.create({
  wrapper: {
      height: height / 3,
      backgroundColor: '#FFF',
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
  swiperStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
      height: imageHeight,
      width: imageWidth,
  },
  cateTitle: {
    position: 'absolute',
    fontSize: 16,
    left: width / 3,
    top: height / 10
  }
});
