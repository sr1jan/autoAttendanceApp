import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,TouchableOpacity,Button } from 'react-native';
import Logo from '../components/Logo';
import Tlform from '../components/Tlform';
import {Actions} from 'react-native-router-flux';

 
export default class Loginn extends Component<{}> {
  
_call(){
  Actions.flog()
}
_call2(){
  alert('You can Signup again and all your data will be copied from old profile automatically');
}
  render() {
    return(
      <View style={styles.container}>
        
         <Logo type="Login"/>
         <Tlform/>
         <TouchableOpacity>
                <Button 
                  onPress={this._call2}
                  title="Forget password"
                  color='rgba(255, 255, 255, 0.1)'
                 />
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
   backgroundColor: '#3d5afe',
   alignItems :'center',
   justifyContent : 'center',
   
  },
  signUP: {
     backgroundColor: '#3d5afe',
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

  
});