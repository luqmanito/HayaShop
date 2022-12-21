import React, {useRef, useState, useEffect} from 'react';
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
import back from '../../assets/image/back.png';
import cup from '../../assets/image/cup.png';
import heart from '../../assets/image/heart.png';
import del from '../../assets/image/del.png';
import finger from '../../assets/image/finger.png';
import {color} from 'react-native-reanimated';
import Checkout from '../../Components/checkout';
import {useDispatch, useSelector} from 'react-redux';
import transactionAction from '../../redux/actions/transaction';

const Cart = ({navigation}) => {
  // const deliveryDetail = useSelector(state => state.checkout.checkoutItemList);
  // const [body, setBody] = useState({
  //   total: deliveryDetail.totalPrice,
  //   image: deliveryDetail.image,
  //   phone_number: deliveryDetail.phoneNumber,
  // });


  const onPress = () => {
    navigation.navigate('Delivery');
    // dispatch(transactionAction.addTransactionThunk)
  };



  const productCart = useSelector(state => state.productDetail.productsDetails[0]);
  const idProduct = useSelector(state => state.cart.cart);
  console.log(idProduct);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.red}>
          <TouchableOpacity >
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
      <View style={styles.section}>
        <Image
          source={finger}
          style={{
            width: 20,
            height: 20,
          }}
        />
        <Text style={styles.swipe}>swipe on an item to delete</Text>
      </View>
      <Checkout
      name={productCart.name}
      price={productCart.price}
      image={productCart.image}
      
      />
      <View style={styles.buttons2}>
        <Pressable style={styles.inbuttons2} onPress={onPress}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: 'white',
              textAlign: 'center',
            }}>
            Confirm and Checkout
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

function onPress() {
  console.log('teken');
}

const styles = StyleSheet.create({
    buttons2:{
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
  icon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    right: 40,
    bottom: 180,
    // backgroundColor: 'grey',
  },
  swipe: {
    fontWeight: '400',
    paddingLeft: 10,
  },
  wrapper1: {
    width: 353,
    marginLeft: -150,
    // backgroundColor:'grey'
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'grey'
    marginTop: 20,
    marginBottom: -15,
  },
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  qtyo: {
    fontWeight: 'bold',
    color: 'white',
  },
  idr: {
    color: '#895537',
  },
  main: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  red: {
    // backgroundColor: 'red',
    flex: 3,
    height: 50,
    padding: 20,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingTop: 20,
    // paddingBottom: 10,
  },
  qty: {
    // padding: ,
    backgroundColor: '#6A4029',
    position: 'absolute',
    right: 10,
    bottom: 45,
    width: 100,
    borderRadius: 14,
  },
});

export default Cart;
