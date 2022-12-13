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

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={Welcome}>
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
          </Stack.Navigator>
          <FlashMessage position="top" />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
