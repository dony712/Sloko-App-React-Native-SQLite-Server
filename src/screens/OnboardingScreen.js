import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
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

const OnboardingScreen = ({navigation}) => {
  const [listDataKapal, setListDataKapal] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    createTable();
    // get service data kapal from server
    listDataKapalApi();

    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => {};
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
    ExecuteQuery('DROP TABLE IF EXISTS kapal_tb', []);
    ExecuteQuery(
      'CREATE TABLE IF NOT EXISTS kapal_tb(id_kapal INTEGER PRIMARY KEY, nama_kapal VARCHAR(255))',
      [],
    );
  };

  const listDataKapalApi = async () => {
    var url =
      'http://erp.pkmgroup.co.id/pkmerp/erp/apis/?key=3&task=vessel&dtsource=dbpkmerp_cpt';
    await fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log('Hasil yang didapat: ' + JSON.stringify(json));
        setListDataKapal(json);
      })
      .catch(error => {
        console.log(error);
      });
    // axios
    // .get(url)
    // .then((response) => {
    //   console.log('Hasil yang didapat: ' + JSON.stringify(response));
    //   setListDataKapal(response);
    // });
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log('Data Kapal API Server: ' + JSON.stringify(json));
      // insert data kapal from server into sqlite
      let query = 'INSERT INTO kapal_tb (id_kapal, nama_kapal) VALUES ';
      for (let i = 0; i < json.length; ++i) {
        query = query + "('" + json[i].ID + "','" + json[i].Name + "')";
        if (i != json.length - 1) {
          query = query + ',';
        }
      }
      query = query + ';';
      console.log(query);

      ExecuteQuery(query, []);

      setListDataKapal(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={{marginTop: 20}}>
        <Animatable.Text
          animation="fadeInUpBig"
          duraton="2500"
          style={{
            fontFamily: 'Inter-Bold',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#20315f',
          }}>
          Sloko App
        </Animatable.Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Gaming
          width={300}
          height={300}
          style={{transform: [{rotate: '-15deg'}]}}
        /> */}
        <Animatable.Image
          animation="fadeInUpBig"
          duraton="2500"
          source={require('./../assets/images/homescreen/sloko-img.png')}
          style={{height: 150, width: 250, borderRadius: 10}}
        />
      </View>
      <Animatable.View
        style={{width: '90%', justifyContent: 'space-between'}}
        animation="fadeInUpBig"
        duraton="2500">
        <TouchableOpacity
          style={{
            backgroundColor: '#0096FF',
            padding: 20,
            width: '100%',
            borderRadius: 10,
            marginBottom: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          // onPress={() => navigation.navigate('Login')}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: 'Roboto-MediumItalic',
            }}>
            Let's Begin
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
