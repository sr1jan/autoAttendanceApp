import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,Image,ImageBackground} from 'react-native';

export default class Logo extends Component<{}> {
	render() {
		return(
			<View style={styles.container}>
				 <Image
          			style={{width: 100, height: 120}}
          			source={require('../Images/Logoo.png')}/>  
        			<Text style={styles.logoText}>
          			{this.props.type}
          			</Text>
        	</View>

			)
	}
}
const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#212121',
   alignItems :'center',
   justifyContent : 'center',
   
  },

  logoText : {
      marginVertical: 30,
      fontSize: 30,
      color : 'rgba(255, 255, 255, 0.7)'
    },

	



});