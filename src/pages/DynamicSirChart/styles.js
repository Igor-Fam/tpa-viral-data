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

  inputContainer: {
    width: "48%",
    margin: "1%",
  },

  inputTitle: {
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

  button: {
    borderRadius: 5,
    padding: 16,
    margin: 5,
    marginBottom: 40,
    alignSelf: "center",
    backgroundColor: "#009083",
  },

  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
