import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Icon, Text } from 'react-native-paper';

// Componente de Carga
export const LoadingComponent = ({ message }: { message?: string }) => (
  <View style={styles.center}>
    <ActivityIndicator animating={true} size="large" />
    <Text style={styles.text}>{message || 'Cargando información...'}</Text>
  </View>
);

// Componente de Sin Items
export const NoItemsComponent = ({ message }: { message?: string }) => (
  <View style={styles.center}>
    <Icon source="inbox" size={48} color="#aaa" />
    <Text style={styles.text}>{message || 'No hay elementos disponibles.'}</Text>
  </View>
);

// Componente de Error
export const ErrorItemsComponent = ({ message }: { message?: string }) => (
  <View style={styles.center}>
    <Icon source="alert-circle-outline" size={48} color="#e53935" />
    <Text style={styles.text}>{message || 'Ocurrió un error al cargar los datos.'}</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});
