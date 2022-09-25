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

export const CreatTask: React.FC = () => {
  const [value, setValue] = useState('');
  const [people, setPeople] = useState('');
  const [list, setList] = useState([
    { value: 'Clean the table', people: 'Maely' },
  ]);
  const { language } = useLan();

  const onChangeValue = (text: string) => {
    setValue(text);
  };
  const onChangePeople = (text: string) => {
    setPeople(text);
  };

  const handleCreatTask = () => {
    const task = { value: value, people: people };
    setList([...list, task]);
  };

  function handleDeleteTask() {}
  function handleSelectTask() {}

  return (
    <View>
      <TopBar></TopBar>
      <View style={styles.view}>
        <View>
          <Text style={styles.textHeader}>{language.toDoListAdding}</Text>
        </View>
        <View>
          {list.map((item) => {
            <TodoList
              item={item}
              deleteItem={handleDeleteTask}
              selectItem={handleSelectTask}
            ></TodoList>;
          })}
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
