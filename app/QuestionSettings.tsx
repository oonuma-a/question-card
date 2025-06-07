import { Text } from "@react-navigation/elements";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function QuestionSettings () {
  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          onPress={alert}
          style={styles.button}
        >
          <Text style={styles.buttonText}>最初から出題</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={alert}
          style={styles.button}
        >
          <Text style={styles.buttonText}>ランダム出題</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});