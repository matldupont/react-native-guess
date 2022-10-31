import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/color";

type TitleProps = {
  children?: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({ children, ...props }) => {
  return (
    <Text style={styles.root} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
    fontSize: 24,

    color: "#fff",
    padding: 12,
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export { Title };
