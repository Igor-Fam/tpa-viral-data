import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Infos from "./pages/Infos";
import Chart from "./pages/Chart";
import Landing from "./pages/Landing";
import ChartStatic from "./pages/ChartStatic";
import DynamicChart from "./pages/DynamicChart";
import DynamicChartWhithR0 from "./pages/DynamicChartWhithR0";
import DynamicSirChart from "./pages/DynamicSirChart";
import DynamicChartSIRO from "./pages/DynamicChartSIRO";
import DynamicChartSIROBrazil from "./pages/DynamicChartSIROBrazil";
import DynamicChartSIROBrazilExternal from "./pages/DynamicChartSIROBrazilExternal";
import DynamicChartSIROBrazilParams from "./pages/DynamicChartSIROBrazilParams";
import DynamicChartSIROForecast from "./pages/DynamicChartSIROForecast";

import Details from "./pages/Details";

export default function Routes() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#3F51B5",
          },
        }}
      >
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{
            title: "Início",
          }}
        />
        <Stack.Screen
          name="Infos"
          component={Infos}
          options={{
            title: "Informações",
          }}
        />
        <Stack.Screen
          name="DynamicChart"
          component={DynamicChart}
          options={{
            title: "Modelo SIR com Alpha e Gamma(Dinânico)",
          }}
        />
        <Stack.Screen
          name="DynamicChartSIROBrazil"
          component={DynamicChartSIROBrazil}
          options={{
            title: "Modelo SIRO Brasil",
          }}
        />
        <Stack.Screen
          name="DynamicChartSIROBrazilExternal"
          component={DynamicChartSIROBrazilExternal}
          options={{
            title: "Modelo SIRO Brasil Dinâmico",
          }}
        />
        <Stack.Screen
          name="DynamicChartSIROBrazilParams"
          component={DynamicChartSIROBrazilParams}
          options={{
            title: "Modelo SIRO Brasil com parâmetros ajustados",
          }}
        />
        <Stack.Screen
          name="DynamicChartSIROForecast"
          component={DynamicChartSIROForecast}
          options={{
            title: "Modelo SIRO Brasil com previsão para os próximos 15 dias",
          }}
        />
        <Stack.Screen
          name="DynamicChartSIRO"
          component={DynamicChartSIRO}
          options={{
            title: "Modelo SIRO",
          }}
        />
        <Stack.Screen
          name="DynamicChartWhithR0"
          component={DynamicChartWhithR0}
          options={{
            title: "Modelo SIR com Alpha, Gamma e R0 (Dinânico)",
          }}
        />
        <Stack.Screen
          name="DynamicSirChart"
          component={DynamicSirChart}
          options={{
            title: "Modelo SIR (Dinânico)",
          }}
        />
        <Stack.Screen
          name="ChartStatic"
          component={ChartStatic}
          options={{
            title: "Modelo SIR (Estático)",
          }}
        />
        <Stack.Screen
          name="Chart"
          component={Chart}
          options={{
            title: "Modelo SIR",
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Detalhes",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
