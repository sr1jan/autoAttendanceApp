import React, { Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Fpage from './pages/Fpage';
import Flog from './pages/Flog';
import Tlogin from './pages/Tlogin';
import Ssignup from './pages/Ssignup';
import Tsignup from './pages/Tsignup';
import SchoolCode from './pages/SchoolCode';
import TDashBoard from './pages/TDashBoard';
import ScreenRoutes from './pages/ScreenRoutes';
import Loading from './pages/Loading';





export default class Routes extends Component<{}> {
	render() {
		return( 
			<Router navigationBarStyle={{ backgroundColor: '#484848' }}>
		    <Stack key="root" >
		      <Scene key="fpage" component={Fpage} hideNavBar={true} />
		      <Scene key="code" component={SchoolCode} hideNavBar={true}/>
		      <Scene key="loading" component={Loading} hideNavBar={true} />
		      <Scene key="tlogin" component={Tlogin} title="Login"/>
		      <Scene key="tdboard" component={TDashBoard} hideNavBar={true}/>
		      <Scene key="flog" component={Flog} title="Flog"/>
		      <Scene key="ssignup" component={Ssignup} title="Student SignUp"/>
		      <Scene key="tsignup" component={Tsignup} title="Teacher SignUp"/>
		     <Scene key="screen" component={ScreenRoutes} hideNavBar={true} />
		     
		    </Stack>
		  </Router>
			)	
		
	} 
}