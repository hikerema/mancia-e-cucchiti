import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';

import globalStyles from '../../styles/global.js'; //Stili

import MenuItem from '../MenuItem.jsx';//Componente per la visualizzazione di un singolo menù

//Servizzi
import { getMenus } from '../../services/RequestsManager.js';


export default function Menu({location, ...props }) {
  const [menus, setMenus] = useState([]); //Stato per i menù, slvo i menu che verranno visualizzati
  const [intervalId, setIntervalId] = useState(null); //Stato per l'intervallo di aggiornamento dei menù  

  const getMenusAsync = async () => {
    try {
      setMenus(await getMenus(location.latitude, location.longitude));
    } catch (error) {
      console.error("Menu.jsx | Errore durante il recupero dei menù:", error);
      alert("Ci scusiamo, si è verificato un errore durante il recupero dei menù"); //Messaggio di errore da migliorare
    }
  } //Metodo per ottenere i menù tramite il requestManager

  useEffect(() => {
    onLoad()
    return onUnload;
  }, []);

  const onLoad = () => {
    console.log("Componente Menù montato"); 
      getMenusAsync();
    const id = setInterval(() => {
      getMenusAsync();
    }, 60000); //Aggiorna i menù ogni minuto
    setIntervalId(id);
  }; //Metodo caricato all''avvio che mi permette di aggiornare i menù frequentemente

  const onUnload = () => {
    console.log("Componente Menù smontato");
    clearInterval(intervalId);
  }; 

  return (
    <View style={[globalStyles.screenContainer, globalStyles.backgroundLight]}>
      <StatusBar style="auto"/>
      <Text style={globalStyles.textScreenTitle}>Menù</Text>
      <FlatList {...props}
        data={menus}
        renderItem={({ item }) => (
        <MenuItem 
          item={item} 
          onPress={() => {
            props.onButtonPressed(item);
          }}
        />
        )}
        keyExtractor={(item) => item.mid.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}