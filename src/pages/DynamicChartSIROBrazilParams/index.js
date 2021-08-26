import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Platform,
  ScrollView,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";

import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

import InputComponent from "../../components/InputComponent/index.js";

import { LineChart } from "react-native-chart-kit";

import DatePicker from 'react-native-datepicker'

import { siro_params } from "../../utils/models.js";

import {
  details,
  segments,
  dataShown,
  chartWidth,
  chartHeight,
  chartConfig,
  withInnerLines,
  withVerticalLabels,
  validationSiro,
  validationSiroParams,
} from "../../utils/utils.js";

import styles from "./styles";

export default function DynamicChartSIROBrazilParams() {

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1)

  const [data, setData] = useState({});
  const [dataBrazil, setDataBrazil] = useState({});
  const [chartVisible, setChartVisible] = useState(false);
  const [invalidDates, setInvalidDates] = useState(false);

  const [susceptible, setSusceptible] = useState("209300000");
  const [infectious, setInfectious] = useState("1");
  const [recovered, setRecovered] = useState("0");
  const [death, setDeath] = useState("0");
  const [days, setDays] = useState("30");
  const [dateStartIndex, setDateStartIndex] = useState("0");
  const [dateEndIndex, setDateEndIndex] = useState("0");
  const [dateStart, setDateStart] = useState("2020-01-22");
  const [dateEnd, setDateEnd] = useState(yesterday.toISOString().split('T')[0]);

  const [m, setM] = useState(0.0184);
  const [t0, setT0] = useState(28.4);
  const [tr, setTr] = useState(23.4);
  const [ti, setTi] = useState(29.1);
  const [tf, setTf] = useState(49.9);
  const [r, setR] = useState(0.399);
  const [b, setB] = useState(0.201);
  const [gamma, setGamma] = useState((1-m)*(1/tr));
  const [beta, setBeta] = useState(m*1/t0);

  useEffect(()=> {
    axios
      .get(
        "https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv"
      )
      .then((response) => {
        let confirmed=[],
          infectious = [],
          recovered = [],
          deaths = [];

        const csv = response.data;
        const csvData = csv.split("\n").slice(1);

        let csvBrazil = csvData.filter((line) => {
          return line.includes("Brazil");
        });

        setDays(`${csvBrazil.length}`);

        csvBrazil = dateFilter(csvBrazil);

        csvBrazil.forEach((element) => {
          const row = element.split(",");
          confirmed.push(row[2]);
          recovered.push(row[3]);
          deaths.push(row[4]);
          infectious.push(row[2]-row[3]-row[4]);
        });

        const csvDataBrazil = {
          infectious: {
            data: dataShown(infectious),
          },
          recovered: {
            data: dataShown(recovered),
          },
          deaths: {
            data: dataShown(deaths),
          },
        };
        storeData(csvDataBrazil);
        setDataBrazil(csvDataBrazil);
      })
      .catch((error) => {
        getDataFromAsync();
      });
    }, [dateStart, dateEnd]);

  async function storeData(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@viral_dataBrazil", jsonValue);
    } catch (e) {
      Alert.alert("Oops, houve algum erro ao gravar os dados.");
    }
  }

  async function getDataFromAsync() {
    try {
      const jsonValue = await AsyncStorage.getItem("@viral_dataBrazil");
      jsonValue != null ? setDataBrazil(JSON.parse(jsonValue)) : null;
    } catch (e) {
      Alert.alert("Atenção!", "Oops, houve algum erro ao carregar os dados.");
    }
  }

  function dateFilter(allData) {
    let dateFilterStart = allData.findIndex(line=>line.includes(dateStart));
    let dateFilterEnd = allData.findIndex(line=>line.includes(dateEnd));
    if(dateFilterEnd<=dateFilterStart){
      setDateStartIndex(0);
      setDateEndIndex(allData.length);
      setInvalidDates(true);
      return allData;
    }
    setInvalidDates(false);
    setDateStartIndex(dateFilterStart);
    setDateEndIndex(dateFilterEnd);

    return (allData.slice(dateFilterStart, dateFilterEnd));
  }

  function changeData() {

    let isValid = validationSiroParams(
      days,
      susceptible,
      infectious,
      recovered,
      death,
      dateStartIndex,
      dateEndIndex,
      m,
      t0,
      tr,
      ti,
      tf,
      r,
      b
    );
    if (isValid.response) {
      let response = siro_params(isValid.message);
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
    setGamma("0.14");
    setBeta("0.065");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Modelo SIRO Brasil (Dinâmico)</Text>
        <Text style={styles.description}>dados externos</Text>

        <View style={styles.dataContainer}>
          <InputComponent
            disabledInput
            title="Taxa de Infecção"
            placeholder="Ex.: 0.201"
            value={Number(b)}
            onChangeState={setB}
            navigateTo={details.alpha}
            toFixed={2}
            step={0.001}
            minimumValue={0}
            maximumValue={0.5}
          />

          <InputComponent
            disabledInput
            title="Fator de redução do contato"
            placeholder="Ex.: 0.399"
            value={Number(r)}
            onChangeState={setR}
            navigateTo={details.gamma}
            toFixed={3}
            step={0.001}
            minimumValue={0}
            maximumValue={0.5}
          />

        </View>

        <View style={[styles.dataContainer, { justifyContent: "center" }]}>

          <InputComponent
            disabledInput
            title="Taxa de Mortalidade"
            placeholder="Ex.: 0.0184"
            value={Number(m)}
            onChangeState={setM}
            navigateTo={details.beta}
            toFixed={3}
            step={0.0001}
            minimumValue={0}
            maximumValue={0.03}
          />

        <InputComponent
            disabledInput
            title="Dias até a recuperação"
            placeholder="Ex.: 0.14"
            value={Number(tr)}
            onChangeState={setTr}
            navigateTo={details.gamma}
            toFixed={3}
            step={0.00001}
            minimumValue={1}
            maximumValue={90}
          />

        </View>

        <View style={[styles.dataContainer, { justifyContent: "center" }]}>

          <InputComponent
            disabledInput
            title="Dias até o óbito"
            placeholder="Ex.: 0.14"
            value={Number(t0)}
            onChangeState={setT0}
            navigateTo={details.gamma}
            toFixed={3}
            step={0.00001}
            minimumValue={1}
            maximumValue={90}
          />

          <InputComponent
            disabledInput
            title="Dias até a política de contenção"
            placeholder="Ex.: 0.14"
            value={Number(ti)}
            onChangeState={setTi}
            navigateTo={details.gamma}
            toFixed={3}
            step={0.00001}
            minimumValue={1}
            maximumValue={90}
          />

        </View>

        <View style={[styles.dataContainer, { justifyContent: "center" }]}>

          <InputComponent
            disabledInput
            title="Dias até o fim da política de contenção"
            placeholder="Ex.: 0.14"
            value={Number(tf)}
            onChangeState={setTf}
            navigateTo={details.gamma}
            toFixed={3}
            step={0.00001}
            minimumValue={1}
            maximumValue={90}
          />

        </View>

        <View style={[styles.dataContainer, { justifyContent: "center" }]}>
        <InputComponent
            title="Data de início"
            placeholder="Ex.: 01-01-2021"
            value={dateStart}
            onChangeState={setDateStart}
          />
        <InputComponent
            title="Data de término"
            placeholder="Ex.: 01-01-2021"
            value={dateEnd}
            onChangeState={setDateEnd}
          />
        </View>
        {invalidDates && (<Text style={{color: 'red', fontSize: 18, alignSelf: 'center', paddingBottom: 10 }}>Datas inválidas!</Text>)}
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
              data={
                dataBrazil.infectious
                  ? {
                      labels: data.chart.labels,
                      datasets: [
                        {
                          data: data.chart.datasets[1].data,
                          color: () => "#ff6e69",
                        },
                        {
                          data: dataBrazil.infectious.data,
                          color: (opacity = 1) =>
                            `rgba(63, 81, 181, ${opacity})`,
                          strokeWidth: 0.01
                        },
                      ],
                      legend: [data.chart.legend[1], "Infectados Brasil"],
                    }
                  : {
                      labels: data.chart.labels,
                      datasets: [data.chart.datasets[1]],
                      legend: [data.chart.legend[1]],
                    }
              }
              width={chartWidth}
              height={chartHeight}
              segments={segments}
              chartConfig={chartConfig}
              withInnerLines={withInnerLines}
              withVerticalLabels={withVerticalLabels}
            />
            <LineChart
              data={
                dataBrazil.recovered
                  ? {
                      labels: data.chart.labels,
                      datasets: [
                        {
                          data: data.chart.datasets[2].data,
                          color: () => "#3fb551",
                        },
                        {
                          data: dataBrazil.recovered.data,
                          color: (opacity = 1) =>
                            `rgba(63, 81, 181, ${opacity})`,
                          strokeWidth: 0.01
                        },
                      ],
                      legend: [data.chart.legend[2], "Recuperados Brasil"],
                    }
                  : {
                      labels: data.chart.labels,
                      datasets: [data.chart.datasets[2]],
                      legend: [data.chart.legend[2]],
                    }
              }
              width={chartWidth}
              height={chartHeight}
              segments={segments}
              chartConfig={chartConfig}
              withInnerLines={withInnerLines}
              withVerticalLabels={withVerticalLabels}
            />
            <LineChart
              data={
                dataBrazil.deaths
                  ? {
                      labels: data.chart.labels,
                      datasets: [
                        {
                          data: data.chart.datasets[3].data,
                          color: () => "#f59740",
                        },
                        {
                          data: dataBrazil.deaths.data,
                          color: (opacity = 1) =>
                            `rgba(63, 81, 181, ${opacity})`,
                          strokeWidth: 0.01
                        },
                      ],
                      legend: [data.chart.legend[3], "Óbitos Brasil"],
                    }
                  : {
                      labels: data.chart.labels,
                      datasets: [data.chart.datasets[3]],
                      legend: [data.chart.legend[3]],
                    }
              }
              width={chartWidth}
              height={chartHeight}
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
