import React from 'react'
import { View, Text, Button } from 'react-native'

export default function LayarDua({route, navigation}) {
    var lokasiAwal = '';
    if(route.params != undefined){
        lokasiAwal = '( Dari '+route.params.asal+')';
    }
    return (
        <View style={{flex:1}}>
            <Text style={{
                color:'blue',
                fontSize:50,
                alignItems:'center',
                justifyContent:'center'
            }}>Ini di Layar Dua {lokasiAwal}</Text>
            <Button
                title="Berpindah ke Halaman Tiga"
                onPress={()=>navigation.navigate('Tiga')}
            />
        </View>
    )
}
