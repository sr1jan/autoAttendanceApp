import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, FlatList, Text } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';

export default class App extends Component {
  state = {
    photo: null,
    students: [],
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
          {photo && (
            <Image source={{ uri: photo.uri }} style={styles.userImg} />
          )}
          {students && (
            <FlatList
              data={students}
              renderItem={({item}) => <Text style={{ fontSize: 18, padding: 5 }}>{item.id} : {item.name}</Text>}
            />
          )} 
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
    flex: 1,
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
    width: 250,
    height: 180,
  },

  img_container: {
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

});
