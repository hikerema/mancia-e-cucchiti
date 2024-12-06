import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect, useState } from 'react';

export default function Profile() {
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);

    const [nameCard, setNameCard] = useState('');
    const [numberCard, setNumberCard] = useState('');
    const [dateCard, setDateCard] = useState('');
    const [cvv, setCvv] = useState('');

    const [numberCardValid, setnumberCardValid] = useState(true);
    const [dateCardValid, setdateCardValid] = useState(true);
    const [cvvValid, setCvvValid] = useState(true);

    // Verifica che il numero della carta sia lungo 16 caratteri
    const handleNumberCardChange = (text) => {
      setnumberCardValid(numberCard.length === 16 || numberCard == '');
    };
    // Verifica che la data di scadenza sia nel formato MM/AA (4 cifre)
    const handleDateCardChange = (text) => {
      setdateCardValid(/^\d{2}\/\d{2}$/.test(dateCard) || dateCard == '');
    };
    // Verifica che il CVV sia di 3 cifre
    const handleCvvChange = (text) => {
      setCvvValid(cvv.length === 3 || cvv == '');
    };

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
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1}}>
          {/* Campo per il nome */}
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Nome</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={text => setName(text)}
              value={name}
              placeholder="Inserisci il tuo nome"
            />
          </View>
          {/* Campo per il cognome */}
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Cognome</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={text => setSurname(text)}
              value={surname}
              placeholder="Inserisci il tuo cognome"
            />
          </View>
          {/* Campi per il metodo di pagamento */}
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Metodo di pagamento</Text>
            <View style={globalStyles.inputContainer}>
              <TextInput
                style={globalStyles.input}
                onChangeText={text => setNameCard(text)}
                value={nameCard}
                placeholder="Nome e Cognome sulla carta"
              />
            </View>
            {/* Campo numero della carta */}
            <View style={[globalStyles.inputContainer, !numberCardValid && globalStyles.inputError]}>
            <TextInput
               style={globalStyles.input}
                onChangeText={text => setNumberCard(text)}
                onBlur={handleNumberCardChange}
                value={numberCard}
                placeholder="Numero della carta"
              />
            </View>
            {/* Campo data di scadenza*/}
            <View style={[globalStyles.inputContainer,{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <TextInput
                style={[globalStyles.input, { textAlign: 'center' }, !dateCardValid && globalStyles.inputError]}
                onChangeText={text => setDateCard(text)}
                onBlur={handleDateCardChange}
                value={dateCard}
                placeholder="Data di scadenza"
              />
          </View>
          <View style={{ flex: 1, marginRight: 10 }}>
              <TextInput
                style={[globalStyles.input, { textAlign: 'center' }, , !cvvValid && globalStyles.inputError]}
                onChangeText={text => setCvv(text)}
                onBlur={handleCvvChange}
                value={cvv}
                placeholder="CVV"
              />
          </View>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      </View>
    );
}