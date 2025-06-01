import React from "react";
import { Text, View } from "react-native";

export const Main: React.FC = () => {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        暗記カード作成ツール
      </Text>
      {/* <Qa />
      <RegisterdQa />
      <HowTo /> */}
    </View>
  );
};
