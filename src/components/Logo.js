import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, } from 'react-native';

export default class Logo extends Component {
	render() {
		return(
			<View style={styles.container}>
        <Image
          style={{resizeMode: 'center', tintColor: 'white'}}
          source={require('../Images/Logo.png')}
        />  
        <Text style={styles.logoText}>
          {this.props.type}
        </Text>
      </View>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18163E',
    alignItems : 'center',
    justifyContent : 'center',
  },

  logoText : {
    padding: 15,
    textAlign: 'center',
    fontSize: 30,
    color : 'white'
  },

});