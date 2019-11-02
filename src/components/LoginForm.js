import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, StatusBar, TextInput, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from '@react-native-firebase/app';
export default class Tform extends Component {

	state = { 
		email: '', 
		password: '', 
		dashboardType: '',
		errorMessage: null,
		progressBarStatus: false,
	}
	LoginCall(){
		{
			var user = firebase.auth().currentUser;
			var uid=user.uid;
			var docRef = firebase.firestore().collection("StudentsData").doc(uid);
			docRef.get().then(function(doc) {
				if(doc.data().dasbord=="student"){
					Actions.newsFeed({type: 'reset'});
				}
				else{
					Actions.newsFeed({type : 'reset'});
				}
			})
			.catch(error => this.setState({progressBarStatus: false }));
		}
	}
	call2(){
		Actions.teacherHome({type: 'reset'});
	}

	handleLogin = () => {
		if (!this.state.email || !this.state.password) {
			Alert.alert('Empty field', 'Login and Password can not be empty')
		} else {
			this.setState({progressBarStatus: true})
			firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(() => this.LoginCall())
			.catch(error => this.setState({ errorMessage: error.message, progressBarStatus: false}))
		}
	}

	render() {
		const { progressBarStatus } = this.state;
		return(
			<View style={styles.container}>
				{this.state.errorMessage &&
					<Text style={{ color: 'red' }}>
						{this.state.errorMessage}
					</Text>
				}
				<TextInput style={styles.inputBox}
					placeholder="Email"
					placeholderTextColor = "#ffffff"
					onChangeText={email => this.setState({ email })}
					value={this.state.email}
				/>
				<TextInput 
					style={styles.inputBox}
					placeholder="Password"
					secureTextEntry={true}
					placeholderTextColor = "#ffffff"
					onChangeText={password => this.setState({ password })}
					value={this.state.password}
				/>
				<TouchableOpacity style={styles.button} onPress={this.handleLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				{progressBarStatus && (
					<ProgressBarAndroid styleAttr="Horizontal" color="#fff" />
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#18163E',
		alignItems :'center',
		justifyContent : 'center',
	},

	inputBox: {
		width: 300,
		color: '#ffffff',
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		borderRadius: 25,
		paddingHorizontal: 16,
		fontSize: 16,
		marginVertical: 10,
	},

	button:{
		width: 150,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 15,
		marginTop: 20,
		paddingVertical: 10
	},

	buttonText: {
		fontSize: 16,
		textAlign: 'center',
		color: '#ffffff'
	}

});