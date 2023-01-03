import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import BannerSlider from './../components/BannerSlider';
import {windowWidth} from './../utils/Dimensions';

import {sliderData} from './../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default function HomeScreen({navigation}) {
  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Sloko App
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome name="bars" size={30} color={'black'} />
            {/* <ImageBackground
              source={require('./../assets/images/three-bars.png')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            /> */}
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Dashboard
          </Text>
        </View>

        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={windowWidth - 40}
          itemWidth={300}
          loop={true}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 40,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('New IRM', {
                asal: 'RequestFormScreen',
              })
            }
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0096FF',
            }}>
            <Ionicons name="md-create" size={30} color={'#fff'} />
            <Text style={{color: '#fff'}}>Request Form</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('IRM List', {
                asal: 'IRMListScreen',
              })
            }
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 50,
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0096FF',
            }}>
            <Entypo name="list" size={30} color={'#fff'} />
            <Text style={{color: '#fff'}}>IRM List</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
