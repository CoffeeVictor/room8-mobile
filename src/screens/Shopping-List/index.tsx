import React, { useEffect, useState } from 'react';
import { TopBar } from '../../components/TobBar';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Product } from './ItemList';
import { colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useLan } from '../../contexts/LanguageContext';

export const ShoppingList: React.FC = () => {
  const navi = useNavigation();
  const [list, setList] = useState([]);
  const { language } = useLan();

  const handleDeleteTask = () => {};
  return (
    <View>
      <TopBar></TopBar>
      <View style={styles.view}>
        <Text style={styles.textHeader}>{language.shoppingList}</Text>
        <View>
          {list?.map((item) => (
            <Product
              item={item}
              key={item.value}
              deleteItem={handleDeleteTask}
            ></Product>
          ))}
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navi.navigate('CreatProduct')}
        >
          <Text style={styles.textBottom}>{language.shoppingListButton}</Text>
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
    alignItems: 'center',
  },
  textBottom: {
    fontSize: 24,
    color: 'white',
  },
});
