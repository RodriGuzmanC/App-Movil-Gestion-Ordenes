import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';

export default function TabLayout() {
  const router = useRouter()

  const handleCrearOrden = () => {
    router.navigate(
      {
        pathname: '/ventas/crear',
        params: { tipoPedido: 'salida' }
      }
    )
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Ventas',
          headerTitleAlign: 'center',

          headerRight: () =>
            <Button mode='contained' icon={'plus'} onPress={handleCrearOrden}>Crear</Button>
          }} />
      </Stack >
  
  );
}
