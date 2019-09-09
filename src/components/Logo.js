import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,Image,ImageBackground} from 'react-native';

export default class Logo extends Component<{}> {
	render() {
		return(
			<View style={styles.container}>
				 <Image
          			style={{width: 50, height: 70}}
          			source={require('../Images/Logoo.png')}/>  
        			<Text style={styles.logoText}>
          			{this.props.type}
          			</Text>
        	</View>

			)
	}
}
const styles=StyleSheet.create({
	container : {
		flexGrow: 1,
		backgroundColor: '#5e35b1',
		alignItems :'center',
		justifyContent : 'flex-end',
	},
		logoText : {
			marginVertical: 15,
			fontSize: 20,
			color : 'rgba(255, 255, 255, 0.7)'
		},
	



});