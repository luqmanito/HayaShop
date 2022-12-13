import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Pressable} from 'react-native';
import welcomepic from '../../assets/image/welcome.png';
import config from "../../../config"

const Welcome = ({navigation}) =>{ 
  const onPress = () => {
    navigation.navigate('SignUp')
    console.log(config.API_URL);
  };
  return (


  
  <View style={styles.container}>
    <ImageBackground
      source={welcomepic}
      resizeMode="cover"
      style={styles.image}>
      {/* <Text style={styles.text}></Text> */}
      <Text style={styles.textcoffee}>
        Coffee forr{'\n'}
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
            Get started
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
    
    backgroundColor: '#FFBA33',
    width:350,
    height:50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
  },
});

export default Welcome;
