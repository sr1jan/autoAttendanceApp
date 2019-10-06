import React, { Fragment, Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { View, Text, StyleSheet ,Animated, Image,StatusBar,TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';

class ImageLoader extends Component {

  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
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
                outputRange: [0.85, 1],
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

export default class next extends Component {
		   _call(){
		  
			Actions.pictures();
			};

		   _call2(){
 				firebase.auth().signOut();
		   		Actions.code();
			}
			alert(){
				alert('This feature coming on next update')
			}
			dhome(){
				Actions.home()
			}
	render(){

		return (
			<Fragment>
				<View style={ styles.container }>
					<View style={styles.topDrawer}>
						<ImageLoader
					        style={{ width: 255 , height: 255 }}
					        source={require('../Images/ritik.png')}/>
					</View>
						<View style={styles.bottomDrawer}>
						<TouchableOpacity style={{width: 250, backgroundColor: '#484848', textAlign: 'center', marginVertical: 5,}} onPress={this.dhome}>
							<Text style={styles.logoText}>Home</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#484848', textAlign: 'center', marginVertical: 5,}} onPress={this._call}>
							<Text style={styles.logoText}>Mark Attendance</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#484848', textAlign: 'center', marginVertical: 5,}} onPress={this.alert}>
							<Text style={styles.logoText}>Time Table</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#484848', textAlign: 'center', marginVertical: 5,}} onPress={this.alert}>
							<Text style={styles.logoText}>Broadcast</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#484848', textAlign: 'center', marginVertical: 5,}} onPress={this.alert}>
							<Text style={styles.logoText}>Create event</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#484848', textAlign: 'center', marginVertical: 5,}} onPress={this.alert}>
							<Text style={styles.logoText}>Mark free lecture</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width: 250, backgroundColor: '#484848', textAlign: 'center', marginVertical: 5,}} onPress={this._call2}>
				  			<Text style={styles.logoText}>Logout</Text>
				  		</TouchableOpacity>
					</View>
				</View>
			</Fragment>
		);
	}
}
const styles = StyleSheet.create({
	container: {
	flexGrow: 1,

	},
	drawerText: {
	color: '#fff'
	},
	topDrawer: {
	flex: 1,
	justifyContent: 'center',
	alignContent: 'center',
	alignItems: 'center'
	},
	bottomDrawer: {
	flex: 2,
	backgroundColor: '#212121',
	},

  	logoText : {
      marginVertical: 10,
      fontSize: 18,
      color: '#ffffff',
      textAlign: 'center',
    },

});
