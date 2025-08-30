import { ClienteCrearModal } from '@/src/modules/clientes/views/ClienteCrearForm';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';

export default function TabLayout() {
  const [modalCreateVisible, setModalCreateVisible] = useState(false)

  return (
    <>
      <ClienteCrearModal onClose={() => setModalCreateVisible(false)} visible={modalCreateVisible}></ClienteCrearModal>

      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: 'Clientes',
            headerRight: () =>
              <Button
                mode='contained'
                icon="account-plus"
                onPress={() => setModalCreateVisible(true)}
              >
                Crear cliente
              </Button>

          }}
        />
      </Stack>
    </>
  );
}
