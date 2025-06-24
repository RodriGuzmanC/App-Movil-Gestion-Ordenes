import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AlertProvider } from '@/src/shared/components/AlertContext';
//import { PaperProvider } from 'react-native-paper';

import { CustomdDarkTheme, CustomLightTheme } from '@/src/shared/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import {
  Provider as PaperProvider
} from 'react-native-paper';

export default function RootLayout() {
  //const colorScheme = useColorScheme();
  const colorScheme = 'light'; // Force light theme for testing purposes
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const paperTheme = colorScheme === 'dark' ? CustomdDarkTheme : CustomLightTheme;
  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>

      <PaperProvider theme={paperTheme}>
        <AlertProvider>
          <StatusBar style="auto" />
          
          <Tabs>
            <Tabs.Screen
              name="(tabs)"
              options={{
                title: "Inicio",
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            <Tabs.Screen
              name="productos"
              options={{
                title: "Productos",
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="cog" color={color} size={26} />
                ),
              }}
            />
          </Tabs>
        </AlertProvider>
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 2,
  },

});
