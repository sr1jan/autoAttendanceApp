import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { SafeAreaView, StyleSheet,Animated, ScrollView, View, StatusBar,TouchableOpacity,ImageBackground,ProgressBarAndroid} from 'react-native';
import LottieView from 'lottie-react-native';
import firebase from '@react-native-firebase/app';
import { 
	Container, 
	Text, 
	Button, 
	Icon, 
	Footer,
	FooterTab,
} from 'native-base';

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return(
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                })
              }
            ]
          },
          this.props.style,
        ]}
      />
    )
  }
}

export default class Home extends Component {
  state={
    name: '',
    liveAttendance: 0,
    rollNo: '',
    progressBarStatus: true,
    person: '',
    profileImg: '',
    profileName: '',
  }

  async componentDidMount() {
    const instance = firebase.auth().currentUser;
    const uid = instance.uid;

    const dataRef = await firebase.firestore().collection("StudentsData").doc(uid);
    const dataDoc = await dataRef.get();
    const rollNo = dataDoc.data().rollNo;
    const name = dataDoc.data().name;
    const person = dataDoc.data().dasbord;

    const docRef = await firebase.firestore().collection("students").doc(rollNo);
    const doc = await docRef.get();
    console.log(doc.data());

    const lect = doc.data().Attendance.Lectures_Attended;
    this.setState({ 
      rollNo: rollNo, 
      name: name, 
      person: person, 
      liveAttendance: lect, 
      profileImg: instance.photoURL,
      profileName: instance.displayName,
      progressBarStatus: false 
    });
  }

	shouldComponentUpdate(nextProps, nextState){
		return (this.state != nextState);
	}

	componentDidUpdate(prevProps, prevState){
		console.log('component did update');
    console.log('prevState ->', prevState);
		console.log('nextState ->', this.state);
	}

	alert(){
		Actions.imageTest();
  }

	logout = async () => {
		await firebase.auth().signOut();
		Actions.login({ type: 'reset' });
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
		console.log('StudentHome rendering...');
    const { progressBarStatus } = this.state;
		return (
      <Container>
        <SafeAreaView style={styles.container}>
            <Text style={styles.logoText}>Hello {this.state.name}</Text>
            {progressBarStatus && (
              <ProgressBarAndroid styleAttr="Horizontal" color="#fff" />
            )}
            <Text style={styles.logoText}>Live Attendance is {this.state.liveAttendance}</Text>
            <TouchableOpacity onPress={this.alert}>
              <Text style={{ color: 'white' }}> Upload Image </Text>
            </TouchableOpacity> 
        </SafeAreaView>
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
    alignItems :'center',
    justifyContent: 'center',
    backgroundColor: '#18163E',
  },

  logoText : {
    marginVertical: 50,
    fontSize: 30,
    color : 'white'
  },
});

