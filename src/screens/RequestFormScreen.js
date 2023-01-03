// import React, {useState} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Image,
//   Button,
//   FlatList,
//   Modal,
//   LogBox,
// } from 'react-native';
// // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
// const {width} = Dimensions.get('window');

// import DatePicker from 'react-native-date-picker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// // import InputField from './../components/InputField';

// // import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import CustomButton from './../components/CustomButton';
// // import { Label } from 'react-native-form-component';

// import {Dropdown} from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import SelectDropdown from 'react-native-select-dropdown';
// // import ReactNativeItemSelect from 'react-native-item-select';
// import {useDispatch, useSelector} from 'react-redux';
// import {removeItemFromSelectedItem} from './../action/Actions';

// const RequestFormScreen = ({navigation, route}) => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [Cdate, setCDate] = useState(new Date().toLocaleDateString('fr-FR'));
//   const [CdateLabel, setCdateLabel] = useState('');
//   // const [mydate, setMyDate] = useState(new Date());
//   // const [myopen, setMyOpen] = useState(false);
//   // const [dateLabel, setDateLabel] = useState('');

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = date => {
//     const d = new Date(date).toLocaleDateString('fr-FR');
//     console.warn('A date has been picked: ', d);
//     hideDatePicker();
//   };

//   const [deskripsi, setDeskripsi] = useState('');
//   const [kapal_id, setKapalId] = useState('');
//   const [nama_dep, setNamaDep] = useState('');
//   const [sisa, setSisa] = useState([]);
//   const [kode_item, setKodeItem] = useState('');

//   const [date, setDate] = useState(new Date());
//   const [open, setOpen] = useState(false);
//   const [dobLabel, setDobLabel] = useState('');

//   const kapal = [
//     {label: 'Kapal 1', kapal_id: '1'},
//     {label: 'Kapal 2', kapal_id: '2'},
//     {label: 'Kapal 3', kapal_id: '3'},
//     {label: 'Kapal 4', kapal_id: '4'},
//     {label: 'Kapal 5', kapal_id: '5'},
//     {label: 'Kapal 6', kapal_id: '6'},
//     {label: 'Kapal 7', kapal_id: '7'},
//     {label: 'Kapal 8', kapal_id: '8'},
//   ];

//   const departemen = [
//     {label: 'Deck', nama_dep: 'Deck'},
//     {label: 'Mesin', nama_dep: 'Mesin'},
//   ];

//   const [value, setValue] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);

//   // const renderLabel = () => {
//   //   if (value || isFocus) {
//   //     return (
//   //       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
//   //         Dropdown label
//   //       </Text>
//   //     );
//   //   }
//   //   return null;
//   // };

//   const items = useSelector(state => state);
//   let addedItems = [];
//   addedItems = items;

//   // const items = useSelector(state => state);
//   const dispatch = useDispatch();
//   const removeItem = index => {
//     dispatch(removeItemFromSelectedItem(index));
//   };

//   const klikSimpan = () => {
//     if (
//       deskripsi == '' ||
//       kapal_id == '' ||
//       nama_dep == '' ||
//       Cdate == '' ||
//       sisa == ''
//     ) {
//       alert('Silakan masukkan data');
//     } else {
//       var urlAksi =
//         'http://10.11.113.62/works/PT-PKM-Batam/php-api/add-data-api.php' +
//         '/?op=create';

//       fetch(urlAksi, {
//         method: 'post',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body:
//           'deskripsi=' +
//           deskripsi +
//           '&kapal_id=' +
//           kapal_id +
//           '&nama_dep=' +
//           nama_dep +
//           '&Cdate=' +
//           Cdate +
//           '&sisa=' +
//           sisa,
//       })
//         .then(response => response.json())
//         .then(json => {
//           setDeskripsi({deskripsi: ''});
//           setKapalId({kapal_id: ''});
//           setNamaDep({nama_dep: ''});
//           setCDate({Cdate: ''});
//           setSisa({sisa: ''});
//           // setKodeItem({kode_item: ''});
//           console.log('Hasil yang didapat: ' + JSON.stringify(sisa));
//           alert('Success adding data');
//           navigation.navigate('Root');
//         });
//     }
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
//         <Text style={{paddingBottom: 15}}>Request Date</Text>
//         <TouchableOpacity onPress={showDatePicker}>
//           <View
//             style={{
//               flexDirection: 'row',
//               borderBottomColor: '#ccc',
//               borderTopColor: '#ccc',
//               borderLeftColor: '#ccc',
//               borderRightColor: '#ccc',
//               borderBottomWidth: 1,
//               borderTopWidth: 1,
//               borderLeftWidth: 1,
//               borderRightWidth: 1,
//               paddingBottom: 15,
//               paddingTop: 15,
//               paddingLeft: 15,
//               paddingRight: 15,
//               marginBottom: 20,
//               borderRadius: 10,
//             }}>
//             <Ionicons
//               name="calendar-outline"
//               size={20}
//               color="#666"
//               style={{marginRight: 5}}
//             />
//             <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
//               {CdateLabel}
//             </Text>
//           </View>
//         </TouchableOpacity>
//         <DateTimePickerModal
//           dateFormat="dd/MM/yyyy"
//           isVisible={isDatePickerVisible}
//           // open={isDatePickerVisible}
//           mode="date"
//           value={Cdate}
//           // onConfirm={handleConfirm}
//           onConfirm={date => {
//             setDatePickerVisibility(false);
//             setCDate(date.toLocaleDateString('fr-FR'));
//             setCdateLabel(date.toLocaleDateString('fr-FR'));
//           }}
//           onCancel={hideDatePicker}
//           onChange={date => {
//             const d = new Date(date).toLocaleDateString('fr-FR');
//             console.log(d);
//             setCDate(d);
//           }}
//         />

//         {/* <TouchableOpacity onPress={() => setOpen(true)}>
//           <View
//             style={{
//               flexDirection: 'row',
//               borderBottomColor: '#ccc',
//               borderTopColor: '#ccc',
//               borderLeftColor: '#ccc',
//               borderRightColor: '#ccc',
//               borderBottomWidth: 1,
//               borderTopWidth: 1,
//               borderLeftWidth: 1,
//               borderRightWidth: 1,
//               paddingBottom: 15,
//               paddingTop: 15,
//               paddingLeft: 15,
//               paddingRight: 15,
//               marginBottom: 20,
//               borderRadius: 10,
//             }}>
//             <Ionicons
//               name="calendar-outline"
//               size={20}
//               color="#666"
//               style={{marginRight: 5}}
//             />
//             <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
//               {dobLabel}
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <DatePicker
//           modal
//           open={open}
//           date={date}
//           mode={'date'}
//           maximumDate={new Date('2100-01-01')}
//           minimumDate={new Date('1980-01-01')}
//           onConfirm={date => {
//             setOpen(false);
//             setDate(date);
//             setDobLabel(date.toDateString());
//           }}
//           onCancel={() => {
//             setOpen(false);
//           }}
//           onDateChange={dobLabel => setDobLabel(dobLabel)}
//         /> */}

//         <Text style={{paddingBottom: 15}}>Nama Kapal</Text>
//         <View style={styles.container}>
//           {/* {renderLabel()} */}
//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             iconStyle={styles.iconStyle}
//             data={kapal}
//             search
//             maxHeight={300}
//             labelField="label"
//             valueField="kapal_id"
//             placeholder="Select item kapal"
//             searchPlaceholder="Search..."
//             value={kapal_id}
//             onChange={item => setKapalId(item.kapal_id)}
//             renderLeftIcon={() => (
//               <FontAwesome
//                 style={styles.icon}
//                 color="black"
//                 name="ship"
//                 size={20}
//               />
//             )}
//           />
//         </View>

//         <Text style={{paddingBottom: 15}}>Departemen</Text>
//         <View style={styles.container}>
//           {/* {renderLabel()} */}
//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             iconStyle={styles.iconStyle}
//             data={departemen}
//             search
//             maxHeight={300}
//             labelField="label"
//             valueField="nama_dep"
//             placeholder="Select item departemen"
//             searchPlaceholder="Search..."
//             value={nama_dep}
//             onChange={item => setNamaDep(item.nama_dep)}
//             renderLeftIcon={() => (
//               <AntDesign
//                 style={styles.icon}
//                 color="black"
//                 name="Safety"
//                 size={20}
//               />
//             )}
//           />
//         </View>

//         <Text style={{paddingBottom: 15}}>Deskripsi</Text>
//         <View
//           style={{
//             flexDirection: 'row',
//             borderBottomColor: '#ccc',
//             borderTopColor: '#ccc',
//             borderLeftColor: '#ccc',
//             borderRightColor: '#ccc',
//             borderBottomWidth: 1,
//             borderTopWidth: 1,
//             borderLeftWidth: 1,
//             borderRightWidth: 1,
//             paddingBottom: 15,
//             paddingTop: 15,
//             paddingLeft: 15,
//             paddingRight: 15,
//             marginBottom: 20,
//             borderRadius: 10,
//           }}>
//           {/* <MaterialIcons
//               name="description"
//               size={20}
//               color="#666"
//               style={{marginRight: 5}}
//             /> */}
//           <TextInput
//             underlineColorAndroid="transparent"
//             placeholderTextColor="grey"
//             numberOfLines={3}
//             multiline={true}
//             onChangeText={deskripsi => setDeskripsi(deskripsi)}
//           />
//         </View>

//         <Text style={{paddingBottom: 15}}>Select Item</Text>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Select Item', {})}>
//           <View
//             style={{
//               flexDirection: 'row',
//               borderBottomColor: '#ccc',
//               borderTopColor: '#ccc',
//               borderLeftColor: '#ccc',
//               borderRightColor: '#ccc',
//               borderBottomWidth: 1,
//               borderTopWidth: 1,
//               borderLeftWidth: 1,
//               borderRightWidth: 1,
//               paddingBottom: 15,
//               paddingTop: 15,
//               paddingLeft: 15,
//               paddingRight: 15,
//               marginBottom: 20,
//               borderRadius: 10,
//             }}>
//             <MaterialCommunityIcons
//               name="plus-box-multiple-outline"
//               size={20}
//               color="#666"
//               style={{marginRight: 5}}
//             />
//             <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}></Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{
//             flexDirection: 'row',
//             borderBottomColor: '#ccc',
//             borderTopColor: '#ccc',
//             borderLeftColor: '#ccc',
//             borderRightColor: '#ccc',
//             borderBottomWidth: 1,
//             borderTopWidth: 1,
//             borderLeftWidth: 1,
//             borderRightWidth: 1,
//             paddingBottom: 15,
//             paddingTop: 15,
//             paddingLeft: 15,
//             paddingRight: 15,
//             marginBottom: 20,
//             borderRadius: 10,
//             backgroundColor: '#b3ffd9',
//           }}
//           onPress={() => {
//             // navigation.navigate('Selected Item');
//             setOpen(true);
//           }}>
//           <Image
//             source={require('./../assets/images/selected-icon.png')}
//             style={{width: 24, height: 24}}
//           />
//           <Text
//             style={{
//               marginLeft: 10,
//               fontSize: 20,
//               fontWeight: '800',
//               marginRight: 10,
//             }}>
//             Selected Items
//           </Text>
//           <Text
//             style={{
//               fontSize: 20,
//               fontWeight: '800',
//             }}>
//             :
//           </Text>
//           <Text style={{marginLeft: 10, fontSize: 20, fontWeight: '800'}}>
//             {addedItems.length}
//           </Text>
//         </TouchableOpacity>

//         {/* <FlatList
//           data={items}
//           renderItem={({item, index}) => {
//             return (

//             );
//           }}
//         /> */}
//         {Array.isArray(items)
//           ? items.map((item, index) => (
//               <>
//                 <View
//                   style={{
//                     width: '100%',
//                     height: 160,
//                     borderRadius: 15,
//                     alignSelf: 'center',
//                     marginBottom: 20,
//                     borderWidth: 0.2,
//                     borderColor: '#8e8e8e',
//                     flexDirection: 'row',
//                     justifyContent: 'space-around',
//                     alignItems: 'center',
//                     backgroundColor: '#fff',
//                   }}>
//                   <View style={{width: '60%', padding: 10}}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                       }}>
//                       <Text>{item.kode_item}</Text>
//                       {Array.isArray(item.kode_item) ? (
//                         <TextInput
//                           value={item.kode_item}
//                           onChangeText={item =>
//                             setKodeItem(item.kode_item, index)
//                           }></TextInput>
//                       ) : null}
//                       <Text> - </Text>
//                       <Text>{item.unit}</Text>
//                     </View>
//                     <Text style={{fontSize: 20, fontWeight: '600'}}>
//                       {item.nama_item}
//                     </Text>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                       }}>
//                       <TextInput
//                         style={{
//                           fontSize: 20,
//                           fontWeight: '600',
//                           borderBottomColor: '#ccc',
//                           borderTopColor: '#ccc',
//                           borderLeftColor: '#ccc',
//                           borderRightColor: '#ccc',
//                           borderBottomWidth: 0.5,
//                           borderTopWidth: 0.5,
//                           borderLeftWidth: 0.5,
//                           borderRightWidth: 0.5,
//                           borderRadius: 10,
//                           marginRight: 2,
//                           width: 50,
//                           textAlign: 'center',
//                         }}
//                         placeholder="Sisa"
//                         onChangeText={item => setSisa(item.sisa, index)}
//                       />
//                       <TextInput
//                         style={{
//                           fontSize: 20,
//                           fontWeight: '600',
//                           borderBottomColor: '#ccc',
//                           borderTopColor: '#ccc',
//                           borderLeftColor: '#ccc',
//                           borderRightColor: '#ccc',
//                           borderBottomWidth: 0.5,
//                           borderTopWidth: 0.5,
//                           borderLeftWidth: 0.5,
//                           borderRightWidth: 0.5,
//                           borderRadius: 10,
//                           marginRight: 2,
//                           width: 50,
//                           textAlign: 'center',
//                         }}
//                         placeholder="Qty"
//                       />
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                       }}>
//                       <TextInput
//                         style={{
//                           fontSize: 20,
//                           fontWeight: '600',
//                           borderBottomColor: '#ccc',
//                           borderTopColor: '#ccc',
//                           borderLeftColor: '#ccc',
//                           borderRightColor: '#ccc',
//                           borderBottomWidth: 0.5,
//                           borderTopWidth: 0.5,
//                           borderLeftWidth: 0.5,
//                           borderRightWidth: 0.5,
//                           borderRadius: 10,
//                           width: 150,
//                           textAlign: 'center',
//                         }}
//                         placeholder="Note"
//                       />
//                     </View>
//                   </View>
//                   <Image
//                     // source={{uri: item.image}}
//                     source={item.image}
//                     style={{
//                       width: 100,
//                       height: 90,
//                       borderRadius: 10,
//                     }}
//                   />
//                   <TouchableOpacity
//                     style={{
//                       height: 30,
//                       borderRadius: 10,
//                       width: 30,
//                       justifyContent: 'space-around',
//                       alignItems: 'center',
//                       backgroundColor: 'red',
//                       marginRight: 10,
//                     }}
//                     onPress={() => {
//                       removeItem(index);
//                     }}>
//                     {/* <Text style={{color: '#fff'}}>Remove</Text> */}
//                     <MaterialIcons
//                       name="remove-circle-outline"
//                       size={20}
//                       color="white"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </>
//             ))
//           : null}

