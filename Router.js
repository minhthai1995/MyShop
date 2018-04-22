import { StackNavigator } from 'react-navigation';

import Authentication from './src/components/Authentication/Authentication';
import ChangeInfo from './src/components/ChangeInfo/ChangeInfo';
import OrderHistory from './src/components/OrderHistory/OrderHistory';
import Main from './src/components/Main/Main';

export const MyStack = StackNavigator({
  ManHinh_Main: {
    screen: Main,
  },
  ManHinh_ChangeInfo: {
    screen: ChangeInfo,
  },
  ManHinh_Authentication: {
    screen: Authentication,
  },
  ManHinh_OrderHistory: {
    screen: OrderHistory,
  }
},
{
  initialRouteName: 'ManHinh_Main',
  headerMode: 'none'
}
);
