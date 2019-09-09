import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import Ssform from '../components/Ssform';
import {Actions} from 'react-native-router-flux';

export default class Signup extends Component<{}> {
   _call(){
  Actions.slogin()
}
  render() {
    return(
      <View style={styles.container}>
        
         <Logo type="Signup As Student"/>
         <Ssform/>
         <View style={styles.signup}>
          <Text style={styles.sign}>Already have an account ?</Text>
          <TouchableOpacity onPress={this._call}><Text style={styles.signB}> Login</Text></TouchableOpacity>
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

  signB: {
    color:'#ffffff',
    fontSize:16,
    fontWeight:'500'
  }
});