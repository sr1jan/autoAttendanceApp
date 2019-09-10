import React, { Component } from 'react';
import { Text, View, StyleSheet,TouchableHighlight,Image } from 'react-native';


export default class Screen3 extends Component{
	static navigationOption={
		drawerLabel1:'Add Group',
		drawerIcon:()=>(
			<Image></Image>
			),
	}

	render(){
		return(
				<View style={styles.view}>
				<Text style={styles.text}>This is screen3</Text>
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
		backgroundColor:'red',
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