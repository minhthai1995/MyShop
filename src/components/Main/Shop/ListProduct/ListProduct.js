import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import getListProduct from '../../../../api/getListProduct';
import backList from '../../../../media/appIcon/backList.png';
import I18n from '../../../../../i18n.js';

const url = 'http://192.168.1.13:81/api/images/product/';
// import sp2 from '../../../../media/temp/sp2.jpeg';
// import sp3 from '../../../../media/temp/sp3.jpeg';
// import sp4 from '../../../../media/temp/sp4.jpeg';
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProduct: [],
      refresh: false,
      page: 1
    };
  }
  componentDidMount() {
    const category = this.props.navigation.state.params;
    getListProduct(category.id, 1)
    .then(arrProduct => {
      this.setState({
        arrProduct
      });
    })
    .catch(err => console.log(err));
  }
  refresh() {
    const category = this.props.navigation.state.params;
    const newPage = this.state.page + 1;
    this.setState({
      refresh: true,
      page: this.state.page + 1
    });
    getListProduct(category.id, newPage)
    .then(arrProduct => {
      this.setState({
        arrProduct,
        refresh: false
      });
    })
    .catch(err => {
      this.setState({
        refresh: false
      });
      console.log(err);
    });
  }
  render() {
    const category = this.props.navigation.state.params;
    console.log('arrProduct::', this.state.arrProduct);
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image source={backList} style={styles.backStyle} />
              </TouchableOpacity>
              <Text style={styles.titleStyle}>{category.name}</Text>
              <View style={{ width: 30 }} />
          </View>
          <FlatList
            data={this.state.arrProduct}
            keyExtractor={item => item.id}
            horizontal={false}
            refreshing={this.state.refresh}
            onRefresh={() => this.refresh()}
            renderItem={({ item }) =>
              <View style={styles.productContainer}>
                <Image source={{ uri: `${url}${item.images[0]}` }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.txtName}>{toTitleCase(item.name)}</Text>
                  <Text style={styles.txtPrice}>{item.price}$</Text>
                  <View style={styles.briefInfo}>
                    <Text style={styles.txtColor}>{item.color}</Text>
                    <View />
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('ProductDetail_View', item)}
                    >
                      <Text style={styles.txtShowDetail}>{I18n.t('Detail')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
            }

          />


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDBD8',
    padding: 10
  },
  wrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backStyle: {
    width: 30,
    height: 30
  },
  titleStyle: {
    color: '#B10D65',
    fontSize: 20
  },
  productContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
  },
  productImage: {
    width: 90,
    height: (90 * 452) / 361
  },
  productInfo: {
    justifyContent: 'space-between',
    marginLeft: 20,
    flex: 1
  },
  briefInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txtName: {
    color: '#BCBCBC',
    fontSize: 18,
    fontWeight: '400'
  },
  txtPrice: {
    color: '#B1D065',
    fontSize: 13,
    fontWeight: '400'
  },
  txtColor: {
    color: '#000',
    fontSize: 15,
    fontWeight: '400'
  },
  txtShowDetail: {
    color: '#B10D65',
    fontSize: 11,
    fontWeight: '400'
  }
});
