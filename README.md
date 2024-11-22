# Progetto di Mobile Computing - **Mangia e Cucchiti**

Repository privata del progetto d'esame di **Agnese Marabello** ([GitHub](https://github.com/agnesemarabello)) e **Emanuele Moro** ([GitHub](https://github.com/hikerema)).

## Scopo del Progetto
L'obiettivo di questo progetto è sviluppare un'applicazione Android in **Kotlin**, e una versione cross-platform utilizzando **React Native**.
**Mangia e Cucchiti** si distingue per la velocità di acquisto e consegna di pasti tramite droni. Il cliente può acquistare direttamente un menù predefinito senza scegliere piatti specifici.

## Tecnologie Utilizzate
- **Android** (Kotlin)
- **React Native** (per la versione cross-platform)

## Funzionalità del Sistema
### Client Mobile
1. **Registrazione implicita**:
   - Assegnazione di un SID (Session ID) al primo avvio.
   - Comunicazione persistente con il server tramite SID.

2. **Profilo Utente**:
   - Dati richiesti:
     - Nome e cognome.
     - Dati carta di credito (numero, scadenza, CVV).
   - Visualizzazione ultimo ordine effettuato.

3. **Lista Menù**:
   - Visualizza menù con nome, immagine, costo, descrizione breve, e tempo di consegna.

4. **Dettagli Menù**:
   - Schermata dedicata con descrizione dettagliata e possibilità di acquisto.
   - **Restrizioni**:
     - Profilo incompleto.
     - Ordini in corso non consegnati.

5. **Stato Consegna**:
   - Aggiornamento automatico ogni 5 secondi.
   - Mostra:
     - Stato ordine: "in consegna" o "consegnato".
     - Posizione drone su mappa.

6. **Salvataggio pagina**:
   - Memorizza e ripristina l'ultima pagina visualizzata al riavvio dell'app.

---

## Comunicazione con il Server
- Base URL API: [https://develop.ewlab.di.unimi.it/mc/2425/](https://develop.ewlab.di.unimi.it/mc/2425/)
- Documentazione API disponibile al link sopra.

---

## Specifiche Tecniche
- Implementazione client in una sola lingua (Italiano o Inglese).
- Immagini menù quadrate e gestite localmente per ottimizzazione.
- **Limitazioni**:
  - Ordine di un solo menù alla volta.
  - Validazione carta di credito lato client.

---

## Regole Importanti
- **Dati e contenuti inventati**:
  - Evitare dati personali, immagini inappropriate o protette da copyright.
- **Violazioni**:
  - Comporteranno sanzioni e segnalazioni accademiche.

---

## Testing
- Simulazioni disponibili per la creazione e modifica dei menù.
- Carte di credito valide: numeri che iniziano con *1*.

---

## Note Finali
- Eventuali aggiornamenti del progetto saranno comunicati agli studenti.
- Gli studenti devono adeguare i propri sviluppi alla versione più recente del documento.

