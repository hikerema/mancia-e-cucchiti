import { View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import Menu from './components/screens/Menu';
import Profile from './components/screens/Profile';
import OrderState from './components/screens/OrderState';
import Orders from './components/screens/Orders';
import Details from './components/screens/Details';
import NavBar from './components/NavBar';
import Loading from './components/screens/loading';

import globalStyles from './styles/global.js';
import StorageManager from './services/StorageManager.js';

const BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425"; //da rimuovere, fare un componente apposito

export default function App() {
  const [screen, setScreen] = useState('loading');
  const [item, setItem] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [SID, setSID] = useState(null);

  useEffect(() => {
    const checkSid = async () => {
      try {
        const sid = await StorageManager.getSID();
        console.log(sid);
        if (sid === null) {
          getSID();
          console.log("SID non presente");
        }
        else {
          console.log("SID presente");
          setSID(sid);
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkSid();

    if (screen === 'loading') {
      getCurrentLocation();
      if (currentLocation !== null) {
        setScreen('menu');
      }
    }
  }), [];
  
  const getSID = async () => {
    try {
      const response = await fetch(BASE_URL + "/User", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        const data = await response.json();
        setSID(data.sid);
        await StorageManager.setSID(data.sid);
        await StorageManager.setUID(data.uid);
      }
    } catch (error) {
      console.error(error);
      alert("Ci scusiamo, si è verificato un errore durante il recupero del SID");
    }
  }

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
  };

  const changeScreen = (screen) => {
    console.log("going to screen", screen);
    setScreen(screen);
  } 

  const details = (item) => {
    console.log("going to details");
    setItem(item);
    setScreen('details');
  }

  if (screen === 'menu') {
    return (
      <View style={globalStyles.container}> 
        <Menu SID={SID} location={currentLocation} BASE_URL={BASE_URL} onButtonPressed={(item) => details(item)} />
        <NavBar onNavigate={changeScreen} />
      </View>
    );
  } else if (screen === 'profile') {
    return (
      <View style={globalStyles.container}> 
        <Profile SID={SID} BASE_URL={BASE_URL} />
        <NavBar onNavigate={changeScreen} />
      </View>
    );
  } else if (screen === 'orders') {
    return (
      <View style={globalStyles.container}> 
        <Orders SID={SID} BASE_URL={BASE_URL} />
        <NavBar onNavigate={changeScreen} />
      </View>
    );
  } else if (screen === 'details') {
    return (
      <View style={globalStyles.container}> 
        <Details item={item}/>
        <NavBar onNavigate={changeScreen} />
      </View>
    );
  }
  else {
    return (
      <View style={[globalStyles.container, globalStyles.backgroundOrange]}> 
        <Loading />
      </View>
    );
  }
}