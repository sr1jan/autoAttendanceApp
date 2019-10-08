import React, { Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Welcome from './pages/Welcome';
import TeacherORstudent from './pages/TeacherORstudent';
import Login from './pages/Login';
import StudentSignUp from './pages/StudentSignUp';
import TeacherSignUp from './pages/TeacherSignUp';
import CollegeCode from './pages/CollegeCode';
import InformationMenu from './pages/InformationMenu';
import Home from './pages/Home';
import DrawerContent from './components/DrawerContent';
import AttendanceForm from './pages/AttendanceForm';
import AttendanceUpdatedPage from './components/AttendanceUpdatedPage';


export default class Routes extends Component {
	render() {
		return( 
			<Router navigationBarStyle={{ backgroundColor: '#18163E' }}>
		    <Stack key="root">
				<Scene key="welcome" component={Welcome} hideNavBar={true} />
				<Scene key="collegeCode" component={CollegeCode} hideNavBar={true}/>
				<Scene key="informationMenu" component={InformationMenu} hideNavBar={true} />
				<Scene key="login" component={Login} hideNavBar={true}/>
				<Scene key="teacherORstudent" component={TeacherORstudent} hideNavBar={true}/>
				<Scene key="StudentSignUp" component={StudentSignUp} title="Student SignUp" hideNavBar={true}/>
				<Scene key="TeacherSignUp" component={TeacherSignUp} title="Teacher SignUp" hideNavBar={true}/>
				<Scene key="drawer"
					drawer
					contentComponent={DrawerContent}
					drawerWidth = {250}
					hideDrawerButton={true}
					hideNavBar={true}
				>
				<Scene key="home" component={Home} hideNavBar={true} />
				    <Scene key="attendanceForm" component={AttendanceForm} hideNavBar={true}/>
				       	<Scene key="attendanceUpdatedPage" component={AttendanceUpdatedPage} hideNavBar={true}/>
				</Scene>
		    </Stack>
		  </Router>
		)	
	} 
}