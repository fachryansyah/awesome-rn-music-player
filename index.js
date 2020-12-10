/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import MusicScreen from './src/music-screen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MusicScreen);
