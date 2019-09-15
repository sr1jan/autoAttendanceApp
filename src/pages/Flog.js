import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,Image,Button,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Flog extends Component {

_onPressButton() {
    Actions.tsignup()
  }
  _callToStudent(){
    Actions.ssignup()
  }
    render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
          <Image
              style={{width: 100, height: 120}}
              source={require('../Images/Logoo.png')}/>  
            <Text style={styles.logoText}>
                Get Started as 
                </Text>
        <TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="    Teacher    "
            color='rgba(255, 255, 255, 0.1)'
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._callToStudent}
            title="    Student    "
            color='rgba(255, 255, 255, 0.1)'
          />
          
        </View>
       </TouchableOpacity> 
      </View>
    );
  }
}


  const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#212121',
    alignItems :'center',
    justifyContent : 'center',
  },
  
   buttonContainer: {
    margin: 20,
   
  },

  logoText : {
      marginVertical: 50,
      fontSize: 30,
      color : 'rgba(255, 255, 255, 0.7)'
    },
 
});