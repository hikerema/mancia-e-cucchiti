import { StatusBar } from 'expo-status-bar';
import { View, Text, Button} from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import OrderItem from '../OrderItem.jsx';

export default function Orders() {
    const [orders, setOrders] = useState([]);

    let intervalId;
    onLoad = () => {
        console.log("Componente montato");
        intervalId = setInterval(() => {
          console.log("E' passato un secondo!");
        }, 5000);
    }
  
    onUnload = () => {
      console.log("Componente smontato");
      clearInterval(intervalId);
    }
    
    // const 
    useEffect(() => {
      onLoad()
      return onUnload;
    }, []);
  
    return (
        <View style={[globalStyles.screenContainer, globalStyles.backgroundLight]}>
            <Text style={globalStyles.textScreenTitle}>Ordini</Text>
        </View>
    );
}