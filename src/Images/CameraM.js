import React, { Component, PureComponent } from 'react';
import { AppRegistry, SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class cam extends Component {

render(){
return (

  <View style={styles.container}>
  <Text style={styles.logoText}>
                Mark Attendance
                </Text>
     <RNCamera
          ref={ref => {
           this.camera = ref;
          }}
          style={{
            flex: 1,
            width: '100%',
          }}
       />
  
               
  </View>

);
}
}


const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
   backgroundColor: '#212121',

   
  },

   logoText : {
      paddingHorizontal: 40,
      paddingVertical: 20,
      fontSize: 30,
      color : 'rgba(255, 255, 255, 0.7)'
    },

   });