import { FlatList, StyleSheet, View } from 'react-native';
import { IconButton, Surface, Text, useTheme } from 'react-native-paper';

const acciones = [
  { id: '1', titulo: 'Nueva venta', icono: 'cart-plus' },
  { id: '2', titulo: 'Agregar cliente', icono: 'account-plus' },
  { id: '3', titulo: 'Registrar pago', icono: 'cash-plus' },
  { id: '4', titulo: 'Inventario', icono: 'clipboard-list' },
];

export default function HomeScreen() {
  const theme = useTheme();

  const renderItem = ({ item }: any) => (
    <Surface style={styles.card} elevation={3}>
      <IconButton
        icon={item.icono}
        size={32}
        iconColor={theme.colors.primary}
        onPress={() => console.log(`Acción: ${item.titulo}`)}
      />
      <Text variant="labelMedium" style={styles.cardText}>
        {item.titulo}
      </Text>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={acciones}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  cardText: {
    marginTop: 8,
    textAlign: 'center',
  },
});
