import React, {
  useState,
  useEffect,
  FunctionComponent,
  useCallback,
} from "react";
import { useForm, Controller } from "react-hook-form";
import {
  KeyboardAvoidingView,
  AsyncStorage,
  Button,
  Text,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import i18n from "i18n-js";
import Svg, { Circle, Path } from "react-native-svg";

export const ADDRESS_API_VERSION = 3;

const ScreenView = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  padding-left: 28px;
  padding-right: 28px;
`;

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

const Form = styled.View``;

const Row = styled.View`
  padding-bottom: 8px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const StyledTextInput = styled.TextInput`
  font-size: 16px;
  padding: 8px 0;
  border-bottom-width: 1px;
  margin-bottom: 8px;
`;

const Logo = styled.View`
  justify-content: flex-start;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const Error = styled.Text`
  color: #e74c3c;
`;

type AddressNavigationProp = StackNavigationProp<RootStackParamList, "Address">;

const Address: FunctionComponent<{
  navigation: AddressNavigationProp;
}> = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    errors,
    formState: { dirty, isValid },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      street: "",
      postalCode: "",
      city: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: "",
    },
  }); // initialise the hook

  const onSubmit = async (data: { [key: string]: string }) => {
    try {
      await AsyncStorage.setItem(
        "address",
        JSON.stringify({ ...data, version: ADDRESS_API_VERSION })
      );
      navigation.navigate("QRCode");
    } catch (error) {
      // Error saving data
      throw error;
    }
  };

  const deleteData = async () => {
    try {
      reset();
      await AsyncStorage.removeItem("address");
    } catch (error) {
      // Error saving data
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("address")
        .then((value) => {
          if (value) {
            const obj = JSON.parse(value);
            Object.keys(obj).forEach((key) => {
              setValue(key, obj[key], false);
            });
          }
        })
        .catch((e) => {
          throw e;
        });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScreenView>
      <StyledKeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <StyledScrollView>
          <Form>
            <Logo>
              <Svg
                height={(283 / 728) * (1 / 4) * windowWidth}
                width={(1 / 4) * windowWidth}
                viewBox="0 0 728 283"
              >
                <Path
                  fill="#000"
                  d="M169 204c-1 6-3 10-6 13-6 14-16 27-29 41-14 15-26 22-34 22h-4l-32-12c-21-9-37-25-49-50-10-22-15-47-15-77 0-35 7-67 21-94C35 18 54 3 75 2c9-1 21 4 38 13 16 9 27 18 32 27s9 28 11 59l-3 20c-3 8-6 11-10 11-8-1-17-4-29-8-13-4-21-8-22-11l-1-3 3-7 3-7 1-25c0-12-1-20-3-24a89 89 0 00-30 48c-6 19-8 40-8 64 0 18 1 35 4 49 4 15 8 23 12 26 2 2 8-3 18-13s16-18 19-24l3-10c1-4 3-7 5-8 4-1 13 2 29 10 15 7 22 12 22 15zM277 18l-1 6-2 5c-2 4-3 11-4 20v199l2 7 2 5c0 14-3 22-8 23l-23-4c-14-4-22-7-24-9-5-4-7-7-7-11l1-3 2-5V21l-1-4-2-4c1-5 5-8 12-10h15l24 4c9 2 14 6 14 11zM516 255a856 856 0 00-4 23l-6 1c-7 0-16-2-26-6-12-3-19-8-24-12l-5-20c-2-14-5-26-8-36a241 241 0 00-67 21 900 900 0 01-21 50l-3 1c-5 0-13-3-26-9-12-5-18-9-19-10-1-3 1-11 6-23l12-32c-4-4-6-9-6-13v-4c0-2 7-7 20-14l42-143V15c0-6 0-10 2-11l8-2c10 0 24 3 43 8s30 10 34 14a1000 1000 0 0048 231zm-85-99a644 644 0 01-10-72 571 571 0 00-25 81l35-9zM657 278c-5 0-10 0-16-2a600 600 0 01-47-14c-17-8-30-23-39-45-8-20-12-44-12-72 0-22 4-49 12-79 11-41 24-61 41-61l7 1 6 1c16-4 26-7 31-7l6 1c26 3 47 19 62 48 13 27 20 58 20 95 0 35-6 64-18 89-13 27-31 42-53 45zm-6-238c-5-2-10 5-14 19-5 14-10 21-14 21l-5-2-5-2c-8 16-11 40-11 70 0 23 2 43 7 60 6 19 14 30 24 32 11 2 21-10 28-36a313 313 0 004-136c-3-16-8-25-14-26z"
                />
              </Svg>
            </Logo>
            <Row>
              <Label>{i18n.t("firstName")}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="firstName"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder={i18n.t("firstNamePlaceholder")}
              />
              {errors.firstName && <Error>{i18n.t("isRequired")}</Error>}
            </Row>
            <Row>
              <Label>{i18n.t("lastName")}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="lastName"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder={i18n.t("lastNamePlaceholder")}
              />
              {errors.lastName && <Error>{i18n.t("isRequired")}</Error>}
            </Row>
            <Row>
              <Label>{i18n.t("street")}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="street"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder={i18n.t("streetPlaceholder")}
              />
              {errors.street && <Error>{i18n.t("isRequired")}</Error>}
            </Row>
            <Row>
              <Label>{i18n.t("postalCode")}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="postalCode"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder={i18n.t("postalCodePlaceholder")}
              />
              {errors.postalCode && <Error>{i18n.t("isRequired")}</Error>}
            </Row>
            <Row>
              <Label>{i18n.t("city")}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="city"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder={i18n.t("cityPlaceholder")}
              />
              {errors.city && <Error>{i18n.t("isRequired")}</Error>}
            </Row>
            <Row>
              <Label>{i18n.t("phoneNumber")}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="phoneNumber"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true }}
                placeholder={i18n.t("phoneNumberPlaceholder")}
              />
              {errors.phoneNumber && <Error>{i18n.t("isRequired")}</Error>}
            </Row>
            <Row>
              <Label>{i18n.t("email")}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="email"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{
                  required: true,
                  pattern: {
                    value: /\S+@\S+.\S+/,
                    message: i18n.t("invalidEmail"),
                  },
                }}
                placeholder={i18n.t("emailPlaceholder")}
              />
              {errors.email && <Error>{i18n.t("isRequired")}</Error>}
            </Row>
            <Row>
              <Label>{i18n.t("dateOfBirth")}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="dateOfBirth"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{
                  required: true,
                  pattern: {
                    value: /\b(0?[1-9]|1\d|2\d|3[01])\.(0?[1-9]|1[0-2]).\d{4}\b/,
                    message: i18n.t("invalidDateOfBirth"),
                  },
                }}
                placeholder={i18n.t("dateOfBirthPlaceholder")}
              />
              {errors.dateOfBirth && <Error>{i18n.t("isRequired")}</Error>}
            </Row>
            <Row>
              <Button
                title={i18n.t("save")}
                onPress={handleSubmit(onSubmit)}
                color={
                  !dirty || Object.keys(errors).length > 0
                    ? "#95a5a6"
                    : undefined
                }
              />
            </Row>
            <Row>
              <Button
                title={i18n.t("deleteData")}
                color="#e74c3c"
                onPress={deleteData}
              />
            </Row>
          </Form>
        </StyledScrollView>
      </StyledKeyboardAvoidingView>
    </ScreenView>
  );
};

export default Address;
