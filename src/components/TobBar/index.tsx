import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/Colors';
import { useAuth } from '../../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { languageEn } from '../../../assets/language/en.json';
import { languagePt } from '../../../assets/language/pt.json';

export const UserContext = React.createContext(languageEn);

export const TopBar: React.FC = () => {
  const auth = useAuth();
  const [language, setLanguage] = useState(languageEn);
  <UserContext.Provider value={language}></UserContext.Provider>;

  const handleLogout = async () => {
    auth?.logout();
  };
  const handleLanguageChange = async () => {
    if (language.lan === 'en') {
      setLanguage(languagePt);
    } else {
      setLanguage(languageEn);
    }
    console.log(language.lan);
  };

  return (
    <SafeAreaView style={styles.safebar}>
      <View style={styles.container}>
        <Text style={styles.text}>{auth?.user?.email}</Text>
        <TouchableOpacity onPress={handleLanguageChange}>
          <Text style={styles.language}>En/PT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <AntDesign name='logout' size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row', // row
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
  },
  logout: {
    paddingLeft: 40,
  },
  language: {
    color: colors.primary,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  safebar: {
    width: '100%',
    alignItems: 'center',
  },
});
