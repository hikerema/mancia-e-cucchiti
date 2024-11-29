import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList } from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItem from '../MenuItem.jsx';
import StorageManager from '../../services/StorageManager.js';

export default function Menu({ SID, location, BASE_URL, ...props }) {
    const [menus, setMenus] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

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
        console.log("SID:" + SID);
        console.log("STRING:" + SID.toString());
          const response = await axios.get(BASE_URL + "/menu", {
              params: {
                  lat: location["latitude"],
                  lng: location["longitude"],
                  sid: "Oz0oSC8RHdapoDJhVKeKpK79zor3rbUb1tJI4uLwbyEswrPqS18fOjXmGH1zbMYl"
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
      <FlatList {...props}
      data={menus}
      renderItem={({ item }) => (
      <MenuItem 
      item={item} 
      BASE_URL={BASE_URL} 
      SID={SID} 
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