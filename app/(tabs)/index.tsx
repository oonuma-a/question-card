
import MainView from '@/components/MainView';
import TestView from '@/components/TestView';
import { StrictMode, useState } from 'react';
import Animated from 'react-native-reanimated';
import { QA } from '../types';
export default function Index() {
  const AnimatedScrollView = Animated.ScrollView;
  const AnimatedView = Animated.View;

  const [registeredQuestions, setRegisteredQuestions] = useState<string>('');
  const [isTestMode, setIsTestMode] = useState<boolean>(false);
  const [qaList, setQaList] = useState<QA[]>([]);

  return (
    <StrictMode>
      <AnimatedScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AnimatedView style={{ flex: 1 }}>
          {isTestMode
            ? <TestView qaList={qaList} setIsTestMode={setIsTestMode} />
            : <MainView
                registeredQuestions={registeredQuestions}
                setRegisteredQuestions={setRegisteredQuestions}
                setIsTestMode={setIsTestMode}
                setQaList={setQaList}
              />
          }
        </AnimatedView>
      </AnimatedScrollView>
    </StrictMode>
  );
}