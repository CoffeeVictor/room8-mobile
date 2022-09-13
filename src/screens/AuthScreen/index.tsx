import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GroupService } from "../../backend/services/group.service";
import { UserService } from "../../backend/services/user.service";
import { colors } from "../../constants/Colors";
import { useAuth } from "../../contexts/AuthContext";

export const AuthScreen: React.FC = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();

    const handleLogin = async () => {
        auth?.login(email, password);
    }
    
    const handleRegister = async () => {
        auth?.register(email, password);
    }

    // const testFirestore = async () => {

    //     const userService = new UserService();

    //     console.log('user:', await userService.getUser('jyleHYnMhUenUtuubuli'));
    //     console.log('All users:', await userService.getAllUsers());
    //     console.log('create:', await userService.createUser({ 
    //         id: 'BzVUzqLeSeTgGz9JUaj3Xk5LyTo2',
    //         email: 'sabrina@teste.com',
    //         name: 'Sabrina Teste',
    //     }));
    //     console.log('user:', await userService.getUserByEmail('sabrina@teste.com'));

        
    //     const groupService = new GroupService();
    //     console.log('group:', await groupService.getGroup('wOMYmmxmc4Lr0WjtTQt0'));
    //     console.log('All groups:', await groupService.getAllGroups());
    //     console.log('create:', await groupService.createGroup({
    //         name: 'Grupo Teste',
    //         users: [],
    //     }));
        
    //     console.log('group:', await groupService.addUserToGroup('Zrm0kLLz4Ld0cZLaiqcU', ['BzVUzqLeSeTgGz9JUaj3Xk5LyTo2']));
    //     console.log('group:', await groupService.getGroupByUser('BzVUzqLeSeTgGz9JUaj3Xk5LyTo2'));
    // }

    // testFirestore()

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
