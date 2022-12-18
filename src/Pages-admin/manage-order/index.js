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
import del from '../../assets/image/del2.png';
import finger from '../../assets/image/finger.png';
import {color} from 'react-native-reanimated';
import ProductsPayment from '../../Components/history';
import {useDispatch, useSelector} from 'react-redux';

const ManageOrder = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Delivery');
  };

  const markDone = () =>{
    console.log('semua acc');
  }

  const deliveryDetail = useSelector(state => state.checkout.checkoutItemList);

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
      </View>
      <Text style={styles.order}>Customer Order</Text>
      <View style={styles.section}>
        <Image
          source={finger}
          style={{
            width: 20,
            height: 20,
          }}
        />
        <Text style={styles.swipe}>swipe on an item when it's done</Text>
      </View>
      
      <ProductsPayment
        grandTotal={deliveryDetail.totalPrice}
        name={deliveryDetail.product_name}
        qty={deliveryDetail.quantity}
        image={deliveryDetail.image}
      />
    
      {/* <Text style={styles.left}>You have no history left</Text> */}
      <View style={styles.buttons2}>
            <Pressable style={styles.inbuttons2} onPress={markDone}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  color: 'black',
                  textAlign: 'center',
                }}>
                Mark all as done
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
  buttons2: {
    alignItems: 'center',
  },
  order: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 25,
    color: 'black',
  },
  inbuttons2: {
    backgroundColor: '#FFBA33',
    width: 350,
    height: 50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
    marginTop: 40,
  },
  left: {
    textAlign: 'center',
    marginTop: 40,
    bottom: 0,
  },
  icon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    right: 100,
    bottom: 220,
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

export default ManageOrder;
