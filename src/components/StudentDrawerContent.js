import React, { Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { View, Text, Alert, StyleSheet ,PixelRatio, Image, ProgressBarAndroid, TouchableOpacity } from 'react-native';
import firebase from '@react-native-firebase/app';
import ImagePicker from 'react-native-image-picker';

export default class next extends Component {
	state = {
		oneTime: 1,
		photo: null,
		progressBarStatus: false,
		Name: '',
		Fname: '',
		ProfilePic: null,
		UL: null,
		access: false,
	};

	componentDidMount = async () => {
		console.log('studentDrawer: component did mount');
		const user = await firebase.auth().currentUser;
		const uid = user.uid;
		const docRef = await firebase.firestore().collection("StudentsData").doc(uid);
		const doc = await docRef.get();
		const studentName = doc.data().name;
		this.setState({ Fname: studentName, Name: studentName});
	}
	
	shouldComponentUpdate(nextProps, nextState){
		return (this.state != nextState);
	}

	// profile = async () => {
	// 	const user = await firebase.auth().currentUser;
	// 	const uid = user.uid;
	// 	const docRef = await firebase.firestore().collection("StudentsData").doc(uid);
	// 	const doc = await docRef.get();
	// 	const studentName = doc.data().name;
	// 	const fnam = studentName;
	// 	const imageName = studentName;
	// 	const url = await firebase.app().storage('gs://faceattendance-253619-4f9k7').ref('StudentsTrainingImage/'+fnam+'/'+imageName)
	// 	const imgUrl = await url.getDownloadURL();

	// 	this.setState({ Fname: studentName, Name: studentName, UL: url });
	// 	user.updateProfile({
	// 		displayName: this.state.Name,
	// 		photoURL: imgUrl,
	// 	}).catch(error => { console.log(error.message) })

	// 	console.log(user);
	// }

	Move = () => {
		this.setState({ oneTime: 1, progressBarStatus: false});
	}

	handleChoosePhoto = async (key) => {

		const options = {
			noData: true,
		};
    	ImagePicker.showImagePicker(options, response => {
			if (response.uri) {
				const image = {
					path : response.uri.toString(),
				};
				this.setState({progressBarStatus: true, [key]: response, photo: response })
				this.uploadImage(image, this.state.Fname, this.state.Name)
					.then(() => this.Move() )
					.catch((error) => {
						console.log(error.message);
					});
			}
		});
	}

	uploadImage = async (image, fnam, imageName) => {
		return await firebase.app().storage('gs://faceattendance-253619-4f9k7')
			.ref('StudentsTrainingImage/'+fnam+'/'+imageName).putFile(image.path);
	}

	_call2 = async () => {
		 await firebase.auth().signOut();
		 Actions.login({ type: 'reset' });
	}

	alert(){
		Alert.alert('Coming soon', 'This feature is coming in next update.')
	}

	callProfile(){
		Actions.profilePage();
	}

	dhome(){
		Actions.studentHome()
	}

	render(){
		console.log('studentDrawer rendering...');
		const { UL, oneTime, progressBarStatus } = this.state;
		return (
				<View style={ styles.container }>
					<View style={styles.topDrawer}>
						<TouchableOpacity onPress={this.handleChoosePhoto('ProfilePic')}>
						<View
							style={[styles.avatar, styles.avatarContainer, {marginBottom: 20,}]}>
							{this.state.UL === null ? (
							<Text style={{color: '#fff',}}>Upload Profile Pic</Text>
							) : (
								<Image style={styles.avatar} source={{uri : this.state.UL}} />
							)}
							{progressBarStatus && (
								<ProgressBarAndroid styleAttr="Horizontal" color="#fff" />
							)}
						</View>
						</TouchableOpacity>
					</View>
						<View style={styles.bottomDrawer}>
						<TouchableOpacity style={styles.drawerbars} onPress={this.dhome}>
							<Text style={styles.logoText}>Home</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this._call}>
							<Text style={styles.logoText}>Live Attendance</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.alert}>
							<Text style={styles.logoText}>Time Table</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.alert}>
							<Text style={styles.logoText}>NewsFeed</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.alert}>
							<Text style={styles.logoText}>Register complaint</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.alert}>
							<Text style={styles.logoText}>Syllabus</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.callProfile}>
							<Text style={styles.logoText}>Detail Profile</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this._call2}>
				  			<Text style={styles.logoText}>Logout</Text>
				  		</TouchableOpacity>
					</View>
				</View>
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
	avatarContainer: {
		borderColor: '#9B9B9B',
		borderWidth: 1 / PixelRatio.get(),
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		borderRadius: 0,
		width: 250,
		height: 270,
	},
	bottomDrawer: {
		flex: 2,
		backgroundColor: '#18163E',
	},
  	logoText : {
		marginVertical: 10,
		fontSize: 18,
		color: '#fff',
		textAlign: 'center',
	},
	drawerbars: {
		width: '100%',
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderRadius: 20,
		textAlign: 'center',
		marginVertical: 5,
		alignSelf: 'center',
	},
});
