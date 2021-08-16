import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 25,
    color: "#333",
    marginBottom: 3,
    fontWeight: "bold",
  },

  description: {
    fontSize: 18,
    color: "#333",
    marginBottom: 15,
    textAlign: "justify",
  },

  button: {
    borderRadius: 5,
    padding: 8,
    margin: 5,
    alignSelf: "center",
  },

  buttonText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#009083",
  },
});
