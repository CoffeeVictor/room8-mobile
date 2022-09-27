import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { colors } from '../../../constants/Colors';
import { DataTable } from 'react-native-paper';
import { useGroup } from '../../../contexts/GroupContext';
import { useEffect, useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { IAuthValue, useAuth } from '../../../contexts/AuthContext';
import { useLan } from '../../../contexts/LanguageContext';
import * as Clipboard from 'expo-clipboard';

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
    };

    checkUserGroup().catch(console.error);
  }, []);

  const shareGroupAlert = () =>
    Alert.alert(
      language.homeShareAlertTitle,
      groupId,
      [
        {
          text: language.homeShareAlertButton,
          onPress: () => {
            Clipboard.setStringAsync(groupId)
            ToastAndroid.show(language.homeShareToastMessage,ToastAndroid.SHORT)
          }
        },
        {
          text: 'Ok'
        }
      ]
    );
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerTable}>
          <DataTable>
            <DataTable.Header style={styles.textTable}>
              <DataTable.Title>
                <Text style={styles.textTable}>{language.HomeListName}</Text>
              </DataTable.Title>
            </DataTable.Header>
            {people?.map((item: Item) => (
              <DataTable.Row style={styles.text} key={item.name + 'row'}>
                <DataTable.Cell>
                  <Text style={styles.text}>{item.name}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>

        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={shareGroupAlert}
        >
          <Text style={styles.textButton}>{language.homeShareButton}</Text>
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
