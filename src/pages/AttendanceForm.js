import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar, Alert, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import {Actions} from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
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

export default class Attend extends Component {
  state={
    Department:'',
    class:'',
    subject:'',
    lectureType: '',
    lecturesNum: 0,
    status:'Take Photo',
    photo: null,
    progressBarStatus: false,
  }
  AttendanceInstance = () => {
    if(!this.state.subject || !this.state.lectureType || !this.state.lecturesNum){
      return Alert.alert('Incomplete form','Please fill in the above information before proceeding')
    }
    firebase.firestore().collection("AttendanceInstance").doc("CurrentAttendance").update({
        subject: this.state.subject, 
        lectureType: this.state.lectureType,
        lecturesNum: this.state.lecturesNum,
    }).then(this.handleChoosePhoto());
  };

  test(){
    Actions.attendanceUpdatedPage();
  }
  handleChoosePhoto = () => {
    
    const options = {
      noData: true,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photo: response });

        const image = {
          path : response.uri.toString(),
        };
        this.setState({status: 'Uploading...   ', progressBarStatus: true})
        this.uploadImage(image, 'Test Image')
          .then(() => this.test() )
          .catch((error) => {
              console.log(error.message);
              Alert.alert('Error', 'Something went wrong');
          });
      }
    });
  }

  uploadImage = async (image, imageName) => {
    return firebase.storage().ref(imageName).putFile(image.path);
  }
    
     render() {
      const { progressBarStatus } = this.state;
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
                    style={{ backgroundColor: '#fff', alignItems: 'center', marginVertical: 30}} 
                    onPress={this.AttendanceInstance}              
                >
                    <Text style={{ color: '#000', textAlign: 'center', padding: 8, }}> Take Photo </Text>
                </TouchableOpacity>
                {progressBarStatus && (
                  <ProgressBarAndroid styleAttr="Horizontal" color="#fff" />
                )}
            </View>
         );
     }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#18163E',
   justifyContent:'center',
   alignItems: 'center'
   
  },

  dept:{
    color: '#ffbd45',
    fontSize: 20,
  }

});