// import React, {Component} from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Alert,
//   Keyboard,
// } from 'react-native';

// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// // import LoginSVG from './../assets/images/misc/login.svg'
// // import GoogleSVG from './../assets/images/misc/google.svg'
// // import FacebookSVG from './../assets/images/misc/facebook.svg'
// // import TwitterSVG from './../assets/images/misc/twitter.svg'

// import CustomButton from './../components/CustomButton';
// import InputField from './../components/InputField';
// import Feather from 'react-native-vector-icons/Feather';

// import * as Animatable from 'react-native-animatable';

// class LoginScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userId: '',
//       userPassword: '',
//     };
//   }

//   login = () => {
//     const {userId, userPassword} = this.state;
//     // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (userId == '') {
//       //alert("Please enter Email address");
//       this.setState({user_id: 'Please enter User Id'});
//       return false;
//     } else if (userPassword == '') {
//       this.setState({password: 'Please enter Password'});
//     } else {
//       fetch('http://10.11.113.62/works/PT-PKM-Batam/php-api/login-api.php', {
//         method: 'post',
//         header: {
//           Accept: 'application/json',
//           'Content-type': 'application/json',
//         },
//         body: JSON.stringify({
//           // we will pass our input data to server
//           user_id: userId,
//           password: userPassword,
//         }),
//       })
//         .then(response => response.json())
//         .then(responseJson => {
//           if (responseJson == 'ok') {
//             // redirect to profile page
//             Alert.alert('Successfully login','Has been successfully login');
//             this.props.navigation.navigate('App', {userId});
//           } else {
//             Alert.alert('Failed login','User id and password are incorrects');
//           }
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }

//     Keyboard.dismiss();
//   };

//   render() {
//     return (
//       <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
//         <View style={{paddingHorizontal: 25}}>
//           <View style={{alignItems: 'center'}}>
//             <Animatable.Image
//               animation="fadeInUpBig"
//               duraton="5000"
//               source={require('./../assets/images/homescreen/sloko-img.png')}
//               height={300}
//               width={300}
//               style={{transform: [{rotate: '-5deg'}]}}
//             />
//           </View>
//           <Animatable.View animation="fadeInUpBig" duraton="5000">
//             <Text
//               style={{
//                 fontFamily: 'Roboto-Medium',
//                 fontSize: 28,
//                 fontWeight: '500',
//                 color: '#333',
//                 marginBottom: 30,
//               }}>
//               Login
//             </Text>
//             <View style={{flexDirection: 'column'}}>
//               <Text style={{color: 'red'}}>{this.state.user_id}</Text>
//             </View>
//             <InputField
//               label={'User ID'}
//               onChangeText={userId => this.setState({userId})}
//               icon={
//                 <SimpleLineIcons
//                   name="user"
//                   size={20}
//                   color="#666"
//                   style={{marginRight: 5}}
//                 />
//               }
//             />

//             <View style={{marginTop: -20}}>
//               <Text style={{color: 'red'}}>{this.state.password}</Text>
//             </View>
//             <InputField
//               label={'Password'}
//               onChangeText={userPassword => this.setState({userPassword})}
//               icon={
//                 <Ionicons
//                   name="ios-lock-closed-outline"
//                   size={20}
//                   color="#666"
//                   style={{marginRight: 5}}
//                 />
//               }
//               inputType="password"
//               // fieldButtonLabel={'Forgot?'}
//               // fieldButtonFunction={() => {}}
//             />
//             {/* <TouchableOpacity onPress={this.updateSecureTextEntry.bind(this)}>
//             {this.state.secureTextEntry ? (
//               <Feather name="eye-off" color="grey" size={20} />
//             ) : (
//               <Feather name="eye" color="black" size={20} />
//             )}
//           </TouchableOpacity> */}

//             <CustomButton label={'Login'} onPress={this.login} />
//           </Animatable.View>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }
// export default LoginScreen;

