import HowTo from '@/app/HowTo';
import QuestionSettings from '@/app/QuestionSettings';
import RegisterAnswer from '@/app/RegisterAnswer';
import RegisterdQa from '@/app/RegisterdQa';
import RegisterQuestion from '@/app/RegisterQuestion';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export const MainView: React.FC = () => {
  type QA = {
    id: number;
    question: string;
    answer: string;
  };

  const [inputQuestionText, setInputQuestionText] = useState<string>("");
  const [inputAnswerText, setInputAnswerText] = useState<string>("");
  const [registeredQuestions, setRegisteredQuestions] = useState<string>('');

  const qaCount = ():number => {
    if (registeredQuestions === "") return 0;
    const matches = registeredQuestions.match(/\+\+\+/g);
    return matches? matches.length + 1 : 1;
  }

  const onClickRegisterBtn = () => {
    const trimmedQuestion = inputQuestionText?.trim();
    const trimmedAnswer = inputAnswerText?.trim();

    // Question, Answerが両方とも未入力なら処理を終了
    const isQuestionEmpty = !trimmedQuestion;
    const isAnswerEmpty = !trimmedAnswer;
    if (isQuestionEmpty && isAnswerEmpty) {
      return;
    }

    const Question = trimmedQuestion || '【問題文なし】';
    const Answer = trimmedAnswer || '【解答文なし】';

    // RegisterdQaへテキストを整形して登録
    const newQuestion = `${Question}\n---\n${Answer}`;
    setRegisteredQuestions(prev => 
      prev ? `${prev}\n+++\n${newQuestion}\n` : newQuestion
    );

    setInputQuestionText('');
    setInputAnswerText('');
  }
  return (
    <View>
      <Text>問題数: {qaCount()}問</Text>
      <View style={styles.container}>
        <Text style={styles.label}>問題文</Text>
        <RegisterQuestion 
        inputQuestionText={inputQuestionText}
        setInputQuestionText={setInputQuestionText}
        />
        <Text style={styles.label}>解答文</Text>
        <RegisterAnswer
        inputAnswerText={inputAnswerText}
        setInputAnswerText={setInputAnswerText}
        />
      </View>
      <TouchableOpacity
      style={styles.registerButton}
      onPress={onClickRegisterBtn}>
        <Text
        style={styles.registerButtonText}>
          登録する
        </Text>
      </TouchableOpacity>
      <RegisterdQa 
      registeredQuestions={registeredQuestions}
      setRegisteredQuestions={setRegisteredQuestions}
      />
      <QuestionSettings />
      <HowTo />
    </View>
  );
};

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
