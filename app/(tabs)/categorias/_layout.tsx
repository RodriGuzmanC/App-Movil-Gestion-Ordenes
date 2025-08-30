import { CategoriaCrearModal } from '@/src/modules/categorias/views/CategoriaCrearModal';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';

export default function TabLayout() {
  const [openCrearModal, setOpenCrearModal] = useState(false)

  return (
    <>
      {openCrearModal && (
        <CategoriaCrearModal visible={openCrearModal} onClose={() => setOpenCrearModal(false)}></CategoriaCrearModal>
      )}
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Categorías',
            headerRight: () => 
              <Button
                mode="contained"
                icon="plus"
                onPress={() => setOpenCrearModal(true)}
              >
                Crear
              </Button>
          }} />
      </Stack>
    </>
  );
}
