import React, { Fragment, Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { View, Text, StyleSheet ,Animated, Image,StatusBar,TouchableOpacity } from 'react-native';

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
		  
	
}

		   _call2(){
 		
		   		Actions.tlogin()
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
					<TouchableOpacity onPress={this._call}>
					<Text style={styles.logoText}>Mark Attendance</Text>
					</TouchableOpacity>
					<Text style={styles.logoText}>Check Time Table</Text>
					<Text style={styles.logoText}>Broadcast Message to next lecture</Text>
					<Text style={styles.logoText}>Give away lecture</Text>
					<TouchableOpacity style={styles.button} onPress={this._call2}>
				  <Text style={styles.buttonText}>Logout</Text>
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
backgroundColor: '#484848',
justifyContent: 'center',
alignContent: 'center',
alignItems: 'center'
},
bottomDrawer: {
flex: 2,
backgroundColor: '#484848',
paddingHorizontal: 30,
paddingVertical: 30
},

  logoText : {
      marginVertical: 10,
      fontSize: 18,
      color : 'rgba(255, 255, 255, 0.7)'
    },
    button:{
		width: 150,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		
		marginVertical: 150,
		paddingVertical: 10
	},


	buttonText: {
		fontSize: 16,
		textAlign: 'center',
		color: '#ffffff'
	}
});
