import React, { Component } from 'react';
import { Text, View, StyleSheet,TouchableHighlight,Image } from 'react-native';


export default class Screen1 extends Component{
	static navigationOption={
		drawerLabel1:'Contacts',
		drawerIcon:()=>(
			<Image></Image>
			),
	}

	render(){
		return(
				<View style={styles.view}>
				<Text style={styles.text}>This is screen1</Text>
					<TouchableHighlight onPress={()=>this.props.navigation.goBack())}>
						style={styles.touchableHighlight} underlayColor={'#f1f1f1'}>
						<Text style={styles.text}>Go Back</Text>
					</TouchableHighlight>
				</View>
			);
	}
}

const styles=StyleSheet.create({

	view:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'yellow',
	},

	text:{
		fontSize:26,
		color:'black'
	},

	touchableHighlight:{

		backgroundColor:'orange',
		paddingVertical:20,
		margin:10,
		paddingHorizontal:50
	}
});