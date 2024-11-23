import { StyleSheet, Text, View } from 'react-native';
import StorageManager from './services/StorageManager.js';
import Menu from './screens/menu';
import Profile from './screens/Profile';
import OrderState from './screens/OrderState';
import Orders from './screens/Orders';
import Details from './screens/Details';

import { useState } from 'react';
import globalStyles from './styles/global.js';


export default function App() {
  const [screen, setScreen] = useState('menu');

  const changeScreen = (screen) => {
    console.log("going to screen", screen);
    alert("grande agneee sei passatta alla schermata " + screen);
    setScreen(screen);
} 

  if (screen === 'menu') {
    return (
      <View style={globalStyles.container}> 
        <Menu onButtonPressed={() => changeScreen("details")} />
      </View>
    );
  }else if (screen === 'details') {
    return (
      <View style={globalStyles.container}> 
        <Details onButtonPressed={() => changeScreen("menu")} />
      </View>
    );
  }
  
}