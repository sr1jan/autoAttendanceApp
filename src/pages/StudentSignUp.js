import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar,TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import StudentSignUpForm from '../components/StudentSignUpForm';
import {Actions} from 'react-native-router-flux';

export default class Signup extends Component {
   _call(){
  Actions.slogin()
}
  render() {
    return(
      <ScrollView>
        <View style={styles.container}>
          <Logo type="Signup As Student"/>
          <StudentSignUpForm/>
        </View>
      </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#18163E',
   alignItems :'center',
   justifyContent : 'center',
   
  }




});