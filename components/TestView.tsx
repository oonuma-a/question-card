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
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {!isCompleted ? (
          <View>
            <View style={styles.cardHeader}>
              <Text style={styles.questionCounter}>{currentQuestion + 1}/{totalQuestions}</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.questionText}>
                <Text style={styles.questionTextContent}>{question()}</Text>
              </View>
              {showAnswer && (
                <View style={styles.answerText}>
                  <Text style={styles.answerTextContent}>{answer()}</Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.completedContainer}>
            <Text style={styles.completedText}>全ての問題が終了しました。</Text>
          </View>
        )}
      </View>
      <View style={styles.controlSection}>
        <View style={styles.navigationButtons}>
          {currentQuestion > 0 && (
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]} 
              onPress={handlePrevious}
            >
              <Text style={styles.buttonText}>前へ</Text>
            </TouchableOpacity>
          )}
          {!isCompleted && currentQuestion < totalQuestions && (
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]} 
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>次へ</Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          {!isCompleted && (
            <TouchableOpacity
              style={[styles.button, styles.successButton]}
              onPress={() => setShowAnswer(prev => !prev)}
            >
              <Text style={styles.buttonText}>
                {showAnswer ? '解答を非表示' : '解答を表示'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={handleReturnToMain}
        >
          <Text style={styles.buttonText}>テスト終了</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FA',
    position: 'relative',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
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
  cardHeader: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  questionCounter: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 20,
  },
  questionText: {
    backgroundColor: '#F5F7FA',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
    marginBottom: 20,
  },
  questionTextContent: {
    fontSize: 16,
    color: '#2C3E50',
  },
  answerText: {
    backgroundColor: '#F5F7FA',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  answerTextContent: {
    fontSize: 16,
    color: '#2C3E50',
  },
  completedContainer: {
    padding: 20,
    alignItems: 'center',
  },
  completedText: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  controlSection: {
    gap: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E8ED',
  },
  fixedButton: {
    backgroundColor: '#AAA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#4A90E2',
  },
  successButton: {
    backgroundColor: '#2ECC71',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
