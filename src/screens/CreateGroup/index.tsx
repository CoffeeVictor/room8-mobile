import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { colors } from '../../constants/Colors';
import React, { useEffect, useState } from 'react';
import { db, firestore } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { TopBar } from '../../components/TobBar';
import { useLan } from '../../contexts/LanguageContext';

export const CreateGroup: React.FC = () => {
  const { language } = useLan();

  const auth = useAuth();
  const groupContext = useGroup();
  const userContext = useUser();
  const [groupName, setGroupName] = useState('');
  const navi = useNavigation();

  const onCreateButtonPress = async () => {
    const user = auth?.user?.uid;

    if (!user) return;

    let users = [user];
    let items = [''];
    if (groupName && groupName.length > 0) {
      const data = {
        name: groupName,
        users: users,
        items: items,
      };
      const group = await groupContext?.createGroup(data);

      if (!group) return;
      console.log('group id:', group);

      await userContext?.addGroupToUser(group, user).then((_doc) => {
        setGroupName('');
        console.log(_doc);
        navi.goBack();
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TopBar></TopBar>
      <View style={styles.formArea}>
        <Text style={styles.listItem}>{language.createGroup}</Text>
        <TextInput
          style={styles.formInput}
          placeholder={language.createGroupInput}
          value={groupName}
          onChangeText={setGroupName}
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.createGroupButton}
          onPress={onCreateButtonPress}
        >
          <Text style={styles.createGroupText}>
            {language.createGroupButton}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formArea: {
    flex: 0.3,
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  formInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonArea: {
    flex: 0.2,
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  addMemberButton: {
    backgroundColor: 'white',
    borderColor: colors.primary,
    borderWidth: 2,
    marginTop: 5,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addMemberText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  createGroupButton: {
    backgroundColor: colors.primary,
    width: '100%',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  createGroupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  memberListArea: {
    flex: 0.4,
    width: '80%',
  },
  memberListView: {
    paddingVertical: 40,
  },
  listItem: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
});
