import { StackNavigator } from 'react-navigation';

import CartView from './CartView';
import ProductDetail from '../ProductDetail/ProductDetail';

export const CartStack = StackNavigator({
  Cart_View: {
    screen: CartView,
  },
  ProductDetail_View: {
    screen: ProductDetail,
  }
},
{
  initialRouteName: 'Cart_View',
  headerMode: 'none'
}
);
