import React from "react";
import { StatusBar } from "react-native";

import Routes from "./src/routes.js";

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="#3F51B5" />
    </>
  );
}
