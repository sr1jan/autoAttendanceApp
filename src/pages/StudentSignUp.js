import React from "react";
import { Text, View, StyleSheet, ScrollView, StatusBar,TouchableOpacity, TextInput} from 'react-native';
import Swiper from "react-native-web-swiper";
import Logo from '../components/Logo';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'react-native-firebase'
import { Actions } from "react-native-router-flux";
export default class studentSignup extends React.Component {
  StudentHome(){
    var user = firebase.auth().currentUser;
    /*user.updateProfile({
      displayName: this.state.Name,
      photoURL: "faceAttendanceSystem.com",
      uid: "SC"+this.state.RollNo,
    }).catch(error => this.setState({ errorMessage: error.message}))
    //Actions.studentDrawer();
    console.log(user);
    console.log(this.state.RollNo);
    */
    var uid=user.uid;
    firebase.firestore().collection("StudentsData").doc(uid).set({
      name: this.state.Name,
      email: this.state.email,
      rollNo: "SCS"+this.state.RollNo,
      dasbord: "student",
    });
    Actions.studentDrawer();
  }
 
  state = { 
    Department: '',
    Class: '',
    Name: '', 
    RollNo: '',
		email: '', 
		password: '', 
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
          <View style={{flex:1}}>
          <Logo type="Let's get started by signing you inn"/>
          {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
            </Text>}
              <View style={{flex:1}}>
                  <Swiper controlsProps={{prevPos: false, }}>
                    <View style={{flex:1,backgroundColor:'#18163E'}}>
                      <Text style={{color:'white', fontSize: 20, padding: 20,}}>Select your Department</Text>
                      <RNPickerSelect
                          onValueChange={(value) => this.setState({Department: value})}
                          items={[
                              { label: 'Computer Department', value: 'Computer' },
                              { label: 'Civil Department', value: 'Civil Department' },
                              { label: 'Extc Department', value: 'Extc Department' },
                              { label: 'Electrical Department', value: 'Electrical Department' },
                              { label: 'Mechanical Department', value: 'Mechanical Department' },
                          ]}
                      />
                      <Text style={{color:'white', fontSize: 20, padding: 20, }}>Select Class</Text>
                      <RNPickerSelect style={{marginVertical: 180}}
                          onValueChange={(value) => this.setState({Class: value})}
                          items={[
                              { label: 'Second year', value: 'Second year' },
                              { label: 'Third year', value: 'Third year' },
                              { label: 'Fourth year', value: 'Fourth year' },
                          ]}
                      />
                    </View>
                    <View style={{flex:1,alignItems:"center",backgroundColor:'#18163E'}}>
                          <TextInput style={styles.inputBox}
                            placeholder="Name as per Database"
                            placeholderTextColor = "#ffffff"
                            onChangeText={Name => this.setState({ Name })}
					                  //value={this.state.Name}
                          />
                          <TextInput style={styles.inputBox}
                            placeholder="Roll NO"
                            keyboardType='number-pad'
                            placeholderTextColor = "#ffffff"
                            onChangeText={RollNo => this.setState({ RollNo })}
					                  //value={this.state.Name}
                          />
                    </View>
                    <View style={{flex:1,alignItems:"center",backgroundColor:'#18163E'}}>
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
             
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#18163E',
  },

  inputBox: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: '5%',
    borderRadius: 15,
  },

  button:{
    width: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginVertical: '3%',
    paddingVertical: '3%'
  },

  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff'
  }
});