import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { getProfile, getOrder, getMenuByMid } from '../../services/RequestsManager.js';
import globalStyles from '../../styles/global.js';
import goBackIcon from '../../assets/icons/goBack.png';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';

import DroneImage from '../../assets/icons/drone.png';
import ManImage from '../../assets/icons/man.png';
import restImage from '../../assets/icons/restaurant.png';

export default function OnDelivery(props) {
    const [order, setOrder] = useState(null);
    const [menu, setMenu] = useState(null);
    var lastOid = null;
    const [intervalId, setIntervalId] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
  
    const fetchLastOid = async () => {
      try {
        const profile = await getProfile();
        lastOid = profile.lastOid;
        console.log("LastOid: ", profile.lastOid);
      } catch (error) {
        console.error("OnDelivery.jsx | Errore durante il recupero dell' LastOid:", error);
        alert("OnDelivery.jsx | Errore durante il recupero dell' LastOid:"); //Messaggio di errore da migliorare
      }
    };
  
    const fetchOrder = async (oid) => {
      if (oid) {
        try {
          const r = await getOrder(oid.toString());
          console.log("Ordine recuperato correttamente");
          setOrder(r);
        } catch (error) {
          console.error("OnDelivery.jsx | Errore durante il recupero dell'ordine:", error);
          alert("OnDelivery.jsx | Errore durante il recupero dell'ordine:"); //Messaggio di errore da migliorare
        }
      }
    };
  
    const fetchMenu = async () => {
      if (order) {
        try {
          const menu = await getMenuByMid(order.mid, order.deliveryLocation.lat, order.deliveryLocation.lng);
          setMenu(menu);
        } catch (error) {
          console.error("OnDelivery.jsx | Errore durante il recupero del menù:", error);
          alert("OnDelivery.jsx | Errore durante il recupero del menù:"); //Messaggio di errore da migliorare
        }
      }
    };

    function getLastOid() {
        return lastOid;
    }

    const updateMap = async () => {
        console.log("Aggiornamento posizione attuale");
        if (5 == 5) {
            console.log(getLastOid());
            await fetchOrder(getLastOid());
        } else {
          console.error("Nessun ordine disponibile");
        }
      };
    
      useEffect(() => {
        fetchLastOid();
      }, []);
    
      useEffect(() => {
        if (lastOid) {
          fetchOrder(lastOid);
        }
      }, [lastOid]);
    
      useEffect(() => {
        if (order) {
          fetchMenu();
        }
      }, [order]);
    

      useEffect(() => {
        if (order?.currentPosition) {
          console.log("Posizione attuale disponibile");
          setCurrentLocation(order.currentPosition);
        } else {
          updateMap();
        }
      }, [order]);
    
    useEffect(() => {
      if (!intervalId) {
        const id = setInterval(() => {
          updateMap();
          console.log("Aggiornamento posizione attuale");
        }, 5000);
        setIntervalId(id);
      }
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }, [intervalId]);

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      date.setHours(date.getHours());
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    return (
      <View style={globalStyles.screenContainer}>
        <StatusBar style="auto" />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={globalStyles.textScreenTitle}>Ordine in consegna</Text>
        </View>
        {currentLocation && (
          <View style={globalStyles.mapContainer}>
            <MapView
              style={globalStyles.map}
              region={{
                latitude: currentLocation.lat,
                longitude: currentLocation.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: currentLocation.lat,
                  longitude: currentLocation.lng,
                }}
                title="Posizione attuale"
                description={`Orario presunto di arrivo: ${order?.estimatedArrivalTime ? formatTime(order.estimatedArrivalTime) : "N/A"}`}
                image={DroneImage}
              />

              <Marker
                coordinate={{
                  latitude: order?.deliveryLocation.lat,
                  longitude: order?.deliveryLocation.lng,
                }}
                title="Posizione di consegna"
                description={`Orario presunto di arrivo: ${order?.estimatedArrivalTime ? formatTime(order.estimatedArrivalTime) : "N/A"}`}
                image = {order?.status !== 'COMPLETED' ? ManImage : DroneImage}
              />

              <Marker
                coordinate={{
                  latitude: menu?.location.lat,
                  longitude: menu?.location.lng,
                }}
                title="Posizione di partenza"
                description={`Orario presunto di arrivo: ${order?.estimatedArrivalTime ? formatTime(order.estimatedArrivalTime) : "N/A"}`}
                image={restImage}
              />

              <Polyline
                coordinates={
                  [{
                    latitude: menu?.location.lat,
                    longitude: menu?.location.lng,
                  },
                  {
                    latitude: order?.deliveryLocation.lat,
                    longitude: order?.deliveryLocation.lng,
                  }]
                }
                strokeColor="#e68231"
                strokeWidth={2}
              />
            </MapView>
          </View>
        )}
        {menu ? (
          <View style={globalStyles.container}>
            <Text style={globalStyles.textScreenSubtitle}>Riepilogo del ordine:</Text>
            {order?.status !== 'COMPLETED' && (
              <>
                <Text style={globalStyles.textOrderDetailsTitle}>Orario presunto di arrivo:</Text>
                <Text style={globalStyles.textOrderDetails}>{order?.expectedDeliveryTimestamp ? formatTime(order.expectedDeliveryTimestamp) : 'N/A'}</Text>
              </>
            )}
            {order?.status === 'COMPLETED' && (
              <>
                <Text style={globalStyles.textOrderDetailsTitle}>Orario di arrivo:</Text>
                <Text style={globalStyles.textOrderDetails}>{order?.deliveryTimestamp ? formatTime(order.deliveryTimestamp) : 'N/A'}</Text>
              </>
            )}

            <Text style={globalStyles.textOrderDetailsTitle}>Stato dell'ordine:</Text>
            <Text style={globalStyles.textOrderDetails}>{order?.status === 'COMPLETED' ? 'consegnato' : 'in consegna'}</Text>
            
            <Text style={globalStyles.textOrderDetailsTitle}>{menu.name}</Text>
            <Text style={globalStyles.textOrderDetails}>{menu.shortDescription}</Text>
          </View>
        ) : (
          <View style={globalStyles.container}>
            <Text style={globalStyles.textPrimary}>Stiamo caricando i dati del tuo ordine</Text>
          </View>
        )}
      </View>
    );
}