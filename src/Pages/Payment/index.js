import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  DrawerLayoutAndroid,
  Button,
  Touchable,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import option from '../../assets/image/options.png';
import cart from '../../assets/image/cart.png';
import back from '../../assets/image/back.png';
import cup from '../../assets/image/cup.png';
import heart from '../../assets/image/heart.png';
import del from '../../assets/image/del.png';
import card from '../../assets/image/bank.png';
import bank from '../../assets/image/bank2.png';
import cod from '../../assets/image/bank3.png';
import bri from '../../assets/image/bri.png';
import PushNotification from 'react-native-push-notification';
import RadioButton from '../../Components/Radiobtn';
import ProductsPayment from '../../Components/Payment';
import {useDispatch, useSelector} from 'react-redux';
import transactionAction from '../../redux/actions/transaction';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

const Payment = ({navigation}) => {
  const getUserDataProfile = useSelector(state => state.auth.userData);

  const token = getUserDataProfile.token;
  const dispatch = useDispatch();
  const deliveryDetail = useSelector(state => state.checkout.checkoutItemList);
  const paymentDetail = useSelector(state => state.payment.paymentList);
  const idDetail = useSelector(state => state.cart.cart);
console.log(idDetail.id);

  const [body, setBody] = useState({
    products_name: deliveryDetail.product_name,
    address_detail: paymentDetail.address,
    phone_number: idDetail.id,
    payment_method: null,
    delivery_method: paymentDetail.deliveryMethod,
    status_order: 'Pending',
    image: deliveryDetail.image,
    total_order: deliveryDetail.totalPrice,
    id_product: idDetail.id
  });

  // const data = new FormData();
  // if (body.products_name !== undefined) {
  //   data.append('products_name', body.products_name);
  // }
  // if (body.address_detail !== undefined) {
  //   data.append('address_detail', body.address_detail);
  // }
  // if (body.phone_number !== undefined) {
  //   data.append('phone_number', body.phone_number);
  // }
  // if (body.payment_method !== undefined) {
  //   data.append('payment_method', body.payment_method);
  // }
  // if (body.delivery_method !== undefined) {
  //   data.append('delivery_method', body.delivery_method);
  // }
  // if (body.status_order !== undefined) {
  //   data.append('status_order', body.status_order);
  // }
  // if (body.image !== undefined) {
  //   data.append('image', body.image);
  // }

  const msg = () => {
    showMessage({
      message: 'Transaction Created!',
      type: 'success',
    });
    // navigation.navigate('History');
    navigation.dispatch(StackActions.replace('History'));
  };
  const msg2 = () => {
    showMessage({
      message: 'Failed Create Transaction!',
      type: 'danger',
    });
  };

  const showNotifHandle = () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    PushNotification.localNotification({
      channelId: 'local-notification',
      title: 'Local Notification',
      message: `Order Succes, Please pay the order before ${date}`,
    });
    navigation.dispatch(StackActions.replace('History'));
  };

  const onPress = () => {
    dispatch(
      transactionAction.addTransactionThunk(
        body,
        token,
        msg2,
        showNotifHandle
      ),
    );
  };

  console.log(body);

  const onPress2 = () => {
    setSelect(false);
    setSelect1(false);
    setSelect2(true);
    setBody({...body, payment_method: 'Cash on Delivery'});
  };
  const onPress1 = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect(true);
    setBody({...body, payment_method: 'Card'});
  };

  const onPress3 = () => {
    setSelect(false);
    setSelect2(false);
    setSelect1(true);
    setBody({...body, payment_method: 'Bank Account'});
  };

  const [select, setSelect] = useState(null);
  const [select1, setSelect1] = useState(null);
  const [select2, setSelect2] = useState(null);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.red}>
            <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
              <Image
                source={back}
                style={{
                  width: 10,
                  height: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.sect}>
            <Text style={styles.pays}>Payment</Text>
          </View>
        </View>

        <View style={styles.direct}>
          <Text style={styles.details}>Products</Text>
          <Text style={styles.change}></Text>
        </View>
        <View style={styles.submain2} elevation={9}>
          <ProductsPayment
            grandTotal={deliveryDetail.totalPrice}
            name={deliveryDetail.product_name}
            qty={deliveryDetail.quantity}
            image={deliveryDetail.image}
            key={deliveryDetail.id}
          />
        </View>

        <View style={styles.direct}>
          <Text style={styles.details}>Payment methods</Text>
        </View>
        <View style={styles.submain} elevation={9}>
          <TouchableOpacity onPress={onPress1} style={styles.directs}>
            <RadioButton selected={select} />
            <Text style={styles.choice}>
              {' '}
              <Image style={styles.meth} source={card} /> Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress3} style={styles.directs}>
            <RadioButton selected={select1} />
            <Text style={styles.choice}>
              {' '}
              <Image style={styles.meth} source={bank} /> Bank account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress2} style={styles.directs}>
            <RadioButton selected={select2} />
            <Text style={styles.choice}>
              {' '}
              <Image style={styles.meth} source={cod} /> Cash on Delivery
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.direct}>
          <Text style={styles.details}>My Card</Text>
        </View>
        <View style={styles.cardlist}>
          <Image source={bri} style={styles.bri} />
          <Image source={bri} style={styles.bri2} />
        </View>
        <View style={styles.buttons2}>
          <Pressable style={styles.inbuttons2} onPress={onPress}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: 'white',
                textAlign: 'center',
              }}>
              Proceed to payment
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 30,
  },
  meth: {
    width: 40,
    height: 40,
    // backgroundColor:'yellow'
  },
  bri: {
    marginTop: 20,
    width: 240,
    height: 150,
  },
  bri2: {
    marginTop: 20,
    width: 240,
    height: 150,
    marginLeft: 20,
  },
  cardlist: {
    flexDirection: 'row',
  },
  images: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  detailProduct: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    // backgroundColor: 'green'
  },
  qty: {
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    width: 240,
  },
  pays: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  idr1: {
    flex: 1,
  },
  idr2: {
    flex: 1,
    // backgroundColor: 'black'
  },
  choice: {
    paddingLeft: 10,
    marginTop: -35,
    paddingBottom: -40,
    fontWeight: 'bold',
    color: 'black',
    borderBottomWidth: 1,
    width: 280,
  },
  buttons2: {
    alignItems: 'center',
  },
  inbuttons2: {
    backgroundColor: '#6A4029',
    width: 350,
    height: 50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
    marginTop: 40,
  },
  street: {
    fontWeight: 'bold',
    color: 'black',
    borderBottomWidth: 1,
  },
  detail: {
    marginTop: 5,
    color: 'black',
    borderBottomWidth: 1,
  },
  idr: {
    marginTop: 5,
    color: 'black',
  },
  submain: {
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
  },
  submain2: {
    flexDirection: 'column',
    // alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
  },
  wraps: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
  },
  red: {
    // backgroundColor: 'red',
    flex: 3,
    height: 50,
    padding: 20,
  },
  main: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sect: {
    flex: 7,
    height: 50,
    // paddingTop: 20,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  delivery: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
  },
  direct: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 30,
  },
  directs: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  details: {
    flex: 5,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  change: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#6A4029',
    fontSize: 16,
  },
  changes: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Payment;
