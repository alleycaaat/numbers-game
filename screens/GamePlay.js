import { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import Heading from '../components/ui/Heading';
import GuessLogItem from '../components/game/GuessLogItem';

//exclude restricts phone from guessing number on the first round
function generateNumber(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateNumber(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GamePlay({ userNumber, onGameOver }) {
    const initialGuess = generateNumber(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    //reset the boundaries each new game
    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(direction) {
        //verify user isn't lying
        if ((direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert('Accuracy Validator', 'Lie has been detected', [
                { text: 'Sorry!', style: 'cancel' }
            ]);
            return;
        }
        if (direction === 'lower') {
            //current guess was too high, so make that the upper boundary
            //don't subtrack 1 from it to get a new number, because maxBoundary is excluded
            //when it's sent to generateNumber, so - 1 is built in
            maxBoundary = currentGuess;
        } else {
            //minBoundary is INcluded in generateNumber, so we need to + 1 to get a different number
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateNumber(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundsLength = guessRounds.length;

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <Heading style={styles.instructions}>Higher or lower?</Heading>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <PrimaryButton onPress={() => nextGuessHandler('higher')}>
                            <Ionicons name='md-add' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                    <View style={styles.button}>
                        <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                            <Ionicons name='md-remove' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <ScrollView style={styles.guessWrapper}>
                {guessRounds.map((guessRound, i) =>
                    <GuessLogItem
                        key={i}
                        roundNumber={guessRoundsLength - i}
                        guess={guessRound}
                    />)}
            </ScrollView>
        </View>
    );
}

export default GamePlay;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
    },
    instructions: {
        marginBottom: 12,
    },
    guessWrapper: {
        flex: 1,
        padding: 16,
        paddingBottom: 50,
        marginTop: 15
    },
});