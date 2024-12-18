import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import globalStyles from '../../styles/global.js'; //Stili

export default function OnDelivery() {
    const [intervalId, setIntervalId] = useState(null); //Stato per l'intervallo di aggiornamento dei

    useEffect(() => {
        onLoad()
        return onUnload;
    }, []);

    const onLoad = () => {
        console.log("Componente Menù montato"); 
        const id = setInterval(() => {
        }, 5000); //Aggiorna i menù ogni 5sec
        setIntervalId(id);
    }; //Metodo caricato all''avvio che mi permette di aggiornare i menù frequentemente

    const onUnload = () => {
        console.log("Componente Menù smontato");
        clearInterval(intervalId);
    }; 

    return (
        <View style={globalStyles.container}>
            
        </View>
    );
}