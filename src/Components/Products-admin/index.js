import React, {useRef, useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import pencil from '../../assets/image/pencil.png';
import {useNavigation} from '@react-navigation/native';

function ProductsAdmin(props) {
  const navigation = useNavigation();
  const url ='http://192.168.137.1:8070'
  const idku = props.id
  // console.log(idku);

  const onPress = () => {
    navigation.navigate('ProductDetailAdmin', {
      itemId: idku,
    });
  };
  // console.log(`${url+props.image}`);

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View elevation={9} style={styles.part1}>
          <Image source={{uri: `${url+props.image}`}} style={styles.img1} />
          <Image source={pencil} style={styles.number} />
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
  number:{
    width: 30,
    height: 30,
    right: -50
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

export default ProductsAdmin;
