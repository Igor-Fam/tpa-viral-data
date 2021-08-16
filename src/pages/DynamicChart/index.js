import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

import styles from "./styles";

import {
  details,
  segments,
  chartWidth,
  chartHeight,
  chartConfig,
  withInnerLines,
  withVerticalLabels,
  validation,
} from "../../utils/utils.js";

import InputComponent from "../../components/InputComponent/index.js";
import { sir } from "../../utils/models.js";

export default function DynamicChart() {
  const [data, setData] = useState({});
  const [chartVisible, setChartVisible] = useState(false);

  const [susceptible, setSusceptible] = useState("1000");
  const [infectious, setInfectious] = useState("100");
  const [recovered, setRecovered] = useState("0");
  const [days, setDays] = useState("30");

  const [alpha, setAlpha] = useState("0.00035");
  const [gamma, setGamma] = useState("0.12");

  function changeData() {
    let isValid = validation(
      days,
      susceptible,
      infectious,
      recovered,
      alpha,
      gamma
    );

    if (isValid.response) {
      let response = sir(isValid.message);
      setData(response);
      setChartVisible(true);
    } else {
      Alert.alert("Atenção!", isValid.message);
      setChartVisible(false);
    }
  }

  function resetValues() {
    setSusceptible("1000");
    setInfectious("100");
    setRecovered("0");
    setDays("30");
    setAlpha("0.00035");
    setGamma("0.12");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Modelo SIR (Dinâmico)</Text>

        <View style={styles.dataContainer}>
          <InputComponent
            title="População total"
            placeholder="Ex.: 1000"
            value={susceptible}
            onChangeState={setSusceptible}
            navigateTo={details.population}
          />

          <InputComponent
            title="Infectados"
            placeholder="Ex.: 100"
            value={infectious}
            onChangeState={setInfectious}
            navigateTo={details.infectious}
          />
        </View>

        <View style={styles.dataContainer}>
          <InputComponent
            title="Recuperados"
            placeholder="Ex.: 0"
            value={recovered}
            onChangeState={setRecovered}
            navigateTo={details.recovered}
          />

          <InputComponent
            title="Dias"
            placeholder="Ex.: 30"
            value={days}
            onChangeState={setDays}
            navigateTo={details.days}
          />
        </View>

        <View style={styles.dataContainer}>
          <InputComponent
            disabledInput
            title="Taxa de Infecção"
            placeholder="Ex.: 0.00035"
            value={Number(alpha)}
            onChangeState={setAlpha}
            navigateTo={details.alpha}
            toFixed={5}
            step={0.00001}
            minimumValue={0}
            maximumValue={0.001}
          />

          <InputComponent
            disabledInput
            title="Taxa de Recuperação"
            placeholder="Ex.: 0.12"
            value={Number(gamma)}
            onChangeState={setGamma}
            navigateTo={details.gamma}
            toFixed={2}
            step={0.01}
            minimumValue={0}
            maximumValue={1}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={changeData}
            underlayColor="#009083"
            style={styles.button}
          >
            <Text style={styles.buttonText}>Gerar gráfico</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={resetValues}
            underlayColor="#009083"
            style={styles.button}
          >
            <Text style={styles.buttonText}>Resetar valores</Text>
          </TouchableHighlight>
        </View>

        {chartVisible && (
          <LineChart
            data={data.chart}
            width={chartWidth}
            height={chartHeight}
            segments={segments}
            chartConfig={chartConfig}
            withInnerLines={withInnerLines}
            withVerticalLabels={withVerticalLabels}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
