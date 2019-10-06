import React, { Component } from 'react';
import { StyleSheet, View, StatusBar} from 'react-native';
import Routes from './src/Routes';
console.disableYellowBox = true;

export default class App extends Component {
  render() {
    
    return (
      
      <View style={styles.container}>
      	<StatusBar backgroundColor="#27057f" barStyle="light-content" />
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


