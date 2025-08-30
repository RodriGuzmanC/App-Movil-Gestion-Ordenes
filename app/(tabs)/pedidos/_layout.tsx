import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';

export default function TabLayout() {
  const router = useRouter()

  const handleCrearOrden = () => {
    router.navigate(
      {
        pathname: '/pedidos/crear',
        params: { tipoPedido: 'entrada' }
      }
    )
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Pedidos',
          headerTitleAlign: 'center',

          headerRight: () =>
            <Button mode='contained' icon={'plus'} onPress={handleCrearOrden}>Crear</Button>
          }} />
      </Stack >
  
  );
}
