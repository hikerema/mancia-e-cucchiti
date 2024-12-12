import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity, Image} from 'react-native';
import { useEffect, useState} from 'react';

import globalStyles from '../../styles/global.js'; //Stili

//Servizzi
import { getMenuImage, isProfileCompleted, buyMenuRequest } from '../../services/RequestsManager.js';
import { getMenuDetails } from '../../services/RequestsManager.js';

//Icone
import goBakcIcon from '../../assets/icons/goBack.png';

export default function Details({item, location, ...props}) {
  const [image, setImage] = useState(null); //Stato per l'immagine del menù
  const [details, setDetails] = useState(null); //Stato per i dettagli del menù

  const fetchImage = async () => {
    const image = await getMenuImage(item.mid, item.imageVersion);
    setImage(image);
  }

  const fetchDetails = async () => {
    const details = await getMenuDetails(item);
    setDetails(details);
  }

  let intervalId;
  onLoad = () => {
      console.log("Componente Details montato");
      fetchImage();
      fetchDetails();
      intervalId = setInterval(() => {
        console.log(image);
      }, 5000);
  }

  onUnload = () => {
    console.log("Componente Details smontato");
    clearInterval(intervalId);
  }
  
  // const 
  useEffect(() => {
    onLoad()
    return onUnload;
  }, []);

  const buyMenu = async (item) => {
    const isCompleted = await isProfileCompleted()
    if (isCompleted) {
      await buyMenuRequest(item, location.lat, location.lng);
      //vai al dettaglio oridne
    } else {
      alert("Completa il tuo profilo prima di effettuare un ordine");
    }
  }

  return (
    <View style={[globalStyles.screenContainer, globalStyles.backgroundLight]}>
      <StatusBar style="auto" />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => props.onButtonPressed()} style={[globalStyles.backButton, globalStyles.textScreenTitle]}>
          <Image source={goBakcIcon} style={[globalStyles.backButtonIcon]} />
        </TouchableOpacity>
        <Text style={[globalStyles.textScreenTitle]}>{item.name}</Text>
      </View>
      <View style={globalStyles.detailsContainer}>
        <View style={globalStyles.detailsCard}>
          <Image
              source={{ uri: `data:image/jpeg;base64,${image}` }}
              style={globalStyles.detailsImage}
            /> 
        </View>
        <View >
          <Text style={globalStyles.detailsTitle}>Descrizione</Text>
          {details && <Text style={globalStyles.detailsText} numberOfLines={8}>{details.longDescription}</Text>}
          <Text style={globalStyles.detailsTitle}>Prezzo</Text>
          <Text style={globalStyles.detailsText}>€{item.price}</Text>
          <Text style={globalStyles.detailsTitle}>Tempo di consegna</Text>
          <Text style={globalStyles.detailsText}>{item.deliveryTime} min</Text>
        </View>
      </View>
      <TouchableOpacity style={[globalStyles.buttonPrimary, globalStyles.buttonDetails]} onPress={() => buyMenu(item)}>
        <Text style={globalStyles.buttonPrimaryText}>Ordina ora</Text>
      </TouchableOpacity>
    </View>
  );
}