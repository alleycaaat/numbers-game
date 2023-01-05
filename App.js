import { useState, useCallback } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import StartGame from './screens/StartGame';
import GamePlay from './screens/GamePlay';
import GameOver from './screens/GameOver';
import Colors from './util/colors';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [number, setNumber] = useState(null);
  const [isGameOver, setIsGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  function newGameHandler() {
    setNumber(null);
    setGuessRounds(0);
  }

  const [fontsLoaded] = useFonts({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  function inputHandler(input) {
    setNumber(input);
    setIsGameOver(false);
  }

  let screen = <StartGame onConfirmNumber={inputHandler} />;

  function gameOverHandler(numberOfRounds) {
    setIsGameOver(true);
    setGuessRounds(numberOfRounds);
  }

  if (number) {
    screen = (
      <GamePlay userNumber={number} onGameOver={gameOverHandler} />
    );
  }

  if (isGameOver && number) {
    screen = <GameOver userNumber={number} roundsNumber={guessRounds} onNewGame={newGameHandler} />;
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.primary700, Colors.accent500]}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        style={styles.container}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
