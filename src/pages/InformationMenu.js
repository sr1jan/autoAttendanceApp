import React, {Component }from 'react'
import {Actions} from 'react-native-router-flux';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar,Animated, Image,ImageBackground,BackHandler} from 'react-native'
import firebase from 'react-native-firebase';
import Onboarding from 'react-native-onboarding-swiper';

export default class Loading extends React.Component {
	CollegeCode(){
		Actions.collegeCode();
	}
  state={
    current: true,
  }
  componentDidMount=()=>{
  BackHandler.addEventListener('hardwareBackPress', function() {
  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

  if (true) {
    
    return true;
  }
  return false;
});
}
  render( ) {
  return (
    <Onboarding 
    onSkip={() => {
      this.CollegeCode()
    }}
    onDone={() => {
          this.CollegeCode()
        }}
    pages={[
      {
        backgroundColor: '#18163E',
        image: <Image 
                style={{ resizeMode: 'center', tintColor: 'white' }}
                source={require('../Images/Logo.png')} />,
        title: 'Attendance System',
        subtitle: 'Easy Face Attendance System Using AI',
      },
      {
        backgroundColor: '#18163E',
        image: <Image 
                style={{ resizeMode: 'center', tintColor: 'white' }}
                source={require('../Images/Logo.png')} />,
        title: 'Just click photo',
        subtitle: 'Select the lecture and click a picture of class',
      },
      {
        backgroundColor: '#18163E',
        image: <Image 
                style={{ resizeMode: 'center', tintColor: 'white' }}
                source={require('../Images/Logo.png')} />,
        title: "That's it. Attendance Updated",
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