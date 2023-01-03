import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { createDrawerNavigator } from '@react-navigation/drawer'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Dashboard from './src/components/Dashboard';
import LayarDua from './src/components/LayarDua';
import LayarTiga from './src/components/LayarTiga';
import KaryawanScreen from './src/screens/KaryawanScreen';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();
const DrawerDepan = () => {
    return (
      <Drawer.Navigator>
          <Drawer.Screen name="Sloko App" component={Dashboard}/>
          <Drawer.Screen name="DrawerDua" component={LayarDua}/>
      </Drawer.Navigator>
    )
}

// const Tab = createMaterialBottomTabNavigator();
// const TabDepan = () => {
//     return (
//         <Tab.Navigator tabBarOptions={{
//             scrollEnabled: true,
//             activeTintColor:'#333',
//             inactiveTintColor:'black',
//             indicatorStyle:{
//                 backgrounColor:'#CCCCCC'
//             },
//             labelStyle:{
//                 fontSize:16,
//                 color:'black',
//                 paddingBottom:10
//             },
//             activeBackgroundColor:'white',
//             inactiveBackgroundColor:'gray',
//             style:{
//                 backgroundColor:'white'
//             }
//         }}>
//             <Tab.Screen name="TabSatu" component={Dashboard}/>
//             <Tab.Screen name="TabDua" component={LayarDua}/>
//         </Tab.Navigator>
//     )
// }
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="Dashboard" component={DrawerDepan}/>
                <Stack.Screen name="Dua" component={LayarDua}/>
                <Stack.Screen name="Tiga" component={LayarTiga}/>
                <Stack.Screen name="Karyawan" component={KaryawanScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};
