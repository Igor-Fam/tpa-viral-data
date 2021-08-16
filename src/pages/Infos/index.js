import React from "react";
import { Text, ScrollView } from "react-native";

import styles from "./styles";

export default function Infos() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
    >
      <Text style={styles.title}>Objetivo</Text>
      <Text style={styles.description}>
        O projeto tem como objetivo utilizar a tecnologia para ajudar no
        entendimento da transmissão do vírus COVID-19 através de modelos
        matemáticos. O projeto esta sendo realizado através do Grupo de Educação
        Tutorial de Sistemas de Informação (GET-SI).
      </Text>

      <Text style={styles.title}>Tutor(a) GET-SI </Text>
      <Text style={styles.description}>Igor Knop</Text>

      <Text style={styles.title}>Prof. Colaborador(a)</Text>
      <Text style={styles.description}>Bárbara de Melo</Text>

      <Text style={styles.title}>Desenvolvedor(a)</Text>
      <Text style={styles.description}>Dhayana N. Silva</Text>
    </ScrollView>
  );
}
