import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "46%",
    marginVertical: "1%",
    marginHorizontal: "2%"
  },

  title: {
    color: "#333",
    marginBottom: 5,
    fontSize: 15,
  },

  input: {
    height: 40,
    width: "100%",
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 5,
  },

  disabledInput: {
    backgroundColor: "#ddd",
    textAlign: "center",
  },

  slider: {
    width: "100%",
    height: 40,
  },

  info: {
    width: 20,
    height: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    marginLeft: 5,
  },

  infoText: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 10,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
});
