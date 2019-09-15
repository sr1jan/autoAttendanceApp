import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import Tform from '../components/Tform'; 
import {Actions} from 'react-native-router-flux';

export default class Signup extends Component<{}> {
  _call(){
  Actions.tlogin()
}
  render() {
    return(
      <View style={styles.container}>
        
         <Logo type="Signup As Teacher"/>
         <Tform/>
         <View style={styles.signup}>
          <Text style={styles.sign}>Already have an account ?</Text>
          <TouchableOpacity onPress={this._call}><Text style={styles.sign}> Login</Text></TouchableOpacity>
          
         </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#212121',
   alignItems :'center',
   justifyContent : 'center',
   
  },

  signup: {
    flexGrow: 1,
    alignItems :'flex-end',
    justifyContent : 'center',
    paddingVertical: 16,
    flexDirection:'row'
  },

  sign: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18
  },
});