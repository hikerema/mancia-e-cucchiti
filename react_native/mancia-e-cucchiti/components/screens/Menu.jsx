import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItem from '../MenuItem.jsx';
import BottomNavBar from '../BottomNavBar.jsx';

const BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425";
const SID = getSid();
const LAT = 45.4784;//implementare la geolocalizzazione
const LNG = 9.2284;//implementare la geolocalizzazione

function getSid() {
  //prima implementare lo storage poi implementare questa funzione
  return "DDEqyRxxgFmycNWODc6LVIgkY156VkVSDWvjmqCh9ZHhAxmLNxIH9N4zY992f2c4";
}

export default function Menu(props) {
    const [menus, setMenus] = useState([]);

    // Bottom navigation
    const handleHomePress = () => console.log('Home cliccato');
    const handleMenuPress = () => console.log('Menu cliccato');
    const handleProfilePress = () => console.log('Profile cliccato');

    let intervalId;
    onLoad = () => {
        console.log("Componente Menù montato");
        getMenus();
        intervalId = setInterval(() => {
          getMenus();
        }, 60000);
    }

    getMenus = async () => {
      try {
          const response = await axios.get(BASE_URL + "/menu", {
              params: {
                  lat: LAT,
                  lng: LNG,
                  sid: SID
              },
              headers: {
                  'Accept': 'application/json'
              }
          });
          setMenus(response.data);
          console.log(menus);
      } catch (error) {
          console.error(error);
          alert("Ci scusiamo, si è verificato un errore durante il recupero dei menù");
      }
  }
  
    onUnload = () => {
      console.log("Componente Menù smontato");
      clearInterval(intervalId);
    }
    
    // const 
    useEffect(() => {
      onLoad()
      return onUnload;
    }, []);
  
    return (
      <View style={[globalStyles.container, globalStyles.backgroundLight]}>
        <StatusBar style="auto"/>
        <Text style={globalStyles.textScreenTitle}>Menù</Text>
        <FlatList
          data={menus}
          renderItem={({ item }) => <MenuItem item={item} BASE_URL={BASE_URL} SID={SID} />}
          keyExtractor={(item) => item.mid.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
}