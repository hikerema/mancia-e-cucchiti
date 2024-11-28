import { StyleSheet, Text, View } from 'react-native';
import StorageManager from './services/StorageManager.js';
import Menu from './components/screens/Menu';
import Profile from './components/screens/Profile';
import OrderState from './components/screens/OrderState';
import Orders from './components/screens/Orders';
import Details from './components/screens/Details';
import NavBar from './components/NavBar';
import Loading from './components/screens/loading';

import { useEffect, useState } from 'react';
import globalStyles from './styles/global.js';

import * as Location from 'expo-location';

const BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425";



export default function App() {
  const [screen, setScreen] = useState('loading');
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
    if (currentLocation !== null) {
      setScreen('menu');
    }
  });

  const getCurrentLocation = async () => {
    let canUseLocation = false;

    const grantedPermission =
        await Location.getForegroundPermissionsAsync();
    if (grantedPermission.status === "granted") canUseLocation = true;
    else {
        const permissionResponse =
            await Location.requestForegroundPermissionsAsync();

        if (permissionResponse.status === "granted") canUseLocation = true;
    }

    if (!canUseLocation) return;

    const location = await Location.getCurrentPositionAsync();
    setCurrentLocation(location.coords);
    //console.log(currentLocation);
  };

  const changeScreen = (screen) => {
    console.log("going to screen", screen);
    alert("grande agneee sei passatta alla schermata " + screen);
    setScreen(screen);
  } 

  if (screen === 'menu') {
    return (
      <View style={globalStyles.container}> 
        <Menu location={currentLocation} BASE_URL={BASE_URL} onButtonPressed={() => changeScreen("details")} />
        <NavBar onNavigate={changeScreen} />
      </View>
    );
  }else if (screen === 'loading') {
    return (
      <View style={[globalStyles.container, globalStyles.backgroundOrange]}> 
        <Loading />
      </View>
    );
  }
}