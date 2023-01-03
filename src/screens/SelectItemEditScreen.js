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
} from 'react-native';
LogBox.ignoreAllLogs();
import {SearchBar} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToSelectedItem} from './../action/Actions';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'sloko_app_db.db'});

const SelectItemEditScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const addItem = item => {
    dispatch(addItemToSelectedItem(item));
  };

  const items = useSelector(state => state);
  let addedItems = [];
  addedItems = items;

  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    CreateTable();
    InsertQuery();
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

  const CreateTable = () => {
    // console.log('CreateTable');

    ExecuteQuery('DROP TABLE IF EXISTS item_tb', []);
    ExecuteQuery(
      'CREATE TABLE IF NOT EXISTS item_tb(id INTEGER PRIMARY KEY AUTOINCREMENT, kode_item VARCHAR(255), nama_item VARCHAR(255), unit VARCHAR(255))',
      [],
    );
  };

  const InsertQuery = () => {
    let Data = [
      {kode_item: 'INR2500', nama_item: 'SPAN GAS', unit: 'Pcs'},
      {kode_item: 'INR2501', nama_item: 'TEROPONG', unit: 'Set'},
      {
        kode_item: 'INR2502',
        nama_item: 'PARACHUTE ROCKET',
        unit: 'Unit',
      },
      {kode_item: 'INR2503', nama_item: 'WIND SHOCK', unit: 'Pcs'},
      {kode_item: 'INR2504', nama_item: 'WATER PUMP', unit: 'Set'},
      {kode_item: 'INR2505', nama_item: 'EAR PLUG', unit: 'Pcs'},
    ];
    let query = 'INSERT INTO item_tb (kode_item, nama_item, unit) VALUES';
    for (let i = 0; i < Data.length; ++i) {
      query =
        query +
        "('" +
        Data[i].kode_item + //user_id
        "','" +
        Data[i].nama_item + //country_name
        "','" +
        Data[i].unit + //is_deleted
        "')";
      if (i != Data.length - 1) {
        query = query + ',';
      }
    }
    query = query + ';';
    console.log(query);

    ExecuteQuery(query, []);
  };

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM item_tb LEFT JOIN (SELECT sisa,qty,note FROM req_item_tb WHERE sisa IS NULL) GROUP by item_tb.id',
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

  const onChangeTextSisa = (item, text) => {
    let updateProducts = [...userList];
    let index = userList.findIndex(obj => obj.id == item.id);
    updateProducts[index].sisa = text;
    setUserList(updateProducts);
    console.log('list:', userList);
  };

  const onChangeTextQty = (item, text) => {
    let updateProducts = [...userList];
    let index = userList.findIndex(obj => obj.id == item.id);
    updateProducts[index].qty = text;
    setUserList(updateProducts);
    console.log('list:', userList);
  };

  const onChangeTextNote = (item, text) => {
    let updateProducts = [...userList];
    let index = userList.findIndex(obj => obj.id == item.id);
    updateProducts[index].note = text;
    setUserList(updateProducts);
    console.log('list:', userList);
  };

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
          {Array.isArray(userList)
            ? userList.map((item, index) => (
                <View
                  key={index}
                  style={{
                    width: '90%',
                    height: 150,
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
                    <Text>{item.kode_item}</Text>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
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
                        onChangeText={text => onChangeTextSisa(item, text)}
                        // value={item == 0 ? item.sisa: ''}
                      />
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
                        onChangeText={text => onChangeTextQty(item, text)}
                      />
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

export default SelectItemEditScreen;
