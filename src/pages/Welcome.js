import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, StatusBar, Animated} from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from '@react-native-firebase/app';

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

	shouldComponentUpdate(nextProps, nextState){
		return (this.state != nextState);
  }

	getSnapshotBeforeUpdate(nextProps, nextState){
		console.log('getSnapshotBeforeUpdate');
		console.log('nextState ->', nextState);
	}

	componentDidUpdate(prevProps, prevState){
		console.log('component did update');
		console.log('prevState ->', prevState);
  }

  callNewsFeed = async () => {
    var executed = 5;
    firebase.auth().onAuthStateChanged(async (user) => {
      if(user){
        if(executed==5){
          executed=1;
          {
            Actions.newsFeed({ type: 'reset' });
          }
        } 
      } 
      if(!user) {
        if(executed==5){
          executed=1; 
          Actions.informationMenu({ type: 'reset' });
        }
      }
    });
  }

  ShowAlertWithDelay(){
    setTimeout(this.callNewsFeed, 2000);
  }

  render() {
    console.log('rendering welcome page');
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#18163E" barStyle="light-content" />
        <ImageLoader
          style={{ flex:1, resizeMode: 'center', tintColor: 'white'}}
          source={require('../Images/Logo.png')}
        /> 
        <Text style={styles.logoText}>Welcome</Text>
        {this.ShowAlertWithDelay()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#18163E',
   alignItems :'center',
  },

  logoText : {
    marginVertical: 50,
    fontSize: 30,
    color : 'rgba(255, 255, 255, 0.7)'
  },

});