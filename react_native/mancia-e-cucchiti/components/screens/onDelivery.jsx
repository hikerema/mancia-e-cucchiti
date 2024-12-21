import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import { getProfile, getOrder, getMenuByMid } from '../../services/RequestsManager.js';

import globalStyles from '../../styles/global.js'; //Stili


import goBackIcon from '../../assets/icons/goBack.png';

import MapView, { Marker } from 'react-native-maps';


export default function OnDelivery({ ...props }) {
    const [intervalId, setIntervalId] = useState(null); //Stato per l'intervallo di aggiornamento dei

    const estimatedArrivalTime = "15:30"; // Orario presunto di arrivo
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
            console.error("OnDelivery.jsx | Errore durante il recupero dell' LastOid:", error);
            alert("OnDelivery.jsx | Errore durante il recupero dell' LastOid:"); //Messaggio di errore da migliorare
        }
    }

    const fetchOrder = async () => {
        if (lastOid) {
            try {
                const r = await getOrder(lastOid.toString());
                setOrder(r);
            } catch (error) {
                console.error("OnDelivery.jsx | Errore durante il recupero dell'ultimo ordine:", error);
                alert("Ci scusiamo, si è verificato un errore durante il recupero dell'ultimo ordine"); //Messaggio di errore da migliorare
            }
        } else {
            fetchLastOid();
        }
    }

    const fetchMenu = async () => {
        if (order) {
            console.log(typeof order.mid);
            const menu = await getMenuByMid(order.mid, order.deliveryLocation.lat, order.deliveryLocation.lng);
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
            if (order) {
                setCurrentLocation(order.currentPosition);
                console.log("Posizione attuale: ", order.currentPosition);
            } else {
                console.log("Nessuna posizione attuale");
            }
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => props.onButtonPressed()} style={[globalStyles.backButton, globalStyles.textScreenTitle]}>
                    <Image source={goBackIcon} style={[globalStyles.backButtonIcon]} />
                </TouchableOpacity>
                <Text style={globalStyles.textScreenTitle}>Ordine in consegna</Text>
            </View>
            {currentLocation &&
            <View style={globalStyles.mapContainer}>
                <MapView
                    style={globalStyles.map}
                    initialRegion={{
                        latitude: currentLocation.lat,
                        longitude: currentLocation.lng,
                        latitudeDelta: latD,
                        longitudeDelta: lonD,
                    }}
                >
                    <Marker coordinate={{latitude: currentLocation.lat, longitude: currentLocation.lng}} title="Posizione attuale" description={`Orario presunto di arrivo: ${estimatedArrivalTime}`} />
                </MapView>
            </View>
            }
            {menu &&
                <View style={globalStyles.container}>
                    <Text style={globalStyles.textScreenSubtitle}>Riepilogo del ordine:</Text>
                    <Text style={globalStyles.textOrderDetailsTitle}>Orario presunto di arrivo:</Text>
                    <Text style={globalStyles.textOrderDetails}>19:00</Text>
                    <Text style={globalStyles.textOrderDetailsTitle}>{menu.name}</Text>
                    <Text style={globalStyles.textOrderDetails}>{menu.shortDescription}</Text>
                </View>
            }
            {!menu &&
                <View style={globalStyles.container}>
                    <Text>Non funziona nulla, bocciaci prof</Text>
                </View>
            }
        </View>
    );
}