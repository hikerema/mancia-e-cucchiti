import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect, useState } from 'react';

import { updateUserInfo } from '../../services/RequestsManager.js';

export default function Profile() {
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);

    const [nameCard, setNameCard] = useState(null);
    const [numberCard, setNumberCard] = useState(null);
    const [dateCard, setDateCard] = useState(null);
    const [cvv, setCvv] = useState(null);

    const [numberCardValid, setnumberCardValid] = useState(true);
    const [dateCardValid, setdateCardValid] = useState(true);
    const [cvvValid, setCvvValid] = useState(true);

    const [edit, setEdit] = useState(true);
    const [editable, setEditable] = useState(false);

    const handleSaveProfile = async () => {
      try {
          if (!name) {
              Alert.alert("Errore", "Nome obbligatorio");
              return;
          }
          if (!surname) {
            Alert.alert("Errore", "Cognome obbligatorio");
            return;
          }
          if (!nameCard || !numberCard || !dateCard || !cvv) {
            Alert.alert("Errore", "Dati della carta incompleti");
            return;
          }

          const userInfo = {
              name,
              surname,
              paymentMethod: {
                  nameCard,
                  numberCard,
                  dateCard,
                  cvv,
              },
          };

          console.log("Invio dati aggiornati:", userInfo);

          Alert.alert("Successo", "Il profilo è stato aggiornato con successo!");
      } catch (error) {
          console.error("Errore durante l'aggiornamento del profilo:", error);
          Alert.alert("Errore", "Non è stato possibile aggiornare il profilo.");
      }
  };


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

    const [completed, setCompleted] = useState(true);

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
    
    const getUserInfoAsync = () => {
      try {
        setEditable(!editable);
      } catch (error) {
        console.error("Profile.jsx | Errore durante il recupero dei menù:", error);
        alert("Ci scusiamo, si è verificato un errore durante il recupero dei menù"); //Messaggio di errore da migliorare
      }
    }

    // const 
    useEffect(() => {
      onLoad()
      return onUnload;
    }, []);
  
    return (
      <View style={[globalStyles.screenContainer, globalStyles.backgroundLight]}>
        <StatusBar style="auto"></StatusBar>
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
              editable={!editable}
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
              editable={!editable}
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
                editable={!editable}
                onChangeText={text => setNameCard(text)}
                value={nameCard}
                placeholder="Nome e Cognome sulla carta"
              />
            </View>
            {/* Campo numero della carta */}
            <View style={[globalStyles.inputContainer, !numberCardValid && globalStyles.inputError]}>
            <TextInput
                style={globalStyles.input}
                editable={!editable}
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
                editable={!editable}
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
                editable={!editable}
                onBlur={handleCvvChange}
                value={cvv}
                placeholder="CVV"
              />
          </View>
          </View>
        </View>
        {edit &&
          <TouchableOpacity style={[globalStyles.buttonPrimary, globalStyles.buttonDetails]} onButtonPress={setEditable(true)}>
            <Text style={globalStyles.completeProfileButtonText}>Modifica</Text>
          </TouchableOpacity>
        }
        
      </ScrollView>
      </KeyboardAvoidingView>
      </View>
    );
}