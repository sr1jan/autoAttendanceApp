import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, StatusBar, Animated} from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from 'react-native-firebase';

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return(
      <Animated.Image
      onLoad={this.onLoad}
      {...this.props}
      style={[
        {
          opacity: this.state.opacity,
          transform: [
            {
              scale: this.state.opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0.85, 1],
              })
            }
          ]
        },
          this.props.style,
        ]}
        />
      )
  }
}


export default class Loading extends Component {
  ShowAlertWithDelay=()=>{

    setTimeout(function(){

    var executed=false;
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        if(!executed){
          executed=true;
          Actions.drawer();
        } 
      } 
      if(!user) { 
        Actions.loading() 
      }
    });

  }, 2000);


  }

  render() {
    
   
    return (
      
      <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <ImageLoader
                style={{ flex:1, resizeMode: 'center'}}
                source={require('../Images/Logo.png')}/> 
          
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
   backgroundColor: '#3d5afe',
   alignItems :'center',
   
  },

  logoText : {
      marginVertical: 50,
      fontSize: 30,
      color : 'rgba(255, 255, 255, 0.7)'
    },
  
});


