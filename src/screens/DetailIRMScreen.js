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
// } from 'react-native';
// const {width} = Dimensions.get('window');

// import DatePicker from 'react-native-date-picker';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import CustomButton from './../components/CustomButton';

// import SelectDropdown from 'react-native-select-dropdown';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {useDispatch, useSelector} from 'react-redux';

// const DetailIRMScreen = ({navigation, route}) => {
//   const [date, setDate] = useState(new Date());
//   const [open, setOpen] = useState(false);
//   const [dobLabel, setDobLabel] = useState('');

//   const kapal = [
//     'Kapal 1',
//     'Kapal 2',
//     'Kapal 3',
//     'Kapal 4',
//     'Kapal 5',
//   ];

//   const departemen = [
//     'Departemen 1',
//     'Departemen 2',
//     'Departemen 3',
//     'Departemen 4',
//     'Departemen 5',
//   ];

//   const items = useSelector(state => state);
//   let addedItems = [];
//   addedItems = items;

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={{padding: 20}}>
//         {/* <Text>{route.params?.title}</Text> */}

//         <View style={{
//           width: '100%',
//           marginBottom: 5,
//           marginTop: -10,
//           flexDirection: 'row',
//         }}>
//           <Text
//             style={{
//               color: 'black',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//             }}>
//               IRM Number
//           </Text>
//           <Text
//             style={{
//               color: 'black',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//             }}>
//               :
//           </Text>
//           <Text
//               style={{
//                 color: 'black',
//                 paddingHorizontal: 15,
//                 paddingVertical: 10,
//               }}>
//                 {route.params?.irm_number}
//             </Text>
//         </View>

//         <View style={{
//           width: '100%',
//           marginBottom: 5,
//           marginTop: -10,
//           flexDirection: 'row',
//         }}>
//           <Text
//             style={{
//               color: 'black',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//               marginRight: 18,
//             }}>
//               Req. Date
//           </Text>
//           <Text
//             style={{
//               color: 'black',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//             }}>
//               :
//           </Text>
//           <Text
//               style={{
//                 color: 'black',
//                 paddingHorizontal: 15,
//                 paddingVertical: 10,
//               }}>
//                 {route.params?.req_date}
//             </Text>
//         </View>

//         <View style={{
//           width: '100%',
//           marginBottom: 5,
//           marginTop: -10,
//           flexDirection: 'row',
//         }}>
//           <Text
//             style={{
//               color: 'black',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//               marginRight: 7,
//             }}>
//               Kode Asset
//           </Text>
//           <Text
//             style={{
//               color: 'black',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//             }}>
//               :
//           </Text>
//           <Text
//               style={{
//                 color: 'black',
//                 paddingHorizontal: 15,
//                 paddingVertical: 10,
//               }}>
//                 {route.params?.nama_kapal}
//             </Text>
//         </View>

//         <View style={{
//           width: '100%',
//           marginBottom: 5,
//           marginTop: -10,
//           flexDirection: 'row',
//         }}>
//           <Text
//             style={{
//               color: 'black',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//               marginRight: 1,
//             }}>
//               Departemen
//           </Text>
//           <Text
//             style={{
//               color: 'black',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//             }}>
//               :
//           </Text>
//           <Text
//               style={{
//                 color: 'black',
//                 paddingHorizontal: 15,
//                 paddingVertical: 10,
//               }}>
//                 {route.params?.departemen}
//             </Text>
//         </View>

//         <View style={{
//           width: '100%',
//           marginBottom: 20,
//           marginTop: -10,
//           flexDirection: 'row',
//           borderBottomColor: 'black',
//           borderBottomWidth: 1,
//         }}>
//           <Text
//             style={{
//               color: 'black',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//               marginRight: 6,
//             }}>
//               Description
//           </Text>
//           <Text
//             style={{
//               color: 'black',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//             }}>
//               :
//           </Text>
//           <Text
//               style={{
//                 color: 'black',
//                 paddingHorizontal: 15,
//                 paddingVertical: 10,
//               }}>
//                 {route.params?.deskripsi}
//             </Text>
//         </View>

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
//             navigation.navigate('Selected Item', {
//               stats: 'From Detail',
//             });
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

//         <TouchableOpacity
//           onPress={() => navigation.navigate('Edit IRM', {
//             // irm_number: item.irm_number,
//             // deskripsi: item.deskripsi,
//             // nama_kapal: item.nama_kapal,
//             // departemen: item.departemen,
//             // req_date: item.req_date,
//             // id: item.id,
//           })}
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
//             Edit IRM
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
//             Kirim IRM
//           </Text>
//         </TouchableOpacity>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default DetailIRMScreen;

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 6},
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     width,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F6F6F6',
//   },
//   headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
//   saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
//   viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
//   scrollViewContainer: {
//     flexGrow: 1,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: '10%',
//     paddingBottom: '20%',
//   },

//   dropdown1BtnStyle: {
//     width: '80%',
//     height: 50,
//     backgroundColor: '#FFF',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#444',
//   },
//   dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
//   dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
//   dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#ccc'},
//   dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

