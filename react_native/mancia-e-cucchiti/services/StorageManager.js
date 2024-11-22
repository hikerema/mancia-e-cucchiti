import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite'; 

export default class StorageManager {
  constructor() {
    this.db = null; 
  }

  //Metodo asincorno di inizializzazione del database
  //N.B.: Il medodo è stato volutamente non implementato per permetterti di farti capire come funziona,
    //      all'interno del metodo trovarei i commenti di specifica, che andranno poi rimossi
  async initializeDB() {
    this.db = SQLite.openDatabase('appDatabase'); 
    
    // a questo punto è necessario creare delle const che contengano le query SQL per la creazione delle tabelle che necessitiamo
    // quali tabelle necessitiamo? - sicuramente dovremo salvare i dati del utente, che bene o male...
    // ...sono composti da dati anagrafici (solo quelli obbligatori, che richiede il progetto), dati di pagamento, dati di accesso (SID e UID)
    // a te la domanda: il sid e l'uid li salviamo del async storage o del db?
    // poi dovremo salvare i dati del applicazione quando va in pausa o in stop, quindi dovremo ragionare ...
    // ...su come organizzzare questi dati (se in tabelle separate o in un unica tabella), questo vorrei ragionarci insieme
    // Poi dovremo salvare le immaggini dei menù, il resto dei dati del menù penso che si può tranquillamente richiedere ogni volta al server...
    // ...per questo dovremo salavre l'mmagine, l'id del menu, e la versione dell'immagine.
    // per ora non mi viene in mente nulla di più, ma se ti viene in mente qualcosa che possiamo salvare, aggiungilo pure
    // le tabelle a cui avevo pensato sono: 
    // - UserProfile: per salvare i dati del utente
    // - Menus: per salvare le immagini dei menù
    // - Orders: per salvare gli ordini effettuati
    // - PaymentData: per salvare i dati di pagamento
    // - AppData: per salvare i dati dell'applicazione (da capire come fare)

    // ecco qui un esempio di come creare una tabella, i ... sono per indicare che ci sono altri campi da inserire, ma...
    // ...vorrei prima discuterne con te per capire come organizzarli e se effettivamente servono
    const createUserTable = `CREATE TABLE IF NOT EXISTS UserProfile (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      Surname TEXT NOT NULL,
      ...
    )`;

    //dopo di che evi eseguire la query per creare la tabella, e poi fare la stessa cosa per le altre tabelle

    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(createUserTable);
        //...
      }, reject, resolve);
    });
  }

  // QUI INVECE: iniziamo ad implementare i metodi per salvare e recuperare i dati dal db, anche qui non sono stati implementati per lo stesso motivo di prima
  // e potrebbbero esserci metodi da aggiungere.

  // Gestione SID
  async setSID(sid) {
    //capiamo prima dove salvare il sid, se nel db o nel async storage
  }

  async getSID() {
    //capiamo prima dove salvare il sid, se nel db o nel async storage
  }

  // Gestione UID
  async setUID(uid) {
    //capiamo prima dove salvare il uid, se nel db o nel async storage
  }

  async getUID() {
    //capiamo prima dove salvare il uid, se nel db o nel async storage
  }

  // Gestione profilo utente
  async setUserProfile(profile) {
    //esempio di query con i PLACEHOLDER, che verranno sostituiti con i valori passati come argomento
    const query = `INSERT INTO UserProfile (Name, Surname, SID) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(query, [profile.name, profile.surname, profile.sid],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  }

  async getUserProfile() {
    //esempio di query di selezione di tutti i record della tabella UserProfile
    const query = `SELECT * FROM UserProfile`;
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(query, [], (_, result) => resolve(result.rows._array), (_, error) => reject(error));
      });
    });
  }

  // Gestione dati di pagamento
  async setPaymentData(paymentData) {
    //capiamo prima dove salvare i dati di pagamento, se nel db o nel async storage
  }
  async getPaymentData() {
    //capiamo prima dove salvare i dati di pagamento, se nel db o nel async storage
  }

  // Gestione dati dell'applicazione
  async setAppData(appData) {
    //capiamo prima dove salvare i dati dell'applicazione, se nel db o nel async storage
  }
  async getAppData() {
    //capiamo prima dove salvare i dati dell'applicazione, se nel db o nel async storage
  }

  // Gestione immagini dei menù
  async setMenuImage(image) {
    //capiamo prima dove salv
  }
  async getMenuImage() {
    //capiamo prima dove salv
  }

  // Gestione ordini
  async setOrder(order) {
    //capiamo prima dove salv
  }
  async getOrders() {
    //capiamo prima dove salv
  }
}
