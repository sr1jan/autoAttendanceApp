import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, Image, StatusBar, Animated} from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class ButtonBasics extends Component {


ShowAlertWithDelay=()=>{

    setTimeout(function(){
        Actions.flog()

    }, 5000);


  }

  render() {
    
   
    return (
      
      <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Image
                style={{width: 80, height: 100, marginVertical: 230}}
                source={require('../Images/Logoo.png')}/>  
              <Text style={styles.logoText}>
                Welcome
                </Text>
                {this.ShowAlertWithDelay()}
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#212121',
   alignItems :'center',
   
  },

  logoText : {
      marginVertical: 50,
      fontSize: 30,
      color : 'rgba(255, 255, 255, 0.7)'
    },
  
});