//         <TouchableOpacity
//           onPress={() => klikSimpan()}
//           style={{
//             backgroundColor: '#0000FF',
//             padding: 20,
//             borderRadius: 10,
//             marginBottom: 10,
//           }}>
//           <Text
//             style={{
//               textAlign: 'center',
//               fontWeight: '700',
//               fontSize: 16,
//               color: '#fff',
//             }}>
//             Save
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {}}
//           style={{
//             backgroundColor: '#008080',
//             padding: 20,
//             borderRadius: 10,
//             marginBottom: 30,
//           }}>
//           <Text
//             style={{
//               textAlign: 'center',
//               fontWeight: '700',
//               fontSize: 16,
//               color: '#fff',
//             }}>
//             Reset
//           </Text>
//         </TouchableOpacity>
//         {/* <Modal visible={open}>
//           <SafeAreaView style={{flex: 1}}>
//             <View style={{flex: 1}}>//flatlist</View>
//           </SafeAreaView>
//           <Button
//             title="Close"
//             onPress={() => {
//               setOpen(false);
//             }}></Button>
//         </Modal> */}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default RequestFormScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     paddingBottom: 15,
//   },
//   dropdown: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });

// ----------------------------------------
// Using SQLite database
import React, {useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  FlatList,
  Modal,
  Alert,
  LogBox,
  Pressable,
} from 'react-native';
LogBox.ignoreAllLogs();
const {width} = Dimensions.get('window');

