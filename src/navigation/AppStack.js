import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Provider} from 'react-redux';
import {mystore} from './../store/store';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LayarDua from './../components/LayarDua';
import LayarTiga from './../components/LayarTiga';
import RequestFormScreen from './../screens/RequestFormScreen';
import IRMListScreen from './../screens/IRMListScreen';
import SelectItemScreen from './../screens/SelectItemScreen';
import DetailIRMScreen from './../screens/DetailIRMScreen';
import EditIRMScreen from './../screens/EditIRMScreen';

import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './../components/CustomDrawer';

import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

// import ProfileScreen from './../screens/ProfileScreen';
import KaryawanScreen from './../screens/KaryawanScreen';
import UserScreen from './../screens/UserScreen';

import TabNavigator from './TabNavigator';
import SelectedItem from '../components/SelectedItem';
// import SelectItemEditScreen from '../screens/SelectItemEditScreen';
import LoginScreen from './../screens/LoginScreen';

// import {listDataItemApi} from './../screens/RequestFormScreen';
import {showMessage, hideMessage} from 'react-native-flash-message';

import FlashMessage from 'react-native-flash-message';
import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'sloko_app_db.db'});

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const Root = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#0096FF',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Karyawan"
        component={KaryawanScreen}
        options={{
          drawerIcon: ({color}) => (
            <Fontisto name="persons" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="User"
        component={UserScreen}
        options={{
          drawerIcon: ({color}) => (
            <Fontisto name="persons" size={22} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        drawerIcon: ({color}) => (
          <Icon name="person-outline" size={22} color={color} />
        ),
      }}
    /> */}
    </Drawer.Navigator>
  );
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'white',
  },
};

export default function AppStack() {
  const [isLoading, setLoading] = useState(true);
  const [listDataItem, setListDataItem] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // This function will be triggered when the button is pressed
  const toggleLoading = () => {
    setLoading(!isLoading);
  };

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
    ExecuteQuery('DROP TABLE IF EXISTS item_tb', []);
    ExecuteQuery(
      'CREATE TABLE IF NOT EXISTS item_tb(id INTEGER PRIMARY KEY, kode_item VARCHAR(255), nama_item VARCHAR(255), unit VARCHAR(255))',
      [],
    );
  };

  // get and save data API item from server
  const listDataItemApi = async () => {
    // set loading
    toggleLoading();
    // create table item_tb
    CreateTable();

    var url =
      'http://erp.pkmgroup.co.id/pkmerp/erp/apis/?task=item2&dtsource=dbpkmerp_cpt&key=3';
    await fetch(url)
      .then(response => response.json())
      .then(json => {
        // console.log('Hasil yang didapat: ' + JSON.stringify(json));
        setListDataItem(json);
      })
      .catch(error => {
        console.log(error);
      });
    try {
      const response = await fetch(url);
      const json = await response.json();
      // console.log('Data Item API Server: ' + JSON.stringify(json));
      // insert data kapal from server into sqlite
      let query = 'INSERT INTO item_tb (kode_item, nama_item, unit) VALUES ';
      for (let i = 0; i < 100; ++i) {
        query =
          query +
          "('" +
          json[i].item_code +
          "','" +
          json[i].item_name +
          "','" +
          json[i].unit_name +
          "')";
        if (i != 100 - 1) {
          query = query + ',';
        }
      }
      query = query + ';';
      // console.log(query);

      ExecuteQuery(query, []);

      setListDataItem(json);

      showMessage({
        message: 'Success!',
        description: 'You are Successfully updating items',
        icon: props => (
          <AntDesign color="white" name="checkcircle" size={20} {...props} />
        ),
        type: 'success',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Provider store={mystore}>
        <NavigationContainer independent={true} theme={MyTheme}>
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="Root"
              component={Root}
            />
            <Stack.Screen name="Dua" component={LayarDua} />
            <Stack.Screen name="Tiga" component={LayarTiga} />
            <Stack.Screen
              name="New IRM"
              component={RequestFormScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#0096FF',
                },
                headerTintColor: '#fff',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => listDataItemApi()}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 10,
                      padding: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      {isLoading ? (
                        <ActivityIndicator />
                      ) : (
                        <AntDesign name="sync" size={20} color="black" />
                      )}
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: '700',
                          fontSize: 16,
                          color: 'black',
                          marginLeft: 5,
                        }}>
                        {/* {isLoading ? "Stop Loading" : "Update Item"} */}
                        Update Item
                      </Text>
                    </View>
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="IRM List"
              component={IRMListScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#0096FF',
                },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="Detail IRM"
              component={DetailIRMScreen}
              options={({route}) => ({
                title: route.params?.title,

                headerStyle: {
                  backgroundColor: '#0096FF',
                },
                headerTintColor: '#fff',
              })}
            />
            <Stack.Screen
              name="Select Item"
              component={SelectItemScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#0096FF',
                },
                headerTintColor: '#fff',
              }}
            />
            {/* <Stack.Screen
            name="Select Item Edit"
            component={SelectItemEditScreen}
            options={{
              headerStyle: {
                backgroundColor: '#0096FF',
              },
              headerTintColor: '#fff',
            }}
          /> */}
            <Stack.Screen
              name="Edit IRM"
              component={EditIRMScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#0096FF',
                },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="Selected Item"
              component={SelectedItem}
              options={{
                headerStyle: {
                  backgroundColor: '#0096FF',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={LoginScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <FlashMessage position="top" />
    </View>
  );
}
