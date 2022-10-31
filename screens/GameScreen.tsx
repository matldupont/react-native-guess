import * as React from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NumberContainer } from "../components/game/NumberContainer";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Title } from "../components/ui/Title";
import { GuessLogItem } from "../components/game/GuessLogItem";

function generateRandomBetween(
  min: number,
  max: number,
  exclude: number
): number {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }

  return rndNum;
}

let minBoundary = 1;
let maxBoundary = 100;

type GameScreenProps = {
  userNumber: number;
  onGameOver: (rounds: number) => void;
};

const GameScreen: React.FC<GameScreenProps> = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = React.useState(initialGuess);
  const [rounds, setRounds] = React.useState([initialGuess]);

  const nextGuessHandler = (dir: "lower" | "higher") => {
    console.log(minBoundary, maxBoundary, userNumber);
    if (
      (dir === "lower" && currentGuess < userNumber) ||
      (dir === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't like!", "You know this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (dir === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setRounds((prevRounds) => [newGuess, ...prevRounds]);
    setCurrentGuess(newGuess);
  };

  React.useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(rounds.length);
    }
  }, [currentGuess, userNumber, onGameOver, rounds]);

  React.useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const roundsLength = rounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>

      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={rounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={roundsLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => `${item}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});

export { GameScreen };
