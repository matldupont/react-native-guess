import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StartGameScreen } from './screens/StartGameScreen';
import { GameScreen } from './screens/GameScreen';
import { Colors } from './constants/color';
import { GameOverScreen } from './screens/GameOverScreen';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = React.useState<number>();
  const [gameOver, setGameOver] = React.useState(false);
  const [rounds, setRounds] = React.useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const handleNumberSubmit = (num: number) => {
    setUserNumber(num);
    setGameOver(false);
  };

  const handleGameOver = (gameRounds: number) => {
    setGameOver(true);
    setRounds(gameRounds);
  };

  const handleNewGame = () => {
    setUserNumber(undefined);
    setGameOver(false);
  };

  let screen = <StartGameScreen onNumberSubmit={handleNumberSubmit} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={handleGameOver} />;
  }

  if (gameOver) {
    screen = (
      <GameOverScreen
        onNewGame={handleNewGame}
        rounds={rounds}
        userNumber={userNumber!}
      />
    );
  }

  const onFontsLoaded = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
        onLayout={onFontsLoaded}
      >
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.screenContainer}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  screenContainer: {
    flex: 1,
    marginTop: 20,
  },
});
