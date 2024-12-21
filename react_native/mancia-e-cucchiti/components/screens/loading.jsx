import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect } from 'react';

// Importa l'immagine locale
import loadingImage from '../../assets/logos/loading.png';

export default function Loading(props) {
    let intervalId;

    const onLoad = () => {
        console.log("Componente loading montato");
    }
  
    const onUnload = () => {
      console.log("Componente loading smontato");
      clearInterval(intervalId);
    }
    
    useEffect(() => {
      onLoad();
      return onUnload;
    }, []);
  
    return (
        <View style={[globalStyles.screenContainer, globalStyles.backgroundOrange]}>
            <StatusBar style="auto"/>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Image
                source={loadingImage}
                style={{ width: 200, height: 200}}
              />
              <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
            </View>
        </View>
    );
}