// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   ImageBackground,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
// import Feather from 'react-native-vector-icons/Feather';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import BannerSlider from '../components/BannerSlider';
// import {windowWidth} from '../utils/Dimensions';

// import {detailList, sliderData} from '../model/data';
// import CustomSwitch from '../components/CustomSwitch';
// import ListItem from '../components/ListItem';

// export default class IRMListScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // nama: '',
//       // jabatan: '',
//       listData: [],
//       // idEdit: null,
//     };
//     this.url = 'http://10.11.113.62/works/PT-PKM-Batam/php-api/index-api.php';
//   }
//   componentDidMount() {
//     this.ambilListData();
//   }
//   // const [listTab, setListTab] = useState(1);
//   // const [listData, setListData] = useState([]);

//   // const renderBanner = ({item, index}) => {
//   //   return <BannerSlider data={item} />;
//   // };

//   // const onSelectSwitch = value => {
//   //   setListTab(value);
//   // };

//   // useEffect(() => {
//   //   ambilListData();
//   // })

//   // const ambilListData = async () => {
//   async ambilListData() {
//     await fetch(this.url)
//       .then(response => response.json())
//       .then(json => {
//         console.log('Hasil yang didapat: ' + JSON.stringify(json.data.result));
//         this.setState({listData: json.data.result});
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   render() {
//     return (
//       <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
//         <ScrollView style={{padding: 20}}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}></View>

//           <View
//             style={{
//               flexDirection: 'row',
//               borderColor: '#C6C6C6',
//               borderWidth: 1,
//               borderRadius: 8,
//               paddingHorizontal: 4,
//               paddingVertical: 2,
//             }}>
//             <Feather name="search" size={20} color="#C6C6C6" />
//             <TextInput placeholder="Searching of items" />
//           </View>

//           <View
//             style={{
//               marginVertical: 20,
//               height: 44,
//               width: '100%',
//               backgroundColor: '#0096FF',
//               borderRadius: 8,
//               flexDirection: 'row',
//               alignContent: 'center',
//               alignItems: 'center',
//               justifyContent: 'space-around',
//             }}>
//             <Text
//               style={{
//                 color: 'white',
//                 fontSize: 12,
//                 fontWeight: '600',
//                 marginLeft: 5,
//               }}>
//               Transaction Description Number
//             </Text>
//             <Text
//               style={{
//                 color: 'white',
//                 fontSize: 12,
//                 fontWeight: '600',
//                 marginLeft: 10,
//               }}>
//               Created Date
//             </Text>
//             <TouchableOpacity
//               onPress={() => {}}
//               style={{
//                 paddingHorizontal: -5,
//                 paddingVertical: 10,
//               }}>
//               <AntDesign
//                 name="downcircleo"
//                 size={20}
//                 color="white"
//                 style={{
//                   marginLeft: 5,
//                 }}
//               />
//             </TouchableOpacity>
//           </View>

//           {Array.isArray(this.state.listData)
//             ? this.state.listData.map((item, index) => (
//                 <ListItem
//                   key={index}
//                   // photo={item.poster}
//                   deskripsi={item.deskripsi}
//                   irm_number={item.irm_number}
//                   req_date={item.req_date}
//                   // nama_kapal={item.nama_kapal}
//                   departemen={item.departemen}
//                   stats={item.stats}
//                   sending={item.sending}
//                   onPress={() =>
//                     this.props.navigation.navigate('Detail IRM', {
//                       irm_number: item.irm_number,
//                       deskripsi: item.deskripsi,
//                       nama_kapal: item.nama_kapal,
//                       departemen: item.departemen,
//                       req_date: item.req_date,
//                       // id: item.id,
//                     })
//                   }
//                 />
//               ))
//             : null}
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }
// }

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
import {SearchBar} from 'react-native-elements';
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

export default IRMListScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM request_tb LEFT JOIN req_item_tb ON request_tb.irm_number = req_item_tb.irm_number_req LEFT JOIN kapal_tb ON kapal_tb.id_kapal = request_tb.kapal_id LEFT JOIN item_tb ON item_tb.kode_item = req_item_tb.kode_item_req GROUP by request_tb.irm_number ORDER by request_tb.id',
        // 'SELECT * FROM request_tb',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            console.log(results.rows.item(i));
            temp.push(results.rows.item(i));
          }
          setUserList(temp);
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
        const itemData = item.irm_number
          ? item.irm_number.toUpperCase()
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

  let deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM request_tb where id=?',
        [id],
        (tx, results) => {
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
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <SearchBar
        round
        containerStyle={{
          backgroundColor: '#0096FF',
          justifyContent: 'space-around',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          marginBottom: -20,
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
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}></View>

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
        <View
          style={{
            marginBottom: 20,
          }}>
          {Array.isArray(userList)
            ? userList.map((item, index) => (
                <ListItem
                  key={index}
                  // photo={item.poster}
                  deskripsi={item.deskripsi}
                  irm_number={item.irm_number}
                  req_date={item.req_date}
                  id_kapal={item.id_kapal}
                  nama_kapal={item.nama_kapal}
                  departemen={item.departemen}
                  status={item.status}
                  sending={item.sending}
                  onPress={() =>
                    navigation.navigate('Detail IRM', {
                      irm_number: item.irm_number,
                      deskripsi: item.deskripsi,
                      nama_kapal: item.nama_kapal,
                      departemen: item.departemen,
                      req_date: item.req_date,
                      id_kapal: item.id_kapal,
                      // id: item.id,
                    })
                  }
                />
              ))
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
