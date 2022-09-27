import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { colors } from '../../../constants/Colors';
import { IAuthValue, useAuth } from '../../../contexts/AuthContext';
import { useGroup } from '../../../contexts/GroupContext';
import { useLan } from '../../../contexts/LanguageContext';
import { useUser } from '../../../contexts/UserContext';

interface Item {
  name: string;
  status: number;
  totalexpense: number;
}

export const HomeList: React.FC = ({ people }) => {
  const auth = useAuth() as IAuthValue;
  const groupContext = useGroup();
  const userContext = useUser();
  const { language } = useLan();

  const [groupId, setGroupId] = useState('');

  useEffect(() => {
    const checkUserGroup = async () => {
      const userId = auth.user?.uid;

      if (!userId) return;

      const user = await userContext?.getUser(userId);

      const groupId = user?.group;

      if (!groupId) return;

      setGroupId(groupId);

      console.log('set group', groupId);
    };

    checkUserGroup().catch(console.error);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerTable}>
          <DataTable>
            <DataTable.Header style={styles.textTable}>
              <DataTable.Title>
                <Text style={styles.textTable}>{language.HomeListName}</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.textTable}>{language.HomeListStatus}</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={styles.textTable}>{language.HomeListExpense}</Text>
              </DataTable.Title>
              <DataTable.Title>-</DataTable.Title>
            </DataTable.Header>
            {people?.map((item: Item) => (
              <DataTable.Row style={styles.text} key={item.name + 'row'}>
                <DataTable.Cell>
                  <Text style={styles.text}>{item.name}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.text}> {item.status}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text style={styles.text}> {item.totalexpense}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  {
                    <TouchableOpacity
                      style={styles.buttonRemove}
                      onPress={() => console.log('remove')}
                    >
                      <AntDesign
                        name='delete'
                        size={20}
                        color={colors.primary}
                      ></AntDesign>
                    </TouchableOpacity>
                  }
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>

        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => console.log(groupId)}
        >
          <Text style={styles.textButton}>{language.shareGroup}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  containerTable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },

  scrollView: {
    marginBottom: 10,

    width: '100%',
    height: '100%',
  },

  card: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 6,
    height: 40,
    alignContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    color: colors.heading,
    marginLeft: 5,
  },
  textTable: {
    fontSize: 18,
    backgroundColor: colors.accent,
    color: colors.primary,
  },
  button: { paddingLeft: 40 },
  textButton: {
    color: 'white',
    fontSize: 20,
  },
  buttonAdd: {
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  buttonRemove: {
    width: '30%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});
