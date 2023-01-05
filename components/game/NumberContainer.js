import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../util/colors';

function NumberContainer({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
}

export default NumberContainer;

const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        borderColor: Colors.accent500,
        padding: 21,
        borderRadius: 5,
        margin: 21,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.accent500,
        fontSize: 21,
        font: 'open-sans-bold',
    },
});