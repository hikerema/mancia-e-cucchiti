import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../../styles/global.js';

export default function Details(item) {

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.textScreenTitle}>{item.name}</Text>
      <Text>{item.shortDescription}</Text>
      <Text>{item.price} €</Text>
      <TouchableOpacity style={globalStyles.buttonPrimary} onPress={() => navigation.goBack()}>
        <Text style={globalStyles.buttonPrimaryText}>Torna indietro</Text>
      </TouchableOpacity>
    </View>
  );
}