import React, {Component }from 'react'
import {Actions} from 'react-native-router-flux';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar,Animated, Image,ImageBackground} from 'react-native'
import firebase from 'react-native-firebase';

export default class Loading extends React.Component {
  componentDidMount() {
    var executed=false;
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        if(!executed){
          executed=true;
          Actions.drawer();
        } 
      } 
      if(!user) { 
        Actions.code() 
      }
    });
  }
  

  render( ) {

    return (
      <ImageBackground source={require('../Images/backg.png')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Image
                style={{ flex:1, resizeMode: 'center'}}
                source={require('../Images/Logo.png')}/> 
       <Text style={{fontSize: 30, color : 'rgba(255, 255, 255, 0.7)'}}>Loading</Text>
       <ActivityIndicator size="large" /> 
      </View>
      </ImageBackground>

  );  
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    }
  }
);