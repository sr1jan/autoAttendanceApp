import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet,StatusBar, TextInput, Image, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from '@react-native-firebase/app';

export default class Code extends Component {

	state = {
	  incode: '',
	  scode: 'college code will come here',
	}

	_call(){
	   Alert.alert('Contact admins','Contact your college to get the code');
	};
	
	handleChange =key => val => {
		this.setState({[key]: val})
	}

	_call2 = () => {
		if(this.state.scode==this.state.incode){
			Actions.login({ type: 'reset' })
		}else{
			Alert.alert('Uh-oh!','Wrong college code');
		}
	}

	componentDidMount() {
		firebase
		.firestore()
		.collection("collegeCode")
		.get()
		.then(Snapshot => {
    		Snapshot
    		.docs
    		.forEach(doc => {
        	this.setState({scode: doc.data().code});
			});
    	});
	}
	 render() {
	    return (
		    <View style={styles.container}>
		      	{this.state.errorMessage &&
		        <Text style={{ color: 'red' }}>
		        {this.state.errorMessage}
		        </Text>}
		      	<StatusBar backgroundColor="#18163E" barStyle="light-content"
		      	/>
		      		<Image
		                style={{ resizeMode: 'center', tintColor: 'white' }}
		                source={require('../Images/Logo.png')}
		            /> 
		            <Text style={styles.logoText}>
		                Enter College Code
		            </Text>
		            <TextInput style={styles.inputBox}
			            placeholder="Enter Code"
			            placeholderTextColor = "#ffffff"
			            value={this.state.incode}
			            onChangeText={this.handleChange('incode')}        
		            />
		            <TouchableOpacity style={{marginVertical: 15, width: 130, backgroundColor: 'rgba(255, 255, 255, 0.1)', textAlign: 'center', borderRadius: 10,}} onPress={this._call2}>
              			<Text style={styles.logotext}>Submit</Text>
            		</TouchableOpacity>
		            <TouchableOpacity onPress={this._call}><Text style={styles.text}>Don't have code?</Text></TouchableOpacity>
		    </View>
	     );
	 }
}
const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   alignItems :'center',
   justifyContent : 'center',
   backgroundColor: '#18163E'
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