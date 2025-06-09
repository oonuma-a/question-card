import { QA } from "@/app/types";
import { Text } from "@react-navigation/elements";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  registeredQuestions: string;
  setQaList: React.Dispatch<React.SetStateAction<QA[]>>;
  setIsTestMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RandomTestBtn ({registeredQuestions, setQaList, setIsTestMode}: Props) {
  const handleRandomMode = () => {
    if (!registeredQuestions) return;
    const newQaList = parseRegisteredQuestionsRandom(registeredQuestions);
    setQaList(newQaList);
    setIsTestMode(true);
  }

  return (
    <TouchableOpacity
      onPress={() => handleRandomMode()}
      style={styles.button}
    >
      <Text style={styles.buttonText}>ランダム出題</Text>
    </TouchableOpacity>
  )
}
function parseRegisteredQuestionsRandom(data: string): QA[] {
  // 問題単位に区切る（"+++"区切り）
  const blocks = data.split('+++').map(block => block.trim()).filter(Boolean);

  const shuffledBlocks = [...blocks];
  for (let i = shuffledBlocks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledBlocks[i], shuffledBlocks[j]] = [shuffledBlocks[j], shuffledBlocks[i]];
  }

  // 各ブロックを "question" / "answer" に分けてオブジェクトに変換
  const qaList: QA[] = shuffledBlocks.map((block, index) => {
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
    backgroundColor: '#6AE025',
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

