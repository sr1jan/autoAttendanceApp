import React, { Component} from 'react';
import {  StyleSheet, View, Text, StatusBar,TouchableOpacity,SafeAreaView,ScrollView ,TextInput,YellowBox,Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';


export default class Attendence extends Component {
    
  
   state={
    Department:'',
    class:'',
    subject:'',
    Ltype: '',
    students: '',

   }
   call(){
        Actions.imgup();
    }
  
render(){  
return (

  <View style={styles.container}>
  <Text style={styles.dept}>Select Department</Text>
    <RNPickerSelect
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
                { label: 'DS, value: 'DS' },

            ]}
        />
          <Text style={styles.dept}>Lecture Type</Text>
        <RNPickerSelect style={{marginVertical: 180}}
            onValueChange={(value) => this.setState({Ltype: value})}
            items={[
                { label: 'Practical', value: 'Practical' },
                { label: 'Theory', value: 'Theory' },
                
            ]}
        />
        <Text style={styles.dept}>Select students</Text>
        <RNPickerSelect style={{marginVertical: 180}}
            onValueChange={(value) => this.setState({students: value})}
            items={[
                { label: 'S1 Batch', value: 'S1 Batch' },
                { label: 'S2 Batch', value: 'S2 Batch' },
                { label: 'S3 Batch', value: 'S3 Batch' },
                { label: 'Full Class', value: 'Full Class' },
                
            ]}
        />
        <Button title="Take Attendence" color="black" onPress={this.call()} />
    </View>
);
}
}
const styles = StyleSheet.create({
    main: {
    flex: 1,
    backgroundColor: '#4c8bf5',
  },
  container: {
    flex:1,
   backgroundColor: '#ffffff',
    justifyContent:'center'
   
  },

  dept:{
    color: '#ffbd45',
    fontSize: 20,
  }

 });