import AsyncStorage from '@react-native-async-storage/async-storage';

import {showMessage, hideMessage} from 'react-native-flash-message';

import DatePicker from 'react-native-date-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// import InputField from './../components/InputField';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomButton from './../components/CustomButton';
// import { Label } from 'react-native-form-component';

import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SelectDropdown from 'react-native-select-dropdown';
// import ReactNativeItemSelect from 'react-native-item-select';
import {useDispatch, useSelector} from 'react-redux';
import {removeItemFromSelectedItem} from './../action/Actions';

import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'sloko_app_db.db'});
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const RequestFormScreen = ({navigation, route}) => {
  const [kapalAs, setKapalAs] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(10).then(() => setRefreshing(false));
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Cdate, setCDate] = useState(new Date().toLocaleDateString('fr-FR'));
  const [CdateLabel, setCdateLabel] = useState('');
  // const [mydate, setMyDate] = useState(new Date());
  // const [myopen, setMyOpen] = useState(false);
  // const [dateLabel, setDateLabel] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const d = new Date(date).toLocaleDateString('fr-FR');
    console.warn('A date has been picked: ', d);
    hideDatePicker();
  };

  const [isLoading, setLoading] = useState(true);
  const [listDataItem, setListDataItem] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [file, setFile] = useState({
    filepath: {
      data: '',
      uri: '',
    },
    fileData: '',
    fileUri: '',
  });

  const [deskripsi, setDeskripsi] = useState('');
  const [id_kapal, setKapalId] = useState('');
  const [nama_dep, setNamaDep] = useState('');
  const [sisa, setSisa] = useState([]);
  const [kode_item, setKodeItem] = useState('');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('');

  const kapal = [
    {label: 'Kapal 1', kapal_id: '1'},
    {label: 'Kapal 2', kapal_id: '2'},
    {label: 'Kapal 3', kapal_id: '3'},
    {label: 'Kapal 4', kapal_id: '4'},
    {label: 'Kapal 5', kapal_id: '5'},
    {label: 'Kapal 6', kapal_id: '6'},
    {label: 'Kapal 7', kapal_id: '7'},
    {label: 'Kapal 8', kapal_id: '8'},
  ];

  const departemen = [
    {label: 'Deck', nama_dep: 'Deck'},
    {label: 'Mesin', nama_dep: 'Mesin'},
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // const renderLabel = () => {
  //   if (value || isFocus) {
  //     return (
  //       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
  //         Dropdown label
  //       </Text>
  //     );
  //   }
  //   return null;
  // };

  const items = useSelector(state => state);
  let addedItems = [];
  addedItems = items;

  // const items = useSelector(state => state);
  const dispatch = useDispatch();
  const removeItem = index => {
    dispatch(removeItemFromSelectedItem(index));
  };

  useEffect(() => {
    AsyncStorage.getItem('UserData').then(value => {
      if (value != null) {
        const newValue = JSON.parse(value);
        var newValueInt = Number(newValue.id_kapal.toString());
        // save id kapal
        setKapalId(newValueInt);

        // get data kapal from database
        db.transaction(tx => {
          tx.executeSql(
            'SELECT nama_kapal FROM kapal_tb WHERE id_kapal=?',
            [newValueInt],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i).nama_kapal);
              }
              setKapalAs(temp);
              console.log('get nama kapal:', temp);
            },
          );
        });
      }
    });

    // reset selected item
    console.log('item lengt:', items.length);
    if (items.length != 0) {
      for (let index = 0; index < 100; index++) {
        for (let j = 0; j < items.length; j++) {
          removeItem(j);
        }
      }
    }

    // console.log('useEffect');
    CreateTable();
    // InsertQueryKapal();
  }, []);

  const ExecuteQuery = (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.transaction(trans => {
        trans.executeSql(
          sql,
          params,
          (trans, results) => {
            resolve(results);
            console.log('Results', results.rowsAffected);
          },
          error => {
            reject(error);
          },
        );
      });
    });

  const CreateTable = () => {
    // console.log('CreateTable');

    // ExecuteQuery('DROP TABLE IF EXISTS kapal_tb', []);
    // ExecuteQuery(
    //   'CREATE TABLE IF NOT EXISTS kapal_tb(id_kapal INTEGER PRIMARY KEY AUTOINCREMENT, nama_kapal VARCHAR(255))',
    //   [],
    // );

    // ExecuteQuery('DROP TABLE IF EXISTS request_tb', []);
    ExecuteQuery(
      'CREATE TABLE IF NOT EXISTS request_tb(id INTEGER PRIMARY KEY AUTOINCREMENT, irm_number VARCHAR(255), req_date TEXT, kapal_id INT(11), deskripsi TEXT, departemen VARCHAR(255), status VARCHAR(255))',
      [],
    );

    ExecuteQuery(
      'CREATE TABLE IF NOT EXISTS req_item_tb(id INTEGER PRIMARY KEY AUTOINCREMENT, kode_item_req VARCHAR(255), sisa INT(11), qty INT(11), note VARCHAR(255), lampiran VARCHAR(255), irm_number_req VARCHAR(255))',
      [],
    );

    // ExecuteQuery('DROP TABLE IF EXISTS item_tb', []);
    // ExecuteQuery(
    //   'CREATE TABLE IF NOT EXISTS item_tb(id INTEGER PRIMARY KEY, kode_item VARCHAR(255), nama_item VARCHAR(255), unit VARCHAR(255))',
    //   [],
    // );
    // console.log(stateTable);
  };

  // const InsertQueryKapal = () => {
  //   let Data = [
  //     {nama_kapal: 'CAHAYA ALAM 9'},
  //     {nama_kapal: 'CAHAYA ALAM V'},
  //     {nama_kapal: 'CAHAYA ALAM XI'},
  //     {nama_kapal: 'CIPTA REJEKI VIII, MT'},
  //     {nama_kapal: 'CAHAYA ALAM 9'},
  //     {nama_kapal: 'CPT 1004'},
  //     {nama_kapal: 'ERA CIPTA I'},
  //     {nama_kapal: 'KUTAI 1'},
  //     {nama_kapal: 'TB. NIAGA MAS'},
  //   ];
  //   let query = 'INSERT INTO kapal_tb (nama_kapal) VALUES';
  //   for (let i = 0; i < Data.length; ++i) {
  //     query =
  //       query +
  //       "('" +
  //       Data[i].nama_kapal + //user_id
  //       "')";
  //     if (i != Data.length - 1) {
  //       query = query + ',';
  //     }
  //   }
  //   query = query + ';';
  //   console.log(query);

  //   ExecuteQuery(query, []);
  // };

  const InsertQuery = () => {
    if (
      deskripsi.length == 0 ||
      Cdate.length == 0 ||
      // id_kapal.length == 0 ||
      nama_dep.length == 0 ||
      addedItems.length == 0
    ) {
      // Alert.alert('Warning!', 'Please write your data.');
      showMessage({
        message: 'Warning!',
        description: 'Please write your data.',
        icon: props => (
          <Entypo color="white" name="warning" size={20} {...props} />
        ),
        type: 'warning',
      });
    } else {
      // single insert query
      const irm_number = Math.floor(Math.random() * 1000000000);
      const status = 'Local';
      ExecuteQuery(
        'INSERT INTO request_tb (irm_number, req_date, kapal_id, deskripsi, departemen, status) VALUES (?,?,?,?,?,?)',
        [irm_number, Cdate, id_kapal, deskripsi, nama_dep, status],
      );
      // console.log(singleInsert);

      // multiple insert of users
      console.log('addedItems', addedItems);
      // let Data = [{"irm_number_req": 2232421213}, { "irm_number_req": 3233221321}];
      if (addedItems.length != 0) {
        let query =
          'INSERT INTO req_item_tb (irm_number_req, kode_item_req, sisa, qty, note, lampiran) VALUES';
        for (let i = 0; i < addedItems.length; ++i) {
          query =
            query +
            "('" +
            irm_number +
            "','" +
            addedItems[i].kode_item +
            "','" +
            addedItems[i].sisa +
            "','" +
            addedItems[i].qty +
            "','" +
            addedItems[i].note +
            "','" +
            addedItems[i].lampiran +
            "')";
          if (i != addedItems.length - 1) {
            query = query + ',';
          }
        }
        query = query + ';';
        console.log(query);

        ExecuteQuery(query, []);
        // console.log(multipleInsert);
      }

      // if (results.rowsAffected > 0) {
      // Alert.alert(
      //   'Success',
      //   'You are Successfully adding data',
      //   [
      //     {
      //       text: 'Ok',
      //       onPress: () => navigation.navigate('Root'),
      //     },
      //   ],
      //   {cancelable: false},
      // );
      navigation.navigate('Root');
      showMessage({
        message: 'Success!',
        description: 'You are Successfully adding data',
        icon: props => (
          <AntDesign color="white" name="checkcircle" size={20} {...props} />
        ),
        type: 'success',
      });
      // }

      // reset selected item
      // for (let index = 0; index < items.length; index++) {
      //   removeItem(index);
      // }
    }
  };

  // const saveUser = () => {
  //   // console.log(irm_number, Cdate, kapal_id, deskripsi, nama_dep, status);
  //   // console.log(sisa);
  //   if (
  //     deskripsi.length == 0 ||
  //     Cdate.length == 0 ||
  //     kapal_id.length == 0 ||
  //     nama_dep.length == 0
  //   ) {
  //     Alert.alert('Warning!', 'Please write your data.');
  //   } else {
  //     db.transaction(function (tx) {
  //       tx.executeSql(
  //         '',
  //         [],
  //         (tx, results) => {

  //         },
  //         error => {
  //           console.log(error);
  //         },
  //       );
  //       // tx.executeSql(
  //       //   'INSERT INTO req_item_tb (sisa, irm_number_req) VALUES (?,?)',
  //       //   [sisa, irm_number],
  //       //   (tx, results) => {
  //       //     console.log('Results', results.rowsAffected);
  //       //     if (results.rowsAffected > 0) {
  //       //       Alert.alert(
  //       //         'Success',
  //       //         'You are Successfully adding data',
  //       //         [
  //       //           {
  //       //             text: 'Ok',
  //       //             onPress: () => navigation.navigate('Root'),
  //       //           },
  //       //         ],
  //       //         {cancelable: false},
  //       //       );
  //       //     } else alert('Failed add data');
  //       //   },
  //       //   error => {
  //       //     console.log(error);
  //       //   },
  //       // );
  //     });
  //   }
  // };

  const onChangeTextSisa = (item, text) => {
    let updateProducts = [...items];
    let index = items.findIndex(obj => obj.id == item.id);
    updateProducts[index].sisa = text;
    if (updateProducts[index].sisa == 0) {
      showMessage({
        message: 'Warning!',
        description: 'Please write your data.',
        icon: props => (
          <Entypo color="white" name="warning" size={20} {...props} />
        ),
        type: 'warning',
      });
    } else {
      // setUserList(updateProducts);
      console.log('list:', items);
    }
  };

  const onChangeTextQty = (item, text) => {
    let updateProducts = [...items];
    let index = items.findIndex(obj => obj.id == item.id);
    updateProducts[index].qty = text;
    if (updateProducts[index].qty == 0) {
      showMessage({
        message: 'Warning!',
        description: 'Please write your data.',
        icon: props => (
          <Entypo color="white" name="warning" size={20} {...props} />
        ),
        type: 'warning',
      });
    } else {
      // setUserList(updateProducts);
      console.log('list:', items);
    }
  };

  const onChangeTextNote = (item, text) => {
    let updateProducts = [...items];
    let index = items.findIndex(obj => obj.id == item.id);
    updateProducts[index].note = text;
    if (updateProducts[index].note == 0) {
      showMessage({
        message: 'Warning!',
        description: 'Please write your data.',
        icon: props => (
          <Entypo color="white" name="warning" size={20} {...props} />
        ),
        type: 'warning',
      });
    } else {
      // setUserList(updateProducts);
      console.log('list:', items);
    }
  };

  // get camera and gallery
  const launchCam = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response json', response.assets[0].uri);
        setFile({
          filePath: response,
          fileData: response.assets,
          fileUri: response.assets[0].uri,
        });
      }
    });
  };

  const launchImg = (item, text) => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let updateProducts = [...items];
        let index = items.findIndex(obj => obj.id == item.id);
        updateProducts[index].lampiran = response.assets[0].uri;
        // setUserList(updateProducts);
        console.log('list:', items);

        const source = {uri: response.uri};
        console.log('response json', response.assets[0].uri);
        setFile({
          filePath: response,
          fileData: response.assets,
          fileUri: response.assets[0].uri,
        });
      }
    });
  };

  // get and save data API item from server
  // const listDataItemApi = async () => {
  //   var url =
  //     'http://erp.pkmgroup.co.id/pkmerp/erp/apis/?task=item2&dtsource=dbpkmerp_cpt&key=3';
  //   await fetch(url)
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log('Hasil yang didapat: ' + JSON.stringify(json));
  //       setListDataItem(json);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   try {
  //     const response = await fetch(url);
  //     const json = await response.json();
  //     console.log('Data Item API Server: ' + JSON.stringify(json));
  //     // insert data kapal from server into sqlite
  //     let query = 'INSERT INTO item_tb (kode_item, nama_item, unit) VALUES ';
  //     for (let i = 0; i < json.length; ++i) {
  //       query = query + "('" + json[i].item_code + "','" + json[i].item_name + "','" + json[i].unit_name + "')";
  //       if (i != json.length - 1) {
  //         query = query + ',';
  //       }
  //     }
  //     query = query + ';';
  //     console.log(query);

  //     ExecuteQuery(query, []);

  //     setListDataItem(json);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{padding: 20}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={{paddingBottom: 15}}>Request Date</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#ccc',
              borderTopColor: '#ccc',
              borderLeftColor: '#ccc',
              borderRightColor: '#ccc',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              paddingBottom: 15,
              paddingTop: 15,
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 20,
              borderRadius: 10,
            }}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
              {CdateLabel}
            </Text>
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          dateFormat="dd/MM/yyyy"
          isVisible={isDatePickerVisible}
          // open={isDatePickerVisible}
          mode="date"
          value={Cdate}
          // onConfirm={handleConfirm}
          onConfirm={date => {
            setDatePickerVisibility(false);
            setCDate(date.toLocaleDateString('fr-FR'));
            setCdateLabel(date.toLocaleDateString('fr-FR'));
          }}
          onCancel={hideDatePicker}
          onChange={date => {
            const d = new Date(date).toLocaleDateString('fr-FR');
            console.log(d);
            setCDate(d);
          }}
        />

        {/* <TouchableOpacity onPress={() => setOpen(true)}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#ccc',
              borderTopColor: '#ccc',
              borderLeftColor: '#ccc',
              borderRightColor: '#ccc',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              paddingBottom: 15,
              paddingTop: 15,
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 20,
              borderRadius: 10,
            }}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
              {dobLabel}
            </Text>
          </View>
        </TouchableOpacity>

        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          maximumDate={new Date('2100-01-01')}
          minimumDate={new Date('1980-01-01')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
          onDateChange={dobLabel => setDobLabel(dobLabel)}
        /> */}

        <Text style={{paddingBottom: 15}}>Nama Kapal</Text>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderTopColor: '#ccc',
            borderLeftColor: '#ccc',
            borderRightColor: '#ccc',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            paddingBottom: 5,
            paddingTop: 5,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 20,
            borderRadius: 10,
            alignContent: 'center',
            alignItems: 'center',
          }}>
          {/* {renderLabel()} */}
          {/* <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={kapalList}
            search
            maxHeight={300}
            labelField="nama_kapal"
            valueField="id_kapal"
            placeholder="Select item kapal"
            searchPlaceholder="Search..."
            value={id_kapal}
            onChange={item => setKapalId(item.id_kapal)}
            renderLeftIcon={() => (
              <FontAwesome
                style={styles.icon}
                color="black"
                name="ship"
                size={20}
              />
            )}
          /> */}
          <FontAwesome
            style={styles.icon}
            color="black"
            name="ship"
            size={20}
          />
          <TextInput
            editable={false}
            style={{color: 'black'}}
            value={kapalAs.toString()}
            onChangeText={item => setKapalId(item.id_kapal)}
          />
        </View>

        <Text style={{paddingBottom: 15}}>Departemen</Text>
        <View style={styles.container}>
          {/* {renderLabel()} */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={departemen}
            search
            maxHeight={300}
            labelField="label"
            valueField="nama_dep"
            placeholder="Select item departemen"
            searchPlaceholder="Search..."
            value={nama_dep}
            onChange={item => setNamaDep(item.nama_dep)}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
          />
        </View>

        <Text style={{paddingBottom: 15}}>Deskripsi</Text>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderTopColor: '#ccc',
            borderLeftColor: '#ccc',
            borderRightColor: '#ccc',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            paddingBottom: 15,
            paddingTop: 15,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 20,
            borderRadius: 10,
          }}>
          {/* <MaterialIcons
              name="description"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            /> */}
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
            numberOfLines={3}
            multiline={true}
            onChangeText={deskripsi => setDeskripsi(deskripsi)}
          />
        </View>

        <Text style={{paddingBottom: 15}}>Select Item</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Select Item', {})}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#ccc',
              borderTopColor: '#ccc',
              borderLeftColor: '#ccc',
              borderRightColor: '#ccc',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              paddingBottom: 15,
              paddingTop: 15,
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 20,
              borderRadius: 10,
            }}>
            <MaterialCommunityIcons
              name="plus-box-multiple-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}></Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderTopColor: '#ccc',
            borderLeftColor: '#ccc',
            borderRightColor: '#ccc',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            paddingBottom: 15,
            paddingTop: 15,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 20,
            borderRadius: 10,
            backgroundColor: '#b3ffd9',
          }}
          onPress={() => {
            // navigation.navigate('Selected Item');
            setOpen(true);
          }}>
          <Image
            source={require('./../assets/images/selected-icon.png')}
            style={{width: 24, height: 24}}
          />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontWeight: '800',
              marginRight: 10,
            }}>
            Selected Items
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '800',
            }}>
            :
          </Text>
          <Text style={{marginLeft: 10, fontSize: 20, fontWeight: '800'}}>
            {addedItems.length}
          </Text>
        </TouchableOpacity>

        {Array.isArray(items)
          ? items.map((item, index) => (
              <>
                <View
                  key={index}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 15,
                    alignSelf: 'center',
                    marginBottom: 20,
                    borderWidth: 0.2,
                    borderColor: '#8e8e8e',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                  }}>
                  <View style={{width: '60%', padding: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text style={{fontSize: 10}}>{item.kode_item}</Text>
                      {/* {Array.isArray(item.kode_item) ? (
                        <TextInput
                          value={item.kode_item}
                          onChangeText={item =>
                            setKodeItem(item.kode_item, index)
                          }></TextInput>
                      ) : null} */}
                      <Text style={{fontSize: 10}}> - </Text>
                      <Text style={{fontSize: 10}}>{item.unit}</Text>
                    </View>
                    <Text style={{fontSize: 11, fontWeight: '600'}}>
                      {item.nama_item}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <TextInput
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
                          marginRight: 4,
                          width: 60,
                          textAlign: 'center',
                        }}
                        placeholder="Sisa"
                        onChangeText={text => onChangeTextSisa(item, text)}
                        keyboardType="numeric"
                      />
                      {/* <Text
                        style={{
                          width: 70,
                          fontSize: 18,
                          fontWeight: '600',
                        }}>
                        Sisa : {item.sisa}
                      </Text> */}
                      <TextInput
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
                          width: 60,
                          textAlign: 'center',
                        }}
                        placeholder="Qty"
                        onChangeText={text => onChangeTextQty(item, text)}
                        keyboardType="numeric"
                      />
                      {/* <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                        }}>
                        {' '}
                        -{' '}
                      </Text>
                      <Text
                        style={{
                          width: 70,
                          fontSize: 18,
                          fontWeight: '600',
                        }}>
                        Qty : {item.qty}
                      </Text> */}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <TextInput
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
                      />
                      {/* <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          width: 150,
                          height: 30,
                        }}>
                        Note : {item.note}
                      </Text> */}
                    </View>
                  </View>
                  {item.lampiran != null ? (
                    <Image
                      source={{uri: item.lampiran}}
                      style={{
                        width: 100,
                        height: 90,
                        borderRadius: 10,
                        marginRight: 20,
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../assets/images/default-image.jpg')}
                      style={{
                        width: 100,
                        height: 90,
                        borderRadius: 10,
                        marginRight: 20,
                      }}
                    />
                  )}

                  <View style={{width: '12%', marginRight: 2}}>
                    <TouchableOpacity
                      style={{
                        height: 30,
                        borderRadius: 10,
                        width: 30,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: 'blue',
                        marginRight: 10,
                      }}
                      // onPress={() => setModalVisible(true)}
                      onPress={text => launchImg(item, text)}>
                      <AntDesign name="addfile" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 30,
                        borderRadius: 10,
                        width: 30,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: 'red',
                        marginRight: 10,
                      }}
                      onPress={() => {
                        removeItem(index);
                      }}>
                      {/* <Text style={{color: '#fff'}}>Remove</Text> */}
                      <MaterialIcons
                        name="remove-circle-outline"
                        size={20}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ))
          : null}
        <TouchableOpacity
          onPress={() => InsertQuery()}
          style={{
            backgroundColor: '#0000FF',
            padding: 20,
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <MaterialCommunityIcons
              name="content-save"
              size={20}
              color="#fff"
            />

            <Text
              style={{
                fontWeight: '700',
                fontSize: 16,
                color: '#fff',
                marginLeft: 5,
              }}>
              Save
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            backgroundColor: '#008080',
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <MaterialIcons name="restore" size={20} color="#fff" />

            <Text
              style={{
                fontWeight: '700',
                fontSize: 16,
                color: '#fff',
                marginLeft: 5,
              }}>
              Reset
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            showMessage({
              message: 'Success!',
              description: 'Modal has been closed.',
              icon: props => (
                <AntDesign
                  color="white"
                  name="checkcircle"
                  size={20}
                  {...props}
                />
              ),
              type: 'success',
            });
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={launchCam}
                style={[styles.button, styles.buttonClose]}>
                <Text style={styles.textStyle}>Directly Launch Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={launchImg}
                style={[styles.button, styles.buttonClose]}>
                <Text style={styles.textStyle}>
                  Directly Launch Image Library
                </Text>
              </TouchableOpacity>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestFormScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 15,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
