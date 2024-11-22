import React from 'react';
import { View, Text} from 'react-native';
import { Button } from 'react-native';
import globalStyles from '../styles/global.js';

const Menu = () => {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.textScreenTitle}>THIS IS ORDERSTATEPAGE</Text>
            <Button
                title="Agne premimi"
                onPress={() => alert('brava!')}
            />
        </View>
    );
};

export default Menu;