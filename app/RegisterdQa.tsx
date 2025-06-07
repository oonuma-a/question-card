import { StyleSheet, Text, TextInput, View } from "react-native";

export default function RegisterdQa () {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>登録済みの問題</Text>
      <TextInput
        style={styles.textArea}
        placeholder="登録された問題がここに表示されます"
        multiline
        editable={false}
      />
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2C3E50',
  },
  textArea: {
    minHeight: 150,
    borderWidth: 2,
    borderColor: '#E1E8ED',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F5F7FA',
  },
});