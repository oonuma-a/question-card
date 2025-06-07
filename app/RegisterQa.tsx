import { QaTextInput } from "@/components/Qa/QaTextInput";
import { Text } from "@react-navigation/elements";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

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
    <>
        <QaTextInput
          value={inputQuestionText}
          onChangeText={onChangeInputQuestionText}
          placeholder="問題文を入力してください"
        />
        <QaTextInput
          value={inputAnswerText}
          onChangeText={onChangeInputAnswerText}
          placeholder="解答文を入力してください"
        />

        <TouchableOpacity onPress={onClickRegisterBtn}>
          <Text>登録する</Text>
        </TouchableOpacity>
    </>
  );
}