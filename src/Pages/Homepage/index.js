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
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import option from '../../assets/image/options.png';
import cart from '../../assets/image/cart.png';
import {useDispatch, useSelector} from 'react-redux';
import SignUpData from '../Login';
import Welcome from '../Welcome';
import {debounce} from '../../helpers/debounce';
import {getProducts} from '../../Utils';
import Products from '../../Components/Product';
import productsAction from '../../redux/actions/products';

const Hompepage = ({navigation}) => {
  const product = useSelector(state => state.products.products);

  const [search, setSearch] = useState(null);
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const drawer = useRef(null);
  const onPress = () => {
    navigation.navigate('ProductDetail');
    console.log('te');
  };
  const onPress2 = () => {
    navigation.navigate('Profile');
    console.log('te');
  };
  console.log(product);

  // const getAllProduct = debounce(async () => {
  //   try {
  //     const body = {
  //       search: search ?? '',
  //       filter: '',
  //       sort: 'asc',
  //     };
  //     const result = await getProducts(body, counter);
  //     console.log(result);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, 1500);

  const body = {
    search: search ?? '',
    filter: '',
    sort: 'asc',
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      {/* <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      /> */}
    </View>
  );

  useEffect(() => {
    dispatch(productsAction.getProductsThunk(body, counter));
  }, []);

  return (
    <>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={navigationView}>
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.red}>
              <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
                <Image
                  source={option}
                  style={{
                    width: 10,
                    height: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPress2}>
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
            </TouchableOpacity>
          </View>
          <View style={styles.goodWrapper}>
            <Text style={styles.good}>A good coffee is {'\n'}a good day</Text>
          </View>
          <View style={styles.searchWrapper}>
            <TextInput style={styles.search} placeholder="🔍 Search" />
          </View>
          <View style={styles.category}>
            <Text>Favorite</Text>
            <Text>Promo</Text>
            <Text>Coffee</Text>
            <Text>Non-Coffee</Text>
          </View>
          <ScrollView>
            <View style={styles.content}>
              {product &&
                product.map(detail => {
                  return (
                    <Products
                      name={detail.name}
                      price={detail.price}
                      image={detail.image}
                      id={detail.id}
                      key={detail.id}
                    />
                  );
                })}
            </View>
            <Tab.Navigator>
            
              <Tab.Screen name="SignUp" component={SignUpData} />
              
              <Tab.Screen name="Welcome" component={Welcome} />
            </Tab.Navigator>
          </ScrollView>
        </View>
      </DrawerLayoutAndroid>
    </>
  );
};

const styles = StyleSheet.create({
  good: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
  },
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  sect: {
    // backgroundColor: 'yellow',
    flex: 1,
    height: 50,
    paddingTop: 20,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goodWrapper: {
    padding: 20,
  },
  red: {

    flex: 3,
    height: 50,
    padding: 20,
  },
  search: {
    width: 300,
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
  },
  searchWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 393,
    padding: 20,
    flexWrap: 'wrap',
  },
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
  part2: {
    backgroundColor: 'white',
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 20,
  },
  img1: {
    position: 'absolute',
    width: 110,
    height: 150,
    top: -20,
    borderRadius: 20,
  },
  img2: {
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

export default Hompepage;
