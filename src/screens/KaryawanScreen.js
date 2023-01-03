import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {style} from './../assets/style/Style';

class KaryawanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      jabatan: '',
      listData: [],
      idEdit: null,
    };
    this.url = 'http://192.168.1.10/works/PT-PKM-Batam/php-api/api.php';
  }
  componentDidMount() {
    this.ambilListData();
  }
  async ambilListData() {
    await fetch(this.url)
      .then(response => response.json())
      .then(json => {
        console.log('Hasil yang didapat: ' + JSON.stringify(json.data.result));
        this.setState({listData: json.data.result});
      })
      .catch(error => {
        console.log(error);
      });
  }
  klikSimpan() {
    if (this.state.nama == '' || this.state.jabatan == '') {
      alert('Silakan masukkan nama dan jabatan');
    } else {
      if (this.state.idEdit) {
        var urlAksi = this.url + '/?op=update&id_k=' + this.state.idEdit;
      } else {
        var urlAksi = this.url + '/?op=create';
      }

      fetch(urlAksi, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'nama=' + this.state.nama + '&jabatan=' + this.state.jabatan,
      })
        .then(response => response.json())
        .then(json => {
          this.setState({nama: ''});
          this.setState({jabatan: ''});
          this.ambilListData();
        });
    }
  }
  async klikEdit(id_k) {
    await fetch(this.url + '/?op=detail&id_k=' + id_k)
      .then(response => response.json())
      .then(json => {
        this.setState({nama: json.data.result[0].nama});
        this.setState({jabatan: json.data.result[0].jabatan});
        this.setState({idEdit: id_k});
      });
  }
  async klikDelete(id_k) {
    await fetch(this.url + '/?op=delete&id_k=' + id_k)
      .then(response => response.json())
      .then(json => {
        alert('Data berhasil didelete');
        this.ambilListData();
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={style.viewWrapper}>
        <View style={style.viewData}>
          {this.state.listData.map((val, index) => (
            <View style={style.viewList} key={index}>
              <Text style={style.textListNama}>{val.nama}</Text>
              <Text
                style={style.textListEdit}
                onPress={() => this.klikEdit(val.id_k)}>
                Edit
              </Text>
              <Text
                style={style.textListDelete}
                onPress={() => this.klikDelete(val.id_k)}>
                Delete
              </Text>
            </View>
          ))}
        </View>
        <View style={style.viewForm}>
          <TextInput
            style={style.textInput}
            placeholder="Masukkan Nama"
            value={this.state.nama}
            onChangeText={text => this.setState({nama: text})}></TextInput>
          <TextInput
            style={style.textInput}
            placeholder="Masukkan Jabatan"
            value={this.state.jabatan}
            onChangeText={text => this.setState({jabatan: text})}></TextInput>
          <Button
            title="Masukkan Data"
            onPress={() => this.klikSimpan()}></Button>
        </View>
      </View>
    );
  }
}

export default KaryawanScreen;
