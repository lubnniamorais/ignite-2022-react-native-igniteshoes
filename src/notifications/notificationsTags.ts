import { OneSignal } from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
  // Passamos a tag como primeiro parâmetro e o email como segundo parâmetro
  OneSignal.User.addTag('user_email', email);
}