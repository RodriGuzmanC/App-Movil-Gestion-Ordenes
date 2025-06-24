import { ProductoListar } from '@/src/modules/productos/views/ProductoListar';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export default function ProductIndex() {
  return (
    <View>
      <Button mode='contained' icon={'plus'} onPress={() => {
        router.navigate({
          pathname: '/productos/create',
        })
      }}>Crear</Button>
        <ProductoListar></ProductoListar>
    </View>
  );
}
