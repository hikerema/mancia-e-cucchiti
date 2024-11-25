import { StyleSheet, Text, View } from 'react-native';
import StorageManager from './services/StorageManager.js';
import Menu from './components/screens/Menu';
import Profile from './components/screens/Profile';
import OrderState from './components/screens/OrderState';
import Orders from './components/screens/Orders';
import Details from './components/screens/Details';
import NavBar from './components/NavBar';

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
      <View style={[globalStyles.container, globalStyles.backgroundLight]}> 
        <Menu onButtonPressed={() => changeScreen("details")} />
        <NavBar onNavigate={changeScreen} />
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