import React, { Component } from 'react';
import {
    Image,
    View,
    StyleSheet,
		TouchableOpacity,
		ScrollView,
} from 'react-native';
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
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import firebase from '@react-native-firebase/app';
import {Actions} from 'react-native-router-flux';

export default class NewsFeed extends Component{
	constructor(props) {
    super(props)
    this.state = {
			active: false,
			person: '',
			profileImg: '',
			profileName: '',
    };
	}

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
	
	callDashboard = () => {
		if(this.state.person == 'student'){
			Actions.studentDrawer();
		}else{
			Actions.drawer();
		}
	}

	logout(){
		firebase.auth().signOut();
		Actions.login({ type: 'reset' });
	}

	newPost = () => {
		this.setState({ active: !this.state.active });
		Actions.newPost();
	}

	render(){
		return(
			<Container>
				<View style={styles.container}>
					<ScrollView>
						<Content>
							<View style={styles.card}>
								<Card>
									<CardItem>
										<Left>
											<Thumbnail source={{uri: this.state.profileImg }} />
											<Body>
												<Text>{this.state.profileName}</Text>
												<Text note>{this.state.person}</Text>
											</Body>
										</Left>
									</CardItem>
								<CardItem>
										<Body>
											<Text>
												Blockchain + AI = World 2.0
											</Text>
										</Body>
									</CardItem>
									<CardItem>
										<Left>
											<Button transparent>
												<Icon active name="thumbs-up" />
												<Text>12 Likes</Text>
											</Button>
										</Left>
										<Body>
											<Button transparent>
												<Icon active name="chatbubbles" />
												<Text>4 Comments</Text>
											</Button>
										</Body>
										<Right>
											<Text>11h ago</Text>
										</Right>
									</CardItem>
								</Card>
							</View>
							<View style={styles.card}>
								<Card>
									<CardItem>
										<Left>
											<Thumbnail source={{uri: this.state.profileImg }} />
											<Body>
												<Text>{this.state.profileName}</Text>
												<Text note>{this.state.person}</Text>
											</Body>
										</Left>
									</CardItem>
									<CardItem>
										<Body>
											<Text>
												What are the topics for the PBL project?
											</Text>
										</Body>
									</CardItem>
									<CardItem>
										<Left>
											<Button transparent>
												<Icon active name="thumbs-up" />
												<Text>100 Likes</Text>
											</Button>
										</Left>
										<Body>
											<Button transparent>
												<Icon active name="chatbubbles" />
												<Text>89 Comments</Text>
											</Button>
										</Body>
										<Right>
											<Text>15h ago</Text>
										</Right>
									</CardItem>
								</Card>
							</View>
							<View style={styles.card}>
								<Card>
									<CardItem>
										<Left>
											<Thumbnail source={{uri: this.state.profileImg }} />
											<Body>
												<Text>{this.state.profileName}</Text>
												<Text note>{this.state.person}</Text>
											</Body>
										</Left>
									</CardItem>
									<CardItem>
										<Body>
											<Text>
												I am stressed out the upcoming papers. How many feel the same?
											</Text>
										</Body>
									</CardItem>
									<CardItem>
										<Left>
											<Button transparent>
												<Icon active name="thumbs-up" />
												<Text>100 Likes</Text>
											</Button>
										</Left>
										<Body>
											<Button transparent>
												<Icon active name="chatbubbles" />
												<Text>89 Comments</Text>
											</Button>
										</Body>
										<Right>
											<Text>15h ago</Text>
										</Right>
									</CardItem>
								</Card>
							</View>
						</Content>
					</ScrollView>
					<Fab
							active={this.state.active}
							direction="down"
							containerStyle={{ }}
							style={{ backgroundColor: '#5067FF' }}
							position="topRight"
							onPress={this.newPost}>
							<Icon name="add" />
					</Fab>
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
				</View>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#18163E',
	},

	card: {
		marginHorizontal: 10,
	},

	text: {
		color: 'white',
	},

})