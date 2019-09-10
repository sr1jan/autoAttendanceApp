import React, { Component } from 'react';
import { Text, View, StyleSheet,TouchableHighlight,Image } from 'react-native';
import {DrawerActions} from 'react-navigation';

export default class HomeScreen extends Component{
	static navigationOption={
		drawerLabel1:'Home',
		drawerIcon:()=>(
			<Image></Image>
			),
	}

	render(){
		return(
				<View style={styles.view}>
					<TouchableHighlight onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
						style={styles.touchableHighlight} underlayColor={'rgba(0,0,0,0.8'}>
						<Text style={styles.open}>OPEN</Text>
					</TouchableHighlight>
					<Text style={styles.text}>This is homescreen</Text>
				</View>
			);
	}
}

const styles=StyleSheet.create({

	view:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'white',
	},

	text:{
		fontSize:26,
		color:'purple'
	},

	touchableHighlight:{
		width:50,
		height:50,
		backgroundColor:'red',
		borderRadius:50,
		alignItems:'center',
		justifyContent:'center',
		// position:'absloute',
		left:10,
		top:10
	},

	open:{
		color:'white',
		fontSize:16,
		fontWidth:'bold'
	},
});