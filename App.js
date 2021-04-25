import * as React from 'react';
import Navigation from './Navigation/Navigation';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <Navigation/>
  );
}

