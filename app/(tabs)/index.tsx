import { ProductoListar } from '@/src/modules/productos/views/ProductoListar';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
    const router = useRouter()
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la App</Text>
      <Text style={styles.subtitle}>Esta es la pantalla de inicio.</Text>
      <Button title='Crear' onPress={() => {
        router.navigate({
          pathname: '/productos/create',
        })
      }}></Button>
      <ProductoListar></ProductoListar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
});
