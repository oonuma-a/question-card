import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  registeredQuestions: string;
  setRegisteredQuestions: React.Dispatch<React.SetStateAction<string>>;
}
export default function RegisterdQa ({registeredQuestions, setRegisteredQuestions}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>登録済みの問題</Text>
      <TextInput
        value={registeredQuestions}
        onChangeText={setRegisteredQuestions}
        placeholder="登録された問題がここに表示されます"
        style={styles.textAreaStyle}
        multiline
        editable={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2C3E50',
  },
  textAreaStyle: {
    flex: 1,
    minHeight: 100,
    padding: 12,
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  }
});