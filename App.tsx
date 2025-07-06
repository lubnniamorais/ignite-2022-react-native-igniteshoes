import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import {NotificationClickEvent, OneSignal} from 'react-native-onesignal';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

// Antes de exportarmos a função devemos inicializar o OneSignal passando o app id
OneSignal.initialize("5ca1c259-ed23-418e-a1fe-464cce22ea58");

// Antes de exportarmos a função devemos solicitar a permissao para receber notificacoes
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      console.log(event);
    }

    OneSignal.Notifications.addEventListener('click', handleNotificationClick);

    return () => OneSignal.Notifications.removeEventListener('click', handleNotificationClick);
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}