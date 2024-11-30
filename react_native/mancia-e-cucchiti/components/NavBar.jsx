import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import globalStyles from '../styles/global.js';
import menuIcon from '../assets/icons/menu.png';
import menuIconActive from '../assets/icons/menu_active.png';
import ordersIcon from '../assets/icons/orders.png';
import ordersIconActive from '../assets/icons/orders_active.png';
import profileIcon from '../assets/icons/profile.png';
import profileIconActive from '../assets/icons/profile_active.png';

const Navbar = ({ activeScreen, onNavigate }) => {
  return (
    <View style={globalStyles.navbar}>
      <TouchableOpacity style={globalStyles.navButton} onPress={() => onNavigate('menu')}>
        <Image source={activeScreen === 'menu' ? menuIconActive :  menuIcon} style={globalStyles.navIcon} />
        <Text style={activeScreen === 'menu' ? globalStyles.navTextActive :  globalStyles.navText}>Menù</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.navButton} onPress={() => onNavigate('orders')}>
        <Image source={activeScreen === 'orders' ? ordersIconActive : ordersIcon} style={globalStyles.navIcon} />
        <Text style={activeScreen === 'orders' ? globalStyles.navTextActive :  globalStyles.navText}>Ordini</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.navButton} onPress={() => onNavigate('profile')}>
        <Image source={activeScreen === 'profile' ? profileIconActive : profileIcon} style={globalStyles.navIcon} />
        <Text style={activeScreen === 'profile' ? globalStyles.navTextActive :  globalStyles.navText}>Profilo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;