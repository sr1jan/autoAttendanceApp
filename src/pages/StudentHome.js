import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { SafeAreaView, StyleSheet,Animated, ScrollView, Image,View, Text, StatusBar,TouchableOpacity,ImageBackground,ProgressBarAndroid} from 'react-native';
import LottieView from 'lottie-react-native';
import firebase from '@react-native-firebase/app';
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
    liveAttendance:0,
    RollNo: '',
    progressBarStatus: true,
  }
	alert(){
		Actions.imageTest();
	}
 
 
	componentDidUpdate() {
		var docRef = firebase.firestore().collection("students").doc(this.state.RollNo);
      docRef.get().then((doc) => {
        const lect = doc.data().Attendance.Lectures_Attended;
        this.setState({liveAttendance: lect, progressBarStatus: false});
  })
}

	componentDidMount() {
    var instance = firebase.auth().currentUser;
    var uid=instance.uid;
    var docRef = firebase.firestore().collection("StudentsData").doc(uid);
    docRef.get().then((doc) => {
      const lect = doc.data().rollNo;
      const name = doc.data().name;
      this.setState({RollNo: lect, Name: name});
    });
  }
  
	openDrawer(){
	   Actions.drawerOpen();
	}

	render(){
    const { progressBarStatus } = this.state;
		return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#18163E'}}>
        <ScrollView >
          <View style={{flexDirection: 'row', backgroundColor: '#18163E'}}>
           <TouchableOpacity onPress={this.openDrawer}>
            <LottieView 
              autoSize={true}
              style={{ width: 120 }}
              source={require('../components/drawerButton.json')} autoPlay loop
            />
          </TouchableOpacity>
        </View> 
        <View style={styles.container}>
          <Text style={styles.logoText}>Hello {this.state.Name}</Text>
        {progressBarStatus && (
          <ProgressBarAndroid styleAttr="Horizontal" color="#fff" />
        )}
        <Text style={styles.logoText}>Live Attendance is {this.state.liveAttendance}</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={this.alert}> 
              <ImageLoader
                style={{marginHorizontal: 20, width: 120, height: 120, borderRadius: 75,}}
                source={require('../Images/back2g.png')}/>
            </TouchableOpacity> 
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
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
    marginVertical: 50,
    fontSize: 30,
    color : 'green'
  },
});

