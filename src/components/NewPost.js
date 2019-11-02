import React, { Component } from 'react';
import {
    View,
    StyleSheet,
		TouchableOpacity,
		TextInput,
		Alert,
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
  Form,
	Textarea,
} from 'native-base';
import firebase from '@react-native-firebase/app';
import {Actions} from 'react-native-router-flux';

export default class NewPost extends Component{
	constructor(props) {
    super(props)
    this.state = {
			postText: '',
			userUid: '',
			rollNo: '',
			name: '',
			postNum: 0,
    };
	}

	componentDidMount = () => {
		var uid = firebase.auth().currentUser.uid;
		this.setState({ userUid: uid });
		var docRef = firebase.firestore().collection('StudentsData').doc(this.state.userUid);
		docRef.get().then((doc) => {
			var getRollNo = doc.data().rollNo;
			this.setState({rollNo: getRollNo})
		});

		var getName = firebase.firestore().collection('students').doc(this.state.rollNo);
		getName.get().then((doc)=> {
			var name = doc.data().Name;
			this.setState({ name: name });
		});
	}

	post = () => {
		// what to do when post
		if(this.state.postText){
			var studentDocRef = firebase.firestore().collection('StudentsData').doc(this.state.userUid);

			studentDocRef.get().then((doc)=> { 
				var postNum = ((doc.data().Posts.totalPost)!=null) ? (doc.data().Posts.totalPost) + 1 : 1; 
				this.setState({ postNum: postNum });
				studentDocRef.set({
					Posts: {
						totalPost: postNum,
						[postNum]: {
							content: this.state.postText,
							time: firebase.firestore.Timestamp.now(),
						},
					},
				}, {merge:true}).then(()=>{ Actions.newsFeed() });
			});
		}else{
			Alert.alert('Invalid post', 'Fill in the post before submitting');
		}
	}

	// addPost = () => {
	// 	var postsDocRef = firebase.firestore().collection('Posts').doc('5');
	// 	postsDocRef.set({
	// 		content: this.state.postText,
	// 		author: this.state.name,
	// 	}, {merge:true}).then(() => { Actions.newsFeed() });
	// }

  render(){
    return(
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
					<Card style={{ width: '90%'}}>
						<CardItem header>
							<Icon active name="share" />
							<Text>What's on your mind?</Text>
						</CardItem>
						<CardItem>
							<Body>
								<Form style={{ width: '100%' }}>
									<TextInput
									multiline={true}
									numberOfLines={3}
									onChangeText={(text) => this.setState({postText: text})}
									placeholder="Start typing..."
									/>
								</Form>
							</Body>
						</CardItem>
					</Card>
					<View style={{ margin: 10 }}>
						<Button dark rounded iconRight primary onPress={this.post}>
							<Text>Submit</Text>
							<Icon 
								type="FontAwesome" 
								name="check" 
								style={{ color: 'white', fontSize: 20 }}
							/>
						</Button>
					</View>
       </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
		backgroundColor: '#18163E'
  },

  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },

})
