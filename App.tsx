import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { type NotificationClickEvent, OneSignal } from 'react-native-onesignal';
import { Loading } from './src/components/Loading';
import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { Routes } from './src/routes';
import { THEME } from './src/theme';

// Antes de exportarmos a função devemos inicializar o OneSignal passando o app id
OneSignal.initialize('5ca1c259-ed23-418e-a1fe-464cce22ea58');

// Antes de exportarmos a função devemos solicitar a permissao para receber notificacoes
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result;

      switch (actionId) {
        case '1':
          console.log('Ver todos');
          break;
        case '2':
          console.log('Ver pedido');
          break;
        default:
          console.log('Nenhum botão de ação selecionado.');
          break;
      }
    };

    OneSignal.Notifications.addEventListener('click', handleNotificationClick);

    return () =>
      OneSignal.Notifications.removeEventListener(
        'click',
        handleNotificationClick
      );
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
