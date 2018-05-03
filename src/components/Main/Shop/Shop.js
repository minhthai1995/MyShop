import React, { Component } from 'react';
import {
  View, Image, StyleSheet
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home/Home';
import Cart from './Cart/Cart';
import Search from './Search/Search';
import Contact from './Contact/Contact';
import Header from './Header';
import global from '../../global';
import homeIconS from '../../../media/appIcon/home.png';
import homeIcon from '../../../media/appIcon/home0.png';
import cartIconS from '../../../media/appIcon/cart.png';
import cartIcon from '../../../media/appIcon/cart0.png';
import searchIconS from '../../../media/appIcon/search.png';
import searchIcon from '../../../media/appIcon/search0.png';
import contactIconS from '../../../media/appIcon/contact.png';
import contactIcon from '../../../media/appIcon/contact0.png';
import initData from '../../../api/initData';
import getCart from '../../../api/getCart';
import saveCart from '../../../api/saveCart';
import I18n from '../../../../i18n.js';

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: 'home',
        cartArray: [],
        mainData: {}
    };
    global.addProductToCart = this.addProductToCart.bind(this);
    global.incrQuantity = this.incrQuantity.bind(this);
    global.decrQuantity = this.decrQuantity.bind(this);
    global.productExistInCart = this.productExistInCart.bind(this);
    global.removeProduct = this.removeProduct.bind(this);
    global.gotoSearch = this.gotoSearch.bind(this);
    global.clearCart = this.clearCart.bind(this);
  }


  componentDidMount() {
    // fetch('http://unsmiling-plugs.000webhostapp.com/index.php')  // eslint-disable-line
    // .then(res => res.json())
    initData()
    .then(resJSON => {
      const { type } = resJSON;
      this.setState({
        types: type,
        mainData: resJSON
      });
    })
    .catch(error => console.log(error));
    getCart().then(cartArray => this.setState({ cartArray }));
  }

  productExistInCart(productId) {
    let i;
    for (i = 0; i < this.state.cartArray.length; i++) {
      if (this.state.cartArray[i].product.id === productId) return true;
    }
    return false;
  }
  gotoSearch() {
    this.setState({
      selectedTab: 'search',
    });
  }

  addProductToCart(product) {
      if (this.productExistInCart(product.id)) {
        this.incrQuantity(product.id);
    } else {
      this.setState({
        cartArray: this.state.cartArray.concat({ product, quantity: 1 })
      },
      () => saveCart(this.state.cartArray)
    );
    }
  }

  incrQuantity(productId) {
    const newCart = this.state.cartArray.map(e => {
      if (e.product.id !== productId) return e;
      return { product: e.product, quantity: e.quantity + 1 };
    });
    this.setState({
      cartArray: newCart
    },
    () => saveCart(this.state.cartArray)
  );
  }

  decrQuantity(productId) {
    const newCart = this.state.cartArray.map(e => {
      if (e.product.id !== productId) return e;
      return { product: e.product, quantity: e.quantity - 1 };
    });
    const newcart2 = newCart.filter(e => e.quantity !== 0);
    this.setState({
      cartArray: newcart2
    },
    () => saveCart(this.state.cartArray)
  );
  }

  removeProduct(productId) {
    const newcart = this.state.cartArray.filter(e => e.product.id !== productId);
    this.setState({
      cartArray: newcart
    },
    () => saveCart(this.state.cartArray)
  );
  }

  clearCart() {
    this.setState({
      cartArray: []
    },
    () => saveCart(this.state.cartArray)
  );
  }

  openMenu() {
    const { open } = this.props;
    open();
  }
  render() {
    const { mainData, cartArray } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        <Header onOpen={this.openMenu.bind(this)} />
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title={I18n.t('Home')}
            onPress={() => this.setState({ selectedTab: 'home' })}
            renderIcon={() => <Image source={homeIcon} style={styles.iconStyle} />}
            renderSelectedIcon={() => <Image source={homeIconS} style={styles.iconStyle} />}
            selectedTitleStyle={{ color: '#34B089' }}
          >
            <Home mainData={mainData} lang={I18n.locale} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'cart'}
            title={I18n.t('Cart')}
            onPress={() => this.setState({ selectedTab: 'cart' })}
            renderIcon={() => <Image source={cartIcon} style={styles.iconStyle} />}
            renderSelectedIcon={() => <Image source={cartIconS} style={styles.iconStyle} />}
            selectedTitleStyle={{ color: '#34B089' }}
            badgeText={cartArray.length}
          >
            <Cart cartArray={cartArray} navigation={this.props.navigation} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'search'}
            title={I18n.t('Search')}
            onPress={() => this.setState({ selectedTab: 'search' })}
            renderIcon={() => <Image source={searchIcon} style={styles.iconStyle} />}
            renderSelectedIcon={() => <Image source={searchIconS} style={styles.iconStyle} />}
            selectedTitleStyle={{ color: '#34B089' }}
          >
            <Search />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'contact'}
            title={I18n.t('Contact')}
            onPress={() => this.setState({ selectedTab: 'contact' })}
            renderIcon={() => <Image source={contactIcon} style={styles.iconStyle} />}
            renderSelectedIcon={() => <Image source={contactIconS} style={styles.iconStyle} />}
            selectedTitleStyle={{ color: '#34B089' }}
          >
            <Contact />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: { width: 20, height: 20 }
});
