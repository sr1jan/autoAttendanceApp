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
        
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#3d5afe',
   alignItems :'center',
   justifyContent : 'center',
   
  }




});