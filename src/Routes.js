import React, { Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Fpage from './pages/Fpage';
import Flog from './pages/Flog';
import Tlogin from './pages/Tlogin';
import Ssignup from './pages/Ssignup';
import Tsignup from './pages/Tsignup';
import SchoolCode from './pages/SchoolCode';
import Loading from './pages/Loading';
import Home from './pages/Home';
import DrawerContent from './components/DrawerContent';
import Pictures from './pages/Pictures';
import ImageUpload from './pages/ImageUpload';


export default class Routes extends Component<{}> {
	render() {
		return( 
			<Router navigationBarStyle={{ backgroundColor: '#3d5afe' }}>
		    <Stack key="root" >
		      <Scene key="fpage" component={Fpage} hideNavBar={true} />
		      <Scene key="code" component={SchoolCode} hideNavBar={true}/>
		      <Scene key="loading" component={Loading} hideNavBar={true} />
		      <Scene key="tlogin" component={Tlogin} title="Login"/>
		      <Scene key="flog" component={Flog} hideNavBar={true}/>
		      <Scene key="ssignup" component={Ssignup} title="Student SignUp"/>
		      <Scene key="tsignup" component={Tsignup} title="Teacher SignUp"/>
		     <Scene key="drawer"
					drawer
					contentComponent={DrawerContent}
					drawerWidth = {250}
					hideDrawerButton={true}
					hideNavBar={true}
				>
				<Scene key="home" component={Home} hideNavBar={true} />
				    <Scene key="pictures" component={Pictures} title="Attendance" />
				       <Scene key="imgup" component={ImageUpload} hideNavBar={true}/>
				</Scene>
		     
		    </Stack>
		  </Router>
			)	
		
	} 
}