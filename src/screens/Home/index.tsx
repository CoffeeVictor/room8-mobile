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

export const Home: React.FC = () => {
  const auth = useAuth();
  const [groups, setgroups] = useState([
    {
      grup: 'Grupo 1',
      data: [
        { name: 'Maely', expense: '43.44', status: 'Falta Pagar' },
        { name: 'Rodrigues', expense: '105.32', status: 'Falta Receber' },
        { name: 'Victor', expense: '61.88', status: 'Falta Pagar' },
      ],
    },
    {
      grup: 'Grupo 2',
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
  console.log(groups);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Bem vindo {auth?.user?.email}</Text>
        <Text style={styles.text2}>Grupos: </Text>
        <View style={styles.containerTable}>
          {groups.map((item) => (
            <View style={styles.containerList}>
              <Text style={styles.text2}>{item.grup} </Text>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Nome</DataTable.Title>
                  <DataTable.Title>Status</DataTable.Title>
                  <DataTable.Title numeric>R$</DataTable.Title>
                </DataTable.Header>
                {item.data.map(({ name, expense, status }) => (
                  <DataTable.Row>
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
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <AntDesign name='logout' size={24} color={colors.primary} />
            <Text style={styles.logoutButtonText}>Logout</Text>
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
    borderColor: colors.primary,
    borderWidth: 2,
    marginTop: 5,
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 40,
  },
  logoutButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  text: {
    color: colors.primary,
    fontSize: 25,
    textAlign: 'center',
  },
  text2: {
    color: colors.primary,
    fontSize: 30,
    paddingTop: 20,
    paddingLeft: 5,
  },
  title: {
    color: colors.primary,
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
    backgroundColor: colors.secondary,
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