//   dropdown2BtnStyle: {
//     width: '100%',
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   dropdown2BtnTxtStyle: {
//     color: '#999999',
//     textAlign: 'left',
//     fontWeight: 'bold',
//   },
//   dropdown2DropdownStyle: {
//     backgroundColor: '#444',
//   },
//   dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#ccc'},
//   dropdown2RowTxtStyle: {
//     color: '#FFF',
//     textAlign: 'left',
//     fontWeight: 'bold',
//   },

//   dropdown3BtnStyle: {
//     width: '80%',
//     height: 50,
//     backgroundColor: '#FFF',
//     paddingHorizontal: 0,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: '#444',
//   },
//   dropdown3BtnChildStyle: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'left',
//     paddingHorizontal: 18,
//   },
//   dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
//   dropdown3BtnTxt: {
//     color: '#444',
//     textAlign: 'left',
//     fontWeight: 'bold',
//     fontSize: 24,
//     marginHorizontal: 12,
//   },
//   dropdown3DropdownStyle: {backgroundColor: 'slategray'},
//   dropdown3RowStyle: {
//     backgroundColor: 'slategray',
//     borderBottomColor: '#444',
//     height: 50,
//   },
//   dropdown3RowChildStyle: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'left',
//     paddingHorizontal: 18,
//   },
//   dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
//   dropdown3RowTxt: {
//     color: '#F1F1F1',
//     textAlign: 'left',
//     fontWeight: 'bold',
//     fontSize: 24,
//     marginHorizontal: 12,
//   },

//   dropdown4BtnStyle: {
//     width: '50%',
//     height: 50,
//     backgroundColor: '#FFF',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#444',
//   },
//   dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
//   dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
//   dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#ccc'},
//   dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
// });

// ----------------------------------------
// Using SQLite database
import React, {useEffect, useState} from 'react';
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
  LogBox,
} from 'react-native';
LogBox.ignoreAllLogs();
import {useIsFocused} from '@react-navigation/native';
const {width} = Dimensions.get('window');

import DatePicker from 'react-native-date-picker';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from './../components/CustomButton';

import SelectDropdown from 'react-native-select-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'sloko_app_db.db'});

const DetailIRMScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [userList, setUserList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('');

  const kapal = ['Kapal 1', 'Kapal 2', 'Kapal 3', 'Kapal 4', 'Kapal 5'];

  const departemen = [
    'Departemen 1',
    'Departemen 2',
    'Departemen 3',
    'Departemen 4',
    'Departemen 5',
  ];

  const items = useSelector(state => state);
  let addedItems = [];
  addedItems = items;

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM request_tb JOIN req_item_tb ON request_tb.irm_number = req_item_tb.irm_number_req JOIN kapal_tb ON kapal_tb.id_kapal = request_tb.kapal_id JOIN item_tb ON item_tb.kode_item = req_item_tb.kode_item_req WHERE request_tb.irm_number = ? ORDER by request_tb.id',
        [route.params?.irm_number],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            console.log(results.rows.item(i));
            temp.push(results.rows.item(i));
          }
          setUserList(temp);
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
        {/* <Text>{route.params?.title}</Text> */}

        <View
          style={{
            width: '100%',
            marginBottom: 5,
            marginTop: -10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            IRM Number
          </Text>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            :
          </Text>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            {route.params?.irm_number}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            marginBottom: 5,
            marginTop: -10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginRight: 18,
            }}>
            Req. Date
          </Text>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            :
          </Text>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            {route.params?.req_date}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            marginBottom: 5,
            marginTop: -10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginRight: 7,
            }}>
            Kode Asset
          </Text>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            :
          </Text>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            {route.params?.nama_kapal}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            marginBottom: 5,
            marginTop: -10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginRight: 1,
            }}>
            Departemen
          </Text>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            :
          </Text>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            {route.params?.departemen}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            marginBottom: 20,
            marginTop: -10,
            flexDirection: 'row',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginRight: 6,
            }}>
            Description
          </Text>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            :
          </Text>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            {route.params?.deskripsi}
          </Text>
        </View>

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
            {userList.length}
          </Text>
        </TouchableOpacity>

        {userList.map((item, index) => (
          <>
            <View
              style={{
                width: '100%',
                height: 180,
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
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    Sisa : {item.sisa}
                  </Text>
                  <>
                    <Text
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
                    </Text>
                  </>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      width: 150,
                      height: 30,
                    }}>
                    Note : {item.note}
                  </Text>
                </View>
              </View>
              {item.lampiran != null ? (
                <Image
                  source={{uri: item.lampiran}}
                  style={{
                    width: 100,
                    height: 90,
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Image
                  source={require('../assets/images/default-image.jpg')}
                  style={{
                    width: 100,
                    height: 90,
                    borderRadius: 10,
                  }}
                />
              )}
            </View>
          </>
        ))}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Edit IRM', {
              data: {
                irm_number: route.params.irm_number,
                deskripsi: route.params.deskripsi,
                req_date: route.params.req_date,
                nama_kapal: route.params.nama_kapal,
                id_kapal: route.params.id_kapal,
                departemen: route.params.departemen,
              },
            })
          }
          style={{
            backgroundColor: '#0000FF',
            padding: 20,
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff',
            }}>
            Edit IRM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            backgroundColor: '#008080',
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
            Kirim IRM
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailIRMScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },

  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#ccc'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

  dropdown2BtnStyle: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  dropdown2BtnTxtStyle: {
    color: '#999999',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#ccc'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'left',
    fontWeight: 'bold',
  },

  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'left',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'left',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#ccc'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});
