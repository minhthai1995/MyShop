import React, { Component } from 'react';
import { View, Text, Image, Dimensions,
        StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import sp1 from '../../../../media/temp/sp1.jpeg';
// import sp2 from '../../../../media/temp/sp2.jpeg';
// import sp3 from '../../../../media/temp/sp3.jpeg';
// import sp4 from '../../../../media/temp/sp4.jpeg';
/* <View style={styles.body}>
  {this.props.topProducts.map(e => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => this.props.navigation.navigate('ProductDetail_View', e)}
      key={e.id}
    >
      <Image source={{ uri: `${url}${e.images[0]}` }} style={styles.productImage} />
      <Text style={styles.productName}>{e.name.toUpperCase()}</Text>
      <Text style={styles.productPrice}>{e.price}$</Text>
    </TouchableOpacity>
  ))}
</View> */

const { width } = Dimensions.get('window');
const url = 'http://192.168.1.11:81/api/images/product/';

export default class TopProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true
    };
  }

  render() {
    const { topProducts } = this.props;
    if (topProducts != null) {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>TOP PRODUCT</Text>
          </View>
          <View style={styles.body}>
            <FlatList
              data={topProducts}
              keyExtractor={item => item.id}
              horizontal={false}
              numColumns='2'
              renderItem={({ item }) =>
                <TouchableOpacity
                  style={styles.productContainer}
                  onPress={() => this.props.navigation.navigate('ProductDetail_View', item)}
                >
                  <Image source={{ uri: `${url}${item.images[0]}` }} style={styles.productImage} />
                  <Text style={styles.productName}>{item.name.toUpperCase()}</Text>
                  <Text style={styles.productPrice}>{item.price}$</Text>
                </TouchableOpacity>
              }
            />
        </View>
        </View>
      );
    }
    return null;
  }
}

const productWidth = (width - 60) / 2;
const productImageHeight = ((productWidth) / 361) * 452;


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      margin: 10
    },
    titleContainer: {
      height: 50,
      justifyContent: 'center',
      paddingLeft: 10

    },
    title: {
      color: '#D3D3CF',
      fontSize: 20
    },
    body: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      paddingBottom: 10
    },
    productContainer: {
        flex: 1,
        width: productWidth,
        paddingBottom: 15,
        paddingHorizontal: 10
    },
    productImage: {
        width: productWidth,
        height: productImageHeight
    },
    productName: {
      paddingLeft: 0,
      color: '#D3D3CF',
      fontWeight: '500'
    },
    productPrice: {
      paddingLeft: 0,
      color: '#662F90',
      fontWeight: '500'
    }
});
