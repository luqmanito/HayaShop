import React, {useRef, useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import back from '../../assets/image/back.png';

import RadioButton from '../../Components/Radiobtn';
import paymentAction from '../../redux/actions/payment';
import profileAction from '../../redux/actions/profile';

const Delivery = ({navigation}) => {
  const dispatch = useDispatch();
  const deliveryDetail = useSelector(state => state.checkout.checkoutItemList);

  const getUserDataProfile = useSelector(state => state.auth.userData);
  const id = getUserDataProfile.id;
  const token = getUserDataProfile.token;

  const getProfileInfo = useSelector(state => state.profile.profile.result);
  console.log(getProfileInfo[0].name);

  
  const [addressUser, setAddressUser] = useState(getProfileInfo[0].address);
  const [phoneNumber, setPhoneNumber] = useState(
    getProfileInfo[0].mobile_number,
  );

  const [delivMethod, setDelivMethod] = useState('Door Delivery');

  const onPress2 = () => {
    setSelect(false);
    setSelect1(false);
    setSelect2(true);
    setDelivMethod('Dine in');
  };
  console.log(delivMethod);
  const onPress1 = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect(true);
    setDelivMethod('Door Delivery');
  };

  const onPress3 = () => {
    setSelect(false);
    setSelect2(false);
    setSelect1(true);
    setDelivMethod('Pick up at store');
  };

  const rupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const [select, setSelect] = useState(null);
  const [select1, setSelect1] = useState(null);
  const [select2, setSelect2] = useState(null);

  // if (select) {
  //   setDelivMethod('Door Delivery')
  // } else if (select1) {
  //   setDelivMethod('Pick up at store')
  // } else if (select2) {
  //   setDelivMethod('Dine in')
  // }

  const [body, setBody] = useState({
    total: deliveryDetail.totalPrice,
    address: addressUser,
    mobile_number: phoneNumber,
    deliveryMethod: delivMethod,
  });
  const onChangeHandler = (text, type) => {
    setBody(body => ({...body, [type]: text}));
  };

  const handleInputValue1 = (text, type) => {
    setAddressUser({[type]: text});
  };

  const handleInputValue2 = (text, type) => {
    setPhoneNumber({[type]: text});
  };

  console.log(body);
  const onPress = () => {
    dispatch(paymentAction.checkoutPayment(body));
    navigation.navigate('Payment');
  };

  useEffect(() => {
    dispatch(profileAction.getProfileThunk(id, token));
  }, []);

  return (
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
          <Text>Cart</Text>
        </View>
      </View>
      <View>
        <Text style={styles.delivery}>Delivery</Text>
      </View>
      <View style={styles.direct}>
        <Text style={styles.details}>Address details</Text>
        <Text style={styles.change}>change</Text>
      </View>
      <View style={styles.submain} elevation={9}>
        <Text style={styles.street}>Your address</Text>
        <View>
          <TextInput
            placeholder="input your address here.."
            value={addressUser}
            style={styles.detail}
            onChangeText={text => {
              handleInputValue1(text, 'address');
              onChangeHandler(text, 'address');
            }}
          />

          <TextInput
            placeholder="input your phone number here.."
            value={phoneNumber}
            style={styles.idr}
            onChangeText={text => {
              handleInputValue2(text, 'mobile_number');
              onChangeHandler(text, 'mobile_number');
            }}
          />
        </View>
      </View>
      <View style={styles.direct}>
        <Text style={styles.details}>Delivery methods</Text>
      </View>
      <View style={styles.submain} elevation={9}>
        <TouchableOpacity onPress={onPress1} style={styles.directs}>
          <RadioButton selected={select} />
          <Text style={styles.choice}>Door Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress3} style={styles.directs}>
          <RadioButton selected={select1} />
          <Text style={styles.choice}>Pick up at store</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress2} style={styles.directs}>
          <RadioButton selected={select2} />
          <Text style={styles.choice}>Dine in</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.direct}>
        <Text style={styles.details}>Total</Text>
        <Text style={styles.changes}>
          {rupiah(Number(deliveryDetail.totalPrice))}
        </Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 30,
  },
  choice: {
    paddingLeft: 20,
    marginLeft: 10,
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
  red: {
    // backgroundColor: 'red',
    flex: 3,
    height: 50,
    padding: 20,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sect: {
    // backgroundColor: 'yellow',
    flex: 1,
    height: 50,
    paddingTop: 20,
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
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Delivery;
