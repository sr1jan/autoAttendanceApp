import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,TextInput,TouchableOpacity} from 'react-native';

export default class Logo extends Component<{}> {
	   _call(){
  alert('Server Not Found ERROR 404');
}

	render() {
		return(
			<View style={styles.container}>
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

			)
	}
}
const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#212121',
   alignItems :'center',
   justifyContent : 'center',
   
  },
		
	inputBox: {
		width: 300,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		borderRadius: 25,
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#ffffff',
		marginVertical: 10,
	},

	button:{
		width: 150,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 15,
		marginVertical: 10,
		paddingVertical: 10
	},


	buttonText: {
		fontSize: 16,
		textAlign: 'center',
		color: '#ffffff'
	}


});