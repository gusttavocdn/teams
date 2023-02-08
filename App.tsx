import { StatusBar } from 'react-native';
import { Groups } from '@screens/Groups';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';
import theme from './src/theme';

import { NewGroup } from '@screens/NewGroup';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded)
    return (
      <ThemeProvider theme={theme}>
        <Loading />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <NewGroup />
    </ThemeProvider>
  );
}
