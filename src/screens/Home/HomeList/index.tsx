import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';

export const HomeList: React.FC = ({ people }) => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        {people?.map((item) => (
          <View key={item.name} style={styles.card}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}> {item.status}</Text>
            <Text style={styles.text}> R$ {item.totalexpense}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log('delete')}
            >
              <AntDesign name='delete' size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => console.log('código')}
        >
          <Text style={styles.textButton}> Compartilhar grupo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollView: {
    marginBottom: 10,
    marginTop: 10,
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
    color: colors.primary,
    marginLeft: 5,
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
});
