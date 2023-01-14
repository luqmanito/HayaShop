import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import drink1 from '../../assets/image/drink1.png';
import checked from '../../assets/image/check.jpg';
import unchecked from '../../assets/image/uncheck.jpg';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import transactionAction from '../../redux/actions/transaction';
import {ScrollView} from 'react-native-gesture-handler';

function ProductsPaymentAdmin(props) {
  const navigation = useNavigation();
  const url = 'http://192.168.137.1:8070';
  const idku = props.id;
  console.log(idku);
  const dispatch = useDispatch();
  const rupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };
  const getUserDataProfile = useSelector(state => state.auth.userData);
  const token = getUserDataProfile.token;
  const [body, setBody] = useState({
    status: 'Success',
  });
  const markDone = () => {
    dispatch(transactionAction.editAllHistoryTransactionThunk(body, idku, change));
  };

  console.log(body);

  const [isCheck, setIsCheck] = useState(false);

  const change = () => {
    setIsCheck(true);
  };

  const onPressDel = () => {
    console.log(props.id);
    dispatch(
      transactionAction.deleteHistoryTransactionThunk(idku, token),
    );
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={markDone}>
        <View style={styles.wrapper} elevation={9}>
          <Image style={styles.images} source={{uri: props.image}} />
          <View>
            <Text style={styles.tittle}>{props.name}</Text>
            <Text style={styles.idr}>{rupiah(Number(props.grandTotal))}</Text>
            <Text style={styles.status}>{props.status}</Text>
          </View>

          <View
            style={{
              alignItems: 'flex-end',
              position: 'absolute',
              right: 0,
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={props.selected === false ? unchecked : checked}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  idr: {
    color: '#895537',
  },
  delimg: {
    // position: 'absolute',
    width: 30,
    height: 30,
    marginLeft: 50,
    // zIndex: 10,
  },
  imgw: {
    backgroundColor: 'grey',
  },
  touch: {
    // zIndex:1
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
  },
  images: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ProductsPaymentAdmin;
