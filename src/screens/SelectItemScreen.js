// import {
//   View,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   TextInput,
//   Alert,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import {addItemToSelectedItem} from './../action/Actions';

// import Feather from 'react-native-vector-icons/Feather';

// // const data = [
// //   {
// //     kodeItem: 'INR2500',
// //     namaItem: 'Nama Item-1',
// //     unit: 'Pcs',
// //     sisa: '1',
// //     qty: '1',
// //     note: '0',
// //     image: require('../assets/images/Altos-Odyssey.jpeg'),
// //   },
// //   {
// //     kodeItem: 'INR2501',
// //     namaItem: 'Nama Item-2',
// //     unit: 'Set',
// //     sisa: '1',
// //     qty: '2',
// //     note: '1',
// //     image: require('../assets/images/asphalt-9.jpeg'),
// //   },
// //   {
// //     kodeItem: 'INR2502',
// //     namaItem: 'Nama Item-3',
// //     unit: 'Pcs',
// //     sisa: '0',
// //     qty: '1',
// //     note: '1',
// //     image: require('../assets/images/genshin-impact.jpeg'),
// //   },
// //   {
// //     kodeItem: 'INR2503',
// //     namaItem: 'Nama Item-4',
// //     unit: 'Set',
// //     sisa: '2',
// //     qty: '1',
// //     note: '0',
// //     image: require('../assets/images/fortnite.webp'),
// //   },
// //   {
// //     kodeItem: 'INR2504',
// //     namaItem: 'Nama Item-5',
// //     unit: 'Pcs',
// //     sisa: '3',
// //     qty: '0',
// //     note: '1',
// //     image: require('../assets/images/pokemon-unite.jpeg'),
// //   },
// //   {
// //     kodeItem: 'INR2505',
// //     namaItem: 'Nama Item-6',
// //     unit: 'Set',
// //     sisa: '2',
// //     qty: '2',
// //     note: '2',
// //     image:
// //       // 'https://storage.sg.content-cdn.io/cdn-cgi/image/width=550,height=412,quality=75,format=auto/in-resources/e671b7de-bcf9-4637-af5c-0ffe1c9d208a/Images/ProductImages/Source/1011B192_004_SR_RT_GLBnw.jpg',
// //       require('../assets/images/diablo-4.jpeg'),
// //   },
// // ];
// const SelectItemScreen = () => {
//   const navigation = useNavigation();

//   const dispatch = useDispatch();

//   const addItem = item => {
//     dispatch(addItemToSelectedItem(item));
//     Alert.alert(
//       'Success Added Item',
//       `Item ${JSON.stringify(item.nama_item)} has been success added`,
//       // {props.item},
//       [
//         // {
//         //   text: "Cancel",
//         //   onPress: () => console.log("Cancel Pressed"),
//         //   style: "cancel"
//         // },
//         {text: 'OK', onPress: () => console.log('OK Pressed')},
//       ],
//     );
//   };

//   const items = useSelector(state => state);
//   let addedItems = [];
//   addedItems = items;

//   const [listData, setListData] = useState([]);
//   const [isLoading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   ambilListData();
//   // }, []);

//   // const ambilListData = async () => {
//   //   const url =
//   //     'http://192.168.1.10/works/PT-PKM-Batam/php-api/show-item-api.php';
//   //   await fetch(url)
//   //     .then(response => response.json())
//   //     .then(json => {
//   //       console.log('Hasil yang didapat: ' + JSON.stringify(json.data.result));
//   //       setListData({listData: json.data.result});
//   //     })
//   //     .catch(error => {
//   //       console.log(error);
//   //     });
//   // };

//   const ambilListData = async () => {
//     try {
//       const url =
//       'http://10.11.113.62/works/PT-PKM-Batam/php-api/show-item-api.php';
//       const response = await fetch(url);
//       const json = await response.json();
//       setListData(json.data.result);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     ambilListData();
//   }, []);

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={{flex: 1}}>
//         <View
//           style={{
//             flexDirection: 'row',
//             borderColor: '#C6C6C6',
//             borderWidth: 1,
//             borderRadius: 8,
//             paddingHorizontal: 4,
//             paddingVertical: 2,
//             marginLeft: 20,
//             marginRight: 20,
//             marginTop: 10,
//           }}>
//           <Feather name="search" size={20} color="#C6C6C6" />
//           <TextInput placeholder="Searching of items" />
//         </View>
//         <View
//           style={{
//             width: '150%',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             flexDirection: 'row',
//           }}>
//           {/* <Text style={{fontSize: 20, marginLeft: 20, fontWeight: '800'}}>
//             Please select an Items
//           </Text> */}

