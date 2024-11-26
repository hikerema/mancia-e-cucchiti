import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../styles/global.js';

const Navbar = ({ onNavigate }) => {
  return (
    <View style={globalStyles.navbar}>
      <TouchableOpacity onPress={() => onNavigate('menu')}>
        <Text style={globalStyles.navText}>🍕🍔</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate('orderds')}>
        <Text style={globalStyles.navText}>📋</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate('profile')}>
        <Text style={globalStyles.navText}>🫵🏻</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Navbar;