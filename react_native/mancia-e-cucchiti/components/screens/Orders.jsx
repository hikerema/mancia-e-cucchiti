import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList } from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect, useState } from 'react';

import { getDeliveredOrders } from '../../services/RequestsManager.js';
import { getOnDeliveryOrders } from '../../services/RequestsManager.js';

import OrderItem from '../OrderItem.jsx';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';

export default function Orders() {
    const [onDeliveryOrders, setOnDeliveryOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);

    const getDeliveredOrdersAsync = async () => {
        try {
            setDeliveredOrders(await getDeliveredOrders());
        } catch (error) {
            console.error("Orders.jsx | Errore durante il recupero degli ordini:", error);
            alert("Ci scusiamo, si è verificato un errore durante il recupero degli ordini"); //Messaggio di errore da migliorare
        }
    }

    const getOnDeliveryOrdersAsync = async () => {
        try {
            setOnDeliveryOrders(await getOnDeliveryOrders());
        } catch (error) {
            console.error("Orders.jsx | Errore durante il recupero degli ordini:", error);
            alert("Ci scusiamo, si è verificato un errore durante il recupero degli ordini"); //Messaggio di errore da migliorare
        }
    }

    let intervalId;
    onLoad = () => {
        console.log("Componente montato");
        getDeliveredOrdersAsync();
        getOnDeliveryOrdersAsync();
        intervalId = setInterval(() => {
          console.log("Richiedo aggiornamenti sugli ordini in arrivo");
          getOnDeliveryOrdersAsync();
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
  
    const combinedOrders = [
      ...onDeliveryOrders.map(order => ({ ...order, type: 'onDelivery' })),
      ...deliveredOrders.map(order => ({ ...order, type: 'delivered' }))
    ];

    const renderItem = ({ item }) => {
      if (item.type === 'header') {
        return <Text style={globalStyles.textScreenSubtitle}>{item.title}</Text>;
      }
      return (
        <OrderItem 
          item={item} 
          onPress={() => {
            props.onButtonPressed(item);
          }}
        />
      );
    };

    const data = [];
    if (onDeliveryOrders.length > 0) {
      data.push({ type: 'header', title: 'Ordini in arrivo' });
      data.push(...onDeliveryOrders);
    }
    if (deliveredOrders.length > 0) {
      data.push({ type: 'header', title: 'Ordini consegnati' });
      data.push(...deliveredOrders);
    } else {
      data.push({ type: 'header', title: 'Nessun ordine precedente' });
    }

    return (
      <View style={[globalStyles.screenContainer, globalStyles.backgroundLight]}>
        <StatusBar style="auto"/>
        <Text style={globalStyles.textScreenTitle}>Ordini</Text>
        <FlatList 
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.oid ? item.oid.toString() : index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
}