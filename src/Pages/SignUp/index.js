import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Pressable} from 'react-native';
import sign from '../../assets/image/signup.png';

const SignUp = ({navigation}) =>{ 
  function onPress() {
    navigation.navigate('SignUpData')
  }

  const onPress2 = () => {
    navigation.navigate('Login');
  };
  
  return(
  <View style={styles.container}>
    <ImageBackground
      source={sign}
      resizeMode="cover"
      style={styles.image}>
      {/* <Text style={styles.text}></Text> */}
      <Text style={styles.textcoffee}>
        Coffee for{'\n'}
        everyone
      </Text>
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
        <Pressable style={styles.inbuttons2} onPress={onPress2}>
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
)}



const styles = StyleSheet.create({
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
    position: 'absolute',
    top: 100,
    right: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 82,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
  buttons: {
    marginTop: 450,
    alignItems:'center'
  },
  inbuttons: {
    backgroundColor: '#6A4029',
    width:350,
    height:50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
  },
  inbuttons2: {
    backgroundColor: '#FFBA33',
    width:350,
    height:50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
    marginTop:40,
  },
  buttons2:{
    alignItems:'center'
  }
 
});

export default SignUp;
