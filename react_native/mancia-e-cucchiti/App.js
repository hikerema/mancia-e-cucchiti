import { View, AppState } from 'react-native';
import { useEffect, useState } from 'react';

// Schermate
import Loading from './components/screens/loading'; // Schermata di caricamento iniziale
import Menu from './components/screens/Menu';
import Profile from './components/screens/Profile';
import Details from './components/screens/Details';
import EditProfile from './components/screens/editProfile';
import OnDelivery from './components/screens/onDelivery.jsx';

import NavBar from './components/NavBar'; // Componente per barra di navigazione

import globalStyles from './styles/global.js'; // Stili

// Servizi
import * as Location from 'expo-location'; // Per ottenere la posizione attuale
import { getSID as RequestSID } from './services/RequestsManager.js'; // Per ottenere il SID
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [screen, setScreen] = useState('loading'); // Stato per la schermata attuale
  const [item, setItem] = useState(null); // Stato per sapere quale menu è stato selezionato (per la schermata di dettagli)
  const [currentLocation, setCurrentLocation] = useState(null); // Stato per la posizione attuale
  const [SID, setSID] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const [nav, setNav] = useState(['menu']); // Stato per la lista degli elementi

  const getSID = async () => {
    try {
      let sid = await RequestSID();
      setSID(sid);
    } catch (error) {
      console.error("App.js | Errore imprevisto nel recupero del SID da parte di schermata " + screen + " " + error);
    }
  }; // Chiede al RequestManager il SID

  const getCurrentLocation = async () => {
    let canUseLocation = false;

    const grantedPermission = await Location.getForegroundPermissionsAsync();
    if (grantedPermission.status === "granted") canUseLocation = true;
    else {
      const permissionResponse = await Location.requestForegroundPermissionsAsync();
      if (permissionResponse.status === "granted") canUseLocation = true;
    }

    if (!canUseLocation) return;

    const location = await Location.getCurrentPositionAsync();
    setCurrentLocation(location.coords);
  };

  const changeScreen = (s) => {
    console.log("App.js | Cambia stato screen:" + screen + " => " + s);
    if (nav.includes(s)) {
      const index = nav.indexOf(s);
      setNav(nav.slice(0, index + 1));
    } else {
      setNav([...nav, s]);
    }
    setScreen(s);
    AsyncStorage.setItem('currentScreen', s);
    AsyncStorage.setItem('currentNav', JSON.stringify(nav));
  }; // Cambia la schermata attuale ad s

  const details = (item) => {
    setItem(item);
    AsyncStorage.setItem('currentItem', JSON.stringify(item));
    changeScreen('details');
  }; // Imposta l'item selezionato e cambia la schermata a 'details'

  useEffect(() => {
    const restoreState = async () => {
      const savedScreen = await AsyncStorage.getItem('currentScreen');
      const savedNav = await AsyncStorage.getItem('currentNav');
      const savedItem = await AsyncStorage.getItem('currentItem');
      if (savedNav) {
        setNav(JSON.parse(savedNav));
      }
      if (savedItem) {
        setItem(JSON.parse(savedItem));
      }
      if (savedScreen && savedScreen !== 'loading') {
        if (currentLocation !== null) {
          setScreen(savedScreen);
        }
      } else {
        if (currentLocation !== null) {
          if (savedScreen === 'loading') {
            setScreen('menu');
          }
        }
      }
    };

    restoreState();
  }, [currentLocation]); // Ripristina lo stato precedente
  
  useEffect(() => {
    if (SID !== null) {
      if (screen === 'loading') {
        getCurrentLocation();
      }
    } else {
      getSID();
    }
  }, [SID, screen, currentLocation]);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        await AsyncStorage.setItem('currentScreen', screen);
        await AsyncStorage.setItem('currentNav', JSON.stringify(nav));
        await AsyncStorage.setItem('currentItem', JSON.stringify(item));
      }
    };
  
    const subscription = AppState.addEventListener('change', handleAppStateChange);
  
    return () => {
      subscription.remove();
    };
  }, [screen]);

  if (screen === 'menu') {
    return (
      <View style={globalStyles.container}>
        <Menu location={currentLocation} onButtonPressed={(item) => details(item)} />
        <NavBar activeScreen={screen} onNavigate={changeScreen} />
      </View>
    );
  } else if (screen === 'profile') {
    return (
      <View style={globalStyles.container}>
        <Profile onButtonPressed={(item) => details(item)} goToScreen={(s) => changeScreen(s)} />
        <NavBar activeScreen={screen} onNavigate={changeScreen} />
      </View>
    );
  } else if (screen === 'details') {
    return (
      <View style={globalStyles.container}>
        <Details location={currentLocation} item={item} onButtonPressed={() => changeScreen(nav.at(-2))} onOrderPress={() => changeScreen("onDelivery")} />
      </View>
    );
  } else if (screen === 'editProfile') {
    return (
      <View style={globalStyles.container}>
        <EditProfile onButtonPressed={() => changeScreen(nav.at(-2))}/>
      </View>
    );
  } else if (screen === 'onDelivery') {
    return (
      <View style={globalStyles.container}>
        <OnDelivery onButtonPressed={() => details(item)} />
        <NavBar activeScreen={screen} onNavigate={changeScreen} />
      </View>
    );
  } else {
    return (
      <View style={[globalStyles.container, globalStyles.backgroundOrange]}>
        <Loading />
      </View>
    );
  }
}