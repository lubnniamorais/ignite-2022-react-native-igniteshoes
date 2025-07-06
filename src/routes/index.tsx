import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "native-base";
import { useEffect, useState } from "react";
import {
	type NotificationWillDisplayEvent,
	OneSignal,
	type OSNotification,
} from "react-native-onesignal";
import { Notification } from "../components/Notification";
import { AppRoutes } from "./app.routes";

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
			const response = event.getNotification();
		};

		// Adicionando a função de notificação
		OneSignal.Notifications.addEventListener(
			"foregroundWillDisplay",
			handleNotification,
		);

		// Removendo a função quando o componente é desmontado
		return () =>
			OneSignal.Notifications.removeEventListener(
				"foregroundWillDisplay",
				handleNotification,
			);
	}, []);

	return (
		<NavigationContainer theme={theme}>
			<AppRoutes />

			{notification?.title && (
				<Notification
					data={notification}
					onClose={() => setNotification(undefined)}
				/>
			)}
		</NavigationContainer>
	);
}
