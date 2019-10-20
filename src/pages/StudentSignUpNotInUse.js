import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar,TouchableOpacity, TextInput } from 'react-native';
import Logo from '../components/Logo';
import {Actions} from 'react-native-router-flux';

export default class Signup extends Component {
	   _call(){
  alert('Student SignUp will be soon launched');
}
  render() {
    return(
    	<ScrollView  style={styles.container}>
	        <View style={{alignItems :'center', justifyContent : 'center',}}>
	        	<Logo type="Signup As Student"/>
	        	<TextInput style={styles.inputBox}
					placeholder="Name as per ID'card"
					placeholderTextColor = "#ffffff"
				/>
				<TextInput style={styles.inputBox}
					placeholder="Branch"
					placeholderTextColor = "#ffffff"
				/>
				<TextInput style={styles.inputBox}
					placeholder="Year"
					placeholderTextColor = "#ffffff"
				/>
				<TextInput style={styles.inputBox}
					placeholder="Mobile Number"
					placeholderTextColor = "#ffffff"
				/>
				<TextInput style={styles.inputBox}
					placeholder="Email"
					placeholderTextColor = "#ffffff"
				/>
				<TextInput style={styles.inputBox}
					placeholder="Password"
					secureTextEntry={true}
					placeholderTextColor = "#ffffff"
				/>
				<TouchableOpacity style={styles.button} onPress={this._call}>
					<Text style={styles.buttonText}>SignUp</Text>
				</TouchableOpacity>
	        </View>
    	</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#18163E',
  },

  inputBox: {
		width: 350,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		paddingHorizontal: '10%',
		fontSize: 16,
		color: '#ffffff',
		marginVertical: '3%',
	},

	button:{
		width: 150,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 15,
		marginVertical: '3%',
		paddingVertical: '3%'
	},


	buttonText: {
		fontSize: 16,
		textAlign: 'center',
		color: '#ffffff'
	}




});