import { ProductoDetalle } from '@/src/modules/productos/views/ProductoDetalle';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function VerDetalle() {
  const { id } = useLocalSearchParams(); 
  const parsedId = Array.isArray(id) ? id[0] : id;

  return (
    <View style={{ flex: 1 }}>
      <ProductoDetalle id={parsedId}></ProductoDetalle>
    </View>
  )
}
