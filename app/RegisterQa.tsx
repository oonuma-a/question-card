import { QaTextInput } from "@/components/Qa/QaTextInput";
import { Text } from "@react-navigation/elements";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function RegisterQa () {
  const [inputQuestionText, setInputQuestionText] = useState<string>("");
  const [inputAnswerText, setInputAnswerText] = useState<string>("");

  const onChangeInputQuestionText = (e: string) => {
    const newInputQuestionText = e;
    setInputQuestionText(newInputQuestionText);
  }

  const onChangeInputAnswerText = (e: string) => {
    const newInputAnswerText = e;
    setInputAnswerText(newInputAnswerText);
  }

  const onClickRegisterBtn = () => {
    return alert();
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>問題文</Text>
        <QaTextInput
          value={inputQuestionText}
          onChangeText={onChangeInputQuestionText}
          placeholder="問題文を入力してください"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>解答文</Text>
        <QaTextInput
          value={inputAnswerText}
          onChangeText={onChangeInputAnswerText}
          placeholder="解答文を入力してください"
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={onClickRegisterBtn}>
        <Text style={styles.registerButtonText}>登録する</Text>
      </TouchableOpacity>
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2C3E50',
  },
  registerButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});