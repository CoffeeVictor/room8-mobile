import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TopBar } from '../../../components/TobBar';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { TodoList } from '../ItemList';
import { colors } from '../../../constants/Colors';
import { useLan } from '../../../contexts/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import { IAuthValue, useAuth } from '../../../contexts/AuthContext';
import { useGroup } from '../../../contexts/GroupContext';
import { useUser } from '../../../contexts/UserContext';


export const CreatTask: React.FC = () => {
  const auth = useAuth() as IAuthValue
  const groupContext = useGroup()
  const userContext = useUser()
  const [value, setValue] = useState('');
  const [people, setPeople] = useState('');
  const [list, setList] = useState([
    { value: 'Clean the table', people: 'Maely' },
  ]);
  
  const { language } = useLan();
  const navi = useNavigation()

  const onChangeValue = (text: string) => {
    setValue(text);
  };
  const onChangePeople = (text: string) => {
    setPeople(text);
  };


  const handleCreatTask = async () => {
    const userId = auth.user?.uid;
    if(!userId) return;
    
    const user = await userContext?.getUser(userId);

    const groupId = user?.group;

    if(!groupId || !value || !people) return;

    await groupContext?.addTaskItemToGroup(groupId, {
      value: value,
      people: people
    }).then(_doc =>{
      navi.goBack()
    })
  };
  return (
    <View>
      <TopBar></TopBar>
      <View style={styles.view}>
        <View>
          <Text style={styles.textHeader}>{language.toDoListAdding}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={language.toDoListAddTask}
            onChangeText={onChangeValue}
          />
          <TextInput
            style={styles.input}
            placeholder={language.toDoListAddResponseble}
            onChangeText={onChangePeople}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            handleCreatTask();
          }}
        >
          <AntDesign name='plus' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  inputContainer: {
    borderRadius: 10,
    marginTop: 20,
  },

  input: {
    fontSize: 20,
    backgroundColor: 'white',
    width: 300,
    marginRight: 20,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },

  submitButton: {
    backgroundColor: colors.primary,
    width: '30%',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  textHeader: {
    fontSize: 24,
    color: colors.heading,
  },
});
