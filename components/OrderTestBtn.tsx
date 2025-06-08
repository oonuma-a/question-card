import { QA } from "@/app/types";
import { Text } from "@react-navigation/elements";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  registeredQuestions: string;
  setQaList: React.Dispatch<React.SetStateAction<QA[]>>;
  setIsTestMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderTestBtn ({registeredQuestions, setQaList, setIsTestMode}: Props) {
  const handleOrderMode = () => {
    const newQaList = parseRegisteredQuestionsOrder(registeredQuestions);
    setQaList(newQaList);
    setIsTestMode(true);
  }

  return (
    <TouchableOpacity
      onPress={() => handleOrderMode()}
      style={styles.button}
    >
      <Text style={styles.buttonText}>最初から出題</Text>
    </TouchableOpacity>
  )
}
function parseRegisteredQuestionsOrder(data: string): QA[] {
  // 問題単位に区切る（"+++"区切り）
  const blocks = data.split('+++').map(block => block.trim()).filter(Boolean);

  // 各ブロックを "question" / "answer" に分けてオブジェクトに変換
  const qaList: QA[] = blocks.map((block, index) => {
    const [question, answer] = block.split('---').map(part => part.trim());

    return {
      id: index,
      question: question || '【問題文なし】',
      answer: answer || '【回答なし】',
    };
  });

  return qaList;
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

