import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {removeItemFromSelectedItem} from './../action/Actions';
import {TextInput} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SelectedItem = ({route}) => {
  const navigation = useNavigation();
  const items = useSelector(state => state);
  const dispatch = useDispatch();
  const removeItem = index => {
    dispatch(removeItemFromSelectedItem(index));
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {/* <View
            style={{
              width: '100%',
              height: 70,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                paddingLeft: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={{fontWeight: '700', fontSize: 20}}>Back</Text>
            </TouchableOpacity>
          </View> */}
        <FlatList
          data={items}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: '90%',
                  height: 160,
                  borderRadius: 15,
                  alignSelf: 'center',
                  marginTop: 10,
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
                    <Text>{item.kode_item}</Text>
                    <Text> - </Text>
                    <Text>{item.unit}</Text>
                  </View>
                  <Text style={{fontSize: 20, fontWeight: '600'}}>
                    {item.nama_item}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    {route.params?.stats == 'From Detail' ? (
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          textAlign: 'center',
                        }}>
                        Sisa
                      </Text>
                    ) : (
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
                      />
                    )}
                    {route.params?.stats == 'From Detail' ? (
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
                          Qty
                        </Text>
                      </>
                    ) : (
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
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    {route.params?.stats == 'From Detail' ? (
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          width: 120,
                          height: 30,
                        }}>
                        Note
                      </Text>
                    ) : (
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
                      />
                    )}
                  </View>
                </View>
                <Image
                  // source={{uri: item.image}}
                  source={item.image}
                  style={{
                    width: 100,
                    height: 90,
                    borderRadius: 10,
                  }}
                />
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
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectedItem;
