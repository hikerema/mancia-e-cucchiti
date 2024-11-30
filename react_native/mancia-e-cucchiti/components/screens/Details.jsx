import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity, Image} from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect } from 'react';

import goBakcIcon from '../../assets/icons/goBack.png';

export default function Details({item, ...props}) {
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
  
    return (
      <View style={[globalStyles.screenContainer, globalStyles.backgroundLight]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => props.onButtonPressed()} style={[globalStyles.backButton, globalStyles.textScreenTitle]}>
            <Image source={goBakcIcon} style={[globalStyles.backButtonIcon]} />
          </TouchableOpacity>
          <Text style={[globalStyles.textScreenTitle]}>{item.name}</Text>
        </View>
        <View style={globalStyles.detailsContainer}>
          <Text style={globalStyles.detailText}>Description: {item.description}</Text>
          <Text style={globalStyles.detailText}>Price: ${item.price}</Text>
          <Text style={globalStyles.detailText}>Category: {item.category}</Text>
          <Button title="Add to Cart" onPress={() => props.onAddToCart(item)} />
        </View>
      </View>
    );
}