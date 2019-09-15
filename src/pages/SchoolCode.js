import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,TextInput, Image, TouchableOpacity, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Code extends Component {
_call(){
   alert('Contant your collage to get the code');
}
_call2(){
  Actions.loading()
}

 render() {
    
   
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Image
                style={{width: 100, height: 120}}
                source={require('../Images/Logoo.png')}/> 
          
              <Text style={styles.logoText}>
                Enter Collage Code
                </Text>
              <TextInput style={styles.inputBox}
               placeholder="Enter Code"
                placeholderTextColor = "#ffffff"
               />
               <TouchableOpacity>
                <Button 
                  onPress={this._call2}
                  title="Take me inn"
                  color='rgba(255, 255, 255, 0.1)'
                 />
                  </TouchableOpacity>
               <TouchableOpacity onPress={this._call}><Text style={styles.text}>Don't have code ? </Text></TouchableOpacity>
             
        
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

  logoText : {
      marginVertical: 50,
      fontSize: 30,
      color : 'rgba(255, 255, 255, 0.7)'
    },

  inputBox: {
  width: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
 
  paddingHorizontal: 16,
  fontSize: 16,
  color: '#ffffff',
  marginVertical: 10,
  },

  text : {
      marginVertical: 50,
      fontSize: 15,
      color : 'rgba(255, 255, 255, 0.5)'
    },

 
 
});
