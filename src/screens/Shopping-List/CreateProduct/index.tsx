import React, { useCallback, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TopBar } from '../../../components/TobBar';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Product } from '../ItemList';
import { colors } from '../../../constants/Colors';
import { IAuthValue, useAuth } from '../../../contexts/AuthContext';
import { useUser } from '../../../contexts/UserContext';
import { useGroup } from '../../../contexts/GroupContext';
import { useNavigation } from '@react-navigation/native';

export const CreatProduct: React.FC = () => {
  const auth = useAuth() as IAuthValue;
  const userContext = useUser()
  const groupContext = useGroup()
  const navi = useNavigation()
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [list, setList] = useState([]);

  const onChangeValue = (text: string) => {
    setValue(text);
  };
  const onChangeQuantity = (num: string) => {
    const num2 = parseInt(num);
    setQuantity(num2);
  };

  const handleCreateTask = async () => {
    const userId = auth.user?.uid;
    if(!userId) return;
    
    const user = await userContext?.getUser(userId);

    const groupId = user?.group;

    if(!groupId || !value || !quantity) return;

    await groupContext?.addShoppingItemToGroup(groupId, {
      value: value,
      quantity: quantity
    }).then(_doc =>{
      navi.goBack()
    })
  };

  const handleDeleteProduct = () => {};

  return (
    <View>
      <TopBar></TopBar>
      <View style={styles.view}>
        <View>
          <Text style={styles.textHeader}> Adding To Shopping List</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Add Product...'
            onChangeText={onChangeValue}
          />
          <TextInput
            style={styles.input}
            placeholder='Add Quantity...'
            onChangeText={onChangeQuantity}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            handleCreateTask();
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

  inputContainer: {
    borderRadius: 10,
    marginTop: 20,
  },

  input: {
    fontSize: 20,
    backgroundColor: 'white',
    width: 300,
    marginRight: 20,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },

  submitButton: {
    backgroundColor: colors.primary,
    width: '30%',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  textHeader: {
    fontSize: 24,
    color: colors.heading,
  },
});
