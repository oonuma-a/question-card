import { QA } from '@/app/types';
import { Text } from '@react-navigation/elements';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";


type Props = {
  qaList: QA[];
  setIsTestMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TestView ({
  qaList,
  setIsTestMode
}: Props
) {
  const totalQuestions = qaList.length;
  const question = () => qaList[currentQuestion].question;
  const answer = () => qaList[currentQuestion].answer;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setIsCompleted(true)
    }
    
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowAnswer(false);
    }
    if (currentQuestion == totalQuestions - 1) {
      setIsCompleted(false)
    }
  };
  const handleReturnToMain = () => {
    setIsTestMode(false)
  }

  return (
    <View>
      <View>
        {!isCompleted ? (
          <View>
            <Text>{currentQuestion + 1}/{totalQuestions}</Text>
            <Text>{question()}</Text>
            {showAnswer && <Text>{answer()}</Text>}
            {showAnswer ? (
              <TouchableOpacity onPress={() => setShowAnswer(false)}><Text>解答を非表示</Text></TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShowAnswer(true)}><Text>解答を表示</Text></TouchableOpacity>
            )}
          </View>
        ) : (
          <View>全ての問題が終了しました。</View>
        )}
      </View>
      <View>
        <View>
          <TouchableOpacity onPress={handlePrevious}>
            <Text>前へ</Text>
          </TouchableOpacity>
          {!isCompleted && 
            <TouchableOpacity onPress={handleNext}>
              <Text>次へ</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={handleReturnToMain}>
            <Text>戻る</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2C3E50',
  },

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
