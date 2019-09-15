import React from 'react'
import {Actions} from 'react-native-router-flux';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

export default class Loading extends React.Component {
  call(){
    Actions.tlogin()
  }

  call2(){
    Actions.screen()
  }

  constructor() {
    super();
    this.unsubscriber = null;
    this.state={
      user: null,
    };
  }

   componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {this.setState({user });
  });
  }
  

  render( ) {

    if(!this.state.user) {
  
            this.call();
    }
    if(this.state.user) {       this.call2();         }
    return (
      
      <View style={styles.container}>
       <Text>Loading</Text>
       <ActivityIndicator size="large" /> 
      </View>

  );  
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});