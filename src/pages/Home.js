import React, {Fragment, Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { SafeAreaView, StyleSheet,Animated, ScrollView, Image,View, Text, StatusBar,TouchableOpacity,ImageBackground} from 'react-native';
import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import firebase from 'react-native-firebase';
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
	markAttendance(){
		Actions.attendanceForm()
	}
	alert(){
		alert('This feature coming on next update')
	}
  openDrawer(){
    Actions.drawerOpen();
  }
	render(){
		return (
    		<SafeAreaView style={{flex: 1, backgroundColor: '#4885ed'}}>
      		<ScrollView >
          <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
           <TouchableOpacity onPress={this.openDrawer}>
            <LottieView 
              style={{width: 100,}}
              source={require('../components/drawerButton.json')}  />
          </TouchableOpacity>
          <Text style={{color:'#000000',fontSize: 30, marginVertical: 15}}>
            Teacher DashBoard
          </Text> 
        </View> 
					<View style={styles.container}>
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
								style={{marginVertical: 20, width: 280, height: 100, borderRadius: 10,}}
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
					       style={{marginVertical: 10, marginHorizontal: 20, width: 120, height: 120, borderRadius: 10,}}
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
   marginVertical: 50
  },

  logoText : {
    marginVertical: 50,
    fontSize: 30,
    color : '#000'
  },
});

