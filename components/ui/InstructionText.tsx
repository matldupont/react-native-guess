import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { Colors } from "../../constants/color";

type InstructionTextProps = {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
};
const InstructionText: React.FC<InstructionTextProps> = ({
  children,
  style,
}) => <Text style={[styles.instructionText, style]}>{children}</Text>;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontFamily: "open-sans",
    fontSize: 24,
  },
});

export { InstructionText };
