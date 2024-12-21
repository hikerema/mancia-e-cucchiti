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
    const createOrdersTable = 'CREATE TABLE IF NOT EXISTS Orders (OrderID INTEGER PRIMARY KEY, MenuID INTEGER NOT NULL, OrderDate TEXT NOT NULL, OrderStatus BOOLEAN NOT NULL);';
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
      try {
        return result.Version;
      } catch (error) {
        return null;
      }
    } catch (error) {
      console.error("Errore durante il recupero della versione dell'immagine:", error);
    }
  }// Recupero della versione dell'immagine del menù dal database

  async setOrder(order) {
    /*try {
      const query = `INSERT INTO Orders (OrderID, MenuID, OrderDate, OrderStatus) VALUES (?, ?, ?, ?)`;
      const r = await this.db.runAsync(query, [order.oid, order.mid, order.creationTimestamp, false]);
      console.log("Ordine salvato correttamente");
    }
    catch (error) {
      console.error("Errore durante il salvataggio dell'ordine:", error);
    }*/
  }

  async setOrderStatus(OrderID, OrderStatus) {
    try {
      const query = `UPDATE Orders SET OrderStatus = ? WHERE OrderID = ?`;
      const r = await this.db.runAsync(query, [OrderStatus, OrderID]);
      console.log("Stato ordine aggiornato correttamente");
    } catch (error) {
      console.error("Errore durante l'aggiornamento dello stato dell'ordine:", error);
    }
  }
  async getDeliveredOrders() {
    try {
      const query = `SELECT * FROM Orders WHERE OrderStatus = 1 ORDER BY OrderDate DESC`;
      const result = await this.db.getAllAsync(query);
      console.log("Ordini recuperati correttamente");
      return result;
    } catch (error) {
      console.error("Errore durante il recupero degli ordini:", error);
    }
  }

  async getOnDeliveryOrders() {
    try {
      const query = `SELECT OrderID FROM Orders WHERE OrderStatus = 0 ORDER BY OrderDate DESC`;
      const result = await this.db.getAllAsync(query);
      console.log("Ordini recuperati correttamente");
      return result;
    } catch (error) {
      console.error("Errore durante il recupero degli ordini:", error);
    }
  }

  async setProfileCompleted() {
    try {
      await AsyncStorage.setItem('ProfileCompleted', 'true');
    } catch (error) {
      console.error("Errore durante il completamento del profilo:", error);
    }
  }

  async isProfileCompleted() {
    const isCompleted = await AsyncStorage.getItem('ProfileCompleted');
    if (isCompleted === null) {
      return false;
    }
    else if (isCompleted === 'true') {
      return true;
    }
    else {
      return false;
    }
  }
}