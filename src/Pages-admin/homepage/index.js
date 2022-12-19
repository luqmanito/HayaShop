import React, {useRef, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  DrawerLayoutAndroid,
  Pressable,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import option from '../../assets/image/options.png';
import cart from '../../assets/image/cart.png';
import drawer1 from '../../assets/image/drawer1.png';
import drawer2 from '../../assets/image/drawer2.png';
import drawer3 from '../../assets/image/drawer3.png';
import drawer4 from '../../assets/image/drawer4.png';
import drawer5 from '../../assets/image/drawer5.png';
import {useDispatch, useSelector} from 'react-redux';
import SignUpData from '../../Pages/SignupData/index';
import Welcome from '../../Pages/Welcome/index';
import {debounce} from '../../helpers/debounce';
import {getProducts} from '../../Utils';
import Products from '../../Components/Product';
import productsAction from '../../redux/actions/products';
import profileAction from '../../redux/actions/profile';
import cup from '../../assets/image/cup.png';
import admin from '../../assets/image/admin.jpg';
import authAction from '../../redux/actions/auth';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductsAdmin from '../../Components/Products-admin';
const HompepageAdmin = ({navigation}) => {
  const product = useSelector(state => state.products.products);
  const getUserDataProfile = useSelector(state => state.auth.userData);
  const id = getUserDataProfile.id;
  const token = getUserDataProfile.token;

  const getProfileInfo = useSelector(state => state.profile.profile.result);
  // console.log(getProfileInfo[0].name);

  const [search, setSearch] = useState(null);
  const [counter, setCounter] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [dataSources, setDataSources] = useState(
    // [
    // ...product
    product,
    // ]
  );
  const [param, setParam] = useState({
    // search: getQuery.get("search") ?? "",
    // sort: getQuery.get("sort") ?? "",
    // filter: getQuery.get("filter") ?? "",
    // page: getQuery.get("page") ?? 1,
  });
  // console.log(product);
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const drawer = useRef(null);

  const navToProfile = () => {
    navigation.navigate('Profile');
  };
  const navManageOrder = () => {
    navigation.navigate('ManageOrder');
  };
  const [modalVisible, setModalVisible] = useState(false);
  const body = {
    search: search ?? '',
    filter: '',
    sort: 'asc',
  };

  const coffeeData = () => {
    const body = {
      ...param,
      filter: 'coffee',
      sort: 'asc',
    };
    setParam(body);
    // const tempCount = counter + 1;
    // setCounter(tempCount);
    dispatch(productsAction.getProductsThunk(body, counter, add));
  };

  const nonCoffeeData = () => {
    const body = {
      ...param,
      filter: 'non-coffee',
      sort: '',
    };
    setParam(body);
    // const tempCount = counter + 1;
    // setCounter(tempCount);
    dispatch(productsAction.getProductsThunk(body, counter, add));
  };

  const promoData = () => {
    const body = {
      ...param,
      filter: 'promo',
      sort: '',
    };
    setParam(body);
    // const tempCount = counter + 1;
    // setCounter(tempCount);
    dispatch(productsAction.getProductsThunk(body, counter, add));
  };

  const favData = () => {
    const body = {
      ...param,
      filter: '',
      sort: 'most-popular',
    };
    setParam(body);
    // const tempCount = counter + 1;
    // setCounter(tempCount);
    dispatch(productsAction.getProductsThunk(body, counter, add));
  };

  const mostExpensive = () => {
    const body = {
      ...param,
      filter: '',
      sort: 'most-expensive',
    };
    setParam(body);
    // const tempCount = counter + 1;
    // setCounter(tempCount);
    dispatch(productsAction.getProductsThunk(body, counter, add));
  };

  const cheapest = () => {
    const body = {
      ...param,
      filter: '',
      sort: 'cheapest',
    };
    setParam(body);
    // const tempCount = counter + 1;
    // setCounter(tempCount);
    dispatch(productsAction.getProductsThunk(body, counter, add));
  };

  const newest = () => {
    const body = {
      ...param,
      filter: '',
      sort: 'newest',
    };
    setParam(body);
    // const tempCount = counter + 1;
    // setCounter(tempCount);
    dispatch(productsAction.getProductsThunk(body, counter, add));
  };

  const oldest = () => {
    const body = {
      ...param,
      filter: '',
      sort: 'oldest',
    };
    setParam(body);
    // const tempCount = counter + 1;
    // setCounter(tempCount);
    dispatch(productsAction.getProductsThunk(body, counter, add));
  };

  const add = () => {
    // setDataSources([...dataSources, ...product]);
    setDataSources(
      // ...dataSources, ...product
      product,
    );
  };

  const logOutMsg = () => {
    showMessage({
      message: 'Logout success!',
      type: 'success',
    });
    navigation.navigate('Login');
  };

  const logoutFunc = () => {
    dispatch(authAction.logoutThunk(token, logOutMsg));
    removeValue();
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log(value);
    } catch (e) {
       console.log(e.err);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (e) {
      // remove error
    }

    // console.log('Done.');
  };
  const [searchProduct, setSearchProduct] = useState('');
  const onChangeHandler = text => setSearchProduct(text);

  console.log(searchProduct);

  const debounceOnChange = debounce(onChangeHandler, 500);

  const url = 'http://192.168.137.1:8070';
  const countries = ['Most expensive', 'Cheapest', 'Newest', 'Oldest'];
  // console.log(param);

  const pageSize = 12;
  let page = pageIndex;
  const totalPages = Math.ceil(product.length / pageSize);
  console.log(page);
  const pageData = product.slice(page * pageSize - pageSize, page * pageSize);
  console.log(pageData);

  const nextData = () => {
    const tempCount = pageIndex + 1;
    setPageIndex(tempCount);
  };

  const addProductBtn = () => {
    navigation.navigate('AddProduct', {});
  };
  const addPromoBtn = () => {
    navigation.navigate('AddPromo', {});
  };


  const prevData = () => {
    const tempCount = pageIndex - 1;
    setPageIndex(tempCount);
  };

  useEffect(() => {
    getData();
    dispatch(productsAction.getProductsThunk(body, counter, add));
    dispatch(profileAction.getProfileThunk(id, token));
    // setDataSources(product);
    // addData()
  }, [counter]);

  const navigationView = () => (
    <View
      style={[
        styles.containerDrawer,
        // styles.navigationContainer
      ]}>
      <View style={styles.wrapperdrawer}>
        <View elevation={9} style={styles.drawermain}>
          <Image
            // source={
            //   {uri: `${url + getProfileInfo[0].image}`} === undefined
            //     ? cup
            //     : {uri: `${url + getProfileInfo[0].image}`}
            // }
            source={admin}
            style={styles.drawerpic}
          />
          <Text style={styles.names}>
            {getProfileInfo[0].name === undefined
              ? 'nama'
              : getProfileInfo[0].name}
          </Text>
          <Text style={styles.names2}>
            {getProfileInfo[0].email === undefined
              ? 'email'
              : getProfileInfo[0].email}
          </Text>
        </View>
      </View>
      <View style={styles.pwrapper}>
        <TouchableOpacity onPress={navToProfile}>
          <View style={styles.paragraph}>
            <Image style={styles.iconimg} source={drawer1} />
            <Text style={styles.cats}>Edit Profile</Text>
            <View />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navManageOrder}>
          <View style={styles.paragraph}>
            <Image style={styles.iconimg} source={drawer2} />
            <Text style={styles.cats}>Orders</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.paragraph}>
          <Image style={styles.iconimg} source={drawer3} />
          <Text style={styles.cats}>All Menu</Text>
        </View>
        <View style={styles.paragraph}>
          <Image style={styles.iconimg} source={drawer4} />
          <Text style={styles.cats}>Sales Report</Text>
        </View>
        <View style={styles.paragraph}>
          <Image style={styles.iconimg} source={drawer5} />
          <Text style={styles.cats}>Security</Text>
        </View>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.signout}>{`Sign-out ->`} </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Are you sure want to log out ?</Text>
            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={logoutFunc}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyles}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
          <View style={styles.goodWrapper}>
            <Text style={styles.good}>A good coffee is {'\n'}a good day</Text>
          </View>
          <View style={styles.searchWrapper}>
            <TextInput
              onChangeText={debounceOnChange}
              style={styles.search}
              placeholder="🔍 Search"
            />
          </View>
          <View style={styles.category}>
            <TouchableOpacity onPress={favData}>
              <Text>Favorite</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={promoData}>
              <Text>Promo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={coffeeData}>
              <Text>Coffee</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={nonCoffeeData}>
              <Text>Non-Coffee</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.dropdown}>
              <SelectDropdown
                data={countries}
                // defaultValueByIndex={1}
                // defaultValue={'Egypt'}
                onSelect={(selectedItem, index) => {
                  // console.log(selectedItem, index);
                  if (index === 0) {
                    mostExpensive();
                  }
                  if (index === 1) {
                    cheapest();
                  }
                  if (index === 2) {
                    newest();
                  }
                  if (index === 3) {
                    oldest();
                  }
                }}
                defaultButtonText={'Sort by :'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#444'}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />
            </View>

            <View style={styles.content}>
              {searchProduct === ''
                ? pageData &&
                  // dataSources
                  pageData
                    // dataSources
                    .filter(detail => {
                      if (pageData === '') {
                        return detail;
                      } else if (
                        detail.name
                          .toLowerCase()
                          .includes(searchProduct.toLowerCase())
                      ) {
                        return pageData;
                      }
                    })
                    .map(detail => {
                      return (
                        <ProductsAdmin
                          name={detail.name}
                          price={detail.price}
                          image={detail.image}
                          id={detail.id}
                          key={detail.id}
                        />
                      );
                    })
                : product &&
                  // dataSources
                  product
                    // dataSources
                    .filter(detail => {
                      if (product === '') {
                        return detail;
                      } else if (
                        detail.name
                          .toLowerCase()
                          .includes(searchProduct.toLowerCase())
                      ) {
                        return product;
                      }
                    })
                    .map(detail => {
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
            <View style={styles.pagination}>
              {pageIndex === 1 ? (
                <Text style={styles.nexts}>Prev</Text>
              ) : (
                <TouchableOpacity onPress={prevData}>
                  <Text style={styles.next}>Prev</Text>
                </TouchableOpacity>
              )}

              {pageIndex === totalPages ? (
                <Text style={styles.nexts}>Next</Text>
              ) : (
                <TouchableOpacity onPress={nextData}>
                  <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.buttons2}>
              <Pressable style={styles.inbuttons2} onPress={addProductBtn}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Add Product
                </Text>
              </Pressable>
            </View>
            <View style={styles.buttons2}>
              <Pressable style={styles.inbuttons3} onPress={addPromoBtn}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: '#6A4029',
                    textAlign: 'center',
                  }}>
                  Add Promo
                </Text>
              </Pressable>
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

// const renderFooter = () => {
//   return (
//     //Footer View with Load More button
//     <View style={styles.footer}>
//       <TouchableOpacity
//         activeOpacity={0.9}
//         onPress={getData}
//         //On Click of button load more data
//         style={styles.loadMoreBtn}>
//         <Text style={styles.btnText}>Load More</Text>
//         {loading ? (
//           <ActivityIndicator color="white" style={{marginLeft: 8}} />
//         ) : null}
//       </TouchableOpacity>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: '27%',
    height: 30,
    backgroundColor: '#6A4029',
    borderRadius: 5,
    right: -260,
  },
  dropdown1BtnTxtStyle: {color: 'white', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  dropdown: {
    marginTop: 20,
  },
  inbuttons2: {
    backgroundColor: '#6A4029',
    width: 350,
    height: 50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 20,
  },
  inbuttons3: {
    backgroundColor: '#FFBA33',
    width: 350,
    height: 50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 20,
  },
  buttons2: {
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  pagination: {
    padding: 20,
    flexDirection: 'row',
    // backgroundColor: 'grey'
  },
  next: {
    marginLeft: 10,
    right: -230,
    backgroundColor: '#6A4029',
    fontSize: 20,
    borderRadius: 5,
    width: 50,
    textAlign: 'center',
    color: 'white',
  },
  nexts: {
    marginLeft: 10,
    right: -230,
    backgroundColor: 'grey',
    fontSize: 20,
    borderRadius: 5,
    width: 50,
    textAlign: 'center',
    color: 'white',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#6A4029',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyles: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    marginLeft: 10,
  },
  good: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
  },
  pwrapper: {
    paddingLeft: 40,
    paddingTop: 40,
    // backgroundColor: 'grey',
  },
  cats: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A4029',
    width: 175,
    borderBottomWidth: 1,
    borderColor: '#6A4029',
  },
  iconimg: {
    width: 30,
    height: 30,
    // backgroundColor: 'blue',
    marginRight: 20,
  },
  signout: {
    paddingTop: 80,
    fontSize: 18,
    color: '#6A4029',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 20,
    color: '#6A4029',
    fontWeight: 'bold',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    paddingTop: 20,
    // paddingLeft: 20,
    // justifyContent: 'center'
    alignItems: 'center',
  },
  textDrawer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  names: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  containerDrawer: {
    borderTopRightRadius: 12,
  },
  names2: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 15,
    color: 'white',
  },
  drawerpic: {
    backgroundColor: 'blue',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  wrapperdrawer: {
    position: 'relative',
  },
  drawermain: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#6A4029',
    padding: 10,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  container: {
    height: '100%',
    // backgroundColor: 'grey',
  },
  sect: {
    flex: 1,
    height: 50,
    paddingTop: 20,
    right: 20,
  },
  descwrap: {
    width: 220,
  },
  status: {
    color: 'black',
  },
  idr: {
    marginTop: 5,
    color: 'black',
    borderBottomWidth: 1,
    width: 200,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'brown'
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
    marginTop: -20,
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

export default HompepageAdmin;
