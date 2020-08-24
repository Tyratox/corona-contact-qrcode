import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Alert, Text, Button, AsyncStorage, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import QR from "react-native-qrcode-svg";
import { RootStackParamList } from "../App";
import i18n from "i18n-js";
import { ADDRESS_API_VERSION } from "./Address";

const ScreenView = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const PaddedText = styled.Text`
  padding-bottom: 16px;
`;

type QRCodeNavigationProp = StackNavigationProp<RootStackParamList, "QRCode">;

const QRCode: FunctionComponent<{
  navigation: QRCodeNavigationProp;
}> = ({ navigation }) => {
  const [address, setAddress] = useState<undefined | null | string>(undefined);
  const data = useMemo(() => {
    try {
      return JSON.parse(address || "");
    } catch (e) {
      return null;
    }
  }, [address]);

  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("address")
        .then((value) => {
          if (value) {
            setAddress(value);
          } else {
            setAddress(null);
          }
        })
        .catch((e) => {
          throw new Error(e);
        });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScreenView>
      {address === undefined ? (
        <></>
      ) : address === null ? (
        <>
          <PaddedText>{i18n.t("noAddress")}</PaddedText>
          <Button
            title={i18n.t("enterAddress")}
            onPress={() => navigation.navigate("Address")}
          />
        </>
      ) : !("version" in data) ||
        parseInt(data["version"]) < ADDRESS_API_VERSION ? (
        <>
          <PaddedText>{i18n.t("outdated")}</PaddedText>
          <Button
            title={i18n.t("enterAddress")}
            onPress={() => navigation.navigate("Address")}
          />
        </>
      ) : (
        <>
          <QR value={address} size={(3 / 4) * windowWidth} color={"#000"} />
        </>
      )}
    </ScreenView>
  );
};

export default QRCode;
