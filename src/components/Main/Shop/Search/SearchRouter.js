import { StackNavigator } from 'react-navigation';

import SearchView from './SearchView';
import ProductDetail from '../ProductDetail/ProductDetail';

export const SearchStack = StackNavigator({
  Search_View: {
    screen: SearchView,
  },
  ProductDetail_View: {
    screen: ProductDetail,
  }
},
{
  initialRouteName: 'Search_View',
  headerMode: 'none'
}
);
