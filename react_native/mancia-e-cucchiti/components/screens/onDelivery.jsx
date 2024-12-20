import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import { getProfile, getOrder, getMenuByMid } from '../../services/RequestsManager.js';

import globalStyles from '../../styles/global.js'; //Stili

import MapView, { Marker } from 'react-native-maps';


export default function OnDelivery() {
    const [intervalId, setIntervalId] = useState(null); //Stato per l'intervallo di aggiornamento dei

    const estimatedArrivalTime = "15:30"; // Orario presunto di arrivo
    const coordinate = { latitude: 45.4642, longitude: 9.19 }; // Coordinate dell'icona
    const [currentLocation, setCurrentLocation] = useState(null); //Stato per la posizione attuale del drone
    const [latD, setLatD] = useState(0.09); //Stato per la latitudine del drone
    const [lonD, setLonD] = useState(0.04); //Stato per la longitudine del drone
    const [lastOid, setLastOid] = useState(null);
    const [order, setOrder] = useState(null);
    const [menu, setMenu] = useState(null);

    const fetchLastOid = async () => {
        try {
            const profile = await getProfile();
            setLastOid(profile.lastOid);
        } catch (error) {
            console.error("OnDelivery.jsx | Errore durante il recupero dell'ultimo ordine:", error);
            alert("Ci scusiamo, si è verificato un errore durante il recupero dell'ultimo ordine"); //Messaggio di errore da migliorare
        }
    }

    const fetchOrder = async () => {
        try {
            const order = await getOrder(lastOid);
            setOrder(order);
        } catch (error) {
            console.error("OnDelivery.jsx | Errore durante il recupero dell'ultimo ordine:", error);
            alert("Ci scusiamo, si è verificato un errore durante il recupero dell'ultimo ordine"); //Messaggio di errore da migliorare
        }
    }

    const fetchMenu = async () => {
        if (order) {
            const menu = await getMenuByMid(order.mid);
            setMenu(menu);
        }
    }

    useEffect(() => {
        onLoad()
        return onUnload;
    }, []);

    useEffect(() => {
        fetchOrder();
    }, [lastOid]);

    useEffect(() => {
        fetchMenu();
    }, [order]);

    const onLoad = () => {
        console.log("Componente OnDelivery montato");
        fetchLastOid();
        const id = setInterval(() => {
            console.log("Aggiornamento mappa");
            fetchOrder();

        }, 5000); //Aggiorna la mappa ogni 5 secondi
        setIntervalId(id);
    }; 

    const onUnload = () => {
        console.log("Componente OnDelivery smontato");
        clearInterval(intervalId);
    }; 

    return (
        <View style={globalStyles.screenContainer}>
            <StatusBar style="auto" />
            <Text style={globalStyles.textScreenTitle}>Ordine in consegna</Text>
            <View style={globalStyles.mapContainer}>
                <MapView
                    style={globalStyles.map}
                    initialRegion={{
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                        latitudeDelta: latD,
                        longitudeDelta: lonD,
                    }}
                >
                    <Marker coordinate={coordinate} title="Posizione attuale" description={`Orario presunto di arrivo: ${estimatedArrivalTime}`} />
                </MapView>
            </View>
            <View style={globalStyles.container}>
                <Text style={globalStyles.textPrimary}>Orario presunto di arrivo: {estimatedArrivalTime}</Text>
                {menu &&
                    <Text style={globalStyles.textPrimary}>{menu.name}</Text>
                }
                
            </View>
        </View>
    );
}