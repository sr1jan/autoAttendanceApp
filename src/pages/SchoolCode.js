import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,TextInput, Image, TouchableOpacity, Button,AsyncStorage,ImageBackground} from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from 'react-native-firebase';
export default class Code extends Component {
	_call(){
		
	   alert('Contact your collage to get the code');
	};
	state ={
	  incode: '',
	  scode: 'Connecting....',
	}
	handleChange =key => val => {
		this.setState({[key]: val})
	}
	_call2 = () => {
	if(this.state.incode==this.state.scode)
		{
	     Actions.tlogin()
		}
		else
		{
			alert('wronge college code');
		}
	}
	componentDidMount() {
		let item=firebase.database().ref('Users/scode');
		item.on('value', snapshot => {
			let data = snapshot.val();
			let scode=Object.values(data);
			this.setState({ scode });
		});
	}
	 render() {
	    return (
	    	<ImageBackground source={require('../Images/backg.png')} style={{width: '100%', height: '100%'}}>
		    <View style={styles.container}>
		      	{this.state.errorMessage &&
		        <Text style={{ color: 'red' }}>
		        {this.state.errorMessage}
		        </Text>}
		      	<StatusBar backgroundColor="#000000" barStyle="light-content"
		      	/>
		      		<Image
		                style={{resizeMode: 'center'}}
		                source={require('../Images/Logo.png')}
		            /> 
		            <Text style={styles.logoText}>
		                Enter Collage Code
		            </Text>
		            <TextInput style={styles.inputBox}
			            placeholder="Enter Code"
			            placeholderTextColor = "#ffffff"
			            value={this.state.scode}
			            onChangeText={this.handleChange('incode')}        
		            />
		            <TouchableOpacity style={{marginVertical: 15, width: 150, backgroundColor: 'rgba(255, 255, 255, 0.1)', textAlign: 'center', borderRadius: 10,}} onPress={this._call2}>
              			<Text style={styles.logotext}>Take me inn</Text>
            		</TouchableOpacity>
		            <TouchableOpacity onPress={this._call}><Text style={styles.text}>Don't have code</Text></TouchableOpacity>
		    </View>
		    	</ImageBackground>
	     );
	 }
}
const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   alignItems :'center',
   justifyContent : 'center',
   
  },
   logotext : {
      marginVertical: 7,
      fontSize: 18,
      color: '#ffffff',
      textAlign: 'center',
    },
 

  logoText : {
      marginVertical: 50,
      fontSize: 30,
      color : 'rgba(255, 255, 255, 0.7)'
    },

  inputBox: {
  width: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
 
  paddingHorizontal: 16,
  fontSize: 16,
  color: '#ffffff',
  marginVertical: 10,
  },

  text : {
      marginVertical: 50,
      fontSize: 15,
      color : 'rgba(255, 255, 255, 0.7)'
    },
});