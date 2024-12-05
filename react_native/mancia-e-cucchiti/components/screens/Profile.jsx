import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput} from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect, useState } from 'react';

export default function Profile() {
    const [name, setName] = useState(null);
    const [copleted, setCompleted] = useState(true);

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
      <View style={[globalStyles.screenContainer, globalStyles.backgroundLight]}>
        {name &&
          <Text style={globalStyles.textScreenTitle}>Ciao, {name}!</Text>
        }
        {!name &&
          <Text style={globalStyles.textScreenTitle}>Ciao, user!</Text>
        }
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.label}>Nome:</Text>
          <TextInput
            style={globalStyles.input}
            onChangeText={text => setName(text)}
            value={name}
            placeholder="Inserisci il tuo nome"
          />
        </View>
      </View>
    );
}