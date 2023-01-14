import React, {useRef, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  DrawerLayoutAndroid,
  Modal,
  Touchable,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import option from '../../assets/image/options.png';
import pencil from '../../assets/image/pencil.png';
import back from '../../assets/image/back.png';
import cup from '../../assets/image/cup.png';
import drink2 from '../../assets/image/drink2.png';
import {useDispatch, useSelector} from 'react-redux';
import productsDetailAction from '../../redux/actions/productsDetail';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {getProductById} from '../../Utils';
import paymentAction from '../../redux/actions/cart';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import productsAction from '../../redux/actions/products';

const EditDetailAdmin = ({navigation, route}) => {
  const dispatch = useDispatch();
  const getUserDataProfile = useSelector(state => state.auth.userData);

  const token = getUserDataProfile.token;
  const {itemId} = route.params;
  console.log(itemId);
  const product = useSelector(state => state.productDetail.productsDetails[0]);
  

  const [modalVisible, setModalVisible] = useState(false);

  console.log(product);

  const onPress = () => {
    setBody({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    dispatch(paymentAction.payment(body));
    navigation.navigate('Cart');
  };
  const msg = () => {
    showMessage({
      message: 'Product Updated!',
      type: 'success',
    });
  };
  const msg2 = () => {
    showMessage({
      message: 'Update Failed!',
      type: 'danger',
    });
  };
  const openCamera = () => {
    const option = {
      mediaType: 'photo',
      quality: 1,
    };
    launchCamera(option, res => {
      if (res.didCancel) {
        console.log('user cancelled taking photo');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        const data = res.assets[0];
        setImageCamera(data);

        setBody({
          ...body,
          image: data,
        });
        setFormState({
          ...body,
          image: data,
        });
      }
    });
  };
  const openGallery = () => {
    const option = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(option, res => {
      if (res.didCancel) {
        console.log('user cancelled choosing photo');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        const data = res.assets[0];
        setImageCamera(data);

        setBody({
          ...body,
          // image: data.parts[0][1].image
          image: data,
          // image: data.uri.split('/').pop(),
        });
      }
    });
  };

  const url = 'http://192.168.137.1:8070';

  function formatUang(subject) {
    let rupiah = subject.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
    return `Rp${rupiah}`;
  }

  const [body, setBody] = useState({
    name : undefined,
    price: undefined,
    description: undefined,
    imageUrl : undefined
  });
  const [descProduct, setDescProduct] = useState(product.description);
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [imageCamera, setImageCamera] = useState({
    uri: product.image,
  });
  const [formState, setFormState] = useState({});

  const setName = () => {
    // setProductName(product.name)
    // setProductPrice(product.price)
    // setDescProduct(product.description)
    // setImageCamera({
    //   uri: `${url + product.image}`,
    // })
  };

  const handleInputValue1 = (text, type) => {
    setDescProduct({[type]: text});
  };
  const handleInputValue2 = (text, type) => {
    setProductName({[type]: text});
  };
  const handleInputValue3 = (text, type) => {
    setProductPrice({[type]: text});
  };
  const onChangeHandler = (text, type) => {
    setBody(body => ({...body, [type]: text}));
  };

  const data = new FormData();
  if (body.name !== undefined) {
    data.append('name', body.name);
  }
  if (body.price !== undefined) {
    data.append('price', body.price);
  }
  if (body.description !== undefined) {
    data.append('description', body.description);
  }
  if (body.image !== undefined) {
    data.append(
      'imageUrl',
      // body.image
      {
        uri: body.image.uri,
        name: body.image.fileName,
        size: body.image.fileSize,
        type: body.image.type,
      },
    );
  }

  console.log(data);

  const onPressEdit = () => {
    dispatch(productsAction.editProductThunk(data, itemId, token, msg, msg2));
  };

  //   const data = new FormData();
  //   if (body.name !== undefined) {
  //     data.append('name', body.name);
  //   }
  //   if (body.mobile_number !== undefined) {
  //     data.append('mobile_number', body.mobile_number);
  //   }
  //   if (body.address !== undefined) {
  //     data.append('address', body.address);
  //   }
  //   if (body.image !== undefined) {
  //     data.append(
  //       'imageUrl',
  //       // body.image
  //       {
  //         uri: body.image.uri,
  //         name: body.image.fileName,
  //         size: body.image.fileSize,
  //         type: body.image.type,
  //       },
  //     );
  //   }
  useEffect(() => {
    dispatch(productsDetailAction.getProductsDetailThunk(itemId, setName));
  }, []);

  return (
    <ScrollView>
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
              source={pencil}
              style={{
                width: 20,
                height: 20,
                marginLeft: 40,
              }}
            />
          </View>
        </View>
        <Pressable onPress={() => setModalVisible(true)}>
          <View style={styles.cupWrap}>
            {/* <Image
              source={
                {uri: `${url + product.image}`} ===
                // imagedet
                null
                  ? cup
                  : // imagedet
                    {uri: `${url + product.image}`}
              }
              style={styles.cupimg}
            /> */}
            {imageCamera != null && (
              <Image
                // onChangeText={changeHandlerInputImage}
                source={{uri: imageCamera.uri}}
                style={styles.cupimg}
              />
            )}
          </View>
        </Pressable>
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
          <View style={styles.prodName}>
            {/* {product.name === null ? cup : product.name} */}
            <TextInput
              placeholder="input product name.."
              value={productName}
              style={styles.formName}
              onChangeText={text => {
                handleInputValue2(text, 'name');
                onChangeHandler(text, 'name');
                //   onChangeHandlerForm(text, 'name');
              }}
            />
          </View>
        </View>
        <View style={styles.priceWrap}>
          <View style={styles.priceTag}>
            {/* {product.price === null ? 10 : rupiah(Number(product.price))} */}
            <TextInput
              style={styles.formPrice}
              keyboardType="numeric"
              placeholder="input product price.."
              //   value={
              //     productPrice.toString() === null
              //       ? 10
              //       : rupiah(productPrice.toString())

              //   }
              value={productPrice.toString()}
              onChangeText={e => {
                setProductPrice(e);
                onChangeHandler(Number(e), 'price');
              }}

              //   onChangeText={text => {
              //     handleInputValue3;
              //     //   setProductPrice(text, 'price');
              //     onChangeHandler(text, 'price');
              //   }}
            />
          </View>
        </View>
        <View style={styles.desc}>
          <Text style={styles.deliv}>Delivery info</Text>
          <Text style={styles.only}>
            Delivered only on monday until friday from 1 pm to 7 pm
          </Text>
          <Text style={styles.desc2}>Description</Text>
          <View style={styles.desc3}>
            {/* {product.description === null
            ? 'description text'
            : product.description} */}
            <TextInput
              multiline={true}
              numberOfLines={3}
              placeholder="input product description.."
              value={descProduct}
              style={styles.form}
              onChangeText={text => {
                handleInputValue1(text, 'description');
                onChangeHandler(text, 'description');
                //   onChangeHandlerForm(text, 'description');
              }}
            />
          </View>
        </View>
        <View style={styles.buttons2}>
          <Pressable style={styles.inbuttons2} onPress={onPressEdit}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: 'white',
                textAlign: 'center',
              }}>
              Save change
            </Text>
          </Pressable>
        </View>
      </View>

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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={openCamera}>
              <Text style={styles.textStyle}>Open Camera</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={openGallery}>
              <Text style={styles.textStyle}>Open Gallery</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyles}>X Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
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
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  cupimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  buttons2: {
    alignItems: 'center',
  },
  formPrice: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6A4029',
    fontSize: 24,
    borderBottomWidth: 1,
  },
  formName: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
    borderBottomWidth: 1,
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
    borderBottomWidth: 1,
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
    // backgroundColor: 'grey'
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

export default EditDetailAdmin;
