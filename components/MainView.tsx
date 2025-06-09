import HowTo from '@/app/HowTo';
import RegisterAnswer from '@/app/RegisterAnswer';
import RegisterdQa from '@/app/RegisterdQa';
import RegisterQuestion from '@/app/RegisterQuestion';
import { QA } from '@/app/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OrderTestBtn from './OrderTestBtn';
import RandomTestBtn from './RandomTestBtn';

type Props = {
    registeredQuestions: string;
    setRegisteredQuestions: React.Dispatch<React.SetStateAction<string>>;
    setIsTestMode: React.Dispatch<React.SetStateAction<boolean>>;
    setQaList: React.Dispatch<React.SetStateAction<QA[]>>;
}

export default function MainView({
    registeredQuestions,
    setRegisteredQuestions,
    setIsTestMode,
    setQaList
}: Props) {
    const [inputQuestionText, setInputQuestionText] = useState<string>('');
    const [inputAnswerText, setInputAnswerText] = useState<string>('');
    const [showHowTo, setShowHowTo] = useState<boolean>(false);

    useEffect(() => {
        const checkShowHowTo = async () => {
            try {
                const shouldShow = await AsyncStorage.getItem('showHowTo');
                if (shouldShow === 'true') {
                    setShowHowTo(true);
                    await AsyncStorage.setItem('showHowTo', 'false');
                }
            } catch (error) {
                console.error('Error checking showHowTo:', error);
            }
        };
        checkShowHowTo();
    }, []);

    const handleHowToClose = () => {
        setShowHowTo(false);
    };

    const handleHowToButtonPress = () => {
        setShowHowTo(true);
    };

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
            prev ? `${prev}\n+++\n${newQuestion}` : newQuestion
        );

        setInputQuestionText('');
        setInputAnswerText('');
    }

    return (
        <View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleHowToButtonPress} style={styles.howToButton}>
                        <Text style={styles.howToButtonText}>？</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
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
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={onClickRegisterBtn}>
                        <Text style={styles.registerButtonText}>
                            登録
                        </Text>
                    </TouchableOpacity>
                </View>
                <RegisterdQa 
                    qaCount={qaCount()}
                    registeredQuestions={registeredQuestions}
                    setRegisteredQuestions={setRegisteredQuestions}
                />

                <View style={styles.buttonGroup}>
                    <OrderTestBtn
                        registeredQuestions={registeredQuestions}
                        setQaList={setQaList}
                        setIsTestMode={setIsTestMode}
                    />
                    <RandomTestBtn
                        registeredQuestions={registeredQuestions}
                        setQaList={setQaList}
                        setIsTestMode={setIsTestMode}
                    />
                </View>
                <HowTo visible={showHowTo} onClose={handleHowToClose} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginRight: 0,
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    howToButton: {
        backgroundColor: '#6AE025',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    howToButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 8,
    },
    registerButton: {
        backgroundColor: '#6AE025',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: 'rgba(26, 132, 0, 0.3)',
        textShadowRadius: 8,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 16,
    },
});
