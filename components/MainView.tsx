import HowTo from '@/app/HowTo';
import QuestionSettings from '@/app/QuestionSettings';
import RegisterdQa from '@/app/RegisterdQa';
import RegisterQa from '@/app/RegisterQa';
import React, { useState } from 'react';
import { Text, View } from "react-native";


export const MainView: React.FC = () => {
  const [qaCount, setQaCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  return (
    <View>
      <Text>問題数: {qaCount}問</Text>
      <RegisterQa />
      <RegisterdQa />
      <QuestionSettings />
      <HowTo />
    </View>
  );
};
