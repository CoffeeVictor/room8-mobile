import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/Colors';
import { useAuth } from '../../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLan } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';

export const TopBar: React.FC = () => {
  const auth = useAuth();
  const lan = useLan();
  const { language } = useLan();
  const userContext = useUser();
  const [userDisplay,setUserDisplay] = useState<string>();

  const handleLogout = async () => {
    auth?.logout();
  };

  const handleLanguageChange = async () => {
    lan.setLanguage();
  };

  

  useEffect(() =>{ 
    const getUsername = async () => {
      const userId = auth?.user?.uid;
      if(!userId) return;
      
      const user = await userContext?.getUser(userId);

      const username = user?.name;

      if (!username) return

      setUserDisplay(username)
    }
    getUsername().catch(console.error)
  }
  )

  return (
    <SafeAreaView style={styles.safebar}>
      <View style={styles.container}>
        <View style={styles.userText}>
          <Ionicons name="person-circle-outline" size={24} color={colors.primary} />
          <Text style={styles.text}>{userDisplay}</Text>
        </View>
        <TouchableOpacity onPress={handleLanguageChange}>
          <Text style={styles.language}>{language.lanTopBar}</Text>
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
    fontSize: 16,
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
  userText:{
    flexDirection:'row'
  }
});
