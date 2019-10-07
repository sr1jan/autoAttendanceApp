import React, {Component }from 'react'
import {Actions} from 'react-native-router-flux';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar,Animated, Image,ImageBackground} from 'react-native'
import firebase from 'react-native-firebase';
import Onboarding from 'react-native-onboarding-swiper';

export default class Loading extends React.Component {
	schoolCode(){
		Actions.code();
	}
  render( ) {
  return (
    <Onboarding 
    onSkip={() => {
      this.schoolCode()
    }}
    onDone={() => {
          this.schoolCode()
        }}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image 
                style={{resizeMode: 'center'}}
                source={require('../Images/Logo.png')} />,
        title: 'Attendance System',
        subtitle: 'Easy Face Attendance System Using AI',
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image 
                style={{resizeMode: 'center'}}
                source={require('../Images/Logo.png')} />,
        title: 'Just click photo',
        subtitle: 'Select the lecture and click a picture of class',
      },
      {
        backgroundColor: '#999',
        image: <Image 
                style={{resizeMode: 'center'}}
                source={require('../Images/Logo.png')} />,
        title: "Thast's it. Attendance Updated",
        subtitle: "Vola Enjoy",

      },
    ]}
  />
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