import React from "react";
import { Text, ScrollView, TouchableHighlight } from "react-native";

import styles from "./styles";

export default function Details({ route, navigation }) {
  const { title, description } = route.params;

  navigation.setOptions({
    title: title,
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
}
