import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/color";

type PrimaryButtonProps = {
  children?: React.ReactNode;
  onPress: () => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onPress }) => {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.innerContainer, styles.pressed]
            : styles.innerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
    elevation: 10,
  },
  innerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

export { PrimaryButton };
