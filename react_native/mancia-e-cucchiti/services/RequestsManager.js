/***************************************************
** Ciao Agnese il codice che cherchi è a rigo 107 **
***************************************************/

import axios from 'axios';
import StorageManager from './StorageManager.js';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425";

const storageManager = new StorageManager();

storageManager.initializeDB();

export const getSID = async() => {
    try {
        let SID = await storageManager.getSID();
        return SID;
    }
    catch (error) {
        try {
            const response = await fetch(BASE_URL + "/User", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}),
            });
            if (response.ok) {
                const data = await response.json();
                let SID = data.sid;
                await storageManager.setSID(data.sid);
                await storageManager.setUID(data.uid);
                return SID;
            }
        } catch (error) {
            console.error("RM | Errore insapettato, probabilmente è impossibile raggiungere il server: " + error);
            return null;
        }
    }
} //Cerca il SID tramite lo StorageManager, se non lo trova lo richiede al server, lo salva e lo restituisce

export const getMenus = async (lat, lng) => {
    try {
        const SID = await getSID();
        const response = await axios.get(`${BASE_URL}/menu`, {
            params: {
                lat: lat,
                lng: lng,
                sid: SID
            },
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("RM | Errore durante  il recupero dei menù:", error);
        throw error;
    }
}

export const getMenuImage = async (mid, imageVersion) => {
    try {
        const storedImageVersion = await storageManager.getImageVersion(mid);
        if (storedImageVersion !== null) {
            if (storedImageVersion === imageVersion) {
                const image = await storageManager.getMenuImage(mid);
                if (image !== null) {
                    return image;
                } else {
                    return await getServerImage(mid, imageVersion);
                }
            } else {
                return await getServerImage(mid, imageVersion);
            }
        } else {
            return await getServerImage(mid, imageVersion);
        }
    } catch (error) {
        console.error("RM | Errore insapsettato durante il recupero dell'immagine dal disco: ", error);
        return await getServerImage(mid, imageVersion);
    }
}

export const getMenuDetails = async (menu) => {
    try {
        const SID = await getSID();
        const response = await axios.get(`${BASE_URL}/menu/${menu.mid}`, {
            params: {
                mid: menu.mid,
                lat: menu.location.lat,
                lng: menu.location.lng,
                sid: SID
            },
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("RM | Errore durante il recupero dei dettagli del menù:", error);
        throw error;
    }
}

/* SI QUESTO È IL CODICE CHE CERCAVI ⬇️*/
export const getMenuByMid = async (mid, lat, lng) => {
    try {
        const SID = await getSID();
        console.log('SID retrieved:', SID);
        console.log('Fetching menu with mid:', mid, 'lat:', lat, 'lng:', lng);
        const response = await fetch(`${BASE_URL}/menu/${mid}?lat=${lat}&lng=${lng}&sid=${SID}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        console.log('Response status:', response.status);
        if (response.ok) {
            const data = await response.json();
            console.log('Response data:', data);
            return data;
        } else {
            throw new Error("RM | Errore durante il recupero dei dettagli del menù");
        }
    } catch (error) {
        console.error("RM | Errore durante il recupero dei dettagli del menù:", error);
        throw error;
    }
}

const getServerImage = async (mid, imageVersion) => {
    try {
        const SID = await getSID();
        const response = await axios.get(`${BASE_URL}/menu/${mid}/image`, {
            params: {
                mid: mid,
                sid: SID
            },
            headers: {
                'Accept': 'application/json'
            }
        });
        await storageManager.setMenuImage(mid, response.data.base64, imageVersion);
        return response.data.base64;
    } catch (error) {
        console.error("RM | Errore durante il recupero dell'immagine del menù dal server: ", error);
    }

}  //Dovrebbe essere completato

export const getUID = async () => {
    try {
        let UID = await storageManager.getUID();
        if (!UID) {
            await getSID();
            UID = await storageManager.getUID();
        }
        return UID;
    } catch (error) {
        console.error("RM | Errore durante il recupero dell'UID:", error);
        return null;
    }
} //Cerca l'UID tramite lo StorageManager, se non lo trova chiama getSID e lo restituisce

export const updateUserInfo = async (name, surname, nameCard, numberCard, month, year, cvv) => {
    try {
        // Recupera SID e UID
        const SID = await getSID();
        const UID = await getUID();
        if (!SID || !UID) {
            throw new Error("Impossibile recuperare SID o UID");
        }

        // Esegui la richiesta PUT
        const response = await fetch(`${BASE_URL}/User/${UID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: name,
                lastName: surname,
                cardFullName: nameCard,
                cardNumber: numberCard,
                cardExpireMonth: month,
                cardExpireYear: year,
                cardCVV: cvv,
                sid: SID,
            }),
        });

        if (response.status === 204) {
            await storageManager.setProfileCompleted();
        } else {
            const errorData = await response.json();
            console.error("RM | Errore durante l'aggiornamento del profilo:", errorData);
            throw new Error(errorData.message || "Errore durante l'aggiornamento.");
        }
    } catch (error) {
        console.error("RM | Errore durante l'aggiornamento delle informazioni utente:", error);
        throw error;
    }
} //Aggiorna le informazioni dell'utente

export const getDeliveredOrders = async () => {
    return await storageManager.getDeliveredOrders();
} //Restituisce gli ordini consegnati

export const getOrder = async (oid) => {
    try {
        const SID = await getSID();
        const response = await fetch(`${BASE_URL}/order/${oid}?sid=${SID}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("throws by RM | Errore durante il recupero dell'ordine");
        }
    } catch (error) {
        console.error("RM | Errore durante il recupero dell'ordine:", error);
        throw error;
    }
} //Restituisce l'ordine con l'oid specificato

export const getProfile = async () => {
    try {
        const SID = await getSID();
        const UID = await getUID();
        const response = await axios.get(`${BASE_URL}/User/${UID}`, {
            params: {
                uid: UID,
                sid: SID
            },
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("RM | Errore durante il recupero dell'ultimo ordine:", error);
        throw error;
    }
} //Restituisce il profilo dell'utente

export const getOnDeliveryOrders = async () => {
    var onDeliveryOrders = [];

    const onDeliveryOIDs = await storageManager.getOnDeliveryOrders();
    for (const oid of onDeliveryOIDs) {
        const order = await getOrder(oid);
        onDeliveryOrders.push(order);
    }
    return onDeliveryOrders;
} //Restituisce gli ordini in consegna

export const isProfileCompleted = async () => {
    return await storageManager.isProfileCompleted();
} //Restituisce true se il profilo è completo, false altrimenti

export const buyMenuRequest = async (menu, lat, lng) => {
        const SID = await getSID();
        const response = await fetch(`${BASE_URL}/menu/${menu.mid.toString()}/buy`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            sid: SID,
            deliveryLocation: {
                lat: lat,
                lng: lng,
            }
            })
        });

        if (response.status === 200) {
            const data = await response.json();
        }
        return response;
} //Effettua la richiesta di acquisto di un menù