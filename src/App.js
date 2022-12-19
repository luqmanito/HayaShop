import React from 'react';
import {View, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistedStore} from './redux/store';

import ForgotPassword from './Pages/ForgotPassword';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Welcome from './Pages/Welcome/';
import SignUpData from './Pages/SignupData';
import Hompepage from './Pages/Homepage';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Delivery from './Pages/Delivery';
import Payment from './Pages/Payment';
import History from './Pages/History';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';
import FlashMessage from 'react-native-flash-message';
import Products from './Components/Product';
import { SplashScreen } from './Pages/Screen/SplashScreen';
import ProductDetailAdmin from './Pages-admin/product-detail';
import HompepageAdmin from './Pages-admin/homepage';
import EditDetailAdmin from './Pages-admin/edit-product';
import ManageOrder from './Pages-admin/manage-order';
import AddProduct from './Pages-admin/new-product';
import AddPromo from './Pages-admin/new-promo';


const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='SplashScreen'>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{title: 'Welcomes', headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUpData"
              component={SignUpData}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Forgot"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Homepage"
              component={Hompepage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Delivery"
              component={Delivery}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="History"
              component={History}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Products"
              component={Products}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomepageAdmin"
              component={HompepageAdmin}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductDetailAdmin"
              component={ProductDetailAdmin}
              options={{headerShown: false}}
            />
           <Stack.Screen
              name="EditDetailAdmin"
              component={EditDetailAdmin}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageOrder"
              component={ManageOrder}
              options={{headerShown: false}}
            />
              <Stack.Screen
              name="AddProduct"
              component={AddProduct}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddPromo"
              component={AddPromo}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
          <FlashMessage position="top" />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;


// import React, { useState} from 'react';
// import {
//   TextInput,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import NotifService from './NotifService';

// const App = () => {
//   const [registerToken, setRegisterToken] = useState('');
//   const [fcmRegistered, setFcmRegistered] = useState(false);

//   const onRegister = token => {
//     setRegisterToken(token.token);
//     setFcmRegistered(true);
//   };

//   const onNotif = notif => {
//     Alert.alert(notif.title, notif.message);
//   };
//   const notif = new NotifService(onRegister, onNotif);
//   const handlePerm = perms => {
//     Alert.alert('Permission', JSON.stringify(perms));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Example app react-native-push-notification
//       </Text>
//       <View style={styles.spacer}></View>
//       <TextInput
//         style={styles.textField}
//         value={registerToken}
//         placeholder="Register token"
//       />
//       <View style={styles.spacer}></View>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.localNotif();
//         }}>
//         <Text>Local Notification (now)</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.localNotif('sample.mp3');
//         }}>
//         <Text>Local Notification with sound (now)</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.scheduleNotif();
//         }}>
//         <Text>Schedule Notification in 30s</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.scheduleNotif('sample.mp3');
//         }}>
//         <Text>Schedule Notification with sound in 30s</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.cancelNotif();
//         }}>
//         <Text>Cancel last notification (if any)</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.cancelAll();
//         }}>
//         <Text>Cancel all notifications</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.checkPermission(handlePerm());
//         }}>
//         <Text>Check Permission</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.requestPermissions();
//         }}>
//         <Text>Request Permissions</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.abandonPermissions();
//         }}>
//         <Text>Abandon Permissions</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.getScheduledLocalNotifications(notifs => console.log(notifs));
//         }}>
//         <Text>Console.Log Scheduled Local Notifications</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.getDeliveredNotifications(notifs => console.log(notifs));
//         }}>
//         <Text>Console.Log Delivered Notifications</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.createOrUpdateChannel();
//         }}>
//         <Text>Create or update a channel</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.popInitialNotification();
//         }}>
//         <Text>popInitialNotification</Text>
//       </TouchableOpacity>

//       <View style={styles.spacer}></View>

//       {fcmRegistered && <Text>FCM Configured !</Text>}

//       <View style={styles.spacer}></View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   button: {
//     borderWidth: 1,
//     borderColor: '#000000',
//     margin: 5,
//     padding: 5,
//     width: '70%',
//     backgroundColor: '#DDDDDD',
//     borderRadius: 5,
//   },
//   textField: {
//     borderWidth: 1,
//     borderColor: '#AAAAAA',
//     margin: 5,
//     padding: 5,
//     width: '70%',
//   },
//   spacer: {
//     height: 10,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     textAlign: 'center',
//   },
// });

// export default App