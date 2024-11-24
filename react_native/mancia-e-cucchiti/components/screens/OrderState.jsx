import { StatusBar } from 'expo-status-bar';
import { View, Text, Button} from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect } from 'react';

export default function OrderState() {
    let intervalId;
    onLoad = () => {
        console.log("Componente montato");
        intervalId = setInterval(() => {
          console.log("E' passato un secondo!");
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
  
    return (
        <View style={globalStyles.container}>
            <StatusBar style="auto"/>
            <Text style={globalStyles.textScreenTitle}>THIS IS PAGE</Text>
            <Button
                title="Agne premimi"
                onPress={() => alert('brava!')}
            />
        </View>
    );
}