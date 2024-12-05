import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

export default class StorageManager {
  constructor() {
    this.db = null; 
  }

  async initializeDB() {
    this.db = await SQLite.openDatabaseAsync('mecStorageAppTEST'); 

    //Query
    const createUserTable = 'CREATE TABLE IF NOT EXISTS UserProfile (UID INTEGER PRIMARY KEY, Name TEXT NOT NULL, Surname TEXT NOT NULL);';
    const createPaymentData = 'CREATE TABLE IF NOT EXISTS PaymentData ( UID INTEGER PRIMARY KEY, Name TEXT NOT NULL, CardNumber TEXT NOT NULL, ExpirationDate TEXT NOT NULL, CVV TEXT NOT NULL);';
    const createMenusTable = 'CREATE TABLE IF NOT EXISTS Menus ( MenuID INTEGER NOT NULL, Image TEXT NOT NULL, Version DEFAULT -1 );';
    const createOrdersTable = 'CREATE TABLE IF NOT EXISTS Orders (OrderID INTEGER PRIMARY KEY, OrderDate TEXT NOT NULL, OrderStatus TEXT NOT NULL);';

    //Creazione tabelle
    await this.db.execAsync(createUserTable);
    await this.db.execAsync(createPaymentData);
    await this.db.execAsync(createMenusTable);
    await this.db.execAsync(createOrdersTable);
  } //Creazione del database se non esiste, altimenti apertura del database

  // Gestione SID
  async setSID(sid) {
    await AsyncStorage.setItem('SID', sid);
  } // Salvataggio del SID nel disco tramite AsyncStorage

  async getSID() {
    const SID = await AsyncStorage.getItem('SID');
    if (SID === null) {
      throw new Error("SID non presente nel AsyncStorage");
    } else {
      console.log('SM | SID restituito correttamente:' + SID);
    }
    return SID;
  } // Recupero del SID dal disco tramite AsyncStorage

  // Gestione UID
  async setUID(uid) {
    uid = uid.toString();
    await AsyncStorage.setItem('UID', uid);
  } // Salvataggio dell'UID nel disco tramite AsyncStorage

  async getUID() {
    return await AsyncStorage.getItem('UID');
  } // Recupero dell'UID dal disco tramite AsyncStorage


  // Gestione profilo utente
  async setUserProfile(uid, name, surname) {
    //esempio di query con i PLACEHOLDER, che verranno sostituiti con i valori passati come argomento
    const query = `INSERT INTO UserProfile (UID, Name, Surname) VALUES (?, ?, ?)`;
    await this.db.runAsync(query, [uid, name, surname]);
  }

  async getUserProfile() {
    //esempio di query di selezione di tutti i record della tabella UserProfile
    const query = `SELECT * FROM UserProfile`;
    const result = await this.db.allAsync(query);
    return result;
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
    try {
      const query = `INSERT INTO Menus (MenuID, Image, Version) VALUES (?, ?, ?)`;
      const r = await this.db.runAsync(query, [menuID, image, version]);
      console.log("Immagine salvata correttamente");
    } catch (error) {
      console.error("Errore durante il salvataggio dell'immagine:", error);
    }
  } // Salvataggio dell'immagine del menù nel database

  async getMenuImage(menuID) {
    try {
      const query = `SELECT Image FROM Menus WHERE MenuID = ?`;
      const result = await this.db.getFirstAsync(query, [menuID]);
      console.log("Immagine recuperata correttamente");
      return result.Image;
    } catch (error) {
      console.error("Errore durante il recupero dell'immagine:", error);
    }
  }// Recupero dell'immagine del menù dal database

  async getImageVersion(menuID) {
    try {
      const query = `SELECT Version FROM Menus WHERE MenuID = ?`;
      const result = await this.db.getFirstAsync(query, [menuID]);
      console.log("Versione immagine recuperata correttamente");
      if (result === null)
        return null;
      return result.Version;
    } catch (error) {
      console.error("Errore durante il recupero della versione dell'immagine:", error);
    }
  }// Recupero della versione dell'immagine del menù dal database

  // Gestione ordini
  async setOrder(order) {
    //capiamo prima dove salv
  }
  async getOrders() {
    //capiamo prima dove salv
  }
}