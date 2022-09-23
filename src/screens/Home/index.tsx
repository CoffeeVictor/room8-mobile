import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBar } from '../../components/TobBar';
import { colors } from '../../constants/Colors';
import { HomeList } from './HomeList';
import { useNavigation } from '@react-navigation/native';
import { CreateGroup } from '../CreateGroup';
import { IAuthValue, useAuth } from '../../contexts/AuthContext';
import { useGroup } from '../../contexts/GroupContext';
import { useUser } from '../../contexts/UserContext';
import { ActivityIndicator } from 'react-native-paper';


export const Home: React.FC = () => {
  const auth = useAuth() as IAuthValue;
  const groupContext = useGroup();
  const userContext = useUser();
  const navi = useNavigation()
  const people = [
    { name: 'Maely', totalexpense: '23.43', status: 'Pay' },
    { name: 'Rodrigues', totalexpense: '23.43', status: 'Receive' },
    { name: 'Victor', totalexpense: '0', status: 'Ok' },
  ];
  const [groupId, setGroupId] = useState('');
  const [group, setGroup] = useState('');
  const [userHasGroup, setUserHasGroup] = useState(-1);

  useEffect(() => {
    const checkUserGroup = async () => {
    
      const userId = auth.user?.uid;
  
      if(!userId) return;
  
      const user = await userContext?.getUser(userId);
  
      const groupId = user?.group;
  
      if (!groupId) {
        setUserHasGroup(0);
        return
      }
  
      setGroup(groupId);
      setUserHasGroup(1);
  
      console.log('set group', groupId);
    }

    checkUserGroup().catch(console.error);


  }, []);

  const onJoinButtonPressed = async () => {

    const user = auth?.user?.uid;
    
    if (!user || !groupId) return;

    await groupContext?.addUserToGroup(groupId, [user])
      .then(response => console.log('response', response));

  }

  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <SafeAreaView style={styles.view}>

        {userHasGroup == -1 ? (
          <ActivityIndicator />
        ) : userHasGroup === 0 ? (
          <SafeAreaView>
            <Text style={styles.text}>You don't have a group</Text>
            <Text style={styles.text}>Join a group or create a new one</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navi.navigate('Create')}
            >
              <Text style={styles.textButton}> Create Group</Text>
            </TouchableOpacity>

            <Text style={styles.text}>Or join an already created group :</Text>
            <TextInput
              style={styles.formInput}
              placeholder={'Enter the Group Code'}
              value={groupId}
              onChangeText={setGroupId}
              autoCapitalize={'none'}
            ></TextInput>
            <TouchableOpacity
              style={styles.button}

              onPress={onJoinButtonPressed}
            >
              <Text style={styles.textButton}> Join Group</Text>
            </TouchableOpacity>
          </SafeAreaView>
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
