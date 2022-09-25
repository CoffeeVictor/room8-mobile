import React, { useEffect, useState } from 'react';
import { TopBar } from '../../components/TobBar';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TodoList } from './ItemList';
import { colors } from '../../constants/Colors';
import { useLan } from '../../contexts/LanguageContext';

export const ToDoListPage: React.FC = () => {
  const { language } = useLan();

  const [list] = useState([]);

  const handleDeleteTask = () => {};
  const handleSelectTask = () => {};

  useEffect(() => {}, []);
  return (
    <View>
      <TopBar></TopBar>
      <View style={styles.view}>
        <Text style={styles.textHeader}>{language.toDoList}</Text>
        <View>
          {list?.map((item) => (
            <TodoList
              item={item}
              key={item.value}
              deleteItem={handleDeleteTask}
              selectItem={handleSelectTask}
            ></TodoList>
          ))}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
          <Text style={styles.textBottom}>{language.toDoListButton}</Text>
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
  submitButton: {
    backgroundColor: colors.primary,
    width: '50%',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 24,
    color: colors.heading,
    marginBottom: 20,
    marginLeft: 10,
  },
  textBottom: {
    fontSize: 24,
    color: 'white',
  },
});
