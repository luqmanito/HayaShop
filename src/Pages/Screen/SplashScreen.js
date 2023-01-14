import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {View, Text, Image} from 'react-native';
import splash from '../../assets/image/logo.png';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SplashScreen() {
  const navigation = useNavigation();

  const getUserDataProfile = useSelector(state => state.auth.userData);
  const getProfileInfo = useSelector(state => state.profile.result);
  const id = getUserDataProfile.id;
  const role = getUserDataProfile.role;

  const [hideSplash, setHideSplash] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      // console.log(value);
      if (!value) {
        navigation.dispatch(StackActions.replace('Welcome'));
      } else {
        if (role === 'user') {
        navigation.dispatch(StackActions.replace('HomepageAdmin'));  
        }
        if (role === 'admin') {
          navigation.dispatch(StackActions.replace('Homepage'));  
        }
        if (role === null) {
          navigation.dispatch(StackActions.replace('Welcome'));
        }
        
      }
    } catch (e) {
      navigation.dispatch(StackActions.replace('Login'));
      // console.log('ga ada');
    }
  };

  useEffect(() => {
    setHideSplash(true);
    setTimeout(() => {
      setHideSplash(false);
      // console.log(token);
      // if (getProfileInfo) {
      //   navigation.dispatch(StackActions.replace('Homepage'));
      // } else if (getProfileInfo === []) {
      //   navigation.dispatch(StackActions.replace('Welcome'));
      // }

      getData()
      // navigation.dispatch(StackActions.replace('Welcome'));
    },1);
  }, []);

  return (
    <View style={styles.container}>
      {hideSplash ? (
        <View style={styles.main}>
          <Image source={splash} style={styles.bg} />
          <Text>Copyright © 2023</Text>
        </View>
      ) : (
        ''
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    alignItems: 'center',
    // backgroundColor: 'grey',
    justifyContent: 'center',
  },
  bg: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  mainText: {
    color: 'brown',
    textAlign: 'center',
    justifyContent: 'center',

    fontSize: 40,
  },
  secondText: {
    color: 'red',
    textAlign: 'center',
    justifyContent: 'center',

    fontSize: 18,
  },
  thirdText: {
    color: 'red',
    textAlign: 'center',
    justifyContent: 'center',

    fontSize: 20,
  },
});

// export default SplashScreen;
