import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import sign from '../../assets/image/changepw.jpg';

const ForgotPassword = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Login');
    console.log('te');
  };
  return (
    <View style={styles.container}>
      <View style={styles.black}>
        <ImageBackground source={sign} resizeMode="cover" style={styles.image}>
          <Text style={styles.textcoffee}>Don't Worry!</Text>
          <View style={styles.wrapper}>
            <TextInput
              placeholderTextColor="white"
              placeholder="Enter your email adress"
              style={styles.form}
            />
          </View>
          <View style={styles.link}>
            <Text style={styles.any}>Haven't received any link?</Text>
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
                Resend Link
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
  forgot: {
    marginTop: 20,
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  form: {
    borderColor: 'white',
    borderBottomWidth: 2,
    fontWeight: 'bold',
  },
  wrapper: {
    marginTop: 200,
    padding: 20,
  },
  black: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
  },
  link: {
    paddingLeft: 20,
    
  },
  any: {
    color: 'white',
    fontWeight: 'bold'
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

export default ForgotPassword;
