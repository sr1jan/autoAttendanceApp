import React, { Component } from 'react';
import {
    View,
    StyleSheet,
		ScrollView,
		StatusBar,
} from 'react-native';
import { 
	Container, 
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
	Header,
	Title,
	Footer,
	FooterTab,
} from 'native-base';
import firebase from '@react-native-firebase/app';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { changeUid } from '../actions/userData';
import { bindActionCreators } from 'redux';

class NewsFeed extends Component{
	constructor(props) {
    super(props)
    this.state = {
			active: false,
			person: 'Role',
			profileImg: 'https://cdn1.iconfinder.com/data/icons/navigation-elements/512/user-login-man-human-body-mobile-person-512.png',
			profileName: 'Name',
    };
	}

	async componentDidMount(){
		const userData = firebase.auth().currentUser;
		const currentUid = userData.uid;

		let { uid, actions } = this.props;
		// actions.changeUid(currentUid);
		// if(currentUid != uid){
		// 	actions.changeUid(currentUid);
		// }

		const docRef = firebase.firestore().collection('StudentsData').doc(currentUid);
		const doc = await docRef.get();
		const person = doc.data().dasbord;
		const name = doc.data().name;
		const imgUrl = doc.data().imgUrl;
		this.setState({ person: person, profileImg: imgUrl, profileName: name })
		console.log(userData);
	}

	shouldComponentUpdate(nextProps, nextState){
		return (this.state != nextState);
	}

	componentDidUpdate(prevProps, prevState){
		console.log('component did update');
		console.log('prevState ->', prevState);
		console.log('nextState ->', this.state);
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

	logout = async () => {
		await firebase.auth().signOut();
		Actions.login({ type: 'reset' });
	}

	newPost = () => {
		this.setState({ active: !this.state.active });
		Actions.newPost();
	}

	render(){
		console.log('NewsFeed rendering...');
		return(
			<Container>
				<View style={styles.container}>
					<Header transparent androidStatusBarColor="#18163E">
						<Body>
							<Title>Discussion</Title>
						</Body>
						<Right>
							<Button transparent>
								<Icon name='search' />
							</Button>
							<Button transparent>
								<Icon name='heart' />
							</Button>
							<Button transparent>
								<Icon name='more' />
							</Button>
						</Right>
					</Header>
					<ScrollView>
						<Content  style={{ }}>
							<View style={styles.card}>
								<Card>
									<CardItem>
										<Left>
											<Thumbnail source={{ uri: this.state.profileImg }} />
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
									<CardItem bordered>
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
											<Thumbnail source={{ uri: this.state.profileImg }} />
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
									<CardItem bordered>
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
											<Thumbnail source={{ uri: this.state.profileImg }} />
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
									<CardItem bordered>
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
						style={{ backgroundColor: 'green', margin: 45 }}
						position="bottomRight"
						onPress={this.newPost}>
						<Icon name="add" />
					</Fab>
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
		marginHorizontal: 15,
		marginVertical: 10
	},

	text: {
		color: 'white',
	},

})

const mapStateToProps = state => ({
  uid: state.uid,
});

const ActionCreators = Object.assign(
  {},
  changeUid,
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed)