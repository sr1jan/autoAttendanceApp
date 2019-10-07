import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar,TextInput, Image, TouchableOpacity, Button,AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'react-native-firebase';

export default class Attend extends Component {
    state={
    Department:'',
    class:'',
    subject:'',
    lectureType: '',
    lecturesNum: 0,
   }
   AttendanceInstance = () => {
        firebase.firestore().collection("AttendanceInstance").doc("CurrentAttendance").update({
            subject: this.state.subject, 
            lectureType: this.state.lectureType,
            lecturesNum: this.state.lecturesNum,
        });
        Actions.imgup();
    };
    
     render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#000000" barStyle="light-content"
                />
                <Text style={styles.dept}>Select Department</Text>
                <RNPickerSelect style={{marginVertical: 180, alignItems: 'center'}}
                        onValueChange={(value) => this.setState({Department: value})}
                        items={[
                            { label: 'Computer Department', value: 'Computer' },
                            { label: 'Civil Department', value: 'Civil Department' },
                            { label: 'Extc Department', value: 'Extc Department' },
                            { label: 'Electrical Department', value: 'Electrical Department' },
                            { label: 'Mechanical Department', value: 'Mechanical Department' },
                        ]}
                />
                <Text style={styles.dept}>Select Class</Text>
                <RNPickerSelect style={{marginVertical: 180}}
                    onValueChange={(value) => this.setState({class: value})}
                    items={[
                        { label: 'Second year', value: 'Second year' },
                        { label: 'Third year', value: 'Third year' },
                        { label: 'Fourth year', value: 'Fourth year' },
                    ]}
                />
                <Text style={styles.dept}>Select Subject</Text>
                <RNPickerSelect style={{marginVertical: 180}}
                    onValueChange={(value) => this.setState({subject: value})}
                    items={[
                        { label: 'DLDA', value: 'DLDA' },
                        { label: 'ECCF', value: 'ECCF' },
                        { label: 'DIS', value: 'DIS' },
                        { label: 'AM-3', value: 'AM-3' },
                        { label: 'OOPM', value: 'OOPM' },
                        { label: 'DS', value: 'DS' },

                    ]}
                />
                <Text style={styles.dept}>Lecture Type</Text>
                <RNPickerSelect style={{marginVertical: 180}}
                    onValueChange={(value) => this.setState({lectureType: value})}
                    items={[
                        { label: 'Practical', value: 'Practical' },
                        { label: 'Theory', value: 'Theory' },   
                    ]}
                />
                <Text style={styles.dept}>Number of lectures</Text>
                <RNPickerSelect style={{marginVertical: 180}}
                    onValueChange={(value) => this.setState({lecturesNum: parseInt(value, 10)})}
                    items={[
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '4', value: '4' },    
                    ]}
                />
                <TouchableOpacity 
                    style={{ backgroundColor: 'black', alignItems: 'center' }} 
                    onPress={this.AttendanceInstance}              
                >
                    <Text style={{ color: 'white', textAlign: 'center', padding: 5 }}> Take Attendance </Text>
                </TouchableOpacity>
            </View>
         );
     }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#3d5afe',
   justifyContent:'center',
   alignItems: 'center'
   
  },

  dept:{
    color: '#ffbd45',
    fontSize: 20,
  }

});