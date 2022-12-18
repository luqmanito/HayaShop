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


// const App = () => {
//   const [loading, setLoading] = useState(true);
//   const [dataSource, setDataSource] = useState([]);
//   const [offset, setOffset] = useState(1);

//   useEffect(() => getData(), []);

//   const getData = () => {
//     console.log('getData');
//     setLoading(true);
//     //Service to get the data from the server to render
//     fetch('https://abooutreactapis.000webhostapp.com/getpost.php?offset='
//           + offset)
//       //Sending the currect offset with get request
//       .then((response) => response.json())
//       .then((responseJson) => {
//         //Successful response
//         setOffset(offset + 1);
//         //Increasing the offset for the next API call
//         setDataSource([...dataSource, ...responseJson.results]);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const renderFooter = () => {
//     return (
//       //Footer View with Load More button
//       <View style={styles.footer}>
//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={getData}
//           //On Click of button load more data
//           style={styles.loadMoreBtn}>
//           <Text style={styles.btnText}>Load More</Text>
//           {loading ? (
//             <ActivityIndicator
//               color="white"
//               style={{marginLeft: 8}} />
//           ) : null}
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const ItemView = ({item}) => {
//     return (
//       // Flat List Item
//       <Text
//         style={styles.itemStyle}
//         onPress={() => getItem(item)}>
//         {item.id}
//         {'.'}
//         {item.title.toUpperCase()}
//       </Text>
//     );
//   };

//   const ItemSeparatorView = () => {
//     return (
//       // Flat List Item Separator
//       <View
//         style={{
//           height: 0.5,
//           width: '100%',
//           backgroundColor: '#C8C8C8',
//         }}
//       />
//     );
//   };

//   const getItem = (item) => {
//     //Function for click on an item
//     alert('Id : ' + item.id + ' Title : ' + item.title);
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <FlatList
//           data={dataSource}
//           keyExtractor={(item, index) => index.toString()}
//           ItemSeparatorComponent={ItemSeparatorView}
//           enableEmptySections={true}
//           renderItem={ItemView}
//           ListFooterComponent={renderFooter}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     flex: 1,
//   },
//   footer: {
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   loadMoreBtn: {
//     padding: 10,
//     backgroundColor: '#800000',
//     borderRadius: 4,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnText: {
//     color: 'white',
//     fontSize: 15,
//     textAlign: 'center',
//   },
// });

// export default App;