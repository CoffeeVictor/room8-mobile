import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/Colors";
import { useAuth } from "../../contexts/AuthContext";

export const Home: React.FC = () => {

    const auth = useAuth();

    const handleLogout = async () => {
        auth?.logout();
    }

    return (
        <View style={styles.container}>
            <Text>
                Bem vindo {auth?.user?.email}
            </Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutButton: {
        backgroundColor: 'white',
        borderColor: colors.primary,
        borderWidth: 2,
        marginTop: 5,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '700'
    }
})
