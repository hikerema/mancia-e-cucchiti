import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

export default class StorageManager {
  constructor() {
    this.db = null; 
  }

  async initializeDB() {
    this.db = await SQLite.openDatabaseAsync('mecStorageApp1.0'); 

    //Query
    const createMenusTable = 'CREATE TABLE IF NOT EXISTS Menus ( MenuID INTEGER NOT NULL, Image TEXT NOT NULL, Version DEFAULT -1 );';
    //Creazione tabelle
    await this.db.execAsync(createMenusTable);
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

  // Gestione immagini dei menù
  async setMenuImage(menuID, image, version) {
    try {
      const query = `INSERT INTO Menus (MenuID, Image, Version) VALUES (?, ?, ?)`;
      const r = await this.db.runAsync(query, [menuID, image, version]);
    } catch (error) {
      console.error("SM | Errore durante il salvataggio dell'immagine:", error);
    }
  } // Salvataggio dell'immagine del menù nel database

  async getMenuImage(menuID) {
    try {
      const query = `SELECT Image FROM Menus WHERE MenuID = ?`;
      const result = await this.db.getFirstAsync(query, [menuID]);
      return result.Image;
    } catch (error) {
      console.error("SM | Errore durante il recupero dell'immagine:", error);
    }
  }// Recupero dell'immagine del menù dal database

  async getImageVersion(menuID) {
    try {
      const query = `SELECT Version FROM Menus WHERE MenuID = ?`;
      const result = await this.db.getFirstAsync(query, [menuID]);
      try {
        return result.Version;
      } catch (error) {
        return null;
      }
    } catch (error) {
      console.error("SM | Errore durante il recupero della versione dell'immagine:", error);
    }
  }// Recupero della versione dell'immagine del menù dal database

  async setProfileCompleted() {
    try {
      await AsyncStorage.setItem('ProfileCompleted', 'true');
    } catch (error) {
      console.error("SM | Errore durante il completamento del profilo:", error);
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