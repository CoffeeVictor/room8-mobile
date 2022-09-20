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
import TodoList from '../ItemList';
import { colors } from '../../../constants/Colors';

export const CreatTask: React.FC = () => {
  const [value, setValue] = useState('');
  const [people, setPeople] = useState('');
  const [list, setList] = useState([
    { value: 'Clean the table', people: 'Maely' },
  ]);

  const onChangeValue = (text) => {
    setValue(text);
  };
  const onChangePeople = (text) => {
    setPeople(text);
  };

  const handelCreatTask = () => {
    const task = { value: value, people: people };
    setList([...list, task]);
  };

  const handelDeleteTask = () => {};
  useEffect(() => {}, [list]);
  return (
    <View>
      <TopBar></TopBar>
      <View style={styles.view}>
        <View>
          <Text style={styles.TextHeader}> Adding To To-Do List</Text>
        </View>
        <View>
          {list.map((item) => {
            <TodoList item={item} deleteItem={handelDeleteTask()}></TodoList>;
          })}
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.Input}
            placeholder='Add Task...'
            onChangeText={onChangeValue}
          />
          <TextInput
            style={styles.Input}
            placeholder='Add Responsible...'
            onChangeText={onChangePeople}
          />
        </View>
        <TouchableOpacity
          style={styles.SubmitButton}
          onPress={() => {
            handelCreatTask();
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

  InputContainer: {
    borderRadius: 10,
    marginTop: 20,
  },

  Input: {
    fontSize: 20,
    backgroundColor: 'white',
    width: 300,
    marginRight: 20,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },

  SubmitButton: {
    backgroundColor: colors.primary,
    width: '30%',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  TextHeader: {
    fontSize: 24,
    color: colors.heading,
  },
});
