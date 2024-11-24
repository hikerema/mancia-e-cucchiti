import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/global';

export default function BottomNavBar({ onPressHome, onPressMenu, onPressProfile }) {
  return (
    <View style={globalStyles.navBar}>
      <TouchableOpacity style={globalStyles.navButton} onPress={onPressHome}>
        <Text style={globalStyles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.navButton} onPress={onPressMenu}>
        <Text style={globalStyles.navText}>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.navButton} onPress={onPressProfile}>
        <Text style={globalStyles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}