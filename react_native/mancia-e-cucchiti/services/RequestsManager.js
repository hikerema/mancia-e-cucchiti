import axios from 'axios';
import StorageManager from './StorageManager.js';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425";

const storageManager = new StorageManager();

storageManager.initializeDB();

export const getSID = async() => {
    try {
        console.log("Tento di ottenere il SID dal disco");
        let SID = await storageManager.getSID();
        return SID;
    }
    catch (error) {
        console.log("Il tentativo di ottenere il SID dal disco è fallito, provo a richiederlo al server");
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
            console.error("Errore insapettato, probabilmente è impossibile raggiungere il server: " + error);
            return null;
        }
    }
} //Cerca il SID tramite lo StorageManager, se non lo trova lo richiede al server, lo salva e lo restituisce

export const getMenus = async (lat, lng) => {
    try {
        const SID = await getSID();
        console.log("SID: " + SID);
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
        console.error("Errore durante  il recupero dei menù:", error);
        throw error;
    }
}

export const getMenuImage = async (menu) => {
    console.log("Richiesta immagine al disco per: " + menu.mid);
    try {
        const imageVersion = await storageManager.getImageVersion(menu.mid);
        if (imageVersion !== null) {
            if (imageVersion === menu.imageVersion) {
                const image = await storageManager.getMenuImage(menu.mid);
                if (image !== null) {
                    console.log("Immagine aggiornata per: " + menu.mid);
                    return image;
                } else {
                    console.log("Immagine non presente (errore di salvataggi pregresso) per: " + menu.mid);
                    return await getServerImage(menu);
                }
            } else {
                console.log("Versione immagine non aggiornata per: " + menu.mid);
                return await getServerImage(menu);
            }
        } else {
            console.log("Versione immagine non presente per: " + menu.mid);
            return await getServerImage(menu);
        }
    } catch (error) {
        console.error("Errore insapsettato durante il recupero dell'immagine dal disco: ", error);
        return await getServerImage(menu);
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
        console.error("Errore durante il recupero dei dettagli del menù:", error);
        throw error;
    }
}

const getServerImage = async (menu) => {
    console.log("Richiedo immagine al server per: " + menu.mid);
    try {
        const SID = await getSID();
        const response = await axios.get(`${BASE_URL}/menu/${menu.mid}/image`, {
            params: {
                mid: menu.mid,
                sid: SID
            },
            headers: {
                'Accept': 'application/json'
            }
        });
        await storageManager.setMenuImage(menu.mid, response.data.base64, menu.imageVersion);
        return response.data.base64;
    } catch (error) {
        console.error("Errore durante il recupero dell'immagine del menù dal server: ", error);
    }

}  //Dovrebbe essere completato

//Fino a qui funziona
//Tento di recuperare l'UID
export const getUID = async () => {
    try {
        console.log("Tento di ottenere l'UID dal disco");
        let UID = await storageManager.getUID();
        if (!UID) {
            console.log("L'UID non è presente nel disco, provo a ottenerlo tramite getSID");
            await getSID();
            UID = await storageManager.getUID();
        }
        return UID;
    } catch (error) {
        console.error("Errore durante il recupero dell'UID:", error);
        return null;
    }
}

//Cerco di memorizzare le info dell'user
export const updateUserInfo = async (name, surname, nameCard, numberCard, dateCard, cvv) => {
    month = dateCard.split("/")[0];
    year = dateCard.split("/")[1];
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
                'Authorization': Bearer `${SID}`
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

        if (response === 204) {
            console.log("Aggiornamento completato con successo:", data);
        } else {
            const errorData = await response.json();
            console.error("Errore durante l'aggiornamento:", errorData);
            throw new Error(errorData.message || "Errore durante l'aggiornamento.");
        }
    } catch (error) {
        console.error("Errore durante l'aggiornamento delle informazioni utente:", error);
        throw error;
    }
}

export const getDeliveredOrders = async () => {
    return await storageManager.getDeliveredOrders();
}

const getOrder = async (oid) => {
    try {
        const SID = await getSID();
        const response = await axios.get(`${BASE_URL}/order/${oid}`, {
            params: {
                oid: oid,
                sid: SID
            },
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Errore durante il recupero dell'ordine:", error);
        throw error;
    }
}

export const getLastDeliveredOrder = async () => {
    try {
        const deliveredOrders = await getDeliveredOrders();
        const lastDeliveredOrder = deliveredOrders[deliveredOrders.length-1];
        return lastDeliveredOrder; 
    } catch (error) {
        console.error("Errore durante il recupero dell'ultimo ordine:", error);
        throw error;
    }
}

export const getOnDeliveryOrders = async () => {
    var onDeliveryOrders = [];

    const onDeliveryOIDs = await storageManager.getOnDeliveryOrders();
    for (const oid of onDeliveryOIDs) {
        const order = await getOrder(oid);
        onDeliveryOrders.push(order);
    }
    return onDeliveryOrders;
}

export const isProfileCompleted = async () => {
    return await storageManager.isProfileCompleted();
}

export const buyMenuRequest = async (menu, lat, lng) => {
    try {
        const SID = await getSID();
        const response = await axios.post(`${BASE_URL}/menu/${menu.mid}/buy`, {
            sid: SID,
            deliveryLocation: {
                lat: lat,
                lng: lng
            }
        });
        if (response.ok) {
            await storageManager.setOrder(response.data);
        }
        return response.data;
    } catch (error) {
        console.error("Errore durante l'acquisto del menù:", error);
        throw error;
    }
}