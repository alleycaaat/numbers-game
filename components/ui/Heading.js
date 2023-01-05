import { Text, StyleSheet } from 'react-native';
import Colors from '../../util/colors';

function Heading({ children, style }) {
    return <Text style={[styles.instructions, style]}>{children}</Text>;
}

export default Heading;

const styles = StyleSheet.create({
    instructions: {
        color: Colors.accent500,
        fontSize: 21,
        fontFamily: 'open-sans',
    },
});