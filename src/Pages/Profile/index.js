import React, {useRef, useState} from 'react';
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
import cup from '../../assets/image/cup.png';
import back from '../../assets/image/back.png';
import {useDispatch, useSelector} from 'react-redux';
import RadioButton from '../../Components/Radiobtn';

const Profile = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('EditProfile');
  };
  const getProfileInfo = useSelector(state => state.profile.profile.result);
console.log(getProfileInfo);
  const onPress2 = () => {
    setSelect(false);
    setSelect1(false);
    setSelect2(true);
  };
  const onPress1 = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect(true);
  };

  const onPress3 = () => {
    setSelect(false);
    setSelect2(false);
    setSelect1(true);
  };

  const [select, setSelect] = useState(null);
  const [select1, setSelect1] = useState(null);
  const [select2, setSelect2] = useState(null);
  const url = 'http://192.168.137.1:8070';
  const navigate = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.delivery}>My Profile</Text>
      </View>
      <View style={styles.direct}>
        <Text style={styles.details}>Your Information</Text>
        <TouchableOpacity onPress={navigate}>
          <Text style={styles.change}>edit</Text>
        </TouchableOpacity>
      </View>
      <View
        elevation={9}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 12,
        }}>
        <Image
          source={{uri: getProfileInfo[0].image}}
          style={{width: 90, height: 90, borderRadius: 50, marginRight: 20}}
        />
        <View style={styles.descwrap}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {getProfileInfo[0].name}
          </Text>
          <Text style={styles.idr}>{getProfileInfo[0].email}</Text>
          <Text style={styles.idr}>{getProfileInfo[0].mobile_number}</Text>
          <Text style={styles.status}>{getProfileInfo[0].address}</Text>
        </View>
      </View>

      <View style={styles.submain} elevation={9}>
        <TouchableOpacity onPress={onPress1} style={styles.directs}>
          <Text style={styles.choice}>Order History {'>'} </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.submain} elevation={9}>
        <TouchableOpacity onPress={onPress1} style={styles.directs}>
          <Text style={styles.choice}>Edit Password {'>'} </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.submain} elevation={9}>
        <TouchableOpacity onPress={onPress1} style={styles.directs}>
          <Text style={styles.choice}>FAQ {'>'} </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.submain} elevation={9}>
        <TouchableOpacity onPress={onPress1} style={styles.directs}>
          <Text style={styles.choice}>Help {'>'} </Text>
        </TouchableOpacity>
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
            Save Change
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 30,
  },
  descwrap: {
    width: 220,
  },
  choice: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25,
    width: 280,
  },
  status: {
    color: 'black',
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
  street: {
    fontWeight: 'bold',
    color: 'black',
    borderBottomWidth: 1,
  },
  detail: {
    marginTop: 5,
    color: 'black',
    borderBottomWidth: 1,
  },
  idr: {
    marginTop: 5,
    color: 'black',
    borderBottomWidth: 1,
    width: 200,
  },
  submain: {
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
  },
  red: {
    // backgroundColor: 'red',
    flex: 3,
    height: 50,
    padding: 20,
  },
  main: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sect: {
    // backgroundColor: 'yellow',
    flex: 1,
    height: 50,
    paddingTop: 20,
  },
  delivery: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
  },
  direct: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 30,
  },
  directs: {
    display: 'flex',
    flexDirection: 'row',
    // paddingTop: 20,
    // paddingBottom: 20,
  },
  details: {
    flex: 5,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  change: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#6A4029',
    fontSize: 16,
  },
  changes: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
