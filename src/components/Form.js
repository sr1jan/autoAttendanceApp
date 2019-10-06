import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,TextInput,TouchableOpacity} from 'react-native';

export default class Logo extends Component<{}> {

	render() {
		return(
			<View style={styles.container}>
				
				 <TextInput style={styles.inputBox}
				  placeholder="Email"
				  placeholderTextColor = "#ffffff"
				  />
				  <TextInput style={styles.inputBox}
				  placeholder="Password"
				  secureTextEntry={true}
				  placeholderTextColor = "#ffffff"
				  />
				  <TouchableOpacity style={styles.button}>
				  <Text style={styles.buttonText}>{this.props.type}</Text>
				  </TouchableOpacity>
	
        	</View>

			)
	}
}
const styles=StyleSheet.create({
	container : {
		flexGrow: 1,
		
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
		backgroundColor: '#9162e4',
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