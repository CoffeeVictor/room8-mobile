import { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUser } from '../../contexts/UserContext';
import { colors } from '../../constants/Colors';
import { useAuth } from '../../contexts/AuthContext';
import { languageEn } from '../../../assets/language/en.json';
import { languagePt } from '../../../assets/language/pt.json';

export const AuthScreen: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState(languageEn);
  const auth = useAuth();

  const handleLogin = async () => {
    auth?.login(email, password);
  };

  const handleRegister = async () => {
    auth?.register(email, password);
  };

  const handleLanguage = async () => {
    if (language.lan === 'en') {
      setLanguage(languagePt);
    } else {
      setLanguage(languageEn);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      // behavior={'padding'}
    >
      <View style={styles.formContainer}>
        <TextInput
          style={styles.formInput}
          placeholder={language.emailInput}
          keyboardType={'email-address'}
          value={email}
          onChangeText={setEmail}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.formInput}
          placeholder={language.passwordInput}
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>{language.loginButton}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerText}>{language.registerButton}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.languageButton} onPress={handleLanguage}>
        <Text style={styles.registerText}>{language.languageButton}</Text>
      </TouchableOpacity>
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
    fontWeight: '700',
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
  languageButton: {
    backgroundColor: 'white',
    borderColor: colors.primary,
    borderWidth: 2,
    marginTop: 50,
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});
