import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
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
  },

  dataContainer: {
    width: "100%",
    flexDirection: "row",
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
  reproducaoBasica: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: 50,
  },
});
