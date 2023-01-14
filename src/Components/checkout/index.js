import React, {useRef, useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import drink1 from '../../assets/image/drink1.png';
import {useNavigation} from '@react-navigation/native';
import checkoutAction from '../../redux/actions/checkout';
import {useDispatch, useSelector} from 'react-redux';
import transactionAction from '../../redux/actions/transaction';

function Checkout(props) {
  const navigation = useNavigation();
  const url = 'http://192.168.137.1:8070';
  const idku = props.id;
  const dispatch = useDispatch();
  
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

 console.log(idku);

  const [counter, setCounter] = useState(1);
  const [price, setPrice] = useState(props.price);
  const [base, setBase] = useState(null);
  const [body, setBody] = useState(productReview);

  const productReview = {
    image: props.image,
    product_name: props.name,
    quantity: counter,
    totalPrice: price,
    id: idku
  };
  
  useEffect(() => {
    setBase(props.price);
    setPrice(props.price);
  }, []);

  useEffect(() => {
console.log(productReview);
    setBody(productReview);
    dispatch(checkoutAction.checkoutItem(productReview));
  }, [counter]);

  return (
    <View
      elevation={9}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 12,
      }}>
      <Image
        source={{uri: props.image}}
        style={{width: 100, height: 100, borderRadius: 50, marginRight: 20}}
      />
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          {props.name}
        </Text>
        <Text style={styles.idr}>{rupiah(Number(price))}</Text>
      </View>
      <View style={styles.qty}>
        <View style={styles.category}>
          <TouchableOpacity
            onPress={() => {
              if (counter >= 1) {
                const reduce = counter - 1;
                setCounter(reduce);
                setPrice(base * reduce);
                // console.log(price);
              }
            }}>
            <Text style={styles.qtyo}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyo}>{counter}</Text>
          <TouchableOpacity
            onPress={() => {
              const reduce = counter + 1;
              setCounter(reduce);
              setPrice(base * reduce);
              // console.log(productReview.totalPrice);
            }}>
            <Text style={styles.qtyo}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  part1: {
    backgroundColor: 'white',
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 20,
    marginTop: 50,
  },
  qtyo: {
    fontWeight: 'bold',
    color: 'white',
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  qty: {
    backgroundColor: '#6A4029',
    position: 'absolute',
    right: 10,
    bottom: 35,
    width: 100,
    borderRadius: 14,
  },
  idr: {
    color: '#895537',
  },
  img1: {
    position: 'absolute',
    width: 110,
    height: 150,
    top: -20,
    borderRadius: 20,
  },
  nameTag: {
    position: 'absolute',
    top: 140,
    fontWeight: 'bold',
    color: 'black',
  },
  priceTag: {
    position: 'absolute',
    top: 160,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Checkout;
