import React, { Component } from 'react';
import { StyleSheet, View, StatusBar} from 'react-native';
import Routes from './src/Routes';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/database';
import '@react-native-firebase/storage';

console.disableYellowBox = true;

export default class App extends Component {
  render() {

    return (

      <View style={styles.container}>
      	<StatusBar backgroundColor="#18163E" barStyle="light-content" />
       	<Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
  }
});


