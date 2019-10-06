import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar } from 'react-native';
import Logo from './src/components/Logo';
import Form from './src/components/Form';

export default class Signup extends Component<{}> {
  render() {
    return(
      <View style={styles.container}>
        
         <Logo type="Signup As Student"/>
         <Form type="Signup"/>
         <View style={styles.signup}>
          <Text style={styles.sign}>Already have an account ?</Text>
          <Text style={styles.signB}> Sign in</Text>
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