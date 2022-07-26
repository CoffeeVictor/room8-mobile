import { Image, StyleSheet, Text, View } from "react-native"
import { colors } from "../../constants/Colors"

const avatar_url = 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Henry_Cavill_by_Gage_Skidmore.jpg'

export const Costs: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.userInfoArea}>
                <View style={styles.userInfoContainer}>
                    <Image style={styles.avatar} source={{
                        uri: avatar_url
                    }} />
                    <Text style={styles.userInfoText}>
                        You don't have any bills.
                    </Text>
                </View>
            </View>
            <View style={styles.costsAreaContainer}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    userInfoArea: {
        flex: 0.25,
        width: '100%',
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start'
    },
    userInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10
    },
    userInfoText: {

    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    costsAreaContainer: {

    }
})