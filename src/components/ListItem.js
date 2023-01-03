// import React from 'react';
// import {View, Text, Image, TouchableOpacity} from 'react-native';
// import {windowWidth} from '../utils/Dimensions';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// export default function ListItem({
//   photo,
//   deskripsi,
//   irm_number,
//   req_date,
//   stats,
//   sending,
//   onPress,
// }) {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//       }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingLeft: 10,
//           flex: 1,
//         }}>
//         {/* <Image
//           source={photo}
//           style={{width: 55, height: 55, borderRadius: 10, marginRight: 8}}
//         /> */}
//         <View style={{width: windowWidth - 220}}>
//           <Text
//             style={{
//               color: '#333',
//               fontFamily: 'Roboto-Medium',
//               fontSize: 14,
//             }}>
//             {irm_number}
//           </Text>
//           <Text
//             numberOfLines={1}
//             style={{
//               color: '#333',
//               fontFamily: 'Roboto-Medium',
//               fontSize: 14,
//               textTransform: 'uppercase',
//             }}>
//             {deskripsi}
//           </Text>
//         </View>
//       </View>

//       <View
//         style={{
//           width: windowWidth - 270,
//           alignContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Text
//           style={{
//             color: '#333',
//             fontFamily: 'Roboto-Medium',
//             fontSize: 14,
//           }}>
//           {req_date}
//         </Text>
//         <Text
//           style={{
//             color: 'red',
//             textAlign: 'center',
//             fontFamily: 'Roboto-Medium',
//             fontSize: 14,
//           }}>
//           {stats == 'Local' && 'Local item'}
//           {stats == 'New' && 'Server'}
//           {/* {stats == 'No' && <Image source={sending} style={{padding: 20}} />} */}
//         </Text>
//       </View>

//       <View style={{paddingRight: 10}}>
//         <TouchableOpacity
//           onPress={onPress}
//           style={{
//             backgroundColor: '#0aada8',
//             padding: 5,
//             width: 35,
//             borderRadius: 10,
//             alignContent: 'center',
//             alignItems: 'center',
//           }}>
//           <AntDesign name="rightcircleo" size={20} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// ----------------------------------------
// Using SQLite database
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {windowWidth} from '../utils/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ListItem({
  photo,
  deskripsi,
  irm_number,
  req_date,
  status,
  sending,
  onPress,
}) {
  return (
    <View
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
            {irm_number}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#333',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
              textTransform: 'uppercase',
            }}>
            {deskripsi}
          </Text>
        </View>
      </View>

      <View
        style={{
          alignContent: 'center',
          alignItems: 'flex-end',
          paddingRight: 10,
        }}>
        <Text
          style={{
            color: '#333',
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
          }}>
          {req_date}
        </Text>
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
          }}>
          {status == 'Local' && 'Local item'}
          {status == 'New' && 'Server'}
          {/* {status == 'No' && <Image source={sending} style={{padding: 20}} />} */}
        </Text>
      </View>

      <View style={{paddingRight: 10}}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: '#0aada8',
            padding: 5,
            width: 35,
            borderRadius: 10,
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="rightcircleo" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