// ----------------------------------------
// Using SQLite database
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
  StyleSheet,
} from 'react-native';

import axios from 'axios';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {showMessage, hideMessage} from 'react-native-flash-message';
import {Dropdown} from 'react-native-element-dropdown';

// import LoginSVG from './../assets/images/misc/login.svg'
// import GoogleSVG from './../assets/images/misc/google.svg'
// import FacebookSVG from './../assets/images/misc/facebook.svg'
// import TwitterSVG from './../assets/images/misc/twitter.svg'

import CustomButton from './../components/CustomButton';
import InputField from './../components/InputField';
import Feather from 'react-native-vector-icons/Feather';

import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'sloko_app_db.db',
    // location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const LoginScreen = ({navigation, route}) => {
  // const [listDataKapal, setListDataKapal] = useState([]);
  // const [isLoading, setLoading] = useState(true);
  const [kapalList, setKapalList] = useState([]);
  const [id_kapal, setKapalId] = useState('');

  const [userId, setuserId] = useState('');
  const [userPassword, setuserPassword] = useState('');

  useEffect(() => {
    createTable();
    setDataUser();
    // get service data kapal from server
    // listDataKapalApi();
    // InsertQueryKapal();
    // getData();
    getDataKapal();
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

  const createTable = () => {
    // ExecuteQuery('DROP TABLE IF EXISTS kapal_tb', []);
    // ExecuteQuery(
    //   'CREATE TABLE IF NOT EXISTS kapal_tb(id_kapal INTEGER PRIMARY KEY, nama_kapal VARCHAR(255))',
    //   [],
    // );

    ExecuteQuery('DROP TABLE IF EXISTS auth', []);
    ExecuteQuery(
      'CREATE TABLE IF NOT EXISTS ' +
        'auth ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id VARCHAR(255), password VARCHAR(255));',
      [],
    );
  };

  // const listDataKapalApi = async () => {
  //   var url =
  //     'http://erp.pkmgroup.co.id/pkmerp/erp/apis/?key=3&task=vessel&dtsource=dbpkmerp_cpt';
  //   await fetch(url)
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log('Hasil yang didapat: ' + JSON.stringify(json));
  //       setListDataKapal(json);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   // axios
  //   // .get(url)
  //   // .then((response) => {
  //   //   console.log('Hasil yang didapat: ' + JSON.stringify(response));
  //   //   setListDataKapal(response);
  //   // });
  //   try {
  //     const response = await fetch(url);
  //     const json = await response.json();
  //     console.log('Data Kapal API Server: ' + JSON.stringify(json));
  //     // insert data kapal from server into sqlite
  //     let query = 'INSERT INTO kapal_tb (id_kapal, nama_kapal) VALUES ';
  //     for (let i = 0; i < json.length; ++i) {
  //       query = query + "('" + json[i].ID + "','" + json[i].Name + "')";
  //       if (i != json.length - 1) {
  //         query = query + ',';
  //       }
  //     }
  //     query = query + ';';
  //     console.log(query);

  //     ExecuteQuery(query, []);

  //     setListDataKapal(json);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getDataKapal = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM kapal_tb', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          console.log(results.rows.item(i));
          temp.push(results.rows.item(i));
        }
        setKapalList(temp);
      });
    });
  };

  // const InsertQueryKapal = () => {
  //   // let Data = [
  //   //   {nama_kapal: 'CAHAYA ALAM 9'},
  //   //   {nama_kapal: 'CAHAYA ALAM V'},
  //   //   {nama_kapal: 'CAHAYA ALAM XI'},
  //   //   {nama_kapal: 'CIPTA REJEKI VIII, MT'},
  //   //   {nama_kapal: 'CAHAYA ALAM 9'},
  //   //   {nama_kapal: 'CPT 1004'},
  //   //   {nama_kapal: 'ERA CIPTA I'},
  //   //   {nama_kapal: 'KUTAI 1'},
  //   //   {nama_kapal: 'TB. NIAGA MAS'},
  //   // ];
  //   console.log('data kapal server:', listDataKapal);

  //   // insert data kapal from server into sqlite
  //   let query = 'INSERT INTO kapal_tb (id_kapal, nama_kapal) VALUES ';
  //   for (let i = 0; i < listDataKapal.length; ++i) {
  //     query =
  //       query +
  //       "('" +
  //       listDataKapal[i].ID +
  //       "','" +
  //       listDataKapal[i].Name +
  //       "')";
  //     if (i != listDataKapal.length - 1) {
  //       query = query + ',';
  //     }
  //   }
  //   query = query + ';';
  //   console.log(query);

  //   ExecuteQuery(query, []);
  // };

  const setDataUser = async () => {
    let Data = [
      {user_id: '123', password: '123'},
      {user_id: '1234', password: '1234'},
    ];
    let query = 'INSERT INTO auth (user_id, password) VALUES';
    for (let i = 0; i < Data.length; ++i) {
      query =
        query +
        "('" +
        Data[i].user_id +
        "','" +
        Data[i].password + //user_id
        "')";
      if (i != Data.length - 1) {
        query = query + ',';
      }
    }
    query = query + ';';
    console.log(query);

    ExecuteQuery(query, []);
  };

  const getData = async () => {
    if (
      userId.length == 0 ||
      userPassword.length == 0 ||
      id_kapal.length == 0
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
      try {
        var user = {
          user_id: userId,
          password: userPassword,
          id_kapal: id_kapal,
        };
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
        db.transaction(tx => {
          // console.log(user.user_id.value)
          tx.executeSql(
            'SELECT user_id, password FROM auth WHERE user_id=? AND password=?',
            [user.user_id.value, user.password.value],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }
              console.log('get data user:', temp.length);
              if (temp.length > 0) {
                navigation.navigate('App', {
                  user_id: user.user_id.value,
                  password: user.password.value,
                  id_kapal: id_kapal,
                });
                showMessage({
                  message: 'Success!',
                  description: `User ${JSON.stringify(
                    userId.value,
                  )} has successfully signed in!`,
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
              } else {
                showMessage({
                  message: 'Failed!',
                  description: `User ${JSON.stringify(
                    userId.value,
                  )} has not registered!`,
                  icon: props => (
                    <MaterialIcons
                      color="white"
                      name="dangerous"
                      size={20}
                      {...props}
                    />
                  ),
                  type: 'danger',
                });
              }
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Animatable.Image
            animation="fadeInUpBig"
            duraton="5000"
            source={require('./../assets/images/homescreen/sloko-img.png')}
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>
        <Animatable.View animation="fadeInUpBig" duraton="5000">
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 28,
              fontWeight: '500',
              color: '#333',
              marginBottom: 30,
            }}>
            Login
          </Text>
          <View style={{flexDirection: 'column'}}>
            {/* <Text style={{color: 'red'}}>{this.state.user_id}</Text> */}
          </View>
          <InputField
            label={'User ID'}
            onChangeText={value => setuserId({value})}
            icon={
              <SimpleLineIcons
                name="user"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
            }
          />

          <View style={{marginTop: 0}}>
            {/* <Text style={{color: 'red'}}>{this.state.password}</Text> */}
          </View>
          <InputField
            label={'Password'}
            onChangeText={value => setuserPassword({value})}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
            }
            inputType="password"
            // fieldButtonLabel={'Forgot?'}
            // fieldButtonFunction={() => {}}
          />

          <Text style={{paddingBottom: 15}}>Nama Kapal</Text>
          <View style={styles.container}>
            {/* {renderLabel()} */}
            <Dropdown
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
            />
          </View>
          {/* <TouchableOpacity onPress={this.updateSecureTextEntry.bind(this)}>
            {this.state.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="black" size={20} />
            )}
          </TouchableOpacity> */}

          <CustomButton label={'Login'} onPress={getData} />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
});
