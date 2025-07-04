import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { NotificationWillDisplayEvent, OneSignal,OSNotification } from 'react-native-onesignal';

import { AppRoutes } from './app.routes';
import { Notification } from '../components/Notification';

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const handleNotification = (event: NotificationWillDisplayEvent): void => {
      // Previne do comportamento padrão
      event.preventDefault();

      // Pegando os detalhes da notificação
      const response = event.getNotification()
    }

    // Adicionando a função de notificação
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', handleNotification);

    // Removendo a função quando o componente é desmontado
    return () => OneSignal.Notifications.removeEventListener('foregroundWillDisplay', handleNotification)
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {notification?.title && (
        <Notification data={notification} onClose={() => setNotification(undefined)}  />
      )}
    </NavigationContainer>
  );
}