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
    marginVertical: 40,
    fontWeight: "bold",
    textAlign: "center",
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
