import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar,TouchableOpacity} from 'react-native';
import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';



export default class Home extends Component {

render(){


return (

	<View style={styles.container}>
	<Text style={styles.logoText}>
                Teacher DashBoard
                </Text>
         
    
  
	</View>

);
}
}


const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#212121',
   alignItems :'center',
   justifyContent : 'center',
   
  },

   logoText : {
      marginVertical: 50,
      fontSize: 30,
      color : 'rgba(255, 255, 255, 0.7)'
    },
 });

