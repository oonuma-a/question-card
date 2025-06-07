import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

export default function HowTo () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>使い方</Text>
      <View style={styles.content}>
        <Text style={styles.step}>1. 問題文と解答文を入力して「登録する」ボタンを押してください</Text>
        <Text style={styles.step}>2. 「最初から出題」または「ランダム出題」を選択して学習を開始できます</Text>
        <Text style={styles.note}>※ 登録した問題は保存されません。必要に応じてコピーして保存してください。</Text>
      </View>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  content: {
    gap: 8,
  },
  step: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
    padding: 8,
    backgroundColor: '#F5F7FA',
    borderRadius: 4,
  },
});