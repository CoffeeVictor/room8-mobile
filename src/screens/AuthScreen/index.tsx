import { useState } from "react"
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { colors } from "../../constants/Colors"
import { TextInput as IconTextInput } from "react-native-paper"
import { Entypo } from "@expo/vector-icons"

export const AuthScreen: React.FC = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            // behavior={'padding'}
        >
            <View style={styles.formContainer}>
                <TextInput style={styles.formInput} placeholder={'Type your email'} keyboardType={'email-address'} />
                <IconTextInput
                    style={styles.formInput}
                    placeholder={'Type your password'}
                    secureTextEntry={!isPasswordVisible}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton}>
                    <Text>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton}>
                    <Text>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        width: '80%',
    },
    formInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    loginButton: {
        backgroundColor: colors.primary,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    registerButton: {
        backgroundColor: 'white',
        borderColor: colors.primary,
        borderWidth: 2,
        marginTop: 5,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    }
})