import React, { useEffect, useState } from 'react';
import { TopBar } from '../../components/TobBar';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TodoList from './ItemList';
import { colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

export const ToDoListPage: React.FC = () => {
  const [list] = useState([
    { value: 'Clean the table', people: 'Maely' },
    { value: 'Clean the bathroom', people: 'Rodrigues' },
  ]);

  const handelDeleteTask = () => {};
  const handelSelectTask = () => {};
  const navi = useNavigation();

  useEffect(() => {}, []);
  return (
    <View>
      <TopBar></TopBar>
      <View style={styles.view}>
        <View>
          <Text style={styles.TextHeader}>To-Do List</Text>
          {list.map((item) => (
            <TodoList
              item={item}
              key={item.value}
              deleteItem={handelDeleteTask()}
              selectItem={handelSelectTask()}
            ></TodoList>
          ))}
        </View>
        <TouchableOpacity
          style={styles.SubmitButton}
          onPress={() => {
            navi.navigate('CreatTask');
          }}
        >
          <Text style={styles.TextBottom}>Creat Task</Text>
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
  SubmitButton: {
    backgroundColor: colors.primary,
    width: '40%',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  TextHeader: {
    fontSize: 24,
    color: colors.heading,
    marginBottom: 20,
    marginLeft: 120,
  },
  TextBottom: {
    fontSize: 24,
    color: 'white',
  },
});
