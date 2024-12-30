import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import globalStyles from '../../styles/global.js';
import { useEffect, useState } from 'react';

import { updateUserInfo, getProfile } from '../../services/RequestsManager.js';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';

export default function EditProfile() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [nameCard, setNameCard] = useState('');
  const [numberCard, setNumberCard] = useState('');
  const [dateCardY, setDateCardY] = useState('');
  const [dateCardM, setDateCardM] = useState('');

  const [cvv, setCvv] = useState('');

  const [numberCardValid, setnumberCardValid] = useState(true);
  const [dateCardYValid, setdateCardYValid] = useState(true);
  const [dateCardMValid, setdateCardMValid] = useState(true);
  const [cvvValid, setCvvValid] = useState(true);

  const [edit, setEdit] = useState(true);
  const [editable, setEditable] = useState(false);

  const [profile, setProfile] = useState(null);

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
      if (!nameCard || !numberCard || !dateCardM || !dateCardY || !cvv) {
        Alert.alert("Errore", "Dati della carta incompleti");
        return;
      }

      const userInfo = {
        name,
        surname,
        paymentMethod: {
          nameCard,
          numberCard,
          dateCardM,
          dateCardY,
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
  const handleYearChange = () => {
    setdateCardYValid(dateCardY.length === 4 || dateCardY == '');
  };

  const handleMonthChange = () => {
    setdateCardMValid((dateCardM.length === 2 && dateCardM >= 1 && dateCardM <= 12) || dateCardM == '');
  };

  // Verifica che il CVV sia di 3 cifre
  const handleCvvChange = () => {
    setCvvValid(cvv.length === 3 || cvv == '');
  };

  let intervalId;
  onLoad = () => {
    console.log("Componente montato");
    getProfileInfo();
  }

  onUnload = () => {
    console.log("Componente smontato");
    clearInterval(intervalId);
  }

  const getProfileInfo = async () => {
    try {
      setProfile(await getProfile());
    } catch (error) {
      console.error("Errore durante il recupero delle informazioni del profilo:", error);
    }
    setName(profile.firstName);
    
  }

  const putUserInfoAsync = async () => {
    try {
      if (name === '' || surname === '' || nameCard === '' || numberCard === '' || dateCardM === '' || dateCardY === '' || cvv === '') {
        alert("Compila tutti i campi per continuare");
      } else {
        try {
          await updateUserInfo(name, surname, nameCard, numberCard, dateCardM, dateCardY, cvv);
        } catch (error) {
          console.log("Errore durante l'aggiornamento del profilo:", error);
        }
        invertEdit();
      }
    } catch (error) {
      console.error("Profile.jsx | Errore durante il recupero dei menù:", error);
      alert("Ci scusiamo, si è verificato un errore durante il recupero dei menù"); //Messaggio di errore da migliorare
    }
  }

  const invertEdit = () => {
    setEditable(!editable);
    setEdit(!edit);
  }

  useEffect(() => {
    onLoad()
    return onUnload;
  }, []);

  useEffect(() => {
    console.log("Name:", name);
    if (!profile)
      getProfileInfo();
    else {
      setName(profile.firstName);
      setSurname(profile.lastName);
      setNameCard(profile.cardFullName);
      setNumberCard(profile.cardNumber);
      setDateCardM(profile.cardExpireMonth);
      setDateCardY(profile.cardExpireYear);
      setCvv(profile.cardCVV);
    }
  }, [profile]);

  return (
    <View style={[globalStyles.screenContainer, globalStyles.backgroundLight]}>
      <StatusBar style="auto"></StatusBar>
      {name &&
        <Text style={globalStyles.textNameTitle}>Ciao, {name}!</Text>
      }
      {!name &&
        <Text style={globalStyles.textNameTitle}>Ciao, User!</Text>
      }
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Campo per il nome */}
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Nome</Text>
            <TextInput
              editable={editable}
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
              editable={editable}
              onChangeText={text => setSurname(text)}
              value={surname}
              placeholder="Inserisci il tuo cognome"
            />
          </View>
          {/* Campi per il metodo di pagamento */}
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Metodo di pagamento</Text>
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Nome sulla carta</Text>
              <TextInput
                style={globalStyles.input}
                editable={editable}
                onChangeText={text => setNameCard(text)}
                value={nameCard}
                placeholder="Nome e Cognome sulla carta"
              />
            </View>
            {/* Campo numero della carta */}
            <View style={[globalStyles.inputContainer, !numberCardValid && globalStyles.inputError]}>
              <Text style={globalStyles.label}>Numero di carta</Text>
              <TextInput
                style={globalStyles.input}
                editable={editable}
                onChangeText={text => setNumberCard(text)}
                onBlur={handleNumberCardChange}
                value={numberCard}
                placeholder="Numero della carta"
              />
            </View>
            {/* Campo data di scadenza */}
            <View style={[globalStyles.inputContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={globalStyles.label}>Mese</Text>
                <TextInput
                  style={[globalStyles.input, { textAlign: 'center' }, !dateCardMValid && globalStyles.inputError]}
                  editable={editable}
                  onChangeText={text => setDateCardM(text)}
                  onBlur={handleMonthChange}
                  value={dateCardM}
                  placeholder="MM"
                />
              </View>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={globalStyles.label}>Anno</Text>
                <TextInput
                  style={[globalStyles.input, { textAlign: 'center' }, , !dateCardYValid && globalStyles.inputError]}
                  onChangeText={text => setDateCardY(text)}
                  editable={editable}
                  onBlur={handleYearChange }
                  value={dateCardY}
                  placeholder="AAAA"
                />
              </View>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={globalStyles.label}>CVV</Text>
                <TextInput
                  style={[globalStyles.input, { textAlign: 'center' }, , !cvvValid && globalStyles.inputError]}
                  onChangeText={text => setCvv(text)}
                  editable={editable}
                  onBlur={handleCvvChange}
                  value={cvv}
                  placeholder="CVV"
                />
              </View>
            </View>
          </View>
          {edit &&
            <TouchableOpacity style={[globalStyles.buttonPrimary, globalStyles.buttonDetails]} onPress={invertEdit}>
              <Text style={globalStyles.completeProfileButtonText}>Modifica</Text>
            </TouchableOpacity>
          }
          {!edit &&
            <TouchableOpacity style={[globalStyles.buttonPrimary, globalStyles.buttonDetails]} onPress={putUserInfoAsync}>
              <Text style={globalStyles.completeProfileButtonText}>Salva</Text>
            </TouchableOpacity>
          }
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
