import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate() {
  // Passamos a tag como primeiro parâmetro e o email como segundo parâmetro
  OneSignal.User.addTags({
    user_name: "Lubnnia",
    user_email: "lubnnia@gmail"
  });
}