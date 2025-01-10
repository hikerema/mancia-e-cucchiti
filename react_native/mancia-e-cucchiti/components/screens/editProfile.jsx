import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { useEffect, useState } from 'react';

import globalStyles from '../../styles/global.js'; //stili

import { updateUserInfo, getProfile } from '../../services/RequestsManager.js'; //servizi

import goBackIcon from '../../assets/icons/goBack.png'; //icone

export default function EditProfile(props) {
  //dati che verranno inseriti dall'utente e inviati al server
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nameCard, setNameCard] = useState(''); //nome e cognome sulla carta in campo singolo
  const [numberCard, setNumberCard] = useState('');
  const [dateCardY, setDateCardY] = useState(''); //anno di scadenza
  const [dateCardM, setDateCardM] = useState(''); //mese di scadenza
  const [cvv, setCvv] = useState(''); //codice di sicurezza

  //contorlli di validità dei campi
  const [numberCardValid, setnumberCardValid] = useState(true);
  const [dateCardYValid, setdateCardYValid] = useState(true);
  const [dateCardMValid, setdateCardMValid] = useState(true);
  const [cvvValid, setCvvValid] = useState(true);

  //stato per la gestione della modifica del profilo
  const [edit, setEdit] = useState(true);
  const [editable, setEditable] = useState(false);

  //stato per il recupero delle informazioni del profilo dal server
  const [profile, setProfile] = useState(null);

  // Verifica che il numero della carta sia lungo 16 caratteri
  const handleNumberCardChange = (text) => {
    setnumberCardValid(numberCard.length === 16 || numberCard == '');
  };

  // Verifica che l'anno di scadenza sia di 4 cifre
  const handleYearChange = () => {
    setdateCardYValid(dateCardY.length === 4 || dateCardY == '');
  };

  // Verifica che il mese di scadenza sia compreso tra 1 e 12
  const handleMonthChange = () => {
    const month = parseInt(dateCardM);
    setdateCardMValid((month >= 1 && month <= 12) || dateCardM == '');
  };

  // Verifica che il CVV sia di 3 cifre
  const handleCvvChange = () => {
    setCvvValid(cvv.length === 3 || cvv == '');
  };

  onLoad = () => {
    console.log("Componente montato");
    getProfileInfo();
  } //all'apertura del componente richiedo le informazioni del profilo

  onUnload = () => {
    console.log("Componente smontato");
  }

  useEffect(() => {
    onLoad()
    return onUnload;
  }, []);

  const getProfileInfo = async () => {
    try {
      setProfile(await getProfile());
    } catch (error) {
      console.error("editProfile.jsx | Errore durante il recupero delle informazioni del profilo:", error);
    }
    setName(profile.firstName);
  } //richiede le informazioni del profilo trami il RequestManager e imposto lo stato del nome

  const putUserInfoAsync = async () => {
    try {
      if (name === '' || surname === '' || nameCard === '' || numberCard === '' || dateCardM === '' || dateCardY === '' || cvv === '') {
        alert("Compila tutti i campi per continuare");
      } else {
        try {
          await updateUserInfo(name, surname, nameCard, numberCard, dateCardM, dateCardY, cvv);
        } catch (error) {
          console.error("editProfile.jsx | Errore durante l'aggiornamento del profilo:", error);
        }
        invertEdit();
      }
    } catch (error) {
      console.error("editProfile.jsx | | Errore durante il recupero dei menù:", error);
      alert("Ci scusiamo, si è verificato un errore durante il recupero dei menù"); //Messaggio di errore da migliorare
    }
  } //invia le informazioni del profilo al server tramite il RequestManager

  const invertEdit = () => {
    setEditable(!editable);
    setEdit(!edit);
  } //inverte lo stato di edit e editable

  useEffect(() => {
    if (!profile)
      getProfileInfo();
    else {
      setName(profile.firstName);
      setSurname(profile.lastName);
      setNameCard(profile.cardFullName);
      setNumberCard(profile.cardNumber);
      setDateCardM(profile.cardExpireMonth?.toString()); 
      setDateCardY(profile.cardExpireYear?.toString());
      setCvv(profile.cardCVV);
    }
  }, [profile]); //aggiorna i campi con le informazioni

  return (
    <View style={[globalStyles.screenContainer, globalStyles.backgroundLight]}>

      <StatusBar style="auto" />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => props.onButtonPressed()} style={[globalStyles.backButton, globalStyles.textScreenTitle]}>
          <Image source={goBackIcon} style={[globalStyles.backButtonIcon]} />
        </TouchableOpacity>
        {name &&
          <Text style={globalStyles.textNameTitle}>Ciao, {name}!</Text>
        }
        {!name &&
          <Text style={globalStyles.textNameTitle}>Ciao, User!</Text>
        }
      </View>


      
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
                  style={[globalStyles.input, { textAlign: 'left' }, !dateCardMValid && globalStyles.inputError]}
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
                  style={[globalStyles.input, { textAlign: 'left' }, , !dateCardYValid && globalStyles.inputError]}
                  onChangeText={text => setDateCardY(text)}
                  editable={editable}
                  onBlur={handleYearChange}
                  value={dateCardY}
                  placeholder="AAAA"
                />
              </View>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={globalStyles.label}>CVV</Text>
                <TextInput
                  style={[globalStyles.input, { textAlign: 'left' }, , !cvvValid && globalStyles.inputError]}
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
