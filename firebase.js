import * as firebase from 'firebase';

let config = {
    apiKey: 'AIzaSyD6KEpZyntZv_vdUQkQ6Dyw-d5bGn1p8ts',
    authDomain: 'autoattendance-70e34.firebaseapp.com',
    databaseURL: 'https://autoattendance-70e34.firebaseio.com',
    projectId: 'autoattendance-70e34',
    storageBucket: 'autoattendance-70e34.appspot.com',
    messagingSenderId: '520062746033'
};
firebase.initializeApp(config);

export default firebase;
