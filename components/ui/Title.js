import { Text, StyleSheet } from 'react-native';

function Title({ children }) {
    return (
        <Text style={styles.title}>{children}</Text>
    );
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 21,
        color: 'white',
        textAlign: 'center',
        padding: 8,
        borderColor: 'white',
        borderWidth: 3,
        margin: 5,
        borderRadius: 5,
    },
});