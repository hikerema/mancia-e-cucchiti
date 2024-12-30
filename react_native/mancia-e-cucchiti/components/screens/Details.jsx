import { StatusBar } from 'expo-status-bar';
import { View, Text, Alert, TouchableOpacity, Image} from 'react-native';
import { useEffect, useState} from 'react';

import globalStyles from '../../styles/global.js'; //Stili

//Servizi
import { getMenuImage, isProfileCompleted, buyMenuRequest } from '../../services/RequestsManager.js';
import { getMenuDetails } from '../../services/RequestsManager.js';

//Icone
import goBackIcon from '../../assets/icons/goBack.png';

export default function Details({item, location, ...props}) {
  const [image, setImage] = useState(null); //Stato per l'immagine del menù
  const [details, setDetails] = useState(null); //Stato per i dettagli del menù

  const fetchImage = async () => {
    const image = await getMenuImage(item.mid, item.imageVersion);
    setImage(image);
  } //Richiede l'immagine del menù tramite il RequestManager

  const fetchDetails = async () => {
    const details = await getMenuDetails(item);
    setDetails(details);
  } //Richiede i dettagli del menù tramite il RequestManager

  onLoad = () => {
      console.log("Componente Details montato");
      fetchImage();
      fetchDetails();
  } //all'apertura del componente chiedo i dettagli e l'immagine del menù
  onUnload = () => {
    console.log("Componente Details smontato");
  }

  useEffect(() => {
    onLoad()
    return onUnload;
  }, []);

  const showConfirm = () => {
    Alert.alert(
      "Conferma il tuo ordine", // Titolo
      "Sei sicuro di voler ordinare " + item.name + "?", // Messaggio
      [
        {
          text: "Annulla",
          onPress: () => console.log("Azione annullata"),
          style: "cancel", // Stile del pulsante
        },
        {
          text: "Confermo",
          onPress: () => buyMenu(item),
          style: "default", // Stile del pulsante
        },
      ]
    );
  }; //Mostra un alert per confermare l'ordine

  const buyMenu = async (item) => {
    const isCompleted = await isProfileCompleted()
    if (isCompleted) {
      try {
        const response = await buyMenuRequest(item, location.latitude, location.longitude);
        if(response.status === 200) {
          props.onOrderPress();
        }
        if(response.status === 409) {
          alert("Un'altro ordine è ancora in corso di consegna, non puoi effettuare un altro ordine");
        }

      } catch (error) {
        console.log("Details.jsx | Errore nel acquisto del menu " + error);
      }
    } else {
      alert("Completa il tuo profilo prima di effettuare un ordine");
    }
  } //Richiede l'acquisto del menù tramite il RequestManager al soddisfacimento di alcune condizioni

  return (
    <View style={[globalStyles.screenContainer, globalStyles.backgroundLight]}>
      <StatusBar style="auto" />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => props.onButtonPressed()} style={[globalStyles.backButton, globalStyles.textScreenTitle]}>
          <Image source={goBackIcon} style={[globalStyles.backButtonIcon]} />
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
      <TouchableOpacity style={[globalStyles.buttonPrimary, globalStyles.buttonDetails]} onPress={() => showConfirm()}>
        <Text style={globalStyles.buttonPrimaryText}>Ordina ora</Text>
      </TouchableOpacity>
    </View>
  );
}