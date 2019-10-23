import React, { Fragment, Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { View, Text, StyleSheet ,PixelRatio, Image, ProgressBarAndroid, TouchableOpacity } from 'react-native';
import firebase from '@react-native-firebase/app';
import ImagePicker from 'react-native-image-picker';
export default class next extends Component {
	state = {
		oneTime: 1,
		photo: null,
		progressBarStatus: false,
		Name: '',
		Fnam: '',
		ProfilePic: null,
		UL: null,
		access: false,
	};
	profile= async () => {
		var user = firebase.auth().currentUser;
		var uid=user.uid;
		var docRef = firebase.firestore().collection("StudentsData").doc(uid);
		docRef.get().then((doc)=> {
            const Studentname=doc.data().name;
			this.setState({Fnam: Studentname, Name: Studentname});
		})
		const fnam=this.state.Fnam;
		const imageName=this.state.Name;
		const url = firebase.app().storage('gs://faceattendance-253619-4f9k7').ref('StudentsTrainingImage/'+fnam+'/'+imageName)
		const imgurl = await url.getDownloadURL();
		this.setState({UL: imgurl})
		user.updateProfile({
			displayName: this.state.Name,
			photoURL: imgurl,
		  }).catch(error => this.setState({ errorMessage: error.message}))
		console.log(user);
	}
	Move=()=>{
		this.setState({progressBarStatus: false});
		this.setState({oneTime: 1});
	}
    handleChoosePhoto = key => val => {
		var user = firebase.auth().currentUser;
		var uid=user.uid;
		var docRef = firebase.firestore().collection("StudentsData").doc(uid);
		docRef.get().then((doc)=> {
            const Studentname=doc.data().name;
			this.setState({Fnam: Studentname, Name: Studentname});
		})
		const options = {
			noData: true,
		};
    	ImagePicker.showImagePicker(options, response => {
			if (response.uri) {
				this.setState({ photo: response });
				const image = {
					path : response.uri.toString(),
				};
				this.setState({progressBarStatus: true, [key]: response})
				this.uploadImage(image, this.state.Fnam, this.state.Name)
          			.then(() => this.Move() )
          			.catch((error) => {
              		console.log(error.message);
          		});
			}
		});
	  }
	uploadImage = async (image, fnam, imageName) => {
		return firebase.app().storage('gs://faceattendance-253619-4f9k7').ref('StudentsTrainingImage/'+fnam+'/'+imageName).putFile(image.path);
	}
	_call2(){
		 firebase.auth().signOut();
		 Actions.login({ type: 'reset' });
	}
	alert(){
		alert("This feature is coming in next update.")
	}
	callprofile(){
		Actions.profilePage();
	}
	dhome(){
		Actions.studentHome()
	}
	render(){
		const { UL, oneTime, progressBarStatus } = this.state;
		if(oneTime<=10){
			console.log("im here");
			this.state.oneTime++;
			{this.profile()}
		}
		return (
			<Fragment>
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
						<TouchableOpacity style={styles.drawerbars} onPress={this.callprofile}>
							<Text style={styles.logoText}>Detail Profile</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this._call2}>
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
