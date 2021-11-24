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

import { siro_params, siro_victory } from "../../utils/models.js";

import { VictoryLine, VictoryScatter, VictoryChart, VictoryAxis, VictoryZoomContainer } from 'victory';

import moment from 'moment';
moment().format();

import {
  details,
  validationSiroParams,
} from "../../utils/utils.js";

import styles from "./styles";

export default function DynamicChartSIROVictory() {

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1)

  const [data, setData] = useState({});
  const [dataBrazil, setDataBrazil] = useState({});
  const [chartVisible, setChartVisible] = useState(false);
  const [invalidDates, setInvalidDates] = useState(false);

  const [susceptible, setSusceptible] = useState(209300000);
  const [infectious, setInfectious] = useState("1");
  const [recovered, setRecovered] = useState("0");
  const [death, setDeath] = useState("0");
  const [days, setDays] = useState("30");
  const [dateStartIndex, setDateStartIndex] = useState("0");
  const [dateEndIndex, setDateEndIndex] = useState("0");
  const [dateStart, setDateStart] = useState("2020-03-15");
  const [dateEnd, setDateEnd] = /*useState(yesterday.toISOString().split('T')[0]);*/ useState("2020-05-24");

  const [m, setM] = useState(0.022);
  const [to, setTo] = useState(34.9);
  const [tr, setTr] = useState(20.58);
  const [ti, setTi] = useState(18.07);
  const [tf, setTf] = useState(22.3);
  const [r, setR] = useState(0.48);
  const [b, setB] = useState(0.23);

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

        csvBrazil = dateFilter(csvBrazil);
        
        csvBrazil.forEach((element) => {
          const row = element.split(",");
          confirmed.push(row[2]);
          recovered.push(row[3]);
          deaths.push(row[4]);
          infectious.push(row[2]-row[3]-row[4]);
        });
        setInfectious(infectious[0]);
        setRecovered(recovered[0]);
        setDeath(deaths[0]);

        var csvDataBrazil = {
          infectious: infectious,
          recovered: recovered,
          deaths: deaths
        };

        storeData(csvDataBrazil);
        setDataBrazil(csvDataBrazil);
      })
      .catch((error) => {
        getDataFromAsync();
      });
    }, [data]);

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
    setDays(dateFilterEnd - dateFilterStart);

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
      to,
      tr,
      ti,
      tf,
      r,
      b
    );
    if (isValid.response) {
      var response = siro_victory(isValid.message);
      var newData = {S: [],
                     I: [],
                     R: [],
                     D: []};
      console.log(dateStartIndex, dateEndIndex);
      for (let i = 0; i < dateEndIndex - dateStartIndex; i++){
        newData.S.push({ x: i, y: response.S[i]});
        newData.I.push({ x: i, y: response.I[i]});
        newData.R.push({ x: i, y: response.R[i]});
        newData.D.push({ x: i, y: response.D[i]});
      }
      setData(newData);
      var newDataBrazil = {
        infectious: [],
        recovered: [],
        deaths: []
      };
      for (let i = 0; i < dateEndIndex - dateStartIndex; i++){
        newDataBrazil.infectious.push({ x: i, y: parseFloat(dataBrazil.infectious[i])});
        newDataBrazil.recovered.push({ x: i, y: parseFloat(dataBrazil.recovered[i])});
        newDataBrazil.deaths.push({ x: i, y: parseFloat(dataBrazil.deaths[i])});
      }
      setDataBrazil(newDataBrazil);
      setChartVisible(true);
    } else {
      Alert.alert("Atenção!", isValid.message);
      setChartVisible(false);
    }
  }

  function resetValues() {
    setSusceptible(209300000);
    setInfectious("1");
    setRecovered("0");
    setDeath("0");
    setDays("30");
    setDateStartIndex("0");
    setDateEndIndex("0");
    setDateStart("2020-03-15");
    setDateEnd("2020-07-28");
    setM(0.0184);
    setTo(28.4);
    setTr(23.4);
    setTi(29.1);
    setTf(49.9);
    setR(0.399);
    setB(0.201);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Modelo SIRO Brasil (Dinâmico) com previsão de 15 dias</Text>
      <Text style={styles.description}>dados externos</Text>
      <View style={styles.container}>
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
            navigateTo={details.r}
            toFixed={3}
            step={0.001}
            minimumValue={0}
            maximumValue={0.8}
          />

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
            maximumValue={0.15}
          />

          <InputComponent
              disabledInput
              title="Dias até a recuperação"
              placeholder="Ex.: 0.14"
              value={Number(tr)}
              onChangeState={setTr}
              navigateTo={details.tr}
              toFixed={3}
              step={0.00001}
              minimumValue={1}
              maximumValue={90}
            />

          <InputComponent
            disabledInput
            title="Dias até o óbito"
            placeholder="Ex.: 0.14"
            value={Number(to)}
            onChangeState={setTo}
            navigateTo={details.to}
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
            navigateTo={details.ti}
            toFixed={3}
            step={0.00001}
            minimumValue={1}
            maximumValue={90}
          />

          <InputComponent
            disabledInput
            title="Dias até o fim da política de contenção"
            placeholder="Ex.: 0.14"
            value={Number(tf)}
            onChangeState={setTf}
            navigateTo={details.tf}
            toFixed={3}
            step={0.00001}
            minimumValue={1}
            maximumValue={90}
          />

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

        </View>
        <View style ={styles.chartContainer}>
          {chartVisible && (
            <>
              <Text style={styles.chartTitle}>
                Infectados: 
              </Text>

              <View style = {styles.chart}>
                <VictoryChart width={1000} containerComponent={<VictoryZoomContainer/>}>
                  <VictoryAxis
                    tickFormat={(x) => (moment(dateStart, "YYYY-MM-DD").add(x, "d").format("DD/MM"))}
                  />
                  <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    tickFormat={(x) => (`${x / 1000000} mi`)}
                  />
                  <VictoryScatter
                    style={{ data: { fill: "#3f51b5" } }}
                    size={2}
                    data={dataBrazil.infectious}
                  />
                  <VictoryLine
                    style={{
                      data: { stroke: "#ff6e69" },
                      parent: { border: "1px solid #ccc"}
                    }}
                    data={data.I}
                  />
                </VictoryChart>
                
              </View>
              
              <Text style={styles.chartTitle}>
                Recuperados: 
              </Text>

              <View style = {styles.chart}>
                <VictoryChart width={1000} containerComponent={<VictoryZoomContainer/>}>
                    <VictoryAxis
                      tickFormat={(x) => (moment(dateStart, "YYYY-MM-DD").add(x, "d").format("DD/MM"))}
                    />
                    <VictoryAxis
                      dependentAxis
                      // tickFormat specifies how ticks should be displayed
                      tickFormat={(x) => (`${x / 1000000} mi`)}
                    />
                    <VictoryScatter
                      style={{ data: { fill: "#3f51b5" } }}
                      size={2}
                      data={dataBrazil.recovered}
                    />
                    <VictoryLine
                      style={{
                        data: { stroke: "#3fb551" },
                        parent: { border: "1px solid #ccc"}
                      }}
                      data={data.R}
                    />
                  </VictoryChart>
              </View>
              
              <Text style={styles.chartTitle}>
                Óbitos: 
              </Text>

              <View style = {styles.chart}>
                <VictoryChart width={1000} containerComponent={<VictoryZoomContainer/>}>
                    <VictoryAxis
                      tickFormat={(x) => (moment(dateStart, "YYYY-MM-DD").add(x, "d").format("DD/MM"))}
                    />
                    <VictoryAxis
                      dependentAxis
                      // tickFormat specifies how ticks should be displayed
                      tickFormat={(x) => (`${x / 1000000} mi`)}
                    />
                    <VictoryScatter
                      style={{ data: { fill: "#3f51b5" } }}
                      size={2}
                      data={dataBrazil.deaths}
                    />
                    <VictoryLine
                      style={{
                        data: { stroke: "#f59740" },
                        parent: { border: "1px solid #ccc"}
                      }}
                      data={data.D}
                    />
                  </VictoryChart>
              </View>   

            </>
            
          )}
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}
