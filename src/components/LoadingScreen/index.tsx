import { ActivityIndicator, StyleSheet, View } from "react-native"
import { colors } from "../../constants/Colors"

export const LoadingScreen: React.FC = () => {
    return (
        <View style={styles.container} >
            <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})