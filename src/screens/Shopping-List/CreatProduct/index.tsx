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
import Product from '../ItemList';
import { colors } from '../../../constants/Colors';

export const CreatProduct: React.FC = () => {
  const [value, setValue] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [list, setList] = useState([{ value: 'Arroz', quantite: 2 }]);

  const onChangeValue = (text) => {
    setValue(text);
  };
  const onChangeQuantite = (num) => {
    setQuantite(num);
  };

  const handelCreatTask = () => {
    const task = { value: value, quantite: quantite };
    setList([...list, task]);
  };

  const handelDeleteProduct = () => {};
  useEffect(() => {}, [list]);
  return (
    <View>
      <TopBar></TopBar>
      <View style={styles.view}>
        <View>
          <Text style={styles.TextHeader}> Adding To Shopping List</Text>
        </View>
        <View>
          {list.map((item) => {
            <Product item={item} deleteItem={handelDeleteProduct()}></Product>;
          })}
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.Input}
            placeholder='Add Product...'
            onChangeText={onChangeValue}
          />
          <TextInput
            style={styles.Input}
            placeholder='Add Quantite...'
            onChangeText={onChangeQuantite}
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
