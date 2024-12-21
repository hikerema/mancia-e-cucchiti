import { View } from 'react-native';
import { useEffect, useState } from 'react';

//Schermate
import Loading from './components/screens/loading'; //Schermata di caricamento iniziale
import Menu from './components/screens/Menu';
import Profile from './components/screens/Profile';
import OrderState from './components/screens/OrderState';
import Orders from './components/screens/Orders';
import Details from './components/screens/Details';
import EditProfile from './components/screens/editProfile';
import OnDelivery from './components/screens/onDelivery.jsx';

import NavBar from './components/NavBar'; //Componente per barra di navigazione

import globalStyles from './styles/global.js'; //Stili 

//Servizzi
import * as Location from 'expo-location'; //Per ottenere la posizione attuale
import { getSID as RequestSID } from './services/RequestsManager.js'; //Per ottenere il SID


export default function App() {
  const [screen, setScreen] = useState('loading'); //Stato per la schermata attuale
  const [item, setItem] = useState(null); //Stato per sapere quale menu è stato selezionato (per la schermata di dettagli)
  const [currentLocation, setCurrentLocation] = useState(null); //Stato per la posizione attuale
  const [lastScreen, setLastScreen] = useState(null); //Stato per la schermata precedente
  const [SID, setSID] = useState(null);

  const getSID = async () => {
    console.log("App.js | La schermata di " + screen + " inizia la procedura di ottenimento del SID");
    try {
      let sid = await RequestSID();
      setSID(sid);
    } catch (error) {
      console.error("App.js | Errore imprevisto nel recupero del SID d aparte di schermata" + screen + " " + error);
    }
  } //Chiede al RequestManager il SID

  useEffect(() => {
    if (SID !== null) {
      if (screen === 'loading') {
        getCurrentLocation();
        if (currentLocation !== null) {
          setScreen('menu');
        }
      }    
    } else {
      getSID();
    }
  }), [];
  
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

  const changeScreen = (s) => {
    console.log("Cambia stato screen:" + screen + " => " + s);
    setLastScreen(screen);
    setScreen(s);
  } //Cambia la schermata attuale ad s 

  const details = (item) => {
    setItem(item);
    changeScreen('details');
  } //Imposta l'item selezionato e cambia la schermata a 'details'

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
        <Profile onButtonPressed={() => changeScreen("editProfile")}/>
        <NavBar activeScreen={screen} onNavigate={changeScreen} />
      </View>
    );
  } else if (screen === 'orders') {
    return (
      <View style={globalStyles.container}> 
        <Orders/>
        <NavBar activeScreen={screen} onNavigate={changeScreen} />
      </View>
    );
  } else if (screen === 'details') {
    return (
      <View style={globalStyles.container}> 
        <Details location={currentLocation} item={item} onButtonPressed={() => changeScreen(lastScreen)} onOrderPress={() => changeScreen("onDelivery")}/>
      </View>
    );
  } else if (screen === 'editProfile') {
    return (
      <View style={globalStyles.container}> 
        <EditProfile/>
        <NavBar activeScreen={screen} onNavigate={changeScreen} />
      </View>
    );
  } else if(screen === 'onDelivery') {
    return  (
      <View style={globalStyles.container}>
        <OnDelivery onButtonPressed={() => changeScreen(lastScreen)}/>
        
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