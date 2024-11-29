import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import globalStyles from '../styles/global.js';

const MenuItem = ({ item, BASE_URL, SID }) => {

  const handlePress = () => {
    console.log("Premuto");
  };

  return (
    <TouchableOpacity style={globalStyles.card} onPress={handlePress}>
      {item.imageBase64 && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
          style={{ width: 100, height: 100 }}
        />
      )}
      <View style={globalStyles.content}>
        <Text style={globalStyles.cardTitle}>{item.name}</Text>
        <Text style={globalStyles.cardText}>{item.shortDescription}</Text>
        <Text style={globalStyles.cardText}>{item.price} €</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;