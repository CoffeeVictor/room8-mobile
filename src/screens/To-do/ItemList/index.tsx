import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../../constants/Colors';
import { Checkbox } from 'react-native-paper';

export default function TodoList({ item, deleteItem, selectItem }) {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.ListContainer}>
      <Checkbox
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={() => {
          setSelection(!isSelected);
          if (isSelected) selectItem(item);
        }}
        color={colors.primary}
      />
      <View>
        <Text style={styles.TextItem}>{item?.value}</Text>
        <Text style={styles.TextDate}> {item?.people}</Text>
      </View>
      <TouchableOpacity
        style={styles.IconContainer}
        onPress={() => deleteItem(item?.key)}
      >
        <MaterialIcons name='delete' size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ListContainer: {
    backgroundColor: 'white',
    height: 'auto',
    width: 350,
    marginBottom: 30,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ComponentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 'auto',
    width: 'auto',
  },

  TextItem: {
    color: colors.heading,
    width: 260,
    height: 'auto',
    fontSize: 20,
    marginTop: 10,
    marginRight: 20,
  },

  TextDate: {
    color: colors.primary,
    fontSize: 15,
    marginRight: 20,
    borderRadius: 10,
    width: 100,
  },

  IconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 15,
    height: 40,
    borderRadius: 10,
  },

  CirlceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
  },
});
