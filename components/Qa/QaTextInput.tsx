import { TextInput } from "react-native";

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
  const textAreaStyle = {
    flex: 1,
    minHeight: 100,
    padding: 12,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  };

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={textAreaStyle}
      multiline
    />
  );
};