import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';
import { DataTable } from 'react-native-paper';

export const HomeList: React.FC = ({ people }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerTable}>
          <DataTable>
            <DataTable.Header style={styles.textTable}>
              <DataTable.Title>
                <Text style={styles.textTable}>Name</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.textTable}>Status</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={styles.textTable}>R$</Text>
              </DataTable.Title>
              <DataTable.Title>-</DataTable.Title>
            </DataTable.Header>
            {people?.map((item) => (
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
                      onPress={() => console.log('code')}
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
          onPress={() => console.log('code')}
        >
          <Text style={styles.textButton}> Share Group</Text>
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