//           {/* <TouchableOpacity
//             style={{
//               width: 100,
//               height: 40,
//               borderRadius: 20,
//               backgroundColor: '#b3ffd9',
//               justifyContent: 'center',
//               alignItems: 'center',
//               flexDirection: 'row',
//               marginRight: 20,
//             }}
//             onPress={() => {
//               navigation.navigate('Selected Item');
//             }}>
//             <Image
//               source={require('./../assets/images/selected-icon.png')}
//               style={{width: 24, height: 24}}
//             />
//             <Text style={{marginLeft: 10, fontSize: 20, fontWeight: '800'}}>
//               {addedItems.length}
//             </Text>
//           </TouchableOpacity> */}
//         </View>
//         <FlatList
//           data={listData}
//           renderItem={({item, index}) => {
//             return (
//               <View
//                 style={{
//                   width: '90%',
//                   height: 60,
//                   borderRadius: 15,
//                   alignSelf: 'center',
//                   marginTop: 10,
//                   borderWidth: 0.2,
//                   borderColor: '#8e8e8e',
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   backgroundColor: '#fff',
//                 }}>
//                 <View style={{width: '60%', padding: 10}}>
//                   <Text>{item.kode_item}</Text>
//                   <Text style={{fontSize: 20, fontWeight: '600'}}>
//                     {item.nama_item}
//                   </Text>
//                 </View>
//                 <View style={{paddingRight: 10}}>
//                   <TouchableOpacity
//                     style={{
//                       height: 30,
//                       borderRadius: 10,
//                       width: 100,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       backgroundColor: 'green',
//                     }}
//                     onPress={() => {
//                       addItem(item);
//                     }}>
//                     <Text style={{color: '#fff'}}>Add</Text>
//                   </TouchableOpacity>
//                 </View>
//                 {/* <Image
//                   // source={{uri: item.image}}
//                   source={item.image}
//                   style={{
//                     width: 100,
//                     height: 90,
//                     borderRadius: 10,
//                     marginRight: 15,
//                   }}
//                 /> */}
//               </View>
//             );
//           }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SelectItemScreen;

// ----------------------------------------
// Using SQLite database
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Alert,
  LogBox,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
LogBox.ignoreAllLogs();
import {SearchBar} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToSelectedItem} from './../action/Actions';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {showMessage, hideMessage} from 'react-native-flash-message';

import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'sloko_app_db.db'});

