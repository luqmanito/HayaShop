import React, {useRef, useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import drink1 from '../../assets/image/drink1.png';
import {useNavigation} from '@react-navigation/native';

function ProductsPayment(props) {
  const navigation = useNavigation();
  const url = 'http://192.168.137.1:8070';
  const idku = props.id;
  console.log(idku);

  const rupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const onPress = () => {
    navigation.navigate('ProductDetail', {
      itemId: idku,
    });
    console.log('te');
  };
  console.log(`${url + props.image}`);

  return (
    <View style={styles.wrapper} elevation={9}>
      <Image style={styles.images} source={{uri: props.image}}/>
      <View>
        <Text
        style={styles.tittle}>
          {props.name}
        </Text>
        <Text style={styles.idr}>{rupiah(Number(props.grandTotal))}</Text>
        <Text style={styles.status}>
          Waiting for delivery [will arrive at 3 PM]
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  idr: {
    color: '#895537',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
  },
  images: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  tittle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  }
});

export default ProductsPayment;
