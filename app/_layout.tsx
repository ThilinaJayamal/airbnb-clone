import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import ModelHeaderText from '@/components/ModelHeaderText';
import Colors from '@/constants/Colors';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    }
    catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value);
    }
    catch (err) {
      return;
    }
  }
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  )
}

function RootLayoutNav() {

  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/signin');
    }
  }, [isLoaded])

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="(modals)/signin"
          options={{
            title: 'Login or Sign up',
            presentation: 'modal',
            headerTitleStyle: {
              fontFamily: 'mon-sb'
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={24} color={'black'} />
              </TouchableOpacity>
            )
          }} />
        <Stack.Screen name="listing/[id]" options={{ headerTitle: '',headerTransparent:true }} />

        <Stack.Screen name="(modals)/booking"
          options={{
            title: 'Booking',
            presentation: 'transparentModal',
            headerTransparent:true,
            headerTitleStyle: {
              fontFamily: 'mon-sb'
            },
            animation: 'fade',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} 
              style={{
                backgroundColor:'#fff',
                borderWidth:1,
                borderColor:Colors.gray,
                padding:4,
                borderRadius:20
              }}
              >
                <Ionicons name="close-outline" size={24} color={'black'} />
              </TouchableOpacity>
            ),
            headerTitle:()=><ModelHeaderText/>,
            headerBackVisible:false,
          }} />
      </Stack>

      <StatusBar barStyle={'light-content'}></StatusBar>
    </>
  );
}
