import React, {useState} from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import Feather from 'react-native-vector-icons/Feather'

import BannerSlider from './../components/BannerSlider'
import {windowWidth} from './../utils/Dimensions'

import {freeGames, paidGames, sliderData} from './../model/data'
import CustomSwitch from './../components/CustomSwitch'
import ListItem from './../components/ListItem'

export default function Dashboard({navigation}) {
    const [gamesTab, setGamesTab] = useState(1);

    const renderBanner = ({item, index}) => {
        return <BannerSlider data={item} />;
    };

    const onSelectSwitch = value => {
        setGamesTab(value);
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{padding: 20}}>

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
                    onPress={() => navigation.navigate('Dua', {
                        asal: 'Dashboard'
                    })}
                    style={{
                    borderColor: '#ddd',
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    }}>
                    <Text>Request Form</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Dua', {
                        asal: 'Dashboard'
                    })}
                    style={{
                    borderColor: '#ddd',
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                    }}>
                    <Text>IRM List</Text>
                </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
    )
}
