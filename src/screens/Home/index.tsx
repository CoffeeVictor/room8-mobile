import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBar } from '../../components/TobBar';
import { colors } from '../../constants/Colors';
import { HomeList } from './HomeList';

export const Home: React.FC = () => {
  const groups = [];
  const people = [
    { name: 'Maely', totalexpense: '23.43', status: 'Pay' },
    { name: 'Rodrigues', totalexpense: '23.43', status: 'Receive' },
    { name: 'Victor', totalexpense: '0', status: 'Ok' },
  ];
  const [cod, setCod] = useState('');
  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <SafeAreaView style={styles.view}>
        {groups.length == 0 ? (
          <SafeAreaView>
            <Text style={styles.text}>You don't have a Group</Text>
            <Text style={styles.text}>Join a Group or Creat a New Group</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log('creat')}
            >
              <Text style={styles.textButton}> Creat Group</Text>
            </TouchableOpacity>

            <Text style={styles.text}>Or Join an Already Created Group :</Text>
            <TextInput
              style={styles.formInput}
              placeholder={'Enter the Group Code'}
              keyboardType={'name-phone-pad'}
              value={cod}
              onChangeText={setCod}
              autoCapitalize={'none'}
            ></TextInput>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log('join')}
            >
              <Text style={styles.textButton}> Join Group</Text>
            </TouchableOpacity>
          </SafeAreaView>
        ) : (
          <HomeList people={people}></HomeList>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  formInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  view: {
    marginBottom: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  text: {
    color: colors.heading,
    fontSize: 20,
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    width: '50%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
  },
});
