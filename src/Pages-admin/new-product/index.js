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
  Modal,
  Touchable,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import back from '../../assets/image/back.png';
import plus from '../../assets/image/plus.png';
import cam from '../../assets/image/cam.png';
import del2 from '../../assets/image/del2.png';
import {color} from 'react-native-reanimated';
import RadioButton from '../../Components/Radiobtn';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import profileAction from '../../redux/actions/profile';
import {showMessage, hideMessage} from 'react-native-flash-message';
import productsAction from '../../redux/actions/products';

const AddProduct = ({navigation}) => {
  const dispatch = useDispatch();
  const getProfileInfo = useSelector(state => state.profile.profile.result);
  const getUserDataProfile = useSelector(state => state.auth.userData);

  const token = getUserDataProfile.token;
  const id = getUserDataProfile.id;

  const [select1, setSelect1] = useState(null);
  const [select2, setSelect2] = useState(null);
  const [date, setDate] = useState(new Date(getProfileInfo[0].birth_date));

  const tanggal = new Date(getProfileInfo[0].birth_date);
  const dds = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
    .format(date)
    .split(' ')
    .join('-');

  const [finalDate, setFinalDate] = useState(
    new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
      .format(date)
      .split(' ')
      .join('-'),
  );

  const [open, setOpen] = useState(false);
  const onPress1 = () => {
    setSelect1(true);
    setSelect2(false);
  };
  const url = 'http://192.168.137.1:8070';
  const onPress3 = () => {
    setSelect1(false);
    setSelect2(true);
  };
  const handleChange = date => {
    setDate(date);
  };

  const [body, setBody] = useState(false);
  const [nameUser, setNameUser] = useState(getProfileInfo[0].name);
  const [phoneUser, setPhoneUser] = useState(getProfileInfo[0].mobile_number);
  const [price, setPrice] = useState(finalDate);
  const [addressUser, setAddressUser] = useState(getProfileInfo[0].address);
  const [formState, setFormState] = useState({});

  const handleInputValue1 = (text, type) => {
    setNameUser({[type]: text});
  };
  const handleInputValue2 = (text, type) => {
    setPhoneUser({[type]: text});
  };
  const handleInputValue3 = (text, type) => {
    setPrice({[type]: text});
  };
  const handleInputValue4 = (text, type) => {
    setAddressUser({[type]: text});
  };
  const onChangeHandler = (text, type) => {
    setBody(body => ({...body, [type]: text}));
    // setFormState(({...formState, [type]: text}));
  };

  const onChangeHandlerForm = (text, type) => {
    setFormState(formState => ({...formState, [type]: text}));
  };

  const msg = () => {
    showMessage({
      message: 'Added new product success!',
      type: 'success',
    });
  };
  const msg2 = () => {
    showMessage({
      message: 'Sorry add new product failed!',
      type: 'danger',
    });
  };

  const [imageCamera, setImageCamera] = useState({
    uri: `${url + getProfileInfo[0].image}`,
  });

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
  
          image: data,
          
        });
      }
    });
  };



  const [modalVisible, setModalVisible] = useState(false);

  const data = new FormData();
  if (body.name !== undefined) {
    data.append('name', body.name);
  }
  if (body.price !== undefined) {
    data.append('price', Number(body.price));
  }
  if (body.delivery_info !== undefined) {
    data.append('delivery_info', body.delivery_info);
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
  const onPressSave = () => {
    dispatch(productsAction.addProductThunk(data, token, msg, msg2));
  };


  useEffect(() => {
    dispatch(profileAction.getProfileThunk(id, token));
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
            <Text style={styles.head}>New Product</Text>
          </View>
          <View style={styles.sect}>
            <Image
            source={del2}
            style={styles.delbtn}/>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.jaminan}>
          {imageCamera != null && (
              <Image
                // onChangeText={changeHandlerInputImage}
                source={{uri: imageCamera.uri}}
                style={styles.iconCard}
              />
            )}

            <Pressable
              onPress={() => setModalVisible(true)}>
              <Image source={plus} style={styles.number} />
            </Pressable>
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

          {/* <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable> */}
        </View>
        <Text style={styles.tagcat}>Name :</Text>
        <View style={styles.wrappers}>
          <TextInput
          multiline={true}
          numberOfLines={3}
            placeholder="Input the product name min. 30 characters"
            // value={nameUser}
            style={styles.form}
            onChangeText={text => {
              handleInputValue1(text, 'name');
              onChangeHandler(text, 'name');
              onChangeHandlerForm(text, 'name');
            }}
          />
        </View>
       
        <Text style={styles.tagcat}>Price :</Text>
        <View style={styles.wrappers}>
          <TextInput
            multiline={true}
            numberOfLines={3}
            placeholder="Input the product price"
            onChangeText={text => {
                handleInputValue3(text, 'price');
                onChangeHandler(text, 'price');
              }}
            style={styles.form}
          />
        </View>
        <Text style={styles.tagcat}>Delivery info :</Text>
        <View style={styles.wrappers}>
          <TextInput
            multiline={true}
            numberOfLines={3}
            // value={phoneUser}
            placeholder="Type delivery information"
            style={styles.form}
            onChangeText={text => {
              handleInputValue2(text, 'delivery_info');
              onChangeHandler(text, 'delivery_info');
            }}
          />
        </View>

        
        <Text style={styles.tagcat}>Description :</Text>
        <View style={styles.wrappers}>
          <TextInput
            multiline={true}
            numberOfLines={3}
            // value={addressUser}
            placeholder="Describe your product min. 150 characters"
            style={styles.form}
            onChangeText={text => {
              handleInputValue4(text, 'description');
              onChangeHandler(text, 'description');
            }}
          />
        </View>
        <View style={styles.buttons2}>
          <Pressable style={styles.inbuttons2} onPress={onPressSave}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: 'white',
                textAlign: 'center',
              }}>
              Save product
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

function onPress() {
  console.log('teken');
}

const styles = StyleSheet.create({
    delbtn:{
        width:40,
        height:40,
        marginLeft:60
    },
  cupimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  setdate: {
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
    right: 0,
  },
  btn_date: {
    width: 5,
    marginLeft: 50,
  },
  head: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    // marginLeft:20,
    // backgroundColor:'blue'
  },
  wrappers: {
    marginTop: -10,
  },
  tagcat: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'

  },
  directs: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  choice: {
    paddingLeft: 10,
    // marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    // borderBottomWidth: 1,
    width: 120,
  },
  form: {
    borderColor: 'black',
    borderBottomWidth: 2,
    fontWeight: 'bold',
  },
  wrapper: {
    padding: 20,
    alignItems: 'center',
  },
  iconCard: {
    width: 150,
    height: 150,
    borderRadius: 75,
    position: 'relative',
  },
  submain: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'space-around',
  },
  jaminan: {
    borderWidth: 1,
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    // backgroundColor: 'grey',
  },
  number: {
    width: 25,
    height: 25,
    position: 'absolute',
    bottom: 10,
    right: -70,
  },
  buttons2: {
    alignItems: 'center',
  },
  tittle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  inbuttons2: {
    backgroundColor: '#6A4029',
    width: 350,
    height: 50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
    marginTop: 20,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'grey'
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
    padding: 20
  },
  sect: {
    // backgroundColor: 'yellow',
    flex: 4.5,
  },
  dotdot: {
    alignItems: 'center',
    paddingTop: 30,
  },
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
});

export default AddProduct;

