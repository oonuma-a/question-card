import { Stack } from 'expo-router';
import { StyleSheet, View } from "react-native";
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
      <SafeAreaProvider style={styles.safearea}>
        <SafeAreaView style={styles.container}>
          <View style={styles.safeview}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }}/>
            </Stack>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safearea: {
    backgroundColor: "black"
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  safeview: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 16,
  }
});
