import { StyleSheet, TextInput } from "react-native";


type QaTextInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const QaTextInput: React.FC<QaTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={styles.textAreaStyle}
      multiline
    />
  );
};

const styles = StyleSheet.create({
  textAreaStyle: {
    flex: 1,
    minHeight: 100,
    padding: 12,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  }
});