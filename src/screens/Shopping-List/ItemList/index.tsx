import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../../constants/Colors';

export const Product: React.FC = ({ item, deleteItem }) => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.textDate}> {item?.quantity}</Text>
      <Text style={styles.textItem}>{item?.value}</Text>

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
    alignItems: 'center',
  },

  textItem: {
    color: colors.heading,
    width: 100,
    height: 'auto',
    fontSize: 24,
    marginTop: 10,
    marginRight: 0,
  },

  textDate: {
    color: colors.primary,
    fontSize: 30,
    marginRight: 10,
    borderRadius: 10,
    width: 70,
    marginLeft: 10,
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
