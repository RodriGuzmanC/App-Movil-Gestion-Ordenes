import { TipoAtributoCrearModal } from '@/src/modules/caracteristicas/views/TipoAtributos/TipoAtributosCrearModal';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';

export default function TabLayout() {
  const [openCrearModal, setOpenCrearModal] = useState(false)

  return (
    <>
      {openCrearModal && (
        <TipoAtributoCrearModal visible={openCrearModal} onClose={() => setOpenCrearModal(false)}></TipoAtributoCrearModal>
      )}
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Características',
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
