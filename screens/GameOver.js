import { View, Text, Image, StyleSheet } from 'react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../util/colors';

function GameOver({ roundsNumber,userNumber, onNewGame }) {
    return (
        <View style={styles.container}>
            <Title>Game Over!</Title>
            <View style={styles.imageWrapper}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/success.png')}
                />
            </View>
            <View>
                <Text style={styles.summaryText}>
                    Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> guesses before picking your number <Text style={styles.highlight}>{userNumber}</Text>.
                </Text>
                <PrimaryButton onPress={onNewGame}>Start New Game</PrimaryButton>
            </View>
        </View>
    );
}

export default GameOver;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
    },
});