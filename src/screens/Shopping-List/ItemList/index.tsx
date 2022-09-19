import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../../constants/Colors';

export default function Poduct({ item, deleteItem }) {
  return (
    <View style={styles.ListContainer}>
      <Text style={styles.TextDate}> {item?.quantite}</Text>
      <Text style={styles.TextItem}>{item?.value}</Text>

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
    alignItems: 'center',
  },

  TextItem: {
    color: colors.heading,
    width: 100,
    height: 'auto',
    fontSize: 24,
    marginTop: 10,
    marginRight: 0,
  },

  TextDate: {
    color: colors.primary,
    fontSize: 30,
    marginRight: 10,
    borderRadius: 10,
    width: 70,
    marginLeft: 10,
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
