/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

const FaceAttendance = () => (
  <Provider store={ store }>
    <App/>
  </Provider>
);

AppRegistry.registerComponent(appName, () => FaceAttendance);
