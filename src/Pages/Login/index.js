import React, {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import sign from '../../assets/image/loginimg.jpg';
import authAction from '../../redux/actions/auth';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
  const onPress = () => {
    showMessage({
      message: 'Login Success',
      type: 'success',
    })
    navigation.navigate('Homepage');
  };
  const onPress2 = () => {
    showMessage({
      message: 'Email or password is wrong!',
      type: 'danger',
    });
  };

  const [body, setBody] = useState({});
  const dispatch = useDispatch();
  const onChangeHandler = (text, type) => {
    setBody(body => ({...body, [type]: text}));
  };
  console.log(body);

  const loginHandler = (e) => {
    console.log('logincuy');
    e.preventDefault();
    dispatch(
      authAction.loginThunk(body, onPress, onPress2)
    );
    
  };



  return (
    <View style={styles.container}>
      <View style={styles.black}>
        <ImageBackground source={sign} resizeMode="cover" style={styles.image}>
        
          <Text style={styles.textcoffee}>Login</Text>
          <View style={styles.wrapper}>
            <TextInput
            onChangeText={text => onChangeHandler(text, 'email')}
              placeholderTextColor="white"
              placeholder="Enter your email adress"
              style={styles.form}
            />
            <TextInput
            onChangeText={text => onChangeHandler(text, 'password')}
              placeholderTextColor="white"
              placeholder="Enter your password"
              style={styles.form}
            />
            <Text onPress={onPress2} style={styles.forgot}>Forgot Password</Text>
          </View>
          <View style={styles.buttons}>
            <Pressable style={styles.inbuttons} onPress={onPress}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  color: 'black',
                  textAlign: 'center',
                }}>
                Create New Account
              </Text>
            </Pressable>
          </View>
          <View style={styles.buttons2}>
            <Pressable style={styles.inbuttons2} onPress={loginHandler}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  color: 'black',
                  textAlign: 'center',
                }}>
                Login
              </Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

function onPress() {
  console.log('teken');
}

const styles = StyleSheet.create({
  forgot:{
    marginTop: 20,
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  form: {
    borderColor: 'white',
    borderBottomWidth: 2,
    fontWeight: 'bold'
  },
  wrapper: {
    marginTop: 200,
    padding : 20
  },
  black: {
    
    flex: 1,
    backgroundColor: 'black',
    // opacity: ,
   
    
  },
  container: {
    flex: 1,

    
  },
  image: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    
  },
  text: {
    position: 'relative',
    color: 'white',
    fontSize: 42,
    // lineHeight: 660,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  textcoffee: {
    top: 100,
    textAlign: 'center',
    color: 'white',
    fontSize: 82,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
  buttons: {
    marginTop: 20,
    alignItems: 'center',
  },
  inbuttons: {
    backgroundColor: '#6A4029',
    width: 350,
    height: 50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
  },
  inbuttons2: {
    backgroundColor: '#FFBA33',
    width: 350,
    height: 50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
    marginTop: 40,
  },
  buttons2: {
    alignItems: 'center',
  },
});

export default Login;
