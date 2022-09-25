import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../../constants/Colors';
import { Checkbox } from 'react-native-paper';


export type TaskItem = {
  value: string;
  people: string;
}
interface TodoProps {
  item: TaskItem;
  deleteItem: Function;
  selectItem: Function;
}

export const TodoList = ({ item, deleteItem, selectItem }: TodoProps) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.listContainer}>
      <Checkbox
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={() => {
          setSelection(!isSelected);
          if (isSelected) selectItem(item);
        }}
        color={colors.primary}
      />
      <View>
        <Text style={styles.textItem}>{item?.value}</Text>
        <Text style={styles.textDate}> {item?.people}</Text>
      </View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => deleteItem()}
      >
        <MaterialIcons name='delete' size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: 'white',
    height: 'auto',
    width: 350,
    marginBottom: 30,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  componentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 'auto',
    width: 'auto',
  },

  textItem: {
    color: colors.heading,
    width: 260,
    height: 'auto',
    fontSize: 20,
    marginTop: 10,
    marginRight: 20,
  },

  textDate: {
    color: colors.primary,
    fontSize: 15,
    marginRight: 20,
    borderRadius: 10,
    width: 100,
  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 15,
    height: 40,
    borderRadius: 10,
  },

  cirlceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
  },
});
