import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Fpage from './pages/Fpage';
import Flog from './pages/Flog';
import Tlogin from './pages/Tlogin';
import Slogin from './pages/Slogin';
import Ssignup from './pages/Ssignup';
import Tsignup from './pages/Tsignup';

export default class Routes extends Component<{}> {
	render() {
		return( 
			<Router>
		    <Stack key="root" hideNavBar={true}>
		      <Scene key="fpage" component={Fpage} title="Fpage" initial={true} />
		      <Scene key="flog" component={Flog} title="Flog"/>
		      <Scene key="tlogin" component={Tlogin} title="Tlogin"/>
		      <Scene key="slogin" component={Slogin} title="Slogin"/>
		      <Scene key="ssignup" component={Ssignup} title="Ssignup"/>
		      <Scene key="tsignup" component={Tsignup} title="Tsignup"/>
		    </Stack>
		  </Router>
			)	
		
	} 
}