import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/global.js';
import { useEffect } from 'react';

export default function Details(props) {
    let intervalId;
    onLoad = () => {
        console.log("Componente Details montato");
        intervalId = setInterval(() => {
          console.log("E' passato un secondo!"); //questo in realtà non serve qui ma per aggiornare la posizione del drone
        }, 5000);
    }
  
    onUnload = () => {
      console.log("Componente Details smontato");
      clearInterval(intervalId);
    }
    
    // const 
    useEffect(() => {
      onLoad()
      return onUnload;
    }, []);
  
    /// ATTENZIONE: il pulsante non è un Button ma un TouchableOpacity, perchè Button non prevede la possibilità di modificare lo stile
    return (
        <View style={globalStyles.container}>
            <StatusBar style="auto"/>
            <Text style={globalStyles.textScreenTitle}>THIS IS DETAILS PAGE</Text>
            <TouchableOpacity 
                style={globalStyles.buttonPrimary}
                onPress={() => props.onButtonPressed()}
            >
                <Text style={globalStyles.buttonPrimaryText}>Agne premimi</Text>
            </TouchableOpacity>
        </View>
    );
}