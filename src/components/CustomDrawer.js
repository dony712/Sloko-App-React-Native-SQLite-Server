// import React from 'react';
// import {
//   View,
//   Text,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
// } from '@react-navigation/drawer';

// import Icon from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// const CustomDrawer = props => {
//   return (
//     <View style={{flex: 1}}>
//       <DrawerContentScrollView
//         {...props}
//         contentContainerStyle={{backgroundColor: '#8200d6'}}>
//         <ImageBackground
//           source={require('../assets/images/menu-bg.jpeg')}
//           style={{padding: 20}}>
//           <Image
//             source={require('../assets/images/user-profile.jpg')}
//             style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
//           />
//           <Text
//             style={{
//               color: '#fff',
//               fontSize: 18,
//               fontFamily: 'Roboto-Medium',
//               marginBottom: 5,
//             }}>
//             Hello, Dony
//           </Text>
//         </ImageBackground>
//         <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
//           <DrawerItemList {...props} />
//         </View>
//       </DrawerContentScrollView>
//       <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
//         <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Feather name="rotate-cw" size={22} />
//             <Text
//               style={{
//                 fontSize: 15,
//                 fontFamily: 'Roboto-Medium',
//                 marginLeft: 5,
//               }}>
//               Update Vessel
//             </Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Icon name="exit-outline" size={22} />
//             <Text
//               style={{
//                 fontSize: 15,
//                 fontFamily: 'Roboto-Medium',
//                 marginLeft: 5,
//               }}>
//               Sign Out
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CustomDrawer;

// ----------------------------------------
// Using SQLite database
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'sloko_app_db',
    // location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const CustomDrawer = (props, navigation, route) => {
  const [userId, setuserId] = useState('');
  const [foundToken, setFoundToken] = useState('');

  const logoutAction = async () => {
    try {
      AsyncStorage.clear();
      navigation.navigate('Login');
      Alert.alert('Success!', `User has successfully signed out!`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          const newValue = JSON.parse(value);
          setuserId(newValue.user_id.value);
          console.log('get data user id async user:', newValue.user_id.value);
        }
      });
      // db.transaction(tx => {
      //   tx.executeSql('SELECT user_id FROM auth', [], (tx, results) => {
      //     var len = results.rows.length;
      //     if (len > 0) {
      //       var userid = results.rows.item(0).user_id;
      //       setuserId(userid);
      //     }
      //   });
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <ImageBackground
          source={require('../assets/images/menu-bg.jpeg')}
          style={{padding: 20}}>
          <Image
            source={require('../assets/images/user-profile.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            Hello, {userId}
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather name="rotate-cw" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Update Vessel
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            // navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: async () => {
                    try {
                      await AsyncStorage.removeItem('UserData');
                      setFoundToken('');
                      props.navigation.navigate('Login');
                    } catch (error) {
                      console.log(error);
                    }
                  },
                },
              ],
              {cancelable: false},
            );
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
