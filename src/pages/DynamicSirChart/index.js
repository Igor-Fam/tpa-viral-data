import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { LineChart } from "react-native-chart-kit";

import styles from "./styles";

import {
  segments,
  chartWidth,
  chartHeight,
  chartConfig,
  withInnerLines,
  isIntegerNumber,
  withVerticalLabels,
} from "../../utils/utils.js";
import { sir } from "../../utils/models.js";

export default function DynamicSirChart() {
  const [data, setData] = useState({});
  const [isChartVisible, setIsChartVisible] = useState(false);

  const [susceptible, setSusceptible] = useState("1000");
  const [infectious, setInfectious] = useState("100");
  const [recovered, setRecovered] = useState("0");
  const [points, setPoints] = useState("365");

  function changeData() {
    let isValid =
      isIntegerNumber(susceptible) &&
      isIntegerNumber(infectious) &&
      isIntegerNumber(recovered) &&
      isIntegerNumber(points);

    if (isValid) {
      setData(
        sir({
          days: parseInt(points),
          susceptible: parseInt(susceptible),
          infectious: parseInt(infectious),
          recovered: parseInt(recovered),
        })
      );
      setIsChartVisible(true);
    } else {
      setIsChartVisible(false);
      Alert.alert(
        "Atenção!",
        "Por favor, verifique se há campos vazios ou preenchidos com valores que não sejam números inteiros positivos."
      );
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Modelo SIR (Dinâmico)</Text>

      <View style={styles.dataContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Suscetíveis</Text>
          <TextInput
            style={styles.input}
            value={susceptible}
            keyboardType={"numeric"}
            placeholder={"Ex.: 1000"}
            onChangeText={(text) => setSusceptible(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Infectados</Text>
          <TextInput
            style={styles.input}
            value={infectious}
            keyboardType={"numeric"}
            placeholder={"Ex.: 100"}
            onChangeText={(text) => setInfectious(text)}
          />
        </View>
      </View>

      <View style={styles.dataContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Recuperados</Text>
          <TextInput
            style={styles.input}
            value={recovered}
            keyboardType={"numeric"}
            placeholder={"Ex.: 0"}
            onChangeText={(text) => setRecovered(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Dias</Text>
          <TextInput
            style={styles.input}
            value={points}
            keyboardType={"numeric"}
            placeholder={"Ex.: 30"}
            onChangeText={(text) => setPoints(text)}
          />
        </View>
      </View>

      <RectButton onPress={changeData} style={styles.button}>
        <Text style={styles.buttonText}>Gerar gráfico</Text>
      </RectButton>

      {isChartVisible && (
        <LineChart
          bezier
          data={data.chart}
          width={chartWidth}
          height={chartHeight}
          segments={segments}
          chartConfig={chartConfig}
          withInnerLines={withInnerLines}
          withVerticalLabels={withVerticalLabels}
        />
      )}
    </KeyboardAvoidingView>
  );
}
