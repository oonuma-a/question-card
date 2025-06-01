
import { Main } from '@/components/Main';
import { StrictMode } from 'react';
import Animated from 'react-native-reanimated';
export default function Index() {
  const AnimatedScrollView = Animated.ScrollView;
  const AnimatedView = Animated.View;
  return (
    <StrictMode>
      <AnimatedScrollView>
        <AnimatedView>
          <Main />
        </AnimatedView>
      </AnimatedScrollView>
    </StrictMode>
  );
}