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
import StudentDrawerContent from './components/StudentDrawerContent';
import StudentHome from './pages/StudentHome';
import ImageTest from './pages/ImageTest';
import NewsFeed from './pages/NewsFeed';
import NewPost from './components/NewPost';

export default class Routes extends Component {
	render() {
		return( 
			<Router navigationBarStyle={{ backgroundColor: '#18163E' }}>
		    <Scene key="root">
				<Scene key="welcome" component={Welcome} hideNavBar={true} />
				<Scene key="collegeCode" component={CollegeCode} hideNavBar={true}/>
				<Scene key="informationMenu" component={InformationMenu} hideNavBar={true} />
				<Scene key="login" component={Login} hideNavBar={true}/>
				<Scene key="teacherORstudent" component={TeacherORstudent} hideNavBar={true}/>
				<Scene key="TeacherSignUp" component={TeacherSignUp} title="Teacher SignUp" hideNavBar={true}/>
				<Scene key="studentSignUp" component={StudentSignUp} title="Student SignUp" hideNavBar={true}/>
				<Scene key="newsFeed" component={NewsFeed} title="Discussion" hideNavBar={true}/>
				<Scene key="newPost" component={NewPost} title="New Post" hideNavBar={true}/>

				<drawer key="drawer"
					drawer
					contentComponent={DrawerContent}
					drawerWidth = {250}
					hideDrawerButton={true}
					hideNavBar={true}
				>
					<Scene key ="root">
					<Scene key="home" component={Home} hideNavBar={true} />
						<Scene key="attendanceForm" component={AttendanceForm} hideNavBar={true}/>
							<Scene key="attendanceUpdatedPage" component={AttendanceUpdatedPage} hideNavBar={true}/>
					</Scene>
				</drawer>		   

				<drawer key="studentDrawer"
					drawer
					contentComponent={StudentDrawerContent}
					drawerWidth = {250}
					hideDrawerButton={true}
					hideNavBar={true}
				>
					<Scene key ="root">
						<Scene key="studentHome" component={StudentHome} hideNavBar={true} />
						<Scene key="imageTest" component={ImageTest} title="Image upload" hideNavBar={true}/>
					</Scene>
				</drawer>
		    </Scene>
		  </Router>
		)	
	} 
}