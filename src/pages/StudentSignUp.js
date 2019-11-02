import React from "react";
import { Text, View, StyleSheet, ScrollView, StatusBar,TouchableOpacity, TextInput} from 'react-native';
import Swiper from "react-native-web-swiper";
import Logo from '../components/Logo';
import RNPickerSelect from 'react-native-picker-select';
import firebase from '@react-native-firebase/app';
import { Actions } from "react-native-router-flux";

export default class studentSignup extends React.Component {
  state = { 
    Department: '',
    Class: '',
    Name: '', 
    RollNo: '',
		email: '', 
		password: '', 
  }

  StudentHome = async () => {
    var user = firebase.auth().currentUser;
    var uid=user.uid;
    await firebase.firestore().collection("StudentsData").doc(uid).set({
      name: this.state.Name,
      email: this.state.email,
      rollNo: "SCS"+this.state.RollNo,
      dasbord: "student",
      i: 1,
      imgUrl: '',
    });
    Actions.studentHome();
  }
 
  handleSignUp = () => {
    if(!this.state.Department || !this.state.Class || !this.state.Name || !this.state.email || !this.state.password)
    {
      alert('something is empty or not right go fix it'); 
    }
    else{
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.StudentHome())
      .catch(error => this.setState({ errorMessage: error.message })) 
    }
	}
  render() {
    return (
      <View style={styles.container}>
        <Logo type="Let's get started by signing you in..."/>
        {this.state.errorMessage &&
        <Text style={{ color: 'red' }}>
          {this.state.errorMessage}
        </Text>}
        <Swiper controlsProps={{ prevPos: false, }}>
          <View style={{ alignItems: 'center'}}>
            <Text style={{color:'white', fontSize: 20, }}>Choose Department</Text>
            <RNPickerSelect
              onValueChange={(value) => this.setState({Department: value})}
              items={[
                  { label: 'Computer Department', value: 'Computer' },
                  { label: 'Civil Department', value: 'Civil Department' },
                  { label: 'EXTC Department', value: 'EXTC Department' },
                  { label: 'Electrical Department', value: 'Electrical Department' },
                  { label: 'Mechanical Department', value: 'Mechanical Department' },
              ]}
            />
            <Text style={{color:'white', fontSize: 20, }}>Choose Class</Text>
            <RNPickerSelect style={{marginVertical: 180}}
              onValueChange={(value) => this.setState({Class: value})}
              items={[
                { label: 'Second year', value: 'Second year' },
                { label: 'Third year', value: 'Third year' },
                { label: 'Fourth year', value: 'Fourth year' },
              ]}
            />
          </View>
          <View style={{ alignItems:'center', }}>
            <TextInput style={styles.inputBox}
              placeholder="Name as per Database"
              placeholderTextColor = "#ffffff"
              onChangeText={Name => this.setState({ Name })}
            />
            <TextInput style={styles.inputBox}
              placeholder="Roll Number"
              keyboardType='number-pad'
              placeholderTextColor = "#ffffff"
              onChangeText={RollNo => this.setState({ RollNo })}
            />
          </View>
          <View style={{ alignItems:'center', }}>
            <TextInput style={styles.inputBox}
              placeholder="Email"
              placeholderTextColor = "#ffffff"
              onChangeText={email => this.setState({ email })}
              //value={this.state.email}
            />
            <TextInput style={styles.inputBox}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              onChangeText={password => this.setState({ password })}
              //value={this.state.password}
            />
            <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#18163E',
  },

  inputBox: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    fontSize: 16,
    color: '#ffffff',
    paddingHorizontal: 20,
    marginVertical: '2%',
    borderRadius: 15,
  },

  button:{
    width: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingVertical: '3%',
    marginVertical: '5%', 
  },

  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff'
  }
});