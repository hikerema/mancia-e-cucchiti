import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import globalStyles from '../styles/global.js';

const MenuItem = ({ item, BASE_URL, SID, onPress }) => {
  const [image, setImage] = useState(null);

  const getStoredImageVersion = useCallback(() => {
    // Implementa la logica per ottenere la versione dell'immagine memorizzata
    return -1;
  }, []);

  const getStoredImage = useCallback(() => {
    // Implementa la logica per ottenere l'immagine memorizzata
  }, []);

  const getNewImage = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/menu/${item.mid}/image`, {
        params: {
          mid: item.mid,
          sid: SID
        },
        headers: {
          'Accept': 'application/json'
        }
      });
      setImage(response.data.base64);
    } catch (error) {
      console.error(error);
      alert("Ci scusiamo, si è verificato un errore durante il recupero dell'immagine");
    }
  }, [BASE_URL, item.mid, SID]);

  useEffect(() => {
    if (getStoredImageVersion() === item.imageVersion) {
      getStoredImage();
    } else {
      getNewImage();
    }
  }, [item.imageVersion, getStoredImageVersion, getStoredImage, getNewImage]);

  const formatPrice = useMemo(() => {
    if (item.price && item.price.toString().split('.').length === 2) {
      const [integerPart, decimalPart] = item.price.toString().split('.');
      if (decimalPart.length === 1) {
        return `${integerPart},${decimalPart}0`;
      }
    }
    return item.price.toString().replace('.', ',');
  }, [item.price]);

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