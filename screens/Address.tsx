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
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { useIntl, defineMessages } from "react-intl";

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

const Form = styled.View`
  padding-top: 8px;
`;

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
`;

const messages = defineMessages({
  firstName: {
    id: "Address.firstName",
    defaultMessage: "First name",
  },
  firstNamePlaceholder: {
    id: "Address.firstNamePlaceholder",
    defaultMessage: "John",
  },
  lastName: {
    id: "Address.lastName",
    defaultMessage: "Last name",
  },
  lastNamePlaceholder: {
    id: "Address.lastNamePlaceholder",
    defaultMessage: "Doe",
  },
  street: {
    id: "Address.street",
    defaultMessage: "Street",
  },
  streetPlaceholder: {
    id: "Address.streetPlaceholder",
    defaultMessage: "123 Main",
  },
  postalCode: {
    id: "Address.postalCode",
    defaultMessage: "Postal code",
  },
  postalCodePlaceholder: {
    id: "Address.postalCodePlaceholder",
    defaultMessage: "10001",
  },
  city: {
    id: "Address.city",
    defaultMessage: "City",
  },
  cityPlaceholder: {
    id: "Address.cityPlaceholder",
    defaultMessage: "St Anytown",
  },
  phoneNumber: {
    id: "Address.phoneNumber",
    defaultMessage: "Phone number",
  },
  phoneNumberPlaceholder: {
    id: "Address.phoneNumberPlaceholder",
    defaultMessage: "(555) 555-1234",
  },
  isRequired: {
    id: "Address.isRequired",
    defaultMessage: "Is required",
  },
  save: {
    id: "Address.save",
    defaultMessage: "Save",
  },
  deleteData: {
    id: "Address.deleteData",
    defaultMessage: "Delete data",
  },
});

type AddressNavigationProp = StackNavigationProp<RootStackParamList, "Address">;

const Address: FunctionComponent<{
  navigation: AddressNavigationProp;
}> = ({ navigation }) => {
  const intl = useIntl();
  const { control, handleSubmit, setValue, reset, errors } = useForm({
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      street: "",
      postalCode: "",
      city: "",
      phoneNumber: "",
    },
  }); // initialise the hook
  const onSubmit = async (data: { [key: string]: string }) => {
    try {
      await AsyncStorage.setItem("address", JSON.stringify(data));
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
          throw new Error(e);
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
            <Row>
              <Label>{intl.formatMessage(messages.firstName)}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="firstName"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder={intl.formatMessage(messages.firstNamePlaceholder)}
              />
              {errors.firstName && (
                <Text>{intl.formatMessage(messages.isRequired)}</Text>
              )}
            </Row>
            <Row>
              <Label>{intl.formatMessage(messages.firstName)}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="lastName"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder={intl.formatMessage(messages.lastNamePlaceholder)}
              />
              {errors.lastName && (
                <Text>{intl.formatMessage(messages.isRequired)}</Text>
              )}
            </Row>
            <Row>
              <Label>{intl.formatMessage(messages.street)}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="street"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder={intl.formatMessage(messages.streetPlaceholder)}
              />
              {errors.street && (
                <Text>{intl.formatMessage(messages.isRequired)}</Text>
              )}
            </Row>
            <Row>
              <Label>{intl.formatMessage(messages.postalCode)}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="postalCode"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder={intl.formatMessage(messages.postalCodePlaceholder)}
              />
              {errors.postalCode && (
                <Text>{intl.formatMessage(messages.isRequired)}</Text>
              )}
            </Row>
            <Row>
              <Label>{intl.formatMessage(messages.city)}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="city"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder={intl.formatMessage(messages.cityPlaceholder)}
              />
              {errors.city && (
                <Text>{intl.formatMessage(messages.isRequired)}</Text>
              )}
            </Row>
            <Row>
              <Label>{intl.formatMessage(messages.phoneNumber)}</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="phoneNumber"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 10 }}
                placeholder={intl.formatMessage(
                  messages.phoneNumberPlaceholder
                )}
              />
              {errors.phoneNumber && (
                <Text>{intl.formatMessage(messages.isRequired)}</Text>
              )}
            </Row>
            <Row>
              <Button
                title={intl.formatMessage(messages.save)}
                onPress={handleSubmit(onSubmit)}
              />
            </Row>
            <Row>
              <Button
                title={intl.formatMessage(messages.deleteData)}
                color="#f00"
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
