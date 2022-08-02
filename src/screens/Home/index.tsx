import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../constants/Colors';
import { useAuth } from '../../contexts/AuthContext';
import { AntDesign } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';
import { useState } from 'react';
import { TopBar } from '../../components/topBar';

export const Home: React.FC = () => {
  const auth = useAuth();
  const [groups, setgroups] = useState([
    {
      group: 'Grupo 1',
      data: [
        { name: 'Maely', expense: '43.44', status: 'Falta Pagar' },
        { name: 'Rodrigues', expense: '105.32', status: 'Falta Receber' },
        { name: 'Victor', expense: '61.88', status: 'Falta Pagar' },
      ],
    },
    {
      group: 'Grupo 2',
      data: [
        { name: 'Lucas', expense: '13.11', status: 'Falta Pagar' },
        { name: 'Giulia', expense: '0', status: 'Em dia' },
        { name: 'Fernando', expense: '3.10', status: 'Falta Pagar' },
        { name: 'Matheus', expense: '10.01', status: 'Falta Pagar' },
      ],
    },
  ]);
  const handleLogout = async () => {
    auth?.logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text2}>Grupos: </Text>
        <View style={styles.containerTable}>
          {groups.map((item) => (
            <View style={styles.containerList}>
              <Text style={styles.text2}>{item.group} </Text>
              <DataTable>
                <DataTable.Header style={styles.text3}>
                  <DataTable.Title>Nome</DataTable.Title>
                  <DataTable.Title>Status</DataTable.Title>
                  <DataTable.Title numeric>R$</DataTable.Title>
                </DataTable.Header>
                {item.data.map(({ name, expense, status }) => (
                  <DataTable.Row style={styles.text3} key={name}>
                    <DataTable.Cell>{name}</DataTable.Cell>
                    <DataTable.Cell>{status}</DataTable.Cell>
                    <DataTable.Cell numeric>{expense}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </View>
          ))}
        </View>
        <SafeAreaView style={styles.button}>
          <TouchableOpacity
            style={styles.addGroup}
            onPress={() => console.log('criar grupo')}
          >
            <AntDesign name='pluscircle' size={24} color={colors.primary} />
            <Text style={styles.logoutButtonText}>Adicionar grupo</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  containerList: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  logoutButton: {
    backgroundColor: 'white',
    borderColor: colors.secondary,
    borderWidth: 2,
    marginTop: 5,
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  text2: {
    color: colors.primary,
    fontSize: 30,
    paddingTop: 20,
    paddingLeft: 5,
  },
  text3: {
    fontSize: 15,
    backgroundColor: colors.accent,
  },
  title: {
    color: colors.secondary,
    fontSize: 40,
    textAlign: 'center',
  },

  listItem: {
    backgroundColor: colors.accent,
    padding: 20,
    marginVertical: 8,
  },
  addGroup: {
    backgroundColor: 'white',
    borderColor: colors.primary,
    borderWidth: 2,
    marginTop: 5,
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  scrollView: {
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
  containerTable: {
    paddingTop: 10,
    paddingHorizontal: 30,
  },
});
