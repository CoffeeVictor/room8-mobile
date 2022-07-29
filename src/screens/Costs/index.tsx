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
        flex: 0.2,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        shadowColor: 'black',
        elevation: 10,
        shadowOffset: {
            height: 2,
            width: 2
        }
    },
    userInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10,
    },
    userInfoText: {

    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: colors.primary
    },
    costsAreaContainer: {

    }
})