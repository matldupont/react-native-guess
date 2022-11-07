import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Card } from '../components/ui/Card';
import { InstructionText } from '../components/ui/InstructionText';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Title } from '../components/ui/Title';
import { Colors } from '../constants/color';

type StartGameScreenProps = {
  onNumberSubmit: (num: number) => void;
};

const StartGameScreen: React.FC<StartGameScreenProps> = ({
  onNumberSubmit,
}) => {
  const [value, setValue] = React.useState('');

  const { width, height } = useWindowDimensions();

  const handleValueChange = (text: string) => {
    setValue(text);
  };

  const handleConfirmClick = () => {
    const chosenNumber = parseInt(value);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show alert
      Alert.alert(
        'Invalid number!',
        'You must enter a number between 0 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: reset }]
      );
      return;
    }
    onNumberSubmit(chosenNumber);
  };

  const reset = () => {
    setValue('');
  };

  const marginTop = height < 400 ? 20 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.root, { marginTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.input}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={handleValueChange}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={reset}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleConfirmClick}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  root: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },

  input: {
    height: 50,
    width: 50,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.accent500,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    marginVertical: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});

export { StartGameScreen };
