import React, {useRef, useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import drink1 from '../../assets/image/drink1.png';
import {useNavigation} from '@react-navigation/native';

function Products(props) {
  const navigation = useNavigation();
  const url ='http://192.168.137.1:8070'
  const idku = props.id
  // console.log(idku);

  const onPress = () => {
    navigation.navigate('ProductDetail', {
      itemId: idku,
    });
  };
  // console.log(`${url+props.image}`);

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View elevation={9} style={styles.part1}>
          <Image source={{uri: `${url+props.image}`}} style={styles.img1} />
          <Text style={styles.nameTag}>{props.name}</Text>
          <Text style={styles.priceTag}>{props.price}</Text>
        </View>
      </TouchableOpacity>
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

export default Products;
