import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import globalStyles from '../styles/global.js';
import homeIcon from '../assets/icons/home.png';
import ordersIcon from '../assets/icons/orders.png';
import profileIcon from '../assets/icons/profile.png';

const Navbar = ({ onNavigate }) => {
  return (
    <View style={globalStyles.navbar}>
      <TouchableOpacity style={globalStyles.navButton} onPress={() => onNavigate('menu')}>
        <Image source={homeIcon} style={globalStyles.navIcon} />
        <Text style={globalStyles.navText}>Menù</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.navButton} onPress={() => onNavigate('orders')}>
        <Image source={ordersIcon} style={globalStyles.navIcon} />
        <Text style={globalStyles.navText}>Ordini</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.navButton} onPress={() => onNavigate('profile')}>
        <Image source={profileIcon} style={globalStyles.navIcon} />
        <Text style={globalStyles.navText}>Profilo</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Navbar;