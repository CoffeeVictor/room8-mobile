import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBar } from '../../components/TobBar';
import { colors } from '../../constants/Colors';
import { IAuthValue, useAuth } from '../../contexts/AuthContext';
import { useGroup } from '../../contexts/GroupContext';
import { useLan } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';
import { HomeList } from './HomeList';

export const Home: React.FC = () => {
  const auth = useAuth() as IAuthValue;
  const groupContext = useGroup();
  const userContext = useUser();
  const navi = useNavigation();
  const people: any = [];
  const [groupId, setGroupId] = useState('');
  const [group, setGroup] = useState('');
  const [userHasGroup, setUserHasGroup] = useState(-1);
  const { language } = useLan();

  useEffect(() => {
    const checkUserGroup = async () => {
      const userId = auth.user?.uid;

      if (!userId) return;

      const user = await userContext?.getUser(userId);

      const groupId = user?.group;

      if (!groupId) {
        setUserHasGroup(0);
        return;
      }

      setGroup(groupId);
      setUserHasGroup(1);

      console.log('set group', groupId);
    };

    checkUserGroup().catch(console.error);
  }, []);

  const onJoinButtonPressed = async () => {
    const user = auth?.user?.uid;

    if (!user || !groupId) return;

    await groupContext
      ?.addUserToGroup(groupId, [user])
      .then((response) => console.log('response', response));
  };

  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <SafeAreaView style={styles.view}>
        {userHasGroup == -1 ? (
          <ActivityIndicator />
        ) : userHasGroup === 0 ? (
          <ScrollView style={styles.scrollview}>
            <Text style={styles.text}>{language.homeTextNoGroup}</Text>
            <Text style={styles.text}>{language.homeTextJoinGroup}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navi.navigate('Create')}
            >
              <Text style={styles.textButton}>
                {language.homeCreateGroupButton}
              </Text>
            </TouchableOpacity>

            <Text style={styles.text}>{language.homeJoinGroup}</Text>
            <TextInput
              style={styles.formInput}
              placeholder={language.homeJoinGroupInput}
              keyboardType={'name-phone-pad'}
              value={groupId}
              onChangeText={setGroupId}
              autoCapitalize={'none'}
            ></TextInput>
            <TouchableOpacity
              style={styles.button}
              onPress={onJoinButtonPressed}
            >
              <Text style={styles.textButton}>
                {language.homeJoinGroupButton}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <HomeList people={people}></HomeList>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  formInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  scrollview: {
    marginBottom: 90,
  },
  view: {
    marginBottom: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  text: {
    color: colors.heading,
    fontSize: 20,
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    width: '50%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
  },
});
