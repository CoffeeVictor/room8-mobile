import {
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../constants/Colors';
import { useAuth } from '../../contexts/AuthContext';
import { AntDesign } from '@expo/vector-icons';

export const Home: React.FC = () => {
  const auth = useAuth();

  const handleLogout = async () => {
    auth?.logout();
  };
  const grups = [
    {
      grup: 'Grupo 1',
      data: [
        { name: 'Maely', expense: '123.34' },
        { name: 'Rodrigues', expense: '325.32' },
      ],
    },
    {
      grup: 'Grupo 2',
      data: [
        { name: 'Lucas', expense: '13.11' },
        { name: 'Giulia', expense: '5.0' },
      ],
    },
  ];
  const Item = ({ name, expense }) => (
    <View style={styles.listItem}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>R$ {expense}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Bem vindo {auth?.user?.email}</Text>
        <Text style={styles.title}>Grupos </Text>
        <SafeAreaView style={styles.containerList}>
          <SectionList
            sections={grups}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ item }) => (
              <Item name={item.name} expense={item.expense} />
            )}
            renderSectionHeader={({ section: { grup } }) => (
              <Text style={styles.text}>{grup}</Text>
            )}
          />
        </SafeAreaView>
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
    backgroundColor: colors.secondary,
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
});
