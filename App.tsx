import { Groups } from '@screens/Groups';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';
import theme from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (fontsLoaded)
    return (
      <ThemeProvider theme={theme}>
        <Loading />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <Groups />
    </ThemeProvider>
  );
}
