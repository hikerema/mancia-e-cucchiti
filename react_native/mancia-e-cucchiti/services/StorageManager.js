import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite'; 

class StorageManager {
  constructor() {
    this.db = null; 
  }

  //Metodo asincrono di inizializzazione del database
  //N.B.: Il medodo è stato volutamente non implementato per permetterti di farti capire come funziona,
    //      all'interno del metodo trovarai i commenti di specifica, che andranno poi rimossi
  async initializeDB() {
    this.db = SQLite.openDatabase('appDatabase'); 
    
    // a questo punto è necessario creare delle const che contengano le query SQL per la creazione delle tabelle di cui necessitiamo
    // di quali tabelle necessitiamo? - sicuramente dovremo salvare i dati del utente, che bene o male...
    // ...sono composti da dati anagrafici (solo quelli obbligatori, che richiede il progetto), dati di pagamento, dati di accesso (SID e UID)
    // a te la domanda: il sid e l'uid li salviamo del async storage o del db? Nel db(?)
    // poi dovremo salvare i dati del applicazione quando va in pausa o in stop, quindi dovremo ragionare ...
    // ...su come organizzare questi dati (se in tabelle separate o in un unica tabella), questo vorrei ragionarci insieme
    // Poi dovremo salvare le immagini dei menù, il resto dei dati del menù penso che si può tranquillamente richiedere ogni volta al server...
    // ...per questo dovremo salvare l'immagine, l'id del menu, e la versione dell'immagine.
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
      UID INTEGER PRIMARY KEY,
      Name TEXT NOT NULL,
      Surname TEXT NOT NULL,
    )`;

    const createPaymentData = `CREATE TABLE IF NOT EXISTS PaymentData (
      UID INTEGER PRIMARY KEY,
      Name TEXT NOT NULL,
      CardNumber TEXT NOT NULL,
      ExpirationDate TEXT NOT NULL,
      CVV TEXT NOT NULL,
    )`;

    const createMenusTable = `CREATE TABLE IF NOT EXISTS Menus (
      MenuID INTEGER NOT NULL,
      Image TEXT NOT NULL,
      Version TEXT NOT NULL,
    )`;

    const createOrdersTable = `CREATE TABLE IF NOT EXISTS Orders (
      OrderID INTEGER PRIMARY KEY,
      OrderDate TEXT NOT NULL,
      OrderStatus TEXT NOT NULL,
    )`;

    //dopo di che devi eseguire la query per creare la tabella, e poi fare la stessa cosa per le altre tabelle

    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(createUserTable);
        tx.executeSql(createPaymentData);
        tx.executeSql(createMenusTable);
        tx.executeSql(createOrdersTable);
      }, reject, resolve);
    });
  }

  // QUI INVECE: iniziamo ad implementare i metodi per salvare e recuperare i dati dal db, anche qui non sono stati implementati per lo stesso motivo di prima
  // e potrebbbero esserci metodi da aggiungere.

  // Gestione SID
  async setSID(sid) {
    await AsyncStorage.setItem('SID', sid);
  }

  async getSID() {
    return await AsyncStorage.getItem('SID');
  }

  // Gestione UID
  async setUID(uid) {
    uid = uid.toString();
    await AsyncStorage.setItem('UID', uid);
  }

  async getUID() {
    return await AsyncStorage.getItem('UID');
  }

  // Gestione profilo utente
  async setUserProfile(uid, name, surname) {
    //esempio di query con i PLACEHOLDER, che verranno sostituiti con i valori passati come argomento
    const query = `INSERT INTO UserProfile (UID, Name, Surname) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(query, [uid, name, surname],
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
  async setPaymentData(uid, name, cardNumber, expirationDate, cvv) {
    const query = `INSERT INTO PaymentData (UID, Name, CardNumber, ExpirationDate, CVV) VALUES (?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {paymentData
        tx.executeSql(query, [uid, name, cardNumber, expirationDate, cvv],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  }
  async getPaymentData() {
    const query = `SELECT * FROM PaymentData`;
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(query, [], (_, result) => resolve(result.rows._array), (_, error) => reject(error));
      });
    });
  }

  // Gestione dati dell'applicazione
  async setAppData(appData) {
    //capiamo prima dove salvare i dati dell'applicazione, se nel db o nel async storage
  }
  async getAppData() {
    //capiamo prima dove salvare i dati dell'applicazione, se nel db o nel async storage
  }

  // Gestione immagini dei menù
  async setMenuImage(menuID, image, version) {
    const query = `INSERT INTO Menus (MenuID, Image, Version) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(query, [menuID, image, version],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  }
  async getMenuImage(menuID) {
    const query = `SELECT image FROM Menus WHERE MenuID = ?`;
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(query, [menuID], (_, result) => resolve(result.rows._array), (_, error) => reject(error));
      });
    });
  }
  async getImageVersion(menuID) {
    const query = `SELECT version FROM Menus WHERE MenuID = ?`;
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(query, [menuID], (_, result) => resolve(result.rows._array), (_, error) => reject(error));
      });
    });
  }

  // Gestione ordini
  async setOrder(order) {
    //capiamo prima dove salv
  }
  async getOrders() {
    //capiamo prima dove salv
  }
}
export default new StorageManager();
