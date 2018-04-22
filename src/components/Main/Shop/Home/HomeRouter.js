import { StackNavigator } from 'react-navigation';

import HomeView from './HomeView';
import ProductDetail from '../ProductDetail/ProductDetail';
import ListProduct from '../ListProduct/ListProduct';

export const MainStack = StackNavigator({
  Home_View: {
    screen: HomeView,
  },
  ProductDetail_View: {
    screen: ProductDetail,
  },
  ListProduct_View: {
    screen: ListProduct,
  },
},
{
  initialRouteName: 'Home_View',
  headerMode: 'none'
}
);
