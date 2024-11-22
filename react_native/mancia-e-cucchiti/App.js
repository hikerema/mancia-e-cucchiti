import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StorageManager from './services/StorageManager.js';
import Menu from './screens/Menu.js';
import Profile from './screens/Profile.js';
import OrderState from './screens/OrderState.js';
import Orders from './screens/Orders.js';
import Details from './screens/Details.js';

import { useState } from 'react';


export default function App() {
  const [screen, setScreen] = useState('menu');

  const val = Math.floor(Math.random() * 5);
    if (val === 0) {
      setScreen('menu');
    }
    if (val === 1) {
      setScreen('profile');
    }
    if (val === 2) {
      setScreen('orderstate');
    }
    if (val === 3) {
      setScreen('orders');
    }
    if (val === 4) {
      setScreen('details');
    }
  if (screen === 'menu') {
    return (
      <Menu />
    ); 
  }
  if (screen === 'profile') {
    return (
      <Profile />
    ); 
  }
  if (screen === 'orderstate') {
    return (
      <OrderState />
    ); 
  }
  if (screen === 'orders') {
    return (
      <Orders />
    ); 
  }
  if (screen === 'details') {
    return (
      <Details />
    ); 
  }
  

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
