import React, {Fragment, useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import sign from '../../assets/image/signupdata.jpg';
import {showMessage, hideMessage} from 'react-native-flash-message';
import { signup } from '../../Utils';
import eye from '../../assets/image/eye.png';
import eyedash from '../../assets/image/eyeSlash.png';

const SignUpData = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Login');
  
  };

  const onPress2 = () => {
    navigation.navigate('Login');
    showMessage({
      message: 'Register Success',
      type: 'success',
    });
  };
  const onPress3 = () => {
  
    showMessage({
      message: 'Email or phone already exist',
      type: 'danger',
    });
  };

  const [body, setBody] = useState({});


  const onChangeHandler = (text, type) => {
    setBody(body => ({...body, [type]: text}));
  };
  console.log(body);

  const submitHandler = async () => {
    try {
      const result = await signup(body);
      onPress2()
      console.log(result);
    } catch (error) {
      onPress3()
      console.log(error);
    }
  };
  const setvisible = e => {
    setPasswordVisibility(!passwordVisibility)
  };
  const [passwordVisibility, setPasswordVisibility] = useState(false); 

  return (
    <View style={styles.container}>
      <View style={styles.black}>
        <ImageBackground source={sign} resizeMode="cover" style={styles.image}>
          {/* <Text style={styles.text}></Text> */}
          <Text style={styles.textcoffee}>Sign Up</Text>
          <View style={styles.wrapper}>
            <TextInput
              onChangeText={text => onChangeHandler(text, 'email')}
              placeholderTextColor="white"
              placeholder="Enter your email adress"
              style={styles.form}
              name="email"
            />
            <TextInput
              onChangeText={text => onChangeHandler(text, 'password')}
              placeholderTextColor="white"
              placeholder="Enter your password"
              secureTextEntry={passwordVisibility === false ? true : false}
              style={styles.form}
              name="password"
            />
            <Pressable onPress={setvisible}>
            <Image 
            source={passwordVisibility ? eye : eyedash}
            style={styles.hidden}
            />
            </Pressable>
            <TextInput
              onChangeText={text => onChangeHandler(text, 'mobile_number')}
              placeholderTextColor="white"
              placeholder="Enter your phone number"
              style={styles.form}
              name="mobile_number"
            />
          </View>
          <View style={styles.buttons}>
            <Pressable style={styles.inbuttons} onPress={submitHandler}>
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
            <Pressable style={styles.inbuttons2} onPress={onPress}>
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
  form: {
    borderColor: 'white',
    borderBottomWidth: 2,
  },
  wrapper: {
    marginTop: 200,
    padding: 20,
  },
  black: {
    flex: 1,
    backgroundColor: 'black',
  },
  hidden:{
    position: 'absolute',
    width:20,
    height:20,
    right:0,
    bottom:20
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

export default SignUpData;
