import { Colors } from '@/constants/Colors';
import { AlertProvider } from '@/src/shared/components/AlertContext';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { merge } from 'lodash';
import { StyleSheet, useColorScheme } from 'react-native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import 'react-native-reanimated';


const CustomdDarkTheme = { ...MD3DarkTheme, colors: Colors.dark}
const CustomLightTheme = { ...MD3DarkTheme, colors: Colors.light}

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, CustomLightTheme);
const CombinedDarkTheme = merge(DarkTheme, CustomdDarkTheme);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const paperTheme = 
  colorScheme === 'dark' 
  ? CombinedDefaultTheme
  : CombinedDefaultTheme ;
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (


        <PaperProvider theme={paperTheme}>
          <ThemeProvider value={paperTheme}>
          <AlertProvider>
            <StatusBar style='auto' />
              <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }} />
            </Stack>

          </AlertProvider>
          </ThemeProvider>
        </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 2,
    paddingBottom: 24,
  },

});
