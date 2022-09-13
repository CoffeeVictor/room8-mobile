import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { UserService } from "../../backend/services/user.service";
import { colors } from "../../constants/Colors";
import { useAuth } from "../../contexts/AuthContext";

export const AuthScreen: React.FC = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const userService = new UserService();

    const handleLogin = async () => {
        auth?.login(email, password);
    }
    
    const handleRegister = async () => {
        auth?.register(email, password);
    }

    const testFirestore = async () => {
        console.log('user:', await userService.getUser('jyleHYnMhUenUtuubuli'));
        console.log('All users:', await userService.getAllUsers());
        console.log('create:', await userService.createUser({ 
            id: 'BzVUzqLeSeTgGz9JUaj3Xk5LyTo2',
            email: 'sabrina@teste.com',
            name: 'Sabrina Teste',
        }));
        console.log('user:', await userService.getUserByEmail('sabrina@teste.com'));
    }

    //testFirestore()

    return (
        <KeyboardAvoidingView
            style={styles.container}
            // behavior={'padding'}
        >
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.formInput}
                    placeholder={'Type your email'}
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize={'none'}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder={'Type your password'}
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} >
                    <Text style={styles.loginText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister} >
                    <Text style={styles.registerText}>
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
        alignItems: 'center',
    },
    loginText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700'
    },
    registerButton: {
        backgroundColor: 'white',
        borderColor: colors.primary,
        borderWidth: 2,
        marginTop: 5,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    registerText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '700'
    }
})
