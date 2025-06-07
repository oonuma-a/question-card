import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  inputQuestionText: string;
  setInputQuestionText: React.Dispatch<React.SetStateAction<string>>;
};

export default function RegisterQuestion ({ inputQuestionText, setInputQuestionText }: Props) {

  // const setInputQuestionText = (e: string) => {
  //   const newInputQuestionText = e;
  //   setInputQuestionText(newInputQuestionText);
  // }

  return (
    <View style={styles.inputGroup}>
      <TextInput
        value={inputQuestionText}
        onChangeText={setInputQuestionText}
        placeholder="問題文を入力してください"
        style={styles.textAreaStyle}
        multiline
        editable={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  textAreaStyle: {
    flex: 1,
    minHeight: 100,
    padding: 12,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  }
});