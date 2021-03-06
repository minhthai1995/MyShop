import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView
} from 'react-native';
import backList from '../../media/appIcon/backList.png';
import getOrderHistory from '../../api/getOrderHistory';
import getToken from '../../api/getToken';
import I18n from '../../../i18n.js';

export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = { arrOrder: [] };
    }
    componentDidMount() {
      getToken()
      .then(token => getOrderHistory(token))
      .then(arrOrder => this.setState({ arrOrder }))
      .catch(err => console.log(err));
    }
    render() {
        const { wrapper, header, headerTitle, backIconStyle, body, orderRow } = styles;
        console.log('arrOrder:::', this.state.arrOrder);
        return (
            <View style={wrapper}>
                <View style={header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image source={backList} style={backIconStyle} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>{I18n.t('OrderHistory').toUpperCase()}</Text>
                    <View style={{ width: 30 }} />
                </View>
                <View style={body}>
                    <ScrollView>
                      {this.state.arrOrder.map(e => (
                        <View style={orderRow} key={e.id}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>
                                  {I18n.t('OrderId')}:
                                </Text>
                                <Text style={{ color: '#2ABB9C' }}>ORD{e.id}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>
                                  {I18n.t('OrderTime')}:
                                </Text>
                                <Text style={{ color: '#C21C70' }}>{e.date_order}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>
                                  {I18n.t('Status')}:
                                </Text>
                                <Text style={{ color: '#2ABB9C' }}>
                                  {e.status === '0' ? 'Pending' : (e.status === '1' ? 'Completed' : 'Cancelled') }
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text
                                  style={{ color: '#9A9A9A', fontWeight: 'bold' }}
                                >
                                {I18n.t('Total')}:
                                </Text>
                                <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>
                                  {e.total} VND
                                </Text>
                            </View>
                        </View>
                      ))}

                    </ScrollView>
                </View>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 10, backgroundColor: '#F6F6F6' },
    orderRow: {
        height: width / 3,
        backgroundColor: '#FFF',
        margin: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#DFDFDF',
        shadowOpacity: 0.2,
        padding: 10,
        borderRadius: 2,
        justifyContent: 'space-around'
    }
});
//
// import React, { Component } from 'react';
// import {
//   View,
//   Button
// } from 'react-native';
//
// export default class OrderHistory extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, backgroundColor: 'yellow' }}>
//         <Button
//           onPress={() => this.props.navigation.goBack()}
//           title='Back to Main'
//         />
//       </View>
//     );
//   }
// }
