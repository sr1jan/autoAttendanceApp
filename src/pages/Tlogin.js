import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import Tlform from '../components/Tlform';
import {Actions} from 'react-native-router-flux';

 
export default class Loginn extends Component<{}> {
  
_call(){
  Actions.tsignup()
}
  render() {
    return(
      <View style={styles.container}>
        
         <Logo type="Login as Teacher"/>
         <Tlform/>
         <View style={styles.signUP}>
          <Text style={styles.sign}>Dont have an Account. Signup ?</Text>
          <TouchableOpacity onPress={this._call}><Text style={styles.signB}> Signup</Text></TouchableOpacity>
         </View>
      </View>
      );
  }
}

const styles=StyleSheet.create({
  container: {
    backgroundColor: '#5e35b1',
    flex: 1,
    alignItems :'center',
    justifyContent : 'center',
  },

  signUP: {
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

  signB: {
    color:'#ffffff',
    fontSize:16,
    fontWeight:'500'
  }
});