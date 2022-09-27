import { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { colors } from '../../constants/Colors';
import { useAuth } from '../../contexts/AuthContext';

export const Register: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.registerHeader}>Register</Text>
        <TextInput
          style={styles.formInput}
          placeholder={'Type your user name'}
          keyboardType={'email-address'}
          value={userName}
          onChangeText={setUserName}
          autoCapitalize={'none'}
        />
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
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            auth?.register(email, password, userName);
          }}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 40,
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
    fontWeight: '700',
  },
  registerHeader: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '700',
    marginLeft: 90,
    marginBottom: 20,
  },
});
