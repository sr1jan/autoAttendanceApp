import React, { Fragment, Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { View, StyleSheet, ScrollView, PixelRatio, Image, ProgressBarAndroid, TouchableOpacity, Alert } from 'react-native';
import firebase from '@react-native-firebase/app';
import ImagePicker from 'react-native-image-picker';
import { 
	Container, 
	Text, 
	Button, 
	Icon, 
	Footer,
	FooterTab,
} from 'native-base';

export default class next extends Component {
	constructor(props){
		super(props)
		this.state = {
			oneTime: 1,
			photo: null,
			progressBarStatus: false,
			Name: '',
			FName: '',
			UL: '',
			access: false,
			person: '',
			uid: '',
			totalLect: '',
		}
	}
	
	async componentDidMount(){
		const userData = await firebase.auth().currentUser;
		const userUid = userData.uid;
		const docRef = await firebase.firestore().collection('StudentsData').doc(userUid);
		const doc = await docRef.get();
		const person = doc.data().dasbord;
		const name = doc.data().name;
		const imgUrl = doc.data().imgUrl;
		const rollNo = doc.data().rollNo;

		let lect = 'Not Applicable';
		if(person == 'student'){
			const attendanceRef = await firebase.firestore().collection('students').doc(rollNo);
			const attendanceDoc = await attendanceRef.get();
			lect = attendanceDoc.data().Attendance.Lectures_Attended;
		}

		this.setState({ 
			UL: imgUrl, 
			person: person, 
			FName: name, 
			Name: name, 
			uid: userUid,
			totalLect: lect,
		});
		userData.updateProfile({
			displayName: this.state.Name,
			photoURL: imgUrl,
		})

	}

	shouldComponentUpdate(nextProps, nextState){
		return (this.state != nextState);
	}

	componentDidUpdate(prevProps, prevState){
		console.log('component did update');
		console.log('prevState ->', prevState);
		console.log('nextState ->', this.state);
	}

	Move = () => {
		this.setState({ progressBarStatus: false, oneTime: 1 });
	}

	handleChoosePhoto = key => async val => {
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
				this.uploadImage(image, this.state.FName, this.state.Name)
					.then(() => this.Move() )
					.catch((error) => {
						console.log(error.message);
					});
			}
		});

		const url = firebase.app().storage('gs://faceattendance-253619-4f9k7')
			.ref('StudentsTrainingImage/'+this.state.FName+'/'+this.state.Name)

		const imgUrl = await url.getDownloadURL();
		this.setState({ UL: imgUrl });

		const docRef = await firebase.firestore().collection('StudentsData').doc(this.state.uid);
		docRef.set({
			imgUrl: imgUrl
		}, { merge: true })
	}

	uploadImage = async (image, fnam, imageName) => {
		return await firebase.app().storage('gs://faceattendance-253619-4f9k7')
			.ref('StudentsTrainingImage/'+fnam+'/'+imageName).putFile(image.path);
	}
	
	logout = async () => {
		await firebase.auth().signOut();
		Actions.login({ type: 'reset' });
	}

	alert(){
		Alert.alert('Coming soon', 'This feature coming on next update')
	}

	dhome(){
		Actions.studentHome()
	}

	callDashboard = () => {
		if(this.state.person === "student"){
			console.log(this.state.person);
			Actions.studentHome();
		}else if(this.state.person === "teacher") {
			console.log(this.state.person);
			Actions.teacherHome();
		}else{
			console.log(this.state.person);
			Actions.studentHome();
		}
	}

	render(){
		console.log('ProfilePage rendering...');
		const { UL, oneTime, progressBarStatus } = this.state;
		return (
			<Container>
			<ScrollView>
				<View style={ styles.container }>
					<View style={styles.topDrawer}>
						<TouchableOpacity onPress={this.handleChoosePhoto()}>
						<View
							style={[styles.avatar, styles.avatarContainer, {marginBottom: 20,}]}>
							{this.state.UL === '' ? (
								<Text style={{color: '#fff',}}>Upload Profile Pic</Text>
							) : (
								<Image style={styles.avatar} source={{ uri : this.state.UL }} />
							)}
							{progressBarStatus && (
								<ProgressBarAndroid styleAttr="Horizontal" color="#fff" />
							)}
						</View>
						</TouchableOpacity>
					</View>
						<View style={styles.bottomDrawer}>
						<TouchableOpacity style={styles.drawerbars}>
							<Text style={styles.logoText}>Name: {this.state.Name}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this._call}>
							<Text style={styles.logoText}>Live Attendance: {this.state.totalLect} </Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.alert}>
							<Text style={styles.logoText}>Your Time Table</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.alert}>
							<Text style={styles.logoText}>Statistics</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.drawerbars} onPress={this.alert}>
							<Text style={styles.logoText}>Delete Your Profile</Text>
						</TouchableOpacity>
					</View>
				</View>
				</ScrollView>
				<Footer>
					<FooterTab style={{ backgroundColor: '#18163E'}}>
							<Button vertical onPress={Actions.newsFeed}>
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
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#18163E',
	},
	topDrawer: {
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
