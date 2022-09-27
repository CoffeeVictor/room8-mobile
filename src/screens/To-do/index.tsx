import React, { useEffect, useState } from 'react';
import { TopBar } from '../../components/TobBar';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TaskItem, TodoList } from './ItemList';
import { colors } from '../../constants/Colors';
import { useLan } from '../../contexts/LanguageContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { IAuthValue, useAuth } from '../../contexts/AuthContext';
import { useGroup } from '../../contexts/GroupContext';
import { useUser } from '../../contexts/UserContext';
import { ActivityIndicator } from 'react-native-paper';

export const ToDoListPage: React.FC = () => {
  const { language } = useLan();
  const auth = useAuth() as IAuthValue;
  const groupContext = useGroup();
  const userContext = useUser();
  const navi = useNavigation();
  const isFocused = useIsFocused();
  const [groupTasks,setGroupTasks] = useState<TaskItem[]>([])
  const [list] = useState([]);

  const handleDeleteTask = async (item: TaskItem) => {
    const userId = auth.user?.uid;
    if(!userId) return;
    
    const user = await userContext?.getUser(userId);

    const groupId = user?.group;

    if(!groupId) return;

    await groupContext?.deleteTaskItemById(groupId,item);

    fetchUserGroupTasks();
  };
  const handleSelectTask = () => {};

  async function fetchUserGroupTasks() {
    const userId = auth.user?.uid;

    if(!userId) return;

    const userGroup = await groupContext?.getGroupByUser(userId);

    if(!userGroup) return;

    //@ts-ignore Bad Typing
    setGroupTasks(userGroup.taskList) 
 }

  useEffect(() => {
    const fetchUserGroupTasks = async () => {
      const userId = auth.user?.uid;

      if(!userId) return;

      const userGroup = await groupContext?.getGroupByUser(userId);

      if(!userGroup) return;

      //@ts-ignore Bad Typing
      setGroupTasks(userGroup.taskList) 
    }

    fetchUserGroupTasks().catch(console.error);
  }, [isFocused]);

  return (
    <View>
      <TopBar></TopBar>
      <View style={styles.view}>
        <View style={styles.listView}>
          <Text style={styles.textHeader}>{language.toDoList}</Text>
          {
            groupTasks === undefined ? <ActivityIndicator></ActivityIndicator> :
            <View>
              {groupTasks.map((item) => (
                <TodoList
                  item={item}
                  key={item.value}
                  deleteItem={() => handleDeleteTask(item)}
                  selectItem={handleSelectTask}
                ></TodoList>
              ))}
            </View>
          }
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={() => {
          navi.navigate('CreateTask')}}>
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
  listView:{
    width:'100%',
    alignItems:'center',
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
    textAlign:'center',
    marginBottom:25
  },
  textBottom: {
    fontSize: 20,
    color: 'white',
  },
});
