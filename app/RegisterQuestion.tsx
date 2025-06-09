import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  inputQuestionText: string;
  setInputQuestionText: React.Dispatch<React.SetStateAction<string>>;
};

export default function RegisterQuestion ({ inputQuestionText, setInputQuestionText }: Props) {

  // const setInputQuestionText = (e: string) => {
  //   const newInputQuestionText = e;
  //   setInputQuestionText(newInputQuestionText);
  // }

  const handleClear = () => {
    setInputQuestionText('');
  };

  return (
    <View style={styles.inputGroup}>
      <View style={styles.inputContainer}>
        <TextInput
          value={inputQuestionText}
          onChangeText={setInputQuestionText}
          placeholder="問題文を入力してください"
          style={styles.textAreaStyle}
          multiline
          editable={true}
        />
        {inputQuestionText.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Ionicons name="close-circle" size={24} color="#95A5A6" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  inputContainer: {
    position: 'relative',
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
  },
  clearButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  }
});