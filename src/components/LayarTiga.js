import React from 'react'
import { View, Text, Button } from 'react-native'

export default function LayarTiga({navigation}) {
    return (
        <View style={{flex:1}}>
            <Text style={{
                color:'black',
                fontSize:50,
                alignItems:'center',
                justifyContent:'center'
            }}>Ini di Layar Tiga</Text>
            <Button 
                title = "Data Karyawan"
                onPress={()=>navigation.navigate('Data Karyawan',{
                    asal:'Data Karyawan'
                })}
            />
        </View>
    )
}
