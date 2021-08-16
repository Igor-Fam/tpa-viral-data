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

import {
  details,
  segments,
  chartWidth,
  chartConfig,
  chartHeight,
  withInnerLines,
  withVerticalLabels,
  validationSiro,
} from "../../utils/utils.js";

import { values_brazil } from "../../utils/static.js";

import InputComponent from "../../components/InputComponent/index.js";
import { siro } from "../../utils/models.js";

import styles from "./styles";

export default function DynamicChartSIROBrazil() {
  const [data, setData] = useState({});
  const [chartVisible, setChartVisible] = useState(false);

  const [susceptible, setSusceptible] = useState("209300000");
  const [infectious, setInfectious] = useState("1");
  const [recovered, setRecovered] = useState("0");
  const [death, setDeath] = useState("0");
  const [days, setDays] = useState("30");

  const [alpha, setAlpha] = useState("0.5");
  const [gamma, setGamma] = useState("0.138");

  function changeData() {
    let isValid = validationSiro(
      days,
      susceptible,
      infectious,
      recovered,
      death,
      alpha,
      gamma
    );

    if (isValid.response) {
      let response = siro({});
      setData(response);
      setChartVisible(true);
    } else {
      Alert.alert("Atenção!", isValid.message);
      setChartVisible(false);
    }
  }

  function resetValues() {
    setSusceptible("209300000");
    setInfectious("1");
    setRecovered("0");
    setDeath("0");
    setDays("30");
    setAlpha("0.5");
    setGamma("0.138");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Modelo SIRO Brasil (Dinâmico)</Text>
        <Text style={styles.description}>Março/ 2020</Text>

        <View style={styles.dataContainer}>
          <InputComponent
            disabledInput
            title="Taxa de Infecção"
            placeholder="Ex.: 0.00035"
            value={Number(alpha)}
            onChangeState={setAlpha}
            navigateTo={details.alpha}
            toFixed={2}
            step={0.1}
            minimumValue={0}
            maximumValue={1}
          />

          <InputComponent
            disabledInput
            title="Taxa de Recuperação"
            placeholder="Ex.: 0.12"
            value={Number(gamma)}
            onChangeState={setGamma}
            navigateTo={details.gamma}
            toFixed={3}
            step={0.001}
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
          <>
            <Text style={styles.reproducaoBasica}>
              Razão de reprodução básica(R0): {data.r0.toFixed(3)}
            </Text>

            <LineChart
              data={{
                labels: data.chart.labels,
                datasets: [
                  data.chart.datasets[1],
                  values_brazil.infected.datasets[0],
                ],
                legend: [data.chart.legend[1], values_brazil.infected.legend],
              }}
              width={chartWidth}
              height={chartHeight}
              withDots={false}
              segments={segments}
              chartConfig={chartConfig}
              withInnerLines={withInnerLines}
              withVerticalLabels={withVerticalLabels}
            />

            <LineChart
              data={{
                labels: data.chart.labels,
                datasets: [
                  data.chart.datasets[2],
                  values_brazil.recovered.datasets[0],
                ],
                legend: [data.chart.legend[2], values_brazil.recovered.legend],
              }}
              width={chartWidth}
              height={chartHeight}
              withDots={false}
              segments={segments}
              chartConfig={chartConfig}
              withInnerLines={withInnerLines}
              withVerticalLabels={withVerticalLabels}
            />

            <LineChart
              data={values_brazil.death}
              data={{
                labels: data.chart.labels,
                datasets: [
                  data.chart.datasets[3],
                  values_brazil.death.datasets[0],
                ],
                legend: [data.chart.legend[3], values_brazil.death.legend],
              }}
              width={chartWidth}
              height={chartHeight}
              withDots={false}
              segments={segments}
              chartConfig={chartConfig}
              withInnerLines={withInnerLines}
              withVerticalLabels={withVerticalLabels}
            />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
