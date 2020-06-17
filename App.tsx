import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import QRCode from "./screens/QRCode";
import Address from "./screens/Address";

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
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="QRCode"
          component={QRCode}
          options={{ title: "QRCode" }}
        />
        <Tab.Screen
          name="Address"
          component={Address}
          options={{ title: "Adresse" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
