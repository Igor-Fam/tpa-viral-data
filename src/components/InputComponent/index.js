import React from "react";
import { Text, View, TextInput, TouchableHighlight } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

import styles from "./styles";

const InputComponent = ({
  title,
  value,
  navigateTo,
  placeholder,
  onChangeState,
  disabledInput,
  step,
  minimumValue,
  maximumValue,
  toFixed,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>

        <TouchableHighlight
          onPress={() => {
            navigation.navigate("Details", navigateTo);
          }}
          underlayColor="#ddd"
          style={styles.info}
        >
          <Text style={styles.infoText}>i</Text>
        </TouchableHighlight>
      </View>

      <TextInput
        style={
          disabledInput ? [styles.input, styles.disabledInput] : styles.input
        }
        value={String(value)}
        keyboardType={"numeric"}
        placeholder={placeholder}
        editable={disabledInput ? false : true}
        onChangeText={disabledInput ? undefined : (text) => onChangeState(text)}
      />

      {disabledInput ? (
        <Slider
          style={styles.slider}
          step={step}
          value={value}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          thumbTintColor="#009083"
          maximumTrackTintColor="#ddd"
          minimumTrackTintColor="#009083"
          onValueChange={(sliderValue) => {
            onChangeState(sliderValue.toFixed(toFixed));
          }}
        />
      ) : undefined}
    </View>
  );
};

export default InputComponent;
