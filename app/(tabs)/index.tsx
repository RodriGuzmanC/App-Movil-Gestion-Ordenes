import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';


export default function HomeScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Button mode='contained' icon={'plus'}>Boton rapido 1</Button>
      <Button mode='contained' icon={'plus'}>Boton rapido 2</Button>

      <Button mode='contained' icon={'plus'}>Boton rapido 3</Button>

      <Button mode='contained' icon={'plus'}>Boton rapido 4</Button>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: 2,
    gap: 12,
  },

});
