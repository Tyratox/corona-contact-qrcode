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

type AddressNavigationProp = StackNavigationProp<RootStackParamList, "Address">;

const Address: FunctionComponent<{
  navigation: AddressNavigationProp;
}> = ({ navigation }) => {
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
              <Label>Vorname</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="firstName"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder="Max"
              />
              {errors.firstName && <Text>Wird benötigt.</Text>}
            </Row>
            <Row>
              <Label>Nachname</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="lastName"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder="Mustermann"
              />
              {errors.lastName && <Text>Wird benötigt.</Text>}
            </Row>
            <Row>
              <Label>Strasse</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="street"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder="Musterstrasse 42"
              />
              {errors.street && <Text>Wird benötigt.</Text>}
            </Row>
            <Row>
              <Label>Postleitzahl</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="postalCode"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder="5000"
              />
              {errors.postalCode && <Text>Wird benötigt.</Text>}
            </Row>
            <Row>
              <Label>Ort</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="city"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 1 }}
                placeholder="Aarau"
              />
              {errors.city && <Text>Wird benötigt.</Text>}
            </Row>
            <Row>
              <Label>Telefonnummer</Label>
              <Controller
                as={StyledTextInput}
                control={control}
                name="phoneNumber"
                onChange={(args) => args[0].nativeEvent.text}
                rules={{ required: true, minLength: 10 }}
                placeholder="062 000 00 00"
              />
              {errors.phoneNumber && <Text>Wird benötigt.</Text>}
            </Row>
            <Row>
              <Button title="Speichern" onPress={handleSubmit(onSubmit)} />
            </Row>
            <Row>
              <Button title="Daten Löschen" color="#f00" onPress={deleteData} />
            </Row>
          </Form>
        </StyledScrollView>
      </StyledKeyboardAvoidingView>
    </ScreenView>
  );
};

export default Address;
