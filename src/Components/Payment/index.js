import React, {useRef, useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import drink1 from '../../assets/image/drink1.png';
import {useNavigation} from '@react-navigation/native';


function ProductsPayment(props) {
  const navigation = useNavigation();
  const url ='http://192.168.137.1:8070'
  const idku = props.id
  console.log(idku);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };


  const onPress = () => {
    navigation.navigate('ProductDetail', {
      itemId: idku,
    });
    console.log('te');
  };
  console.log(`${url+props.image}`);

  return (
    <View style={styles.wraps}>
        <Image style={styles.images} source={{uri: props.image}} />
          <View>
            <Text style={styles.detailProduct}>{props.name}</Text>
            <View style={styles.qty}>
              <Text style={styles.idr1}>{`${props.qty}x`}</Text>
              <Text style={styles.idr2}>{rupiah(Number(props.grandTotal))}</Text>
            </View>
            <Text style={styles.size}>Regular</Text>
          </View>
        </View> 
  );
}

const styles = StyleSheet.create({
    wraps: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15
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
      },
      qty: {
        flexDirection: 'row',
        width:240
      },
      idr1: {
        flex: 1,
      },
      idr2: {
        flex: 1,
      },
});

export default ProductsPayment;
