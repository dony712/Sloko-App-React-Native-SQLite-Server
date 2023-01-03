// ----------------------------------------
// Using SQLite database
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import BannerSlider from '../components/BannerSlider';
import {windowWidth} from '../utils/Dimensions';

import {detailList, sliderData} from '../model/data';
import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'sloko_app_db.db'});

export default UserScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM auth', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          console.log(results.rows.item(i));
          temp.push(results.rows.item(i));
        }
        setUserList(temp);
      });
    });
  };
  let deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM auth where id=?', [id], (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'User deleted successfully',
            [
              {
                text: 'Ok',
                onPress: () => {
                  getData();
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          alert('Please insert a valid User Id');
        }
      });
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}></View>

        <View
          style={{
            flexDirection: 'row',
            borderColor: '#C6C6C6',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 4,
            paddingVertical: 2,
          }}>
          <Feather name="search" size={20} color="#C6C6C6" />
          <TextInput placeholder="Searching of items" />
        </View>

        <View
          style={{
            marginVertical: 20,
            height: 44,
            width: '100%',
            backgroundColor: '#0096FF',
            borderRadius: 8,
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontWeight: '600',
              marginLeft: 5,
            }}>
            Transaction Description Number
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontWeight: '600',
              marginLeft: 10,
            }}>
            Created Date
          </Text>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              paddingHorizontal: -5,
              paddingVertical: 10,
            }}>
            <AntDesign
              name="downcircleo"
              size={20}
              color="white"
              style={{
                marginLeft: 5,
              }}
            />
          </TouchableOpacity>
        </View>

        {Array.isArray(userList)
          ? userList.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 10,
                    flex: 1,
                  }}>
                  {/* <Image
                source={photo}
                style={{width: 55, height: 55, borderRadius: 10, marginRight: 8}}
              /> */}
                  <View style={{width: windowWidth - 220}}>
                    <Text
                      style={{
                        color: '#333',
                        fontFamily: 'Roboto-Medium',
                        fontSize: 14,
                      }}>
                      {item.user_id}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#333',
                        fontFamily: 'Roboto-Medium',
                        fontSize: 14,
                        textTransform: 'uppercase',
                      }}>
                      {item.password}
                    </Text>
                  </View>
                </View>

                
              </View>
            ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};
