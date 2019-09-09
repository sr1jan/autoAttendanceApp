import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,Image,Button,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Flog extends Component {

_onPressButton() {
    Actions.tlogin()
  }
  _callToStudent(){
    Actions.slogin()
  }
    render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#27057f" barStyle="light-content" />
          <Image
              style={{width: 50, height: 70}}
              source={require('../Images/Logoo.png')}/>  
              <Text style={styles.logoText}>
              You Are ?
              </Text>
        <TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Teacher"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._callToStudent}
            title="Student"
            color="#841584"
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
    backgroundColor: '#5e35b1',
    alignItems :'center',
    justifyContent : 'center',
  },
  logoText : {
      marginVertical: 20,
      fontSize: 25,
      color : 'rgba(255, 255, 255, 0.7)'
    },
   buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

});