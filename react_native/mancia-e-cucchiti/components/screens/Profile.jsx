import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';

import globalStyles from '../../styles/global.js'; //Stili

//Servizzi
import { getProfile, getOrder, getMenuByMid, getMenuImage} from '../../services/RequestsManager.js';

//componenti
import MenuItem from '../MenuItem.jsx';


export default function Profile({...props}) {
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [order, setOrder] = useState(null);
  const [menu, setMenu] = useState(null);

  const getProfileInfo = async () => {
    try {
      setProfile(await getProfile());
    } catch (error) {
      console.error("Profile.jsx | Errore durante il recupero delle informazioni del profilo:", error);
    }
  }
  const getOrderAsync = async () => {
    try {
      if(profile !== null){
        if(profile.lastOid !== null){
          setOrder(await getOrder(profile.lastOid));
        }
      }

    } catch (error) {
      console.error("Profile.jsx | Errore durante il recupero degli ordini:", error);
      alert("Ci scusiamo, si è verificato un errore durante il recupero degli ordini");
    }
  } //Metodo per ottenere gli ordini tramite il requestManager
 
  const getMenuInfo = async () => {
    if (order === null) return;
    try {
      setMenu(await getMenuByMid(order.mid, order.deliveryLocation.lat, order.deliveryLocation.lng)); 
    } catch (error) {
      console.error("Profile.jsx | Errore durante il recupero delle informazioni", error);
    } 
  }

  const getMenuImageAsync = async () => {
    try {
      if (menu === null) return;
      setImage(await getMenuImage(menu.mid, menu.imageVersion));
    } catch (error) {
      console.error("Profile.jsx | Errore durante il recupero dell'immagine", error);
    }
  }

  useEffect(() => {
    onLoad();
    return onUnload;
  }, []);

  useEffect(() => {
    if (profile) {
      getOrderAsync();
    }
  }, [profile]);

  useEffect(() => {
    if (order) {
      getMenuInfo();
    }
  }, [order]);

  useEffect(() => {
    if (menu) {
      getMenuImageAsync();
    }
  }, [menu]);

  const onLoad = () => {
    console.log("Componente Profilo montato");
    getProfileInfo();
  };

  const onUnload = () => {
    console.log("Componente Profilo smontato");
  };

  return (
    <View style={[globalStyles.screenContainer]}>
      <StatusBar style="auto" />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {profile && profile.firstName &&
        <Text style={[globalStyles.textNameTitle]}>Ciao, {profile.firstName}!</Text>
      }
      {profile && !profile.firstName &&
        <Text style={[globalStyles.textNameTitle]}>Ciao, User!</Text>
      }
      {!profile &&
        <Text style={globalStyles.textNameTitle}>Ciao, User!</Text>
      }
        <TouchableOpacity style={globalStyles.iconProfile} onPress={() => props.goToScreen("editProfile")}>
          {profile && profile.firstName &&
            <Text style={globalStyles.iconProfileText}>{profile.firstName.charAt(0)}</Text>
          }
          {profile && !profile.firstName &&
            <Text style={globalStyles.iconProfileText}>U</Text>
          }
          {!profile &&
            <Text style={globalStyles.iconProfileText}>U</Text>
          }
        </TouchableOpacity>
      </View>

      <Text style={globalStyles.textScreenSubtitle}>Il tuo ultimo ordine</Text>

      {menu &&
        <View>
          <MenuItem 
            item={menu} 
            onPress={() => {
              if (order?.status === 'COMPLETED') {
                props.onButtonPressed(menu);
              } else {
                props.goToScreen('onDelivery');
              }
            }}
          />
        </View>
      }
      {!menu &&
        <View style={globalStyles.VoidOrderContainer}>
          <Text style={globalStyles.VoidOrderText}>Non hai ancora effettuato ordini</Text>
        </View>
      }
      <TouchableOpacity style={globalStyles.AccentContainer} onPress={() => props.goToScreen("editProfile")}>
        <Text style={globalStyles.textAccent}>Modifica il tuo profilo</Text>
      </TouchableOpacity>
    </View>
  );
};
