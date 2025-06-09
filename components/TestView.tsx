import { QA } from '@/app/types';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@react-navigation/elements';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

type Props = {
    qaList: QA[];
    setIsTestMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const { width } = Dimensions.get('window');

export default function TestView({
    qaList,
    setIsTestMode
}: Props) {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const flipProgress = useSharedValue(0);
    const cardRotation = useSharedValue(0);

    const totalQuestions = qaList.length;
    const question = () => qaList[currentQuestion].question;
    const answer = () => qaList[currentQuestion].answer;

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const rotateY = interpolate(
            cardRotation.value,
            [0, 1],
            [0, 180]
        );
        return {
            transform: [
                { perspective: 1000 },
                { rotateY: `${rotateY}deg` },
            ],
            backfaceVisibility: 'hidden',
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        const rotateY = interpolate(
            cardRotation.value,
            [0, 1],
            [180, 360]
        );
        return {
            transform: [
                { perspective: 1000 },
                { rotateY: `${rotateY}deg` },
            ],
            backfaceVisibility: 'hidden',
        };
    });

    const handleFlip = () => {
        setShowAnswer(!showAnswer);
        cardRotation.value = withSpring(cardRotation.value === 0 ? 1 : 0, {
            damping: 15,
            stiffness: 100,
        });
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
          flipProgress.value = withTiming(1, { duration: 300 });

          // React の状態更新はメインスレッドで実行
          setTimeout(() => {
              setCurrentQuestion(prev => prev + 1);
              setShowAnswer(false);
              cardRotation.value = 0;
              flipProgress.value = withTiming(0);
          }, 300);
        } else {
            setIsCompleted(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
          flipProgress.value = withTiming(1, { duration: 300 });

          // React の状態更新はメインスレッドで実行
          setTimeout(() => {
              setCurrentQuestion(prev => prev - 1);
              setShowAnswer(false);
              cardRotation.value = 0;
              flipProgress.value = withTiming(0);
          }, 300);
        }

        if (currentQuestion === totalQuestions - 1) {
            setIsCompleted(false);
        }
    };

    const handleReturnToMain = () => {
        setIsTestMode(false);
    };

    if (isCompleted) {
        return (
            <View style={styles.completedContainer}>
                <Text style={styles.completedText}>お疲れ様でした！</Text>
                <TouchableOpacity
                    style={styles.returnButton}
                    onPress={handleReturnToMain}
                >
                    <Text style={styles.returnButtonText}>メインに戻る</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.returnIconButton}
                onPress={handleReturnToMain}
            >
                <Ionicons name="return-up-back" size={28} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                    {currentQuestion + 1} / {totalQuestions}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={handleFlip}
                activeOpacity={1}
            >
                <Animated.View style={[styles.card, frontAnimatedStyle]}>
                    <Text style={styles.cardText}>{question()}</Text>
                </Animated.View>
                <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
                    <Text style={styles.cardText}>{answer()}</Text>
                </Animated.View>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.previousButton]}
                    onPress={handlePrevious}
                    disabled={currentQuestion === 0}
                >
                    <Text style={styles.buttonText}>前へ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.nextButton]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>次へ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // backgroundColor: '#F8F9FA',
    },
    returnIconButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
        padding: 8,
        backgroundColor: '#95A5A6',
        borderRadius: 8,
    },
    progressContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    progressText: {
        fontSize: 16,
        color: '#2C3E50',
        fontWeight: '600',
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: width - 64,
        height: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardBack: {
        backgroundColor: '#90E24A',
    },
    cardText: {
        fontSize: 24,
        textAlign: 'center',
        color: '#2C3E50',
        lineHeight: 32,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 12,
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    previousButton: {
        backgroundColor: '#95A5A6',
    },
    nextButton: {
        backgroundColor: '#70E22A',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    completedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    completedText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 20,
    },
    returnButton: {
        backgroundColor: '#70E22A',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    returnButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
