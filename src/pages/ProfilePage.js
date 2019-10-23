import React, { Fragment, Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { View, StyleSheet ,PixelRatio, Image, ProgressBarAndroid, TouchableOpacity } from 'react-native';
import firebase from '@react-native-firebase/app';
import ImagePicker from 'react-native-image-picker';
import { 
	Container, 
	Header, 
	StyleProvider,
	Content, 
	Card, 
	Fab,
	CardItem, 
	Thumbnail, 
	Text, 
	Button, 
	Icon, 
	Left, 
	Body, 
	Right,
	Footer,
	FooterTab,
} from 'native-base';

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
		person: '',
		profileImg: '',
		profileName: '',
	};
	
	componentDidMount = () => {
		var userData = firebase.auth().currentUser;
		var docRef = firebase.firestore().collection('StudentsData').doc(userData.uid);
		this.setState({ profileImg: userData.photoURL });
		this.setState({ profileName: userData.displayName });
		docRef.get().then((doc) => {
			var person = doc.data().dasbord;
			this.setState({ person: person });
		});
	}

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
		alert('This feature coming on next update')
	}
	dhome(){
		Actions.studentHome()
	}

	callDashboard = () => {
		if(this.state.person == 'student'){
			Actions.studentDrawer();
		}else{
			Actions.drawer();
		}
	}

	render(){
		const { UL, oneTime, progressBarStatus } = this.state;
		if(oneTime<=10){
			console.log("im here");
			this.state.oneTime++;
			{this.profile()}
		}
		return (
			<Container>
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
							<Text style={styles.logoText}>Name: {this.state.Name}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this._call}>
							<Text style={styles.logoText}>Live Attendance: </Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.alert}>
							<Text style={styles.logoText}>Your Time Table</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.alert}>
							<Text style={styles.logoText}>content</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.alert}>
							<Text style={styles.logoText}>Update Profile Pic</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.alert}>
							<Text style={styles.logoText}>Delete Your Profile</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this._call2}>
				  			<Text style={styles.logoText}>Logout</Text>
				  		</TouchableOpacity>
					</View>
				</View>
				<Footer>
					<FooterTab>
							<Button vertical active onPress={Actions.newsFeed}>
								<Icon name="home" />
								<Text>Home</Text>
							</Button>
						<Button vertical onPress={this.callDashboard}>
							<Icon name="apps" />
							<Text>Apps</Text>
						</Button>
						<Button vertical onPress={Actions.profilePage}>
							<Icon active name="md-person" />
							<Text>Profile</Text>
						</Button>
						<Button vertical onPress={this.logout}>
							<Icon name="exit" />
							<Text>Logout</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Fragment>
			</Container>
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
