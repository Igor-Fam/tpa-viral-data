import React, { useState } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { RectButton } from "react-native-gesture-handler";

import styles from "./styles";

import {
  chartConfig,
  chartWidth,
  chartHeight,
  withInnerLines,
  withVerticalLabels,
  segments,
} from "../../utils/utils.js";

import { values1, values2 } from "../../utils/static";

export default function ChartStatic() {
  const [values, setValues] = useState(false);
  const [data, setData] = useState(values1);

  function changeData() {
    setData(values ? values1 : values2);
    setValues(!values);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modelo SIR (Estático)</Text>

      <RectButton onPress={changeData} style={styles.button}>
        <Text style={styles.buttonText}>Mudar gráfico</Text>
      </RectButton>

      <LineChart
        bezier
        style={styles.chart}
        data={data}
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
