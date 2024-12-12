import React, {useMemo, useState} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import globalStyles from '../styles/global.js'; //Stili

//Servizi
import { getMenuImage } from '../services/RequestsManager.js';

const MenuItem = ({ item, onPress }) => {
  const [image, setImage] = useState(null); //Stato per l'immagine del menù

  getMenuImage(item.mid, item.imageVersion).then((image) => {
    setImage(image);
  }); //Richiede l'immagine del menù tramite il RequestManager

  const formatPrice = useMemo(() => {
    if (item.price && item.price.toString().split('.').length === 2) {
      const [integerPart, decimalPart] = item.price.toString().split('.');
      if (decimalPart.length === 1) {
        return `${integerPart},${decimalPart}0`;
      }
    }
    return item.price.toString().replace('.', ',');
  }, [item.price]); //Formatta il prezzo del menù in modo corretto per la visualizzazione in euro es 5.0 -> 5,00

  item.price = formatPrice;

  return (
    <TouchableOpacity style={globalStyles.card} onPress={() => onPress(item)}>
      {image && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${image}` }}
          style={globalStyles.cardImage}
        />
      )}
      <View style={globalStyles.content}>
        <Text style={globalStyles.cardTitle}>{item.name}</Text>
        <Text style={globalStyles.cardText} numberOfLines={2}>
          {item.shortDescription}
        </Text>
        <View style={globalStyles.footer}>
          <Text style={globalStyles.price}>€{item.price}</Text>
          <Text style={globalStyles.deliveryTime}>Consegna: {item.deliveryTime} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;