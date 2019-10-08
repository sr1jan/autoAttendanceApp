import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import StudentSignUpForm from '../components/StudentSignUpForm';
import {Actions} from 'react-native-router-flux';

export default class Signup extends Component<{}> {
   _call(){
  Actions.slogin()
}
  render() {
    return(
      <View style={styles.container}>
        
         <Logo type="Signup As Student"/>
         <StudentSignUpForm/>
        
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
   
  }




});