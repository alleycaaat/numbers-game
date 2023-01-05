import { StyleSheet, View } from 'react-native';
import Colors from '../../util/colors';

function Card({ children }) {
    return (
        <View style={styles.card}>{children}</View>
    );
};

export default Card;
0
const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 33,
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        backgroundColor: Colors.primary800,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 2,
        shadowOpacity: 0.3,
    },
});