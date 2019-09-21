import React, { Component } from 'react';
import { Text, View, Image, Button, StyleSheet} from 'react-native';

import ImagePicker from 'react-native-image-picker';

export default class App extends Component {

  state = {
    photo: null,
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
      permissionDenied: true,
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('response', response);
      if (response.uri) {
        this.setState({ photo: response });
        console.log('photo --> ', this.state);
      }
    });
  };

  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'space-evenly', }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
          <Image
            style={styles.stretch}
            source={require('./src/images/logo.png')}
          />
         <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        </View>
        <View style={{ padding: 20, justifyContent: 'flex-end', alignItems: 'center' }}>
         {photo && (
            <Image source={{ uri: photo.uri }} style={styles.userImg} />
         )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stretch: {
    width : '100%',
    height: '10%',
    resizeMode: 'contain',
    position: 'relative',
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

});
