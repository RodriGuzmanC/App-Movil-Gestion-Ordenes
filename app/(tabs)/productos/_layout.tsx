import { Stack, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';

export default function TabLayout() {
 const router = useRouter()
  return (
    <>

      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Productos',
            headerRight: () =>
              <Button mode='contained' icon={'plus'} onPress={() => {
                router.navigate({
                  pathname: '/productos/create',
                })
              }}>Crear</Button>
          }} />
      </Stack>
    </>
  );
}