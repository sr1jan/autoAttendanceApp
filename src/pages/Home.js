import React, {Fragment, Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { SafeAreaView, StyleSheet,Animated, ScrollView, Image,View, Text, StatusBar,TouchableOpacity,ImageBackground} from 'react-native';
import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import firebase from '@react-native-firebase/app';
import LottieView from 'lottie-react-native';
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
  }
	markAttendance(){
		Actions.attendanceForm()
	}
	alert(){
		alert('This feature coming on next update')
	}

	openDrawer(){
	   Actions.drawerOpen();
  }
  componentDidMount() {
    var instance = firebase.auth().currentUser;
    var uid=instance.uid;
    var docRef = firebase.firestore().collection("StudentsData").doc(uid);
    docRef.get().then((doc) => {
      const name = doc.data().name;
      this.setState({Name: name});
    });
  }

	render(){
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

