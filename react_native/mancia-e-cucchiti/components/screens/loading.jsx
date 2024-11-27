import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity} from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect } from 'react';

export default function Loading(props) {
    let intervalId;
    onLoad = () => {
        console.log("Componente loading montato");
    }
  
    onUnload = () => {
      console.log("Componente loading smontato");
      clearInterval(intervalId);
    }
    
    // const 
    useEffect(() => {
      onLoad()
      return onUnload;
    }, []);
  
    return (
        <View style={[globalStyles.screenContainer, globalStyles.backgroundOrange]}>
            <Text>LOADING</Text>
        </View>
    );
}