import React, { Fragment, Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { View, Text, StyleSheet ,Animated, Image, StatusBar, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';

export default class next extends Component {
	state = {
    	photo: null,
    };
    handleChoosePhoto = () => {
		const options = {
			noData: true,
		};
    	ImagePicker.showImagePicker(options, response => {
			if (response.uri) {
				this.setState({ photo: response });

				const image = {
					path : response.uri.toString(),
				};
			}
    	});
  	}
	_call(){
		Actions.pictures();
	};
	_call2(){
		 firebase.auth().signOut();
	}
	alert(){
		alert('This feature coming on next update')
	}
	dhome(){
		Actions.home()
	}
	render(){
		const { photo } = this.state;
		return (
			<Fragment>
				<View style={ styles.container }>
					<View style={styles.topDrawer}>
						<TouchableOpacity style={{ backgroundColor: 'white', alignItems: 'center', width: 135 }} onPress={this.handleChoosePhoto}>
              			<Text style={{ color: 'black', padding: 5 }}>Choose Photo</Text>
            			</TouchableOpacity>
					    {photo && (
            				<Image source={{ uri: photo.uri }} style={styles.userImg} />
          				)}
					</View>
						<View style={styles.bottomDrawer}>
						<TouchableOpacity style={{width: 250, backgroundColor: '#fff', textAlign: 'center', marginVertical: 5,}} onPress={this.dhome}>
							<Text style={styles.logoText}>Home</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#fff', textAlign: 'center', marginVertical: 5,}} onPress={this._call}>
							<Text style={styles.logoText}>Mark Attendance</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#fff', textAlign: 'center', marginVertical: 5,}} onPress={this.alert}>
							<Text style={styles.logoText}>Time Table</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#fff', textAlign: 'center', marginVertical: 5,}} onPress={this.alert}>
							<Text style={styles.logoText}>Broadcast</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#fff', textAlign: 'center', marginVertical: 5,}} onPress={this.alert}>
							<Text style={styles.logoText}>Create event</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#fff', textAlign: 'center', marginVertical: 5,}} onPress={this.alert}>
							<Text style={styles.logoText}>Mark free lecture</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#fff', textAlign: 'center', marginVertical: 5,}} onPress={this._call2}>
				  			<Text style={styles.logoText}>Logout</Text>
				  		</TouchableOpacity>
					</View>
				</View>
			</Fragment>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#18163E',
	},
	topDrawer: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center'
	},
	bottomDrawer: {
		flex: 2,
		backgroundColor: '#18163E',
	},
  	logoText : {
		marginVertical: 10,
		fontSize: 18,
		color: '#000',
		textAlign: 'center',
    },
});
