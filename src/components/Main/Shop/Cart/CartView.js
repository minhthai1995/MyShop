import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    Dimensions, StyleSheet, Image, FlatList
} from 'react-native';
import global from '../../../global';
import sendOrder from '../../../../api/sendOrder';
import getToken from '../../../../api/getToken';
import I18n from '../../../../../i18n.js';

const url = 'http://unsmiling-plugs.000webhostapp.com/images/product/';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default class CartView extends Component {
    constructor(props) {
      super(props);
      global.forceUpdateCart = this.forceUpdateCart.bind(this);
    }
    async onSendOrder() {
      try {
        const cartArray = this.props.screenProps;
        const token = await getToken();
        const arrayDetail = cartArray.map(e => ({
          id: e.product.id,
          quantity: e.quantity
        }));
      const kq = await sendOrder(token, arrayDetail);
      this.clearCart();
      console.log(kq);
      await global.gotoChangeInfo();
      } catch (e) {
        console.log(e);
      }
    }

    forceUpdateCart() {
      console.log('FORCE UPDATE CART');
      this.setState({});
    }
    clearCart() {
      global.clearCart();
    }
    incrQuantity(id) {
      global.incrQuantity(id);
    }
    decrQuantity(id) {
      global.decrQuantity(id);
    }
    removeProduct(id) {
      global.removeProduct(id);
    }


    // gotoDetail() {
    //     this.props.navigation.navigate('ProductDetail_View');
    //     // const { navigator } = this.props;
    //     // navigator.push({ name: 'PRODUCT_DETAIL' });
    // }
    render() {
        const { main, checkoutButton, checkoutTitle, wrapper,
            product, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;
        const cartArray = this.props.screenProps;
        const cartTotal = cartArray.map(e => e.product.price * e.quantity);
        const total = cartTotal.length ? cartTotal.reduce((a, b) => a + b) : 0;
        return (
            <View style={wrapper}>
                <FlatList
                  style={main}
                  data={cartArray}
                  keyExtractor={item => item.product.id}
                  horizontal={false}
                  numColumns='1'
                  renderItem={({ item }) =>
                  <View style={product}>
                      <Image
                        source={{ uri: `${url}${item.product.images[0]}` }}
                        style={productImage}
                      />
                      <View style={[mainRight]}>
                          <View
                            style={{ justifyContent: 'space-between', flexDirection: 'row' }}
                          >
                              <Text style={txtName}>{toTitleCase(item.product.name)}</Text>
                              <TouchableOpacity onPress={() => this.removeProduct(item.product.id)}>
                                  <Text style={{ fontFamily: 'Avenir', color: '#969696', fontSize: 15 }}>
                                    X
                                  </Text>
                              </TouchableOpacity>
                          </View>
                          <View>
                              <Text style={txtPrice}>{item.product.price} VND</Text>
                          </View>
                          <View style={productController}>
                              <View style={numberOfProduct}>
                                  <TouchableOpacity
                                    onPress={() => this.incrQuantity(item.product.id)}
                                  >
                                      <Text style={{fontSize: 18}}>+</Text>
                                  </TouchableOpacity>
                                  <Text style={{fontSize: 16}}>{item.quantity}</Text>
                                  <TouchableOpacity
                                    onPress={() => this.decrQuantity(item.product.id)}
                                  >
                                      <Text style={{fontSize: 18}}>-</Text>
                                  </TouchableOpacity>
                              </View>
                              <TouchableOpacity
                                style={showDetailContainer}
                                onPress={() =>
                                this.props.navigation.navigate('ProductDetail_View', item.product)}
                              >
                                  <Text style={txtShowDetail}>{I18n.t('Detail')}</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </View>
                  }
                />
                <TouchableOpacity
                  style={checkoutButton}
                  onPress={() => this.onSendOrder()}
                >
                    <Text style={checkoutTitle}>
                      {I18n.t('Total')} {total} VND {I18n.t('CheckOut')}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    product: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

// import React, { Component } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity
// } from 'react-native';
//
// export default class CartView extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, backgroundColor: 'pink' }}>
//         <Text>Cart Component</Text>
//         <TouchableOpacity
//           onPress={() => this.props.navigation.navigate('ProductDetail_View')}
//         >
//           <Text>go to Product_detail</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
