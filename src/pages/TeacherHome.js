import React, {Fragment, Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { SafeAreaView, StyleSheet, Alert, Animated, ScrollView, Image, View, StatusBar,TouchableOpacity,ImageBackground} from 'react-native';
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
    Name: '',
    person: '',
    profileImg: '',
    profileName: '',
  }

	markAttendance(){
		Actions.attendanceForm()
  }

	alert(){
		Alert.alert('Coming Soon','This feature coming on next update')
	}

	// openDrawer(){
	//    Actions.drawerOpen();
  // }

  async componentDidMount() {
    const instance = await firebase.auth().currentUser;
    const uid = instance.uid;
    const docRef = await firebase.firestore().collection("StudentsData").doc(uid);
    const doc = await docRef.get();
    const name = doc.data().name;
    const person = doc.data().dasbord;
    this.setState({
      Name: name, 
      person: person,
      profileName: instance.displayName,
      profileImg: instance.photoURL,
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
		console.log('TeacherHome rendering...');
		return (
      <Container>
        <SafeAreaView style={{flex: 1, backgroundColor: '#18163E'}}>
          <ScrollView >
            <View style={styles.container}>
              <Text style={styles.logoText}>{this.state.Name}</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.markAttendance}> 
                  <ImageLoader
                    style={{width: 150, height: 120, borderRadius: 10,}}
                    source={require('../Images/tile1.png')}/>
                </TouchableOpacity> 
                <TouchableOpacity onPress={this.alert}> 
                  <ImageLoader
                    style={{marginHorizontal: 20, width: 120, height: 120, borderRadius: 10,}}
                    source={require('../Images/tile2.png')}/>
                </TouchableOpacity> 
              </View>
              <TouchableOpacity onPress={this.alert}> 
                <ImageLoader
                  style={{marginVertical: 20, width: 290, height: 100, borderRadius: 10,}}
                  source={require('../Images/tile3.png')}/>
              </TouchableOpacity> 
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.alert}> 
                  <ImageLoader
                    style={{marginVertical: 1,  width: 130, height: 150, borderRadius: 10,}}
                    source={require('../Images/tile4.png')}/>
                </TouchableOpacity> 
                <TouchableOpacity onPress={this.alert}> 
                  <ImageLoader
                    style={{marginVertical: 1, marginHorizontal: 20, width: 130, height: 150, borderRadius: 10,}}
                    source={require('../Images/title5.png')}/>
                </TouchableOpacity> 
              </View> 
              <TouchableOpacity onPress={this.alert}> 
                <ImageLoader
                  style={{marginVertical: 20,  width: 280, height: 80, borderRadius: 10,}}
                  source={require('../Images/tile6.png')}/>
              </TouchableOpacity> 
            </View>
          </ScrollView>
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
   alignItems :'center',
   justifyContent: 'center',
   marginVertical: 10,
  },

  logoText : {
    marginVertical: 30,
    fontSize: 30,
    color : '#fff'
  },
});

