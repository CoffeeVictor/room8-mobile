import React, { useEffect, useState } from 'react';
import { TopBar } from '../../components/TobBar';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Product, ShoppingItem } from './ItemList';
import { colors } from '../../constants/Colors';
<<<<<<< feature/secon-language
import { useNavigation } from '@react-navigation/native';
import { useLan } from '../../contexts/LanguageContext';
=======
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { IAuthValue, useAuth } from '../../contexts/AuthContext';
import { useGroup } from '../../contexts/GroupContext';
import { useUser } from '../../contexts/UserContext';
>>>>>>> dev

export const ShoppingList: React.FC = () => {
  const auth = useAuth() as IAuthValue;
  const groupContext = useGroup();
  const userContext = useUser()
  const navi = useNavigation();
<<<<<<< feature/secon-language
  const [list, setList] = useState([]);
  const { language } = useLan();
=======
  const isFocused = useIsFocused();
  const [groupShopping,setGroupShopping] = useState<ShoppingItem[]>()
>>>>>>> dev

  async function fetchUserGroupShopping() {
    const userId = auth.user?.uid;

    if(!userId) return;

    const userGroup = await groupContext?.getGroupByUser(userId);

    if(!userGroup) return;

    //@ts-ignore Bad Typing
    setGroupShopping(userGroup.shoppingList) 
 }

  useEffect(() => {
    const fetchUserGroupShopping = async () => {
      const userId = auth.user?.uid;

      if(!userId) return;

      const userGroup = await groupContext?.getGroupByUser(userId);

      if(!userGroup) return;

      //@ts-ignore Bad Typing
      setGroupShopping(userGroup.shoppingList)
    }

    fetchUserGroupShopping().catch(console.error);
  }, [isFocused]);



  const handleDeleteItem = async (item: ShoppingItem) => {
    const userId = auth.user?.uid;
    if(!userId) return;
    
    const user = await userContext?.getUser(userId);

    const groupId = user?.group;

    if(!groupId) return;

    await groupContext?.deleteShoppingItemById(groupId,item);

    fetchUserGroupShopping();
  };
  return (
    <View>
      <TopBar></TopBar>
      <View style={styles.view}>
        <Text style={styles.textHeader}>{language.shoppingList}</Text>
        <View>
          <Text style={styles.textHeader}>Shopping List</Text>
          {groupShopping === undefined ? <ActivityIndicator></ActivityIndicator> :
          <View>
            {groupShopping?.map((item) => (
              <Product
                item={item}
                key={item.value}
                deleteItem={() => handleDeleteItem(item)}
              ></Product>
            ))}
          </View>
          }
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
<<<<<<< feature/secon-language
    marginLeft: 10,
    alignItems: 'center',
=======
    textAlign:'center'
>>>>>>> dev
  },
  textBottom: {
    fontSize: 24,
    color: 'white',
  },
});
