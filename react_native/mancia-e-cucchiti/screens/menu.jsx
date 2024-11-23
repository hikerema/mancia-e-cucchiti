import { StatusBar } from 'expo-status-bar';
import { View, Text, Button} from 'react-native';
import globalStyles from '../styles/global.js';
import { useEffect } from 'react';

export default function Menu(props) {
    let intervalId;
    onLoad = () => {
        console.log("Componente Menù montato");
        intervalId = setInterval(() => {
          console.log("E' passato un secondo!");
        }, 5000);
    }
  
    onUnload = () => {
      console.log("Componente Menù smontato");
      clearInterval(intervalId);
    }
    
    // const 
    useEffect(() => {
      onLoad()
      return onUnload;
    }, []);
  
    return (
        <View style={globalStyles.container}>
            <StatusBar style="auto"/>
            <Text style={globalStyles.textScreenTitle}>THIS IS HOMEPAGE</Text>
            <Button
                title="Agne premimi"
                onPress={() => props.onButtonPressed()}
            />
        </View>
    );
}