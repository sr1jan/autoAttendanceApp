import React, { Component } from 'react';
import { View, Image, ActivityIndicator,Button, StyleSheet, Alert,ImageBackground } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';

const { app } = firebase.storage();
console.log(app);

export default class image extends Component {
  state = {
    photo: null,
  };

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
    return firebase.storage().ref('images/' + imageName).putFile(image.path);    
  }

  render() {
 
    const { photo } = this.state;
    return (
       <ImageBackground source={require('../Images/backg.png')} style={{width: '100%', height: '100%'}}>
      <View style={styles.main}>
        <View style={styles.container}>
          <Image
            source={require('../Images/Logo.png')}
            style={styles.stretch}
          />
         <Button title="Choose Photo" color="black" onPress={this.handleChoosePhoto} />
        </View>
        <View style={styles.img_container}>
          {photo && (
            <Image source={{ uri: photo.uri }} style={styles.userImg} />
          )}
        </View>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
    width: 300,
    height: 300,
    position: 'relative',
  },

  img_container: {
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

});