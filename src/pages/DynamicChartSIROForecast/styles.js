import { StyleSheet } from "react-native";
import { Directions } from "react-native-gesture-handler";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 5,
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    color: "#333",
    marginTop: 40,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 20,
  },

  dataContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "left"
  },

  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  button: {
    borderRadius: 5,
    padding: 16,
    margin: 10,
    alignSelf: "center",
    backgroundColor: "#009083",
  },

  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },

  chartContainer: {
    borderColor: "gray",
    borderWidth: 0,
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "top",
    marginLeft: 100,
    flex: 4
  },

  chart: {
    marginVertical: 20,
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center"
  }
});
