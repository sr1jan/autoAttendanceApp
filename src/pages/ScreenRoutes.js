import React from 'react';
import { Router, Scene, Stack, } from 'react-native-router-flux';
import Home from '../pages/Home';
import DrawerContent from '../components/DrawerContent';






const ScreenRoute = () => {
	return (
		<Router navigationBarStyle={{ backgroundColor: '#484848' }}>
		<Stack key="root">
				<Scene key="drawer"
					drawer
					contentComponent={DrawerContent}
					drawerWidth = {250}
					hideDrawerButton={true}
					hideNavBar={true}
				>
				<Scene key="home" component={Home} title="Home" />
				</Scene>
			</Stack>
		
		</Router>
	);
}
export default ScreenRoute;