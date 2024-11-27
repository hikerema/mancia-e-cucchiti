import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItem from '../MenuItem.jsx';

const SID = getSid();
const LAT = 45.4784;//implementare la geolocalizzazione
const LNG = 9.2284;//implementare la geolocalizzazione

function getSid() {
  //prima implementare lo storage poi implementare questa funzione
  return "DDEqyRxxgFmycNWODc6LVIgkY156VkVSDWvjmqCh9ZHhAxmLNxIH9N4zY992f2c4";
}

export default function Menu({ location, BASE_URL, ...props }) {
    const [menus, setMenus] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    // Bottom navigation
    const handleHomePress = () => console.log('Home cliccato');
    const handleMenuPress = () => console.log('Menu cliccato');
    const handleProfilePress = () => console.log('Profile cliccato');

    const onLoad = () => {
      console.log("Componente Menù montato");
      getMenus();
      const id = setInterval(() => {
        getMenus();
      }, 60000);
      setIntervalId(id);
    };

    const getMenus = async () => {
      try {
        console.log(location);
          const response = await axios.get(BASE_URL + "/menu", {
              params: {
                  lat: location["latitude"],
                  lng: location["longitude"],
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
  
    const onUnload = () => {
      console.log("Componente Menù smontato");
      clearInterval(intervalId);
    };    
    // const 
    useEffect(() => {
      onLoad()
      return onUnload;
    }, []);
  
    return (
      <View style={[globalStyles.screenContainer, globalStyles.backgroundLight]}>
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