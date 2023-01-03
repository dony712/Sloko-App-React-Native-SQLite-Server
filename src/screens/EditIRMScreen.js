import React, {useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  Pressable,
  Modal,
} from 'react-native';
const {width} = Dimensions.get('window');
import {removeItemFromSelectedItem} from './../action/Actions';

import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// import InputField from './../components/InputField';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import CustomButton from './../components/CustomButton';
// import { Label } from 'react-native-form-component';

import SelectDropdown from 'react-native-select-dropdown';
// import ReactNativeItemSelect from 'react-native-item-select';
import {useDispatch, useSelector} from 'react-redux';

import {showMessage, hideMessage} from 'react-native-flash-message';

import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'sloko_app_db.db'});

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const EditIRMScreen = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [file, setFile] = useState({
    filepath: {
      data: '',
      uri: '',
    },
    fileData: '',
    fileUri: '',
  });

  const [kapalAs, setKapalAs] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Cdate, setCDate] = useState(new Date().toLocaleDateString('fr-FR'));
  const [CdateLabel, setCdateLabel] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [id_kapal, setKapalId] = useState('');
  const [nama_dep, setNamaDep] = useState('');
  // const [kapalList, setKapalList] = useState([]);
  const [userList, setUserList] = useState([]);
  // const [myopen, setMyOpen] = useState(false);
  // const [dateLabel, setDateLabel] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const kapal = ['Kapal 1', 'Kapal 2', 'Kapal 3', 'Kapal 4', 'Kapal 5'];

  const departemen = [
    {label: 'Deck', nama_dep: 'Deck'},
    {label: 'Mesin', nama_dep: 'Mesin'},
  ];

  const items = useSelector(state => state);
  let addedItems = [];
  addedItems = items;

  // send useselector data into usestate (agar input value bisa dinamis)
  const [itemsState, setItemsState] = useState(items); // set campaign as default

  const dispatch = useDispatch();
  const removeItem = index => {
    dispatch(removeItemFromSelectedItem(index));
  };

  useEffect(() => {
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
    setDeskripsi(route.params.data.deskripsi);
    setCDate(route.params.data.req_date);
    setNamaDep(route.params.data.departemen);
    setKapalId(route.params.data.id_kapal);
    setKapalAs(route.params.data.nama_kapal);
    // getDataKapal();

    getData();
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

  const updateUser = () => {
    if (
      deskripsi.length == 0 ||
      Cdate.length == 0 ||
      id_kapal.length == 0 ||
      nama_dep.length == 0
    ) {
      showMessage({
        message: 'Warning!',
        description: 'Please write your data.',
        icon: props => (
          <Entypo color="white" name="warning" size={20} {...props} />
        ),
        type: 'warning',
      });
      // Alert.alert('Warning!', 'Please write your data.');
    } else {
      // single update query
      ExecuteQuery(
        'UPDATE request_tb set req_date=?, kapal_id=?, departemen=?, deskripsi=? where irm_number=?',
        [Cdate, id_kapal, nama_dep, deskripsi, route.params.data.irm_number],
      );

      // multiple update of users
      for (let i = 0; i < addedItems.length; i++) {
        const element = addedItems[i];
        console.log('addedItems', element.kode_item);

        // get kode item from list db (0->data available, -1->data not available)
        const selectedValue = element.kode_item;
        const getKodeItem = userList.findIndex(
          obj => obj.kode_item == selectedValue,
        );
        console.log('get kode:', getKodeItem);

        if (getKodeItem >= 0) {
          //update
          ExecuteQuery(
            'UPDATE req_item_tb set sisa=?, qty=?, note=?, lampiran=? where irm_number_req=? AND kode_item_req=?',
            [
              element.sisa,
              element.qty,
              element.note,
              element.lampiran,
              route.params.data.irm_number,
              element.kode_item,
            ],
          );
        } else if (getKodeItem == -1) {
          // insert
          let query =
            'INSERT INTO req_item_tb (irm_number_req, kode_item_req, sisa, qty, note, lampiran) VALUES';
          query =
            query +
            "('" +
            route.params.data.irm_number +
            "','" +
            element.kode_item +
            "','" +
            element.sisa +
            "','" +
            element.qty +
            "','" +
            element.note +
            "','" +
            element.lampiran +
            "')";
          console.log(query);

          ExecuteQuery(query, []);
        }
      }

      for (let index = 0; index < userList.length; index++) {
        const element = userList[index];
        const getKodeItemFromList = addedItems.findIndex(
          obj => obj.kode_item == element.kode_item,
        );

        if (getKodeItemFromList == -1) {
          // if (addedItems.length != 0) {
          console.log('go delete item');
          ExecuteQuery(
            'DELETE FROM req_item_tb WHERE irm_number_req=? AND kode_item_req=?',
            [route.params.data.irm_number, element.kode_item],
          );
          // } else {
          // console.log('item tidak boleh kosong');
          // Alert.alert(
          //   'Failed',
          //   'Item tidak boleh kosong',
          //   [
          //     {
          //       text: 'Ok',
          //       // onPress: () => navigation.navigate('Root'),
          //     },
          //   ],
          //   {cancelable: false},
          // );
          // }
        }
      }

      navigation.navigate('Root');
      showMessage({
        message: 'Success!',
        description: 'Data updated successfully',
        icon: props => (
          <AntDesign color="white" name="checkcircle" size={20} {...props} />
        ),
        type: 'success',
      });

      // Alert.alert(
      //   'Success',
      //   'Data updated successfully',
      //   [
      //     {
      //       text: 'Ok',
      //       onPress: () => navigation.navigate('Root'),
      //     },
      //   ],
      //   {cancelable: false},
      // );

      // reset selected item
      // for (let index = 0; index < items.length; index++) {
      //   removeItem(index);
      // }
    }
  };

  // const getDataKapal = () => {
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM kapal_tb', [], (tx, results) => {
  //       var temp = [];
  //       for (let i = 0; i < results.rows.length; ++i) {
  //         console.log(results.rows.item(i));
  //         temp.push(results.rows.item(i));
  //       }
  //       setKapalList(temp);
  //     });
  //   });
  // };

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM request_tb JOIN req_item_tb ON request_tb.irm_number = req_item_tb.irm_number_req JOIN kapal_tb ON kapal_tb.id_kapal = request_tb.kapal_id JOIN item_tb ON item_tb.kode_item = req_item_tb.kode_item_req WHERE request_tb.irm_number = ? ORDER by request_tb.id',
        [route.params.data?.irm_number],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            console.log('list:', results.rows.item(i));
            temp.push(results.rows.item(i));

            // add list data into state
            addedItems.push(results.rows.item(i));
            console.log('added:', addedItems);
          }
          setUserList(temp);

          // for (let index = 0; index < temp.length; index++) {
          //   const element = temp[index];
          //   addedItems.push(element);
          // }
        },
      );
    });
  };

  const onChangeTextSisa = (item, text) => {
    let updateProducts = [...items];
    let index = items.findIndex(obj => obj.id == item.id);
    updateProducts[index].sisa = text;
    // console.log('index:', updateProducts[index].sisa);
    if (updateProducts[index].sisa == 0) {
      showMessage({
        message: 'Warning!',
        description: 'Please write your data.',
        icon: props => (
          <Entypo color="white" name="warning" size={20} {...props} />
        ),
        type: 'warning',
      });
      setItemsState(updateProducts);
    } else {
      setItemsState(updateProducts);
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
      setItemsState(updateProducts);
    } else {
      setItemsState(updateProducts);
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
      setItemsState(updateProducts);
    } else {
      setItemsState(updateProducts);
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
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
              {Cdate != 0 ? Cdate : CdateLabel}
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
            value={deskripsi}
            onChangeText={deskripsi => setDeskripsi(deskripsi)}
          />
        </View>

        <Text style={{paddingBottom: 15}}>Select Item</Text>
        <TouchableOpacity
          // onPress={() => navigation.navigate('Select Item Edit', {})}>
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
            // navigation.navigate('Selected Item', {
            //   stats: 'From Detail',
            // });
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
            {items.length}
          </Text>
        </TouchableOpacity>

        {items.map((item, index) => (
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
                      marginRight: 2,
                      width: 50,
                      textAlign: 'center',
                    }}
                    placeholder="Sisa"
                    value={item.sisa == null ? '' : item.sisa.toString()}
                    onChangeText={text => onChangeTextSisa(item, text)}
                    keyboardType="numeric"
                  />
                  {/* <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      textAlign: 'center',
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
                      marginRight: 2,
                      width: 50,
                      textAlign: 'center',
                    }}
                    placeholder="Qty"
                    value={item.qty == null ? '' : item.qty.toString()}
                    onChangeText={text => onChangeTextQty(item, text)}
                    keyboardType="numeric"
                  />
                  {/* <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    {' '}
                    -{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      textAlign: 'center',
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
                    value={item.note == null ? '' : item.note.toString()}
                    onChangeText={text => onChangeTextNote(item, text)}
                  />
                  {/* <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      width: 120,
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
                  onPress={text => launchImg(item, text)}
                  >
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
        ))}

        <TouchableOpacity
          onPress={() => {
            updateUser();
          }}
          style={{
            backgroundColor: '#800080',
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff',
            }}>
            Update IRM
          </Text>
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

export default EditIRMScreen;

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