const data = [
  {
    kode_item: 'INR2500',
    nama_item: 'Nama Item-1',
    unit: 'Pcs',
    sisa: '1',
    qty: '1',
    note: '0',
    image: require('../assets/images/Altos-Odyssey.jpeg'),
  },
  {
    kode_item: 'INR2501',
    nama_item: 'Nama Item-2',
    unit: 'Set',
    sisa: '1',
    qty: '2',
    note: '1',
    image: require('../assets/images/asphalt-9.jpeg'),
  },
  {
    kode_item: 'INR2502',
    nama_item: 'Nama Item-3',
    unit: 'Pcs',
    sisa: '0',
    qty: '1',
    note: '1',
    image: require('../assets/images/genshin-impact.jpeg'),
  },
  {
    kode_item: 'INR2503',
    nama_item: 'Nama Item-4',
    unit: 'Set',
    sisa: '2',
    qty: '1',
    note: '0',
    image: require('../assets/images/fortnite.webp'),
  },
  {
    kode_item: 'INR2504',
    nama_item: 'Nama Item-5',
    unit: 'Pcs',
    sisa: '3',
    qty: '0',
    note: '1',
    image: require('../assets/images/pokemon-unite.jpeg'),
  },
  {
    kode_item: 'INR2505',
    nama_item: 'Nama Item-6',
    unit: 'Set',
    sisa: '2',
    qty: '2',
    note: '2',
    image:
      // 'https://storage.sg.content-cdn.io/cdn-cgi/image/width=550,height=412,quality=75,format=auto/in-resources/e671b7de-bcf9-4637-af5c-0ffe1c9d208a/Images/ProductImages/Source/1011B192_004_SR_RT_GLBnw.jpg',
      require('../assets/images/diablo-4.jpeg'),
  },
];
const SelectItemScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const items = useSelector(state => state);
  let addedItems = [];
  addedItems = items;

  const addItem = item => {
    // get kode item from list state (0->data available, -1->data not available)
    const selectedValue = item.kode_item;
    const getKodeItem = items.findIndex(obj => obj.kode_item == selectedValue);
    console.log('get kode:', getKodeItem);

    if (getKodeItem >= 0) {
      showMessage({
        message: 'Failed!',
        description: 'Your item has been chosed',
        icon: props => (
          <MaterialIcons color="white" name="dangerous" size={20} {...props} />
        ),
        type: 'danger',
      });
      // Alert.alert(
      //   'Failed',
      //   'Item sudah pilih',
      //   [
      //     {
      //       text: 'Ok',
      //     },
      //   ],
      //   {cancelable: false},
      // );
    } else {
      dispatch(addItemToSelectedItem(item));
      showMessage({
        message: 'Success!',
        description: `Item ${JSON.stringify(
          item.nama_item,
        )} has been success added`,
        icon: props => (
          <AntDesign color="white" name="checkcircle" size={20} {...props} />
        ),
        type: 'success',
      });
      // Alert.alert(
      //   'Success Added Item',
      //   `Item ${JSON.stringify(item.nama_item)} has been success added`,
      //   [
      //     // {
      //     //   text: "Cancel",
      //     //   onPress: () => console.log("Cancel Pressed"),
      //     //   style: "cancel"
      //     // },
      //     {text: 'OK', onPress: () => console.log('OK Pressed')},
      //   ],
      // );
    }
  };

  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    // CreateTable();
    // InsertQuery();
    getData();
  }, [isFocused]);

  const ExecuteQuery = (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.transaction(trans => {
        trans.executeSql(
          sql,
          params,
          (trans, results) => {
            resolve(results);
          },
          error => {
            reject(error);
          },
        );
      });
    });

  // const CreateTable = () => {
  //   // console.log('CreateTable');

  //   ExecuteQuery('DROP TABLE IF EXISTS item_tb', []);
  //   ExecuteQuery(
  //     'CREATE TABLE IF NOT EXISTS item_tb(id INTEGER PRIMARY KEY AUTOINCREMENT, kode_item VARCHAR(255), nama_item VARCHAR(255), unit VARCHAR(255))',
  //     [],
  //   );
  // };

  // const InsertQuery = () => {
  //   let Data = [
  //     {kode_item: 'INR2500', nama_item: 'SPAN GAS', unit: 'Pcs'},
  //     {kode_item: 'INR2501', nama_item: 'TEROPONG', unit: 'Set'},
  //     {
  //       kode_item: 'INR2502',
  //       nama_item: 'PARACHUTE ROCKET',
  //       unit: 'Unit',
  //     },
  //     {kode_item: 'INR2503', nama_item: 'WIND SHOCK', unit: 'Pcs'},
  //     {kode_item: 'INR2504', nama_item: 'WATER PUMP', unit: 'Set'},
  //     {kode_item: 'INR2505', nama_item: 'EAR PLUG', unit: 'Pcs'},
  //   ];
  //   let query = 'INSERT INTO item_tb (kode_item, nama_item, unit) VALUES';
  //   for (let i = 0; i < Data.length; ++i) {
  //     query =
  //       query +
  //       "('" +
  //       Data[i].kode_item + //user_id
  //       "','" +
  //       Data[i].nama_item + //country_name
  //       "','" +
  //       Data[i].unit + //is_deleted
  //       "')";
  //     if (i != Data.length - 1) {
  //       query = query + ',';
  //     }
  //   }
  //   query = query + ';';
  //   console.log(query);

  //   ExecuteQuery(query, []);
  // };

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM item_tb LEFT JOIN (SELECT sisa,qty,note,lampiran FROM req_item_tb WHERE sisa IS NULL) GROUP by item_tb.id',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            console.log(results.rows.item(i));
            temp.push(results.rows.item(i));
          }
          setUserList(temp);
          console.log(temp);
          setMasterDataSource(temp);
          
          setLoading(false);
        },
      );
    });
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.nama_item
          ? item.nama_item.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setUserList(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setUserList(masterDataSource);
      setSearch(text);
    }
  };

  // const onChangeTextSisa = (item, text) => {
  //   let updateProducts = [...userList];
  //   let index = userList.findIndex(obj => obj.id == item.id);
  //   updateProducts[index].sisa = text;
  //   setUserList(updateProducts);
  //   console.log('list:', userList);
  // };

  // const onChangeTextQty = (item, text) => {
  //   let updateProducts = [...userList];
  //   let index = userList.findIndex(obj => obj.id == item.id);
  //   updateProducts[index].qty = text;
  //   setUserList(updateProducts);
  //   console.log('list:', userList);
  // };

  // const onChangeTextNote = (item, text) => {
  //   let updateProducts = [...userList];
  //   let index = userList.findIndex(obj => obj.id == item.id);
  //   updateProducts[index].note = text;
  //   setUserList(updateProducts);
  //   console.log('list:', userList);
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        round
        containerStyle={{
          backgroundColor: '#0096FF',
          justifyContent: 'space-around',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{backgroundColor: 'white'}}
        leftIconContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        searchIcon={{size: 24}}
        onChangeText={text => searchFilterFunction(text)}
        onClear={text => searchFilterFunction('')}
        placeholder="Searching of items..."
        value={search}
      />
      <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={{
              width: '150%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            {/* <Text style={{fontSize: 20, marginLeft: 20, fontWeight: '800'}}>
            Please select an Items
          </Text> */}

            {/* <TouchableOpacity
            style={{
              width: 100,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#b3ffd9',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginRight: 20,
            }}
            onPress={() => {
              navigation.navigate('Selected Item');
            }}>
            <Image
              source={require('./../assets/images/selected-icon.png')}
              style={{width: 24, height: 24}}
            />
            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: '800'}}>
              {addedItems.length}
            </Text>
          </TouchableOpacity> */}
          </View>
          {/* <View style={{height: 530}}> */}
          {isLoading ? <ActivityIndicator/> : Array.isArray(userList)
            ? userList.map((item, index) => (
                <View
                  key={index}
                  style={{
                    width: '90%',
                    height: 100,
                    borderRadius: 15,
                    alignSelf: 'center',
                    marginTop: 10,
                    borderWidth: 0.2,
                    borderColor: '#8e8e8e',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                  }}>
                  <View style={{width: '60%', padding: 10}}>
                    <Text style={{fontSize: 10}}>{item.kode_item}</Text>
                    <Text style={{fontSize: 11, fontWeight: '600'}}>
                      {item.nama_item}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      {/* <TextInput
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          borderBottomColor: '#ccc',
                          borderTopColor: '#ccc',
                          borderLeftColor: '#ccc',
                          borderRightColor: '#ccc',
                          borderBottomWidth: 0.5,
                          borderTopWidth: 0.5,
                          borderLeftWidth: 0.5,
                          borderRightWidth: 0.5,
                          borderRadius: 10,
                          marginRight: 2,
                          width: 50,
                          textAlign: 'center',
                        }}
                        placeholder="Sisa"
                        onChangeText={text => onChangeTextSisa(item, text)}
                        // value={item == 0 ? item.sisa: ''}
                      /> */}
                      {/* <TextInput
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          borderBottomColor: '#ccc',
                          borderTopColor: '#ccc',
                          borderLeftColor: '#ccc',
                          borderRightColor: '#ccc',
                          borderBottomWidth: 0.5,
                          borderTopWidth: 0.5,
                          borderLeftWidth: 0.5,
                          borderRightWidth: 0.5,
                          borderRadius: 10,
                          marginRight: 2,
                          width: 50,
                          textAlign: 'center',
                        }}
                        placeholder="Qty"
                        onChangeText={text => onChangeTextQty(item, text)}
                      /> */}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      {/* <TextInput
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          borderBottomColor: '#ccc',
                          borderTopColor: '#ccc',
                          borderLeftColor: '#ccc',
                          borderRightColor: '#ccc',
                          borderBottomWidth: 0.5,
                          borderTopWidth: 0.5,
                          borderLeftWidth: 0.5,
                          borderRightWidth: 0.5,
                          borderRadius: 10,
                          width: 150,
                          textAlign: 'center',
                        }}
                        placeholder="Note"
                        onChangeText={text => onChangeTextNote(item, text)}
                      /> */}
                    </View>
                  </View>
                  <View style={{paddingRight: 10}}>
                    <TouchableOpacity
                      style={{
                        height: 30,
                        borderRadius: 10,
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'green',
                      }}
                      onPress={() => {
                        addItem(item);
                        // navigation.navigate('New IRM', {
                        //   sisa: item.sisa,
                        // })
                      }}>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <MaterialIcons name="add" size={20} color="#fff" />

                        <Text style={{color: '#fff', marginLeft: 5}}>Add</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* <Image
                  // source={{uri: item.image}}
                  source={item.image}
                  style={{
                    width: 100,
                    height: 90,
                    borderRadius: 10,
                    marginRight: 15,
                  }}
                /> */}
                </View>
              ))
            : ''}
        </View>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectItemScreen;
