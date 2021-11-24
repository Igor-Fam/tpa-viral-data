import React from "react";
import { View, Text, ScrollView, TouchableHighlight } from "react-native";

import styles from "./styles";

export default function Landing({ navigation }) {
  function navigateToChart() {
    navigation.navigate("Chart");
  }

  function navigateToChartStatic() {
    navigation.navigate("ChartStatic");
  }

  function navigateToDynamicSirChart() {
    navigation.navigate("DynamicSirChart");
  }

  function navigateToDynamicChart() {
    navigation.navigate("DynamicChart");
  }

  function navigateToDynamicChartWhitR0() {
    navigation.navigate("DynamicChartWhithR0");
  }

  function navigateToDynamicChartSIRO() {
    navigation.navigate("DynamicChartSIRO");
  }

  function navigateToDynamicChartSIROBrazil() {
    navigation.navigate("DynamicChartSIROBrazil");
  }

  function navigateToDynamicChartSIROBrazilExternal() {
    navigation.navigate("DynamicChartSIROBrazilExternal");
  }

  function navigateToDynamicChartSIROBrazilParams() {
    navigation.navigate("DynamicChartSIROBrazilParams");
  }

  function navigateToDynamicChartSIROForecast() {
    navigation.navigate("DynamicChartSIROForecast");
  }

  function navigateToDynamicChartSIROVictory() {
    navigation.navigate("DynamicChartSIROVictory");
  }

  function navigateToDynamicChartSIROSimplified() {
    navigation.navigate("DynamicChartSIROSimplified");
  }

  function navigateToInfos() {
    navigation.navigate("Infos");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}
    >
      <Text style={styles.title}>Viral Models</Text>

      <View>
        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToDynamicChartSIROVictory}
        >
          <Text style={styles.buttonText}>
            Gerar gráfico SIRO Brasil (Dinâmico) com o Victory
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToDynamicChartSIROSimplified}
        >
          <Text style={styles.buttonText}>
            Gerar gráfico SIRO Brasil (Dinâmico) Simplificado
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToDynamicChartSIROForecast}
        >
          <Text style={styles.buttonText}>
            Gerar gráfico SIRO Brasil (Dinâmico) com previsão de 15 dias
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToDynamicChartSIROBrazilParams}
        >
          <Text style={styles.buttonText}>
            Gerar gráfico SIRO Brasil (Dinâmico) com parâmetros
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToDynamicChartSIROBrazilExternal}
        >
          <Text style={styles.buttonText}>
            Gerar gráfico SIRO Brasil (Dinâmico) com dados externos
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToDynamicChartSIROBrazil}
        >
          <Text style={styles.buttonText}>
            Gerar gráfico SIRO Brasil (Dinâmico)
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToDynamicChartSIRO}
        >
          <Text style={styles.buttonText}>Gerar gráfico SIRO (Dinâmico)</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToDynamicChartWhitR0}
        >
          <Text style={styles.buttonText}>
            Gerar gráfico SIR com Alfa, Gama e R0 (Dinâmico)
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToDynamicChart}
        >
          <Text style={styles.buttonText}>
            Gerar gráfico SIR com Alfa e Gama (Dinâmico)
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToDynamicSirChart}
        >
          <Text style={styles.buttonText}>Gerar gráfico SIR (Dinâmico)</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToChartStatic}
        >
          <Text style={styles.buttonText}>Gerar gráfico SIR (Estático)</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#009083"
          style={styles.button}
          onPress={navigateToChart}
        >
          <Text style={styles.buttonText}>Gerar gráfico SIR</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#3F51B5"
          style={styles.buttonInfos}
          onPress={navigateToInfos}
        >
          <Text style={styles.buttonText}>Informações</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}
