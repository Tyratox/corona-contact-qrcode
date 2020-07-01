import React, { FunctionComponent, ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import QRCode from "./screens/QRCode";
import Address from "./screens/Address";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

import en from "./i18n/en.json";
import de from "./i18n/de.json";
import fr from "./i18n/fr.json";
import it from "./i18n/it.json";

i18n.translations = {
  en,
  de,
  fr,
  it,
};

let locale = Localization.locale;
if (locale.includes("-") && !(locale in i18n.translations)) {
  locale = locale.split("-")[0];
}

i18n.locale = locale;
i18n.defaultLocale = "en";
i18n.fallbacks = true;

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  QRCode: undefined;
  Address: undefined;
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="QRCode"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "QRCode") {
              return <AntDesign name="qrcode" size={size} color={color} />;
            } else if (route.name === "Address") {
              return (
                <FontAwesome5 name="address-card" size={size} color={color} />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "#000",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="QRCode"
          component={QRCode}
          options={{ title: i18n.t("qrcode") }}
        />
        <Tab.Screen
          name="Address"
          component={Address}
          options={{ title: i18n.t("address") }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
