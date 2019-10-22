import React, { Component } from 'react';
import { Text,Image, View, StyleSheet,StatusBar, Alert, TouchableOpacity,PixelRatio, ProgressBarAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';

export default class Attend extends Component {
  state={
    i: 1,
    status:'Take Photo',
    photo: null,
    progressBarStatus: false,
    avatarSource1: null,
    avatarSource2: null,
    avatarSource3: null,
    avatarSource4: null,
    avatarSource5: null,
    avatarSource6: null,
    avatarSource7: null,
    avatarSource8: null,
    Name: '',
    Fnam: '',
  }
  Move=()=>{
    this.setState({progressBarStatus: false});

  }
  handleChoosePhoto = key => val => {
    var user = firebase.auth().currentUser;
		var uid=user.uid;
		var docRef = firebase.firestore().collection("StudentsData").doc(uid);
		docRef.get().then((doc)=> {
            const Studentname=doc.data().name;
            const Count=doc.data().i;
            this.setState({i: Count});
            this.setState({Fnam: Studentname, Name: Studentname+this.state.i++});
            firebase.firestore().collection("StudentsData").doc(uid).update({ i: this.state.i})
        });
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
        const image = {
          path : response.uri.toString(),
        };
        this.setState({progressBarStatus: true, [key]: response})
        this.uploadImage(response, this.state.Fnam, this.state.Name)
          .then(() => this.Move() )
          .catch((error) => {
              console.log(error.message);
              Alert.alert('Error', 'Something went wrong');
          });
      }
    });
  }

  uploadImage = async (image, fnam, imageName) => {
    return firebase.app().storage('gs://faceattendance-253619-4f9k7').ref('StudentsTrainingImage/'+fnam+'/'+imageName).putFile(image.path);
  }
    
     render() {
      const { progressBarStatus } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#000000" barStyle="light-content"
                />
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this.handleChoosePhoto('avatarSource1')}>
                    <View
                        style={[styles.avatar, styles.avatarContainer, {marginBottom: 20,}]}>
                        {this.state.avatarSource1 === null ? (
                        <Text style={{color: '#fff',}}>Select 1st Photo</Text>
                        ) : (
                        <Image style={styles.avatar} source={this.state.avatarSource1} />
                        )}
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleChoosePhoto('avatarSource2')}>
                    <View
                        style={[styles.avatar, styles.avatarContainer, {marginBottom: 20, marginHorizontal: 20,}]}>
                        {this.state.avatarSource2 === null ? (
                        <Text style={{color: '#fff',}}>Select 2nd Photo</Text>
                        ) : (
                        <Image style={styles.avatar} source={this.state.avatarSource2} />
                        )}
                    </View>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this.handleChoosePhoto('avatarSource3')}>
                    <View
                        style={[styles.avatar, styles.avatarContainer, {marginBottom: 20,}]}>
                        {this.state.avatarSource3 === null ? (
                        <Text style={{color: '#fff',}}>Select 3rd Photo</Text>
                        ) : (
                        <Image style={styles.avatar} source={this.state.avatarSource3} />
                        )}
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleChoosePhoto('avatarSource4')}>
                    <View
                        style={[styles.avatar, styles.avatarContainer, {marginBottom: 20, marginHorizontal: 20,}]}>
                        {this.state.avatarSource4 === null ? (
                        <Text style={{color: '#fff',}}>Select 4th Photo</Text>
                        ) : (
                        <Image style={styles.avatar} source={this.state.avatarSource4} />
                        )}
                    </View>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this.handleChoosePhoto('avatarSource5')}>
                    <View
                        style={[styles.avatar, styles.avatarContainer, {marginBottom: 20,}]}>
                        {this.state.avatarSource5 === null ? (
                        <Text style={{color: '#fff',}}>Select 5th Photo</Text>
                        ) : (
                        <Image style={styles.avatar} source={this.state.avatarSource5} />
                        )}
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleChoosePhoto('avatarSource6')}>
                    <View
                        style={[styles.avatar, styles.avatarContainer, {marginBottom: 20, marginHorizontal: 20,}]}>
                        {this.state.avatarSource6 === null ? (
                        <Text style={{color: '#fff',}}>Select 6th Photo</Text>
                        ) : (
                        <Image style={styles.avatar} source={this.state.avatarSource6} />
                        )}
                    </View>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this.handleChoosePhoto('avatarSource7')}>
                    <View
                        style={[styles.avatar, styles.avatarContainer, {marginBottom: 20,}]}>
                        {this.state.avatarSource7 === null ? (
                        <Text style={{color: '#fff',}}>Select 7th Photo</Text>
                        ) : (
                        <Image style={styles.avatar} source={this.state.avatarSource7} />
                        )}
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleChoosePhoto('avatarSource8')}>
                    <View
                        style={[styles.avatar, styles.avatarContainer, {marginBottom: 20, marginHorizontal: 20,}]}>
                        {this.state.avatarSource8 === null ? (
                        <Text style={{color: '#fff',}}>Select 8th Photo</Text>
                        ) : (
                        <Image style={styles.avatar} source={this.state.avatarSource8} />
                        )}
                    </View>
                    </TouchableOpacity>
                    </View>
                {progressBarStatus && (
                  <ProgressBarAndroid styleAttr="Horizontal" color="#fff" />
                )}
            </View>
         );
     }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#18163E',
   justifyContent:'center',
   alignItems: 'center'
   
  },

  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 130,
    height: 130,
  },

});