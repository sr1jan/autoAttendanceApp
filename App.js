import React, { Component } from 'react';
import { View, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, FlatList, Text } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';

export default class App extends Component {
  state = {
    photo: null,
    students: [],
    subject: '',
    type: '',
  };

  componentDidMount(){
    firebase.auth().signInAnonymously();
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photo: response });

        const image = {
          path : response.uri.toString(),
        };
        this.uploadImage(image, 'Test Image')
          .then(() => {
              Alert.alert('Uploaded', 'Image successfully uploaded to the firebase database');
          })
          .catch((error) => {
              console.log(error.message);
              Alert.alert('Error', 'Something went wrong');
          });
      }
    });
  }

  uploadImage = async (image, imageName) => {
    return firebase.storage().ref(imageName).putFile(image.path);
  }

  // updateDB = () => {
  //   const ref = firebase.database().ref('Attendance/');
  //   ref.set({
  //     type: 'Theory',
  //     subject: 'DLDA'
  //   })
  // }

  getStudents = async () => {
    this.setState({ students: [] });
    const ref = firebase.firestore().collection('students').get();
    ref.then(snapshot => {
      snapshot.docs.forEach(doc => {
        this.setState(prevState => ({
          students: [...prevState.students, doc.data() ]
        }));
      });
    });
  }

  render() {
    const { photo, students } = this.state;
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Image
            source={require('./src/images/logo.png')}
            style={styles.stretch}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ backgroundColor: 'white', alignItems: 'center', width: 135 }} onPress={this.handleChoosePhoto}>
              <Text style={{ color: 'black', padding: 5 }}>Choose Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'black', alignItems: 'center', width: 85 }} onPress={this.getStudents}>
              <Text style={{ color: 'white', padding: 5 }}>Get List</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.img_container}>
          <TextInput
            style={{ height: 40, borderColor: 'white', borderWidth: 1, margin: 5 }}
            placeholder='Theory/Practical'
            autoCapitalize='words'
            maxLength={9}
            onChangeText={text => this.setState({ type: text })}
          /> 
          <TextInput
            style={{ height: 40, borderColor: 'white', borderWidth: 1, margin: 5 }}
            placeholder='Subject'
            autoCapitalize='characters'
            maxLength={4}
            onChangeText={text => this.setState({ subject: text })}
          /> 
          {photo && (
            <Image source={{ uri: photo.uri }} style={styles.userImg} />
          )}
          {students && (
            <FlatList
              data={students}
              renderItem={({item}) => <Text style={{ fontSize: 18, padding: 5 }}>{item.id} : {item.name}</Text>}
            />
          )} 
          <Text>Lecture type: {this.state.type} </Text>
          <Text>Subject: {this.state.subject} </Text>
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#4c8bf5',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  stretch: {
    resizeMode: 'center',
  },

  title: {
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
  },

  userImg: {
    width: '80%',
    height: '50%',
  },

  img_container: {
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

});
