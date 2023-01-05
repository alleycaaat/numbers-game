import { useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../util/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import Heading from '../components/ui/Heading';
//need to get the buttons to show up properly, idfk what their major malfunction is
function StartGame({ onConfirmNumber }) {
    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler(input) {
        setEnteredNumber(input);
    }

    function resetInput() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!',
                'Number must be from 1-99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInput }]
            );
            return;
        }

        onConfirmNumber(chosenNumber);
    }

    return (
        <View style={styles.root}>
            <Title>Guess My Number</Title>
            <Card>
                <Heading>Enter a number</Heading>
                <TextInput
                    onChangeText={numberInputHandler}
                    value={enteredNumber}
                    style={styles.textInput}
                    maxLength={2}
                    keyboardType='number-pad'
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <PrimaryButton onPress={resetInput}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.button}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    );
}

export default StartGame;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
    },
});