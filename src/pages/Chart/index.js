import React, { useState } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { RectButton } from "react-native-gesture-handler";

import styles from "./styles";

import {
  segments,
  chartWidth,
  chartConfig,
  chartHeight,
  withInnerLines,
  withVerticalLabels,
} from "../../utils/utils.js";

import { sir } from "../../utils/models.js";

export default function Chart() {
  const [values, setValues] = useState(false);
  const [data, setData] = useState(sir({}));

  function changeData() {
    setData(
      values
        ? sir({})
        : sir({ days: 30, susceptible: 1000, infectious: 10, recovered: 0 })
    );
    setValues(!values);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modelo SIR</Text>

      <RectButton onPress={changeData} style={styles.button}>
        <Text style={styles.buttonText}>Mudar gráfico</Text>
      </RectButton>

      <LineChart
        bezier
        style={styles.chart}
        data={data.chart}
        width={chartWidth}
        height={chartHeight}
        segments={segments}
        chartConfig={chartConfig}
        withInnerLines={withInnerLines}
        withVerticalLabels={withVerticalLabels}
      />
    </View>
  );
}
