import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from "./src/Screens/Login";
import LobbyScreen from "./src/Screens/Lobby";
import UserDetailScreen from "./src/Screens/UserDetail";

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
     ...DefaultTheme.colors,
  "colors": {
    "primary": "rgb(0, 107, 90)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(122, 248, 219)",
    "onPrimaryContainer": "rgb(0, 32, 26)",
    "secondary": "rgb(0, 108, 73)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(139, 247, 196)",
    "onSecondaryContainer": "rgb(0, 33, 20)",
    "tertiary": "rgb(0, 107, 92)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(120, 248, 222)",
    "onTertiaryContainer": "rgb(0, 32, 27)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(250, 253, 250)",
    "onBackground": "rgb(25, 28, 27)",
    "surface": "rgb(250, 253, 250)",
    "onSurface": "rgb(25, 28, 27)",
    "surfaceVariant": "rgb(219, 229, 224)",
    "onSurfaceVariant": "rgb(63, 73, 70)",
    "outline": "rgb(111, 121, 117)",
    "outlineVariant": "rgb(191, 201, 196)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(46, 49, 48)",
    "inverseOnSurface": "rgb(239, 241, 239)",
    "inversePrimary": "rgb(90, 219, 191)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(238, 246, 242)",
      "level2": "rgb(230, 241, 237)",
      "level3": "rgb(223, 237, 232)",
      "level4": "rgb(220, 236, 231)",
      "level5": "rgb(215, 233, 228)"
    },
    "surfaceDisabled": "rgba(25, 28, 27, 0.12)",
    "onSurfaceDisabled": "rgba(25, 28, 27, 0.38)",
    "backdrop": "rgba(41, 50, 47, 0.4)"
  }
};

export type RootStackParamList = {
  Login: undefined;
  Lobby: {apiToken: string};
  UserDetails: {apiToken: string, userId: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Lobby" component={LobbyScreen} />
          <Stack.Screen name="UserDetails" component={UserDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
  }