import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import globalStyles from '../styles/global.js'; //Stili

//Icone per la barra di navigazione
import menuIcon from '../assets/icons/menu.png';
import menuIconActive from '../assets/icons/menu_active.png';
import onDeliveryIcon from '../assets/icons/onDel.png';
import onDeliveryIconActive from '../assets/icons/onDel_active.png';
import profileIcon from '../assets/icons/profile.png';
import profileIconActive from '../assets/icons/profile_active.png';

const Navbar = ({ activeScreen, onNavigate }) => {
  return (
    <View style={globalStyles.navbar}>
      <TouchableOpacity style={globalStyles.navButton} onPress={() => onNavigate('menu')}>
        <Image source={activeScreen === 'menu' ? menuIconActive :  menuIcon} style={globalStyles.navIcon} />
        <Text style={activeScreen === 'menu' ? globalStyles.navTextActive :  globalStyles.navText}>Menù</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.navButton} onPress={() => onNavigate('onDelivery')}>
        <Image source={activeScreen === 'onDelivery' ? onDeliveryIconActive : onDeliveryIcon} style={globalStyles.navIcon} />
        <Text style={activeScreen === 'onDelivery' ? globalStyles.navTextActive :  globalStyles.navText}>Consegna</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.navButton} onPress={() => onNavigate('profile')}>
        <Image source={activeScreen === 'profile' ? profileIconActive : profileIcon} style={globalStyles.navIcon} />
        <Text style={activeScreen === 'profile' ? globalStyles.navTextActive :  globalStyles.navText}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;