import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/color";

type CardProps = {
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return <View style={styles.inputContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,
    alignItems: "center",
    padding: 16,
    marginTop: 100,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
});

export { Card };
