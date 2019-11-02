import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import {Actions} from 'react-native-router-flux';

 
export default class Loginn extends Component {
  
_call(){
  Actions.teacherORstudent()
}
_call2(){
  Alert.alert('Contact admins', 'They will surely help you :)');
}
  render() {
    return(
      <View style={styles.container}>
        <Image
          style={{ resizeMode: 'center', tintColor: 'white'}}
          source={require('../Images/Logo.png')}
        /> 
        <LoginForm/>
        <TouchableOpacity onPress={this._call2}>
          <Text style={styles.forgetPass}> Forget Password </Text>              
        </TouchableOpacity>
        <View style={styles.signUP}>
          <Text style={styles.sign}>Don't have an Account.</Text>
          <TouchableOpacity onPress={this._call}>
            <Text style={styles.sign}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18163E',
    alignItems :'center',
    justifyContent : 'center',
  },

  signUP: {
    alignItems :'flex-end',
    justifyContent : 'center',
    flexDirection:'row',
    paddingBottom: 10,
  },

  sign: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15
  },

  forgetPass: {
    color: 'white',
    padding: 5
  },

});