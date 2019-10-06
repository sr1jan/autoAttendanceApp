import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,Image,Button,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Logo from '../components/Logo';

export default class Flog extends Component {

_onPressButton() {
    Actions.tsignup()
  }
  _callToStudent(){
    Actions.ssignup()
  }
    render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
          <Logo type="Get Started as"/>  
       
        <View style={styles.buttonContainer}>
         <TouchableOpacity style={{width: 150, backgroundColor: '#3d5afe', textAlign: 'center'}} onPress={this._onPressButton}>
              <Text style={styles.logoText}>Teacher</Text>
            </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 7, width: 150,  backgroundColor: '#3d5afe', textAlign: 'center'}} onPress={this._callToStudent}>
              <Text style={styles.logoText}>Student</Text>
            </TouchableOpacity>
          
        </View>
      </View>
    );
  }
}


  const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems :'center',
    justifyContent : 'center',
  },
  
   buttonContainer: {
   flexDirection: 'row',
   padding: 20,
  },
    logoText : {
      marginVertical: 7,
      fontSize: 18,
      color: '#ffffff',
      textAlign: 'center',
    },
 
});