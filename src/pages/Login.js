import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,TouchableOpacity,Button } from 'react-native';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import {Actions} from 'react-native-router-flux';

 
export default class Loginn extends Component<{}> {
  
_call(){
  Actions.teacherORstudent()
}
_call2(){
  alert('You can Signup again and all your data will be copied from old profile automatically');
}
  render() {
    return(
      <View style={styles.container}>
         <Logo type="Login"/>
         <LoginForm/>
         <TouchableOpacity onPress={this._call2}>
            <Text style={styles.forgetPass}> Forget Password </Text>              
          </TouchableOpacity>
         <View style={styles.signUP}>
          <Text style={styles.sign}>Don't have an Account.</Text>
          <TouchableOpacity onPress={this._call}><Text style={styles.sign}> Signup</Text></TouchableOpacity>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#4885ed',
   alignItems :'center',
   justifyContent : 'center',
   
  },
  signUP: {
    flexGrow: 1,
    alignItems :'flex-end',
    justifyContent : 'center',
    paddingVertical: 16,
    flexDirection:'row',
  },

  sign: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18
  },
  forgetPass: {
    color: 'white',
    padding: 5
  },

  
});