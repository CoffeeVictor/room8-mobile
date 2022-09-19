import React, { useEffect, useState } from 'react';
import { TopBar } from '../../components/TobBar';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TodoList from './ItemList';
import { colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

export const ShoppingList: React.FC = () => {
  const navi = useNavigation();
  const [list] = useState([
    { value: 'Arroz', quantite: 2 },
    { value: 'Leite', quantite: 8 },
  ]);

  const handelDeleteTask = () => {};

  useEffect(() => {}, []);
  return (
    <View>
      <TopBar></TopBar>
      <View style={styles.view}>
        <View>
          <Text style={styles.TextHeader}>Shopping List</Text>
          {list.map((item) => (
            <TodoList
              item={item}
              key={item.value}
              deleteItem={handelDeleteTask()}
            ></TodoList>
          ))}
        </View>
        <TouchableOpacity
          style={styles.SubmitButton}
          onPress={() => navi.navigate('CreatProduct')}
        >
          <Text style={styles.TextBottom}>Add Product</Text>
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
    width: '50%',
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
