import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  qaCount: number;
  registeredQuestions: string;
  setRegisteredQuestions: (text: string) => void;
}

const STORAGE_KEY = '@registered_questions';

export default function RegisterdQa ({qaCount, registeredQuestions, setRegisteredQuestions}: Props) {
  // コンポーネントマウント時に保存されたデータを読み込む
  useEffect(() => {
    const loadSavedQuestions = async () => {
      try {
        const savedQuestions = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedQuestions !== null) {
          setRegisteredQuestions(savedQuestions);
        }
      } catch (error) {
        console.error('保存された問題の読み込みに失敗しました:', error);
      }
    };

    loadSavedQuestions();
  }, []);

  // 問題が更新されるたびに保存する
  useEffect(() => {
    const saveQuestions = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, registeredQuestions);
      } catch (error) {
        console.error('問題の保存に失敗しました:', error);
      }
    };

    saveQuestions();
  }, [registeredQuestions]);

  const handleClear = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setRegisteredQuestions('');
    } catch (error) {
      console.error('問題の削除に失敗しました:', error);
    }
  };

  return (
    // <LinearGradient
    //   colors={['#2A89F2','#2A50F2', '#502AF2']}
    //   style={styles.container}
    // >
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>登録済みの問題 ({qaCount}問)</Text>
        {registeredQuestions.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Ionicons name="trash-outline" size={24} color="#95A5A6" />
          </TouchableOpacity>
        )}
      </View>
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
    flex: 1,
    padding: 16,
    backgroundColor: '#DADBDF',
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#221',
    textAlign: "center",
  },
  textAreaStyle: {
    flex: 1,
    minHeight: 100,
    padding: 12,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  clearButton: {
    padding: 4,
  }
});