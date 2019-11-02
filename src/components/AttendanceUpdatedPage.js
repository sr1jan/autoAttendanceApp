import React from 'react';
import LottieView from 'lottie-react-native';
import {Actions} from 'react-native-router-flux';
export default class BasicExample extends React.Component {
	componentDidMount(){
    setTimeout(function(){
    	Actions.teacherHome();
  }, 1500);
  }
  render() {
    return (
    	<LottieView source={require('../components/AttendanceUpdated.json')} autoPlay loop />
  	);
  }
}