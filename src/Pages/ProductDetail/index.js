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
import option from '../../assets/image/options.png';
import cart from '../../assets/image/cart.png';
import back from '../../assets/image/back.png';
import cup from '../../assets/image/cup.png';
import drink2 from '../../assets/image/drink2.png';
import {useDispatch, useSelector} from 'react-redux';
import productsDetailAction from '../../redux/actions/productsDetail';
import {getProductById} from '../../Utils';
import paymentAction from '../../redux/actions/cart';

const ProductDetail = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {itemId} = route.params;
  console.log(itemId);
  const product = useSelector(state => state.productDetail.productsDetails[0]);

  console.log(product);
  const [body, setBody] = useState({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const onPress = () => {
    dispatch(paymentAction.payment(body));
    navigation.navigate('Cart');
  };

  console.log(body);

  useEffect(() => {
    dispatch(productsDetailAction.getProductsDetailThunk(itemId));
  }, []);

  const url = 'http://192.168.137.1:8070';
  const rupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

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
          <Image
            source={cart}
            style={{
              width: 15,
              height: 15,
              marginLeft: 40,
            }}
          />
        </View>
      </View>
      <View style={styles.cupWrap}>
        <Image
          source={
            {uri: product.image} === null
              ? cup
              : {uri: product.image}
          }
          style={styles.cupimg}
        />
      </View>
      <View style={styles.dotdot}>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'grey',
            width: 100,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              backgroundColor: '#6A4029',
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              backgroundColor: '#C4C4C4',
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              backgroundColor: '#C4C4C4',
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              backgroundColor: '#C4C4C4',
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
      <View style={styles.prod}>
        <Text style={styles.prodName}>
          {product.name === null ? cup : product.name}
        </Text>
      </View>
      <View style={styles.priceWrap}>
        <Text style={styles.priceTag}>
          {product.price === null ? 10 : rupiah(Number(product.price))}
        </Text>
      </View>
      <View style={styles.desc}>
        <Text style={styles.deliv}>Delivery info</Text>
        <Text style={styles.only}>
          Delivered only on monday until friday from 1 pm to 7 pm
        </Text>
        <Text style={styles.desc2}>Description</Text>
        <Text style={styles.desc3}>
          {product.description === null
            ? 'description text'
            : product.description}
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
            Add to cart
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
  cupimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
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
  deliv: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    paddingTop: 20,
  },
  only: {
    // fontWeight: 'bold',
    color: 'grey',
    fontSize: 15,
  },
  desc2: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    paddingTop: 20,
  },
  desc3: {
    color: 'grey',
    fontSize: 15,
  },
  prod: {
    alignItems: 'center',
    paddingTop: 20,
  },
  priceWrap: {
    alignItems: 'center',
    paddingTop: 10,
  },
  cupWrap: {
    alignItems: 'center',
    paddingTop: 20,
  },
  main: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prodName: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
  },
  priceTag: {
    fontWeight: 'bold',
    color: '#6A4029',
    fontSize: 24,
  },
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  red: {
    // backgroundColor: 'red',
    flex: 3,
    height: 50,
    padding: 20,
  },
  sect: {
    // backgroundColor: 'yellow',
    flex: 1,
    height: 50,
    paddingTop: 20,
  },
  dotdot: {
    alignItems: 'center',
    paddingTop: 30,
  },
});

export default ProductDetail;
